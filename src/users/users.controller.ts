import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { pseudoRandomBytes } from 'crypto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninDto } from './dtos/signin-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // This route allows us to create an user
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.userName,
      body.password,
      body.role,
      body.email,
      body.userInfo,
      body.phoneNumber,
    );
    // console.log(body instanceof CreateUserDto);
    session.Id = user._id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
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

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    if (body.password) {
    }
    return this.usersService.update(id, body);
  }
}
