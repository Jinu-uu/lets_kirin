import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakenCourses } from './taken_courses.entity';
import { TakenCoursesController } from './taken_courses.controller';
import { TakenCoursesService } from './taken_courses.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TakenCourses]),
        AuthModule
    ],
    controllers: [TakenCoursesController],
    providers: [TakenCoursesService]
})
export class TakenCoursesModule {}
