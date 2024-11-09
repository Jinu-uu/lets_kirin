import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TakenCourses } from "./taken_courses.entity";
import { Repository } from "typeorm";
import * as XLSX from 'xlsx';

@Injectable()
export class TakenCoursesService {
    constructor(
        @InjectRepository(TakenCourses)
        private takenCoursesRepository: Repository<TakenCourses>
    ) {}

    async uploadExcel(file: Express.Multer.File, userId: string): Promise<void> {
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet);

            console.log('Parsed Excel Data:', data);

            for (const row of data) {
                const takenCourse = this.takenCoursesRepository.create({
                    userId,
                    year: Number(row['년도']) || null,
                    semester: String(row['학기']) || null,
                    courseNumber: Number(row['학수번호']) || null,
                    courseName: String(row['교과목명']) || '',
                    courseClassification: String(row['이수구분']) || '',
                    courseField: String(row['교직영역']) || '',
                    selectionField: String(row['선택영역']) || '',
                    courseCredit: Number(row['학점']) || null,
                    evaluation: row['평가방식'] === 'P/NP' ? 'P/NP' : 'GRADE',
                    grade: String(row['등급']) || '',
                    rating: Number(row['평가']) || 0.0,
                    departmentCode: String(row['개설학과코드']) || ''
                });
                
                console.log('Created entity:', takenCourse);

                try {
                    const savedCourse = await this.takenCoursesRepository.save(takenCourse);
                    console.log('Saved course:', savedCourse);
                } catch (error) {
                    console.error('Error saving course:', error);
                    throw error;
                }
            }
        } catch (error) {
            console.error('Error in uploadExcel:', error);
            throw error;
        }
    }

    async getTakenCourses(userId: string): Promise<TakenCourses[]> {
        const courses = await this.takenCoursesRepository.find({
            where: { userId }
        });
        return courses;
    }
}