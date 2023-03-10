import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { MongoRepository } from 'typeorm';
import { SessionService } from './session';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
    private readonly sessionService: SessionService,
    private readonly jwtStrategy: JwtStrategy,
    private usersService: UsersService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByName(userName);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(userName /*@Body() loginDto: LoginDto */) {
    //ici vous pouvez générer un jeton JWT ou utiliser une session

    //const {userName, password} = LoginDto,
    //const { userName, password } = userLog;
    console.log(userName);
    const userN = await this.usersService.getUserByName(userName);
    console.log(userN);
    if (!userN) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { sessionId, user } = await this.sessionService.createSession(userN);
    return { sessionId, user };
  }
}
