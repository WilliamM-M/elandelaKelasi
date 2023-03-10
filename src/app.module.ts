import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { TeachersService } from './teachers/teachers.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { logger } from './middlewares/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

import * as session from 'express-session';
import * as redis from 'connect-redis';
import { RedisService } from './redisService';
import Redis from 'ioredis';

const RedisStore = redis(session);
export const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
});

@Module({
  imports: [
    UsersModule,
    TeachersModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'elandelaDb',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoLoadEntities: true,
      entities: [join(__dirname, '**/**.entity{.ts, .js}')],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://lionnelmaz:c7PyhAevor6u7ZJK@elandelacluster.xvnx9sj.mongodb.net/?retryWrites=true&w=majority',
    //   database: 'elandelaDb',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   logging: true,
    //   synchronize: true,
    //   //entities: [join(__dirname, '**/**.entity{.ts, .js}')],
    // }),
    AuthModule,
    StudentsModule,
    DashboardsModule,
    // TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
  exports: [RedisService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        'api',
        {
          path: 'auth/new',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/new',
          method: RequestMethod.POST,
        },
      )
      .apply(
        session({
          store: new RedisStore({
            host: 'localhost',
            port: 6379,
            client: redisClient,
            db: 0,
          }),
          secret: 'yoursecretkey',
          resave: true,
          saveUninitialized: true,
          cookie: {
            secure: false,
            maxAge: 3600 * 1000,
          },
        }),
      )
      .forRoutes('auth/login');
  }
  // .apply(logger)
  // .forRoutes('')
  // .apply(HelmetMiddleware)
  //.exclude('');
  // throw new Error('Method not implemented.');
}
