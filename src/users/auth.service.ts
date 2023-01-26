import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninDto } from './dtos/signin-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(newUser: CreateUserDto) {
    // See if the email is used
    const user = await this.usersService.find(newUser.email);
    if (user) {
      //console.log(users);
      throw new BadRequestException('email in use');
    }
    //Hash the users password
    // Generate the salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(newUser.password, salt, 32)) as Buffer;
    //  Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    newUser.password = result;
    //Create a new user and save it
    const userCreate = await this.usersService.createUser(newUser);
    //return the user

    return userCreate;
  }

  async signin(userSearch: SigninDto) {
    const user = await this.usersService.find(userSearch.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(userSearch.password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad passord');
    }
    return user;
  }

  async signout() {}
}
