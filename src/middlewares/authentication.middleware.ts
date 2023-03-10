import {
  Injectable,
  NestMiddleware,
  Session as GetSession,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';

type UserSession = Session & Record<'user', any>;

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor() {}
  use(
    @GetSession() _session: UserSession,
    _res: Response,
    _next: NextFunction,
  ) {
    //Authenticate the request
    // const valeur = this.sessionService.checkSession(_session.id);
    //console.log(valeur);

    _next();
  }
}
