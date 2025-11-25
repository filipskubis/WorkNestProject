import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import type { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: AuthDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login({
      email: body?.email,
      password: body?.password,
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true in production (HTTPS)
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    });

    return { ok: true, message: 'Login successful', user };
  }
}
