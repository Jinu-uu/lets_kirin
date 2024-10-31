import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column()
  courseNumber: string;

  @Column()
  courseDivision: string;

  @Column()
  courseTitle: string;

  @Column()
  courseLanguage: string;

  @Column()
  courseClassification: string;

  @Column()
  credit: number;

  @Column()
  grade: number;

  @Column()
  professor: string;

  @Column()
  courseStartTime: string;
    
  @Column()
  courseEndTime: string;

  @Column()
  courseRoom: string;
}