import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { User } from 'src/users/users.entity';

@Injectable()
export class SessionService {
  private client = redis.createClient();

  async createSession(user: any) {
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.client.set(sessionId, JSON.stringify(user));
    return { sessionId, user };
  }

  async getSession(sessionId: string) {
    const user = JSON.parse(await this.client.get(sessionId));
    return user;
  }

  async deleteSession(sessionId: string) {
    this.client.del(sessionId);
  }
}
