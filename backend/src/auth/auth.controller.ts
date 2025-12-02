import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import type { Response, Request } from 'express';
import { Res } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '@prisma/client';

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
    @Body() body: Omit<AuthDto, 'name'>,
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Req() req: Request & { user: User }) {
    const user = await this.authService.getCurrentUser(req.user.id);
    return { ok: true, user };
  }
}
