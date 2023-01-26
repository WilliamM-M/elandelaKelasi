import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { User } from './users.entity';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: MongoRepository<User>,
  ) {}

  // Create a user
  createUser(users: CreateUserDto) {
    const user = this.usersRepository.create(users);

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
      return null;
    }
    const user = this.usersRepository.findOneBy({ userName });
    return user;
  }

  //finding user by email
  find(email: string) {
    console.log(email);
    if (!email) {
      return null;
    }
    return this.usersRepository.findOneBy({ email });
  }

  // Getting all users
  findAll(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }

  // Remove user given id
  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user not found');
    }
    return this.usersRepository.remove(user);
  }

  // Update user given id
  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user not found');
    }
    //Hash the users password
    if (attrs.password) {
      // Generate the salt
      const salt = randomBytes(8).toString('hex');

      // Hash the salt and the password together
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
      //  Join the hashed result and the salt together
      const result = salt + '.' + hash.toString('hex');

      attrs.password = result;
    }

    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }
}
