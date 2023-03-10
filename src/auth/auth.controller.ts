import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { SessionService } from './session';

@Controller('au')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(AuthGuard('local'))
  @Post('/login')
  //async login(@Request() req) {
  async login(@Body() body: any) {
    // Handle logic here
    // Récupération de l'utilisateur authentifié
    const user = body;
    return this.authService.login(user.userName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    // Handle profile logic here
    return req.user;
  }
}
