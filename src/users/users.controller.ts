import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // This route allows us to create an user
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(
      body.userName,
      body.password,
      body.role,
      body.email,
      body.userInfo,
      body.phoneNumber,
    );
    console.log(body instanceof CreateUserDto);
    return user;
  }

  // This route allows us to get user by id
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  //This route allow us to get All users in our user database
  @Post()
  async findAllUsers() {
    const users = await this.usersService.findAll();

    return users;
  }

  // This route allows us to get user by user name
  @Get()
  findUserByName(@Query('user') user: string) {
    console.log(user);
    return this.usersService.getUserByName(user);
  }
}
