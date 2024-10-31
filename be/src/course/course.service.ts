import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  public async create(courseData: Partial<Course>): Promise<Course> {
    // const course = this.courseRepository.create(courseData);
    return this.courseRepository.save(courseData);
  }

  public async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  public async findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id : id } });
  }

  public async remove(id: number){
    let course = await this.courseRepository.findOne({where: {id}});
    await this.courseRepository.delete(course);
  }

  public async getTimetable() {
    return {
      courses: [
        {
          "courseName": "컴퓨터 구조",
          "courseStartTime": "10:00",
          "courseEndTime": "12:00",
          "courseRoom": "센B114",
          "professor": "정승화",
          "courseDays": ["월요일", "수요일"]
        },
        {
          "courseName": "이산수학및프로그래밍",
          "courseStartTime": "10:30",
          "courseEndTime": "12:00",
          "courseRoom": "센B111",
          "professor": "이은상",
          "courseDays": ["화요일", "목요일"]
        },
        {
          "courseName": "선형대수및프로그래밍",
          "courseStartTime": "12:00",
          "courseEndTime": "13:30",
          "courseRoom": "센B114",
          "professor": "이종원",
          "courseDays": ["화요일", "목요일"]
        },
        {
          "courseName": "Technical Writing",
          "courseStartTime": "12:00",
          "courseEndTime": "14:00",
          "courseRoom": "센B109",
          "professor": "진실로",
          "courseDays": ["월요일"]
        },
        {
          "courseName": "창업과기업가정신1",
          "courseStartTime": "13:30",
          "courseEndTime": "15:00",
          "courseRoom": "학대공연장",
          "professor": "신하얀",
          "courseDays": ["수요일"]
        },
        {
          "courseName": "SW설계기초(산학프로젝트입문)",
          "courseStartTime": "15:00",
          "courseEndTime": "16:30",
          "courseRoom": "센B112",
          "professor": "최준연",
          "courseDays": ["화요일", "목요일"]
        },
        {
          "courseName": "알고리즘및실습",
          "courseStartTime": "15:00",
          "courseEndTime": "16:30",
          "courseRoom": "센B111",
          "professor": "송오영",
          "courseDays": ["수요일"]
        }
      ]
    };
  }
}
