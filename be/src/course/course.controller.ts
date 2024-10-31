import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService
) {}

  @Post('upload')
  create(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.courseService.create(courseData);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(+id);
  }

  @Get('findAll')
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.courseService.remove(+id);
  }

  @Get('timetable')
  async getTimetable() {
    return this.courseService.getTimetable();
  }
}