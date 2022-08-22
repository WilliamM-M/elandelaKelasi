import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: MongoRepository<User>,
  ) {}

  // Create a user
  createUser(
    userName: string,
    password: string,
    role: string,
    email: string,
    userInfo: string,
    phoneNumber: string,
  ) {
    const user = this.usersRepository.create({
      userName,
      password,
      role,
      email,
      userInfo,
      phoneNumber,
    });

    return this.usersRepository.save(user);
  }

  // Finding user by id
  findOne(id: string) {
    if (!id) {
      return null;
    }
    const user = this.usersRepository.findOneBy(id);
    return user;
  }

  // Getting user by user name
  getUserByName(userName: string) {
    if (!userName) {
      console.log('rien');
      console.log(userName);
      return null;
    }
    const user = this.usersRepository.findOneBy({ userName });
    console.log(user);
    return user;
  }

  // Getting all users
  findAll(): Promise<User[]> {
    const users = this.usersRepository.find();
    console.log(users);
    return users;
  }
}
