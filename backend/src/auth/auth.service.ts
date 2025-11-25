import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  generateToken(user: { id: number; email: string }): string {
    return this.jwt.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(authDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken(user);

    return { user: { id: user.id, email: user.email }, token };
  }

  async register(authDto: AuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(authDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return {
        ok: true,
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle duplicate email error
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }
}
