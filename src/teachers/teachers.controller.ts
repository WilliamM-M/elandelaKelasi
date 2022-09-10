import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  // Create a teacher
  @Post('signup')
  createTeacher() {}

  // Get prof by id
  @Get('/:id')
  findTeacherById() {}

  // Get all teachers
  @Get('/all')
  findAllTeachers() {}

  // Get prof by id
  @Get('/:id')
  findTeacherByName() {}

  // Update prof
  @Patch('/:id')
  updateTeacher() {}

  //Delete teacher
  @Delete('/:id')
  deleteTeacher() {}
}
