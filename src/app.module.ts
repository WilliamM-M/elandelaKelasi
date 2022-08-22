import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'elandelaDb',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoLoadEntities: true,
      entities:[join(__dirname,'**/**.entity{.ts, .js}')]
      }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://lionnelmaz:c7PyhAevor6u7ZJK@elandelacluster.xvnx9sj.mongodb.net/elandelaDb?authSource=admin&replicaSet=atlas-80sr4x-shard-0&readPreference=primary&ssl=true',
    //   //database: 'elandelaDb',
    //   entities: [
    //     __dirname + '/**/*.entity{.ts,.js}',
    //   ],
    //   //ssl: true,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   logging: true,
    //   synchronize: true
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
