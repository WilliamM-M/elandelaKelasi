import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  // Create a teacher
  @Post('create')
  async createTeacher(@Body() body: CreateTeacherDto) {
    console.log(body);
    const teacher = await this.teachersService.createTeacher(body);
    console.log(body);
    return teacher;
  }
  // This route allows us to get teacher by id
  @Get('/:id')
  async findTeacherById(@Param('id') id: string) {
    const teacher = await this.teachersService.findOne(id);
    return teacher;
  }

  //This route allow us to get All teachers in our user database
  @Post()
  async findAllTeachers() {
    const teachers = await this.teachersService.findAll();

    return teachers;
  }

  // This route allows us to get teacher by user name
  @Get()
  findTeacherByName(@Query('teacher') teacher: string) {
    console.log(teacher);
    return this.teachersService.getUserByName(teacher);
  }

  @Delete('/:id')
  removeTeacher(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  // @Patch('/:id')
  // updateTeacher(@Param('id') id: string, @Body() body: UpdateTeacherDto) {
  //   if (body.password) {
  //   }
  //   return this.teachersService.update(id, body);
  // }
}
