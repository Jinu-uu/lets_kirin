import { Courses } from 'src/course/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  id: string;
  
  @Column()
  pw: string;

  @Column()
  name: string;
  takenCourses: any;

  @Column()
  year: string;
}
