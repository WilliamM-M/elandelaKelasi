import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import Redis from 'ioredis';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

const redisClient = new Redis();
const RedisStore = connectRedis(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: ['http://localhost:4200'], //angular client
  };
  app.enableCors(corsOptions);
  app.use(morgan('dev'));

  // We add sessions middlware
  // app.use(
  //   '/auth/login',
  //   session({
  //     store: new RedisStore({
  //       host: 'localhost',
  //       port: 6379,
  //       client: redisClient,
  //       ttl: 260,
  //     }),
  //     secret: 'secretKey',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       secure: true,
  //       httpOnly: true,
  //       maxAge: 1000 * 60 * 60 * 24 * 7, // one week,
  //     },
  //   }),
  // );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
