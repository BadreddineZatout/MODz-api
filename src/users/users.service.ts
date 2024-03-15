import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './Dtos/login.dto';
import {
  CreateClientProfileDto,
  CreateEmployeeProfileDto,
} from './Dtos/profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 8),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        current_role: user.current_role,
      },
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async login(data: LoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!user) {
      throw new HttpException(
        {
          message: ['This Email does not exist'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          message: ['Wrong Password'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      user: {
        id: user.id,
        email: user.email,
        current_role: user.current_role,
      },
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async createClientProfile(
    user_id: number,
    client_data: CreateClientProfileDto,
  ) {
    const client = await this.prisma.client.create({
      data: client_data,
    });

    await this.prisma.profileUser.create({
      data: { user_id: user_id, client_id: client.id },
    });
    return client;
  }

  async createEmployeeProfile(
    user_id: number,
    employee_data: CreateEmployeeProfileDto,
  ) {
    const client = await this.prisma.employee.create({
      data: { ...employee_data, is_active: false, status: 'PENDING' },
    });

    await this.prisma.profileUser.create({
      data: { user_id: user_id, employee_id: client.id },
    });
    return client;
  }
}
