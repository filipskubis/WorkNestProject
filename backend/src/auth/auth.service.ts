import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

type SanitizedUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;

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

  async login(authDto: Omit<AuthDto, 'name'>) {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(authDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken(user);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }

  async getCurrentUser(userId: number): Promise<SanitizedUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async register(authDto: AuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(authDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: authDto.name,
          email: authDto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
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
