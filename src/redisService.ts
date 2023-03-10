import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

import { redisClient } from './app.module';

@Injectable()
export class RedisService {
  constructor() {}

  async findSessionById(id: string) {
    // const session = await this.redis.get(id);
    const session = await redisClient.get(id.toString());
    console.log(session);
    return JSON.parse(session);
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// import { Injectable } from '@nestjs/common';
// import { RedisConnectionService } from './redisConnectionService';
// import Redis from 'ioredis';

// const redisClient = new Redis({
//   host: 'localhost',
//   db: 0,
//   port: 6379,
// });

// @Injectable()
// export class SessionService {
//   constructor(private readonly redisConnection: RedisConnectionService) {}

//   async checkSession(sessionId: string) {
//     return new Promise(async (resolve, reject) => {
//       console.log('A');
//       // const exousia = await redisClient.get(key: 'l9QeG_hVryyG7gtNh_mXuyAkYgAoqjWF',)

//       //  console.log(exousia);
//       await redisClient.get('KEY', (err, result) => {
//         console.log('B');
//         if (err) {
//           reject(err);
//           console.log('erreur');
//         }
//         if (result) {
//           console.log('il existe');
//           resolve(true);
//         } else {
//           console.log('il n existe pas');
//           resolve(false);
//         }
//       });
//     });
//   }
//   async existingSession(sessionId: string) {}
// }
