import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MediaType, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './Dtos/login.dto';
import {
  CreateClientProfileDto,
  CreateEmployeeProfileDto,
  UpdateClientProfileDto,
  UpdateEmployeeProfileDto,
} from './Dtos/profile.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

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

  async updateProfile(
    user_id: number,
    data: UpdateClientProfileDto | UpdateEmployeeProfileDto,
  ) {
    if (!data) {
      throw new HttpException(
        {
          message: ['Missing data'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
      include: {
        profile: {
          include: {
            client: true,
            employee: true,
          },
        },
      },
    });
    if (user.current_role == 'CLIENT') {
      return await this.prisma.client.update({
        where: { id: user.profile.client_id },
        data: data as UpdateClientProfileDto,
      });
    }

    return await this.prisma.employee.update({
      where: { id: user.profile.employee_id },
      data: data as UpdateEmployeeProfileDto,
    });
  }

  async saveMedia(id: number, file: Express.Multer.File, type: MediaType) {
    const media = await this.prisma.media.create({
      data: {
        name: file.filename,
        path: file.destination + '/' + file.filename,
        type: type,
      },
    });
    const profile = await this.prisma.profileUser.findFirst({
      where: { user_id: id },
      include: {
        employee: true,
      },
    });
    await this.prisma.employee.update({
      where: { id: profile.employee_id },
      data: {
        media: {
          connect: {
            id: media.id,
          },
        },
      },
    });
  }

  async confirmEmail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm Your Email',
      template: 'confirmation', // Name of your email template file without extension
      context: {
        code: this.generateRandomNumber(),
      },
    });
  }

  private generateRandomNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async resetPassword(id: number, password: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        password: bcrypt.hashSync(password, 8),
      },
    });
    return { message: 'Password reset' };
  }
}
