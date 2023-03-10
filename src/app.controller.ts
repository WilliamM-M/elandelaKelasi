import {
  Controller,
  Get,
  Session as GetSession,
  HttpCode,
  UnauthorizedException,
  Post,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Session } from 'express-session';
import { AppService } from './app.service';
import { RedisService } from './redisService';

type UserSession = Session & Record<'user', any>;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get(':id')
  async findSessionById(@Param('id') id: string) {
    console.log(id);
    return this.redisService.findSessionById(id);
  }

  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(/*@GetSession() session: UserSession*/) {
    console.log('session.id');
    //if (!session.user) throw new UnauthorizedException('Not authenticated');
    //return session.user;
  }
  @Post('auth/login')
  auth(@GetSession() session: UserSession) {
    console.log(session.id);
    session.user = {
      email: 'vlad@codewithvlad.com',
    };
    // this.sessionService.checkSession('l9QeG_hVryyG7gtNh_mXuyAkYgAoqjWF');
    return session;
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetSession() session: UserSession) {
    console.log(session.id);
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
