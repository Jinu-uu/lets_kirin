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
            const allData = XLSX.utils.sheet_to_json(worksheet);
            const data = allData.slice(3);
            for (const row of data) {
                const takenCourse = this.takenCoursesRepository.create({
                    userId,
                    year: Number(row['__EMPTY']) || null,
                    semester: String(row['__EMPTY_1'])?.replace('학기', '') || null,
                    courseNumber: Number(row['__EMPTY_2']) || null,
                    courseName: String(row['__EMPTY_3']) || '',
                    courseClassification: String(row['__EMPTY_4']) || '',
                    courseField: String(row['__EMPTY_5']) || '',
                    selectionField: String(row['__EMPTY_6']) || '',
                    courseCredit: Number(row['__EMPTY_7']) || null,
                    evaluation: row['__EMPTY_8'] === 'P/NP' ? 'P/NP' : 'GRADE',
                    grade: String(row['__EMPTY_9']) || '',
                    rating: Number(row['__EMPTY_10']) || 0.0,
                    departmentCode: String(row['__EMPTY_11']) || ''
                });

                try {
                    await this.takenCoursesRepository.save(takenCourse);
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