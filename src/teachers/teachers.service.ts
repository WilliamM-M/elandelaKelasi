import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

import { Teacher } from './teachers.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: MongoRepository<Teacher>,
  ) {}

  // Create a teacher
  createTeacher(newTeacher: CreateTeacherDto) {
    const teacher = this.teachersRepository.create(newTeacher);

    return this.teachersRepository.save(teacher);
  }

  // Finding teacher by id
  findOne(id: string) {
    if (!id) {
      return null;
    }
    const teacher = this.teachersRepository.findOneBy(id);
    return teacher;
  }

  // Getting user by user name
  getUserByName(teacherNumber: string) {
    if (!teacherNumber) {
      return null;
    }
    const user = this.teachersRepository.findOneBy({ teacherNumber });
    return user;
  }

  //finding user by email
  find(email: string) {
    console.log(email);
    if (!email) {
      return null;
    }
    return this.teachersRepository.findOneBy({ email });
  }

  // Getting all users
  findAll(): Promise<Teacher[]> {
    const teachers = this.teachersRepository.find();
    return teachers;
  }

  // Remove user given id
  async remove(id: string) {
    const teacher = await this.findOne(id);

    if (!teacher) {
      throw new Error('user not found');
    }
    return this.teachersRepository.remove(teacher);
  }

  // Update user given id
  async update(id: string, attrs: Partial<Teacher>) {
    const teacher = await this.findOne(id);

    if (!teacher) {
      throw new Error('user not found');
    }

    Object.assign(teacher, attrs);
    return this.teachersRepository.save(teacher);
  }
}
