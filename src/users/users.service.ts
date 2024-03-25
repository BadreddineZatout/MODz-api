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
import * as moment from 'moment';

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
        verified_at: user.verified_at,
      },
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
      email_confirmation: await this.sendConfirmEmail(user.id, user.email),
    };
  }

  async login(data: LoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
      include: {
        profile: true,
      },
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

    const profile = user.profile
      ? user.current_role == 'CLIENT'
        ? await this.prisma.client.findFirst({
            where: { id: user.profile.client_id },
          })
        : await this.prisma.employee.findFirst({
            where: { id: user.profile.employee_id },
            include: {
              media: true,
              state: true,
              province: true,
              category: true,
            },
          })
      : null;

    return {
      user: {
        id: user.id,
        email: user.email,
        current_role: user.current_role,
        verified_at: user.verified_at,
        profile: profile,
      },
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        email: true,
        verified_at: true,
        current_role: true,
        profile: true,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          message: ['This User does not exist'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const profile = user.profile
      ? user.current_role == 'CLIENT'
        ? await this.prisma.client.findFirst({
            where: { id: user.profile.client_id },
          })
        : await this.prisma.employee.findFirst({
            where: { id: user.profile.employee_id },
            include: {
              media: true,
              state: true,
              province: true,
              category: true,
            },
          })
      : null;

    return {
      ...user,
      profile: profile,
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

  async updateEmail(id: number, email: string) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: { email, verified_at: null },
      select: {
        id: true,
        email: true,
        verified_at: true,
        current_role: true,
        profile: true,
      },
    });
    const profile = user.profile
      ? user.current_role == 'CLIENT'
        ? await this.prisma.client.findFirst({
            where: { id: user.profile.client_id },
          })
        : await this.prisma.employee.findFirst({
            where: { id: user.profile.employee_id },
            include: {
              media: true,
              state: true,
              province: true,
              category: true,
            },
          })
      : null;

    return {
      user: {
        ...user,
        profile: profile,
      },
      email_confirmation: await this.sendConfirmEmail(user.id, user.email),
    };
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

  async saveMedia(
    id: number,
    files: Array<Express.Multer.File>,
    type: MediaType,
  ) {
    const profile = await this.prisma.profileUser.findFirst({
      where: { user_id: id },
      include: {
        employee: true,
      },
    });
    const { media } = await this.prisma.employee.update({
      where: { id: profile.employee_id },
      data: {
        media: {
          create: files.map((file) => {
            return {
              name: file.filename,
              path: file.destination + '/' + file.filename,
              type: type,
            };
          }),
        },
      },
      include: {
        media: true,
      },
    });
    return media;
  }

  async sendConfirmEmail(id: number, email: string) {
    const code = this.generateRandomNumber();
    const token = await this.jwtService.signAsync({
      sub: id,
      email: email,
    });
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm Your Email',
      template: 'confirmation', // Name of your email template file without extension
      context: {
        code,
      },
    });
    return {
      code,
      token,
    };
  }

  async verifyEmail(id: number, email: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        verified_at: moment().toDate(),
      },
    });
    return { message: `Email ${email} confirmed successfully` };
  }

  async sendResetEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      throw new HttpException(
        {
          message: ['No user found for this email'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const code = this.generateRandomNumber();
    const token = await this.jwtService.signAsync({
      sub: email,
    });
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: 'password-reset', // Name of your email template file without extension
      context: {
        code,
      },
    });
    return {
      code,
      token,
    };
  }

  async resetPassword(email: string, password: string) {
    await this.prisma.user.update({
      where: { email: email },
      data: {
        password: bcrypt.hashSync(password, 8),
      },
    });
    return { message: 'Password reset' };
  }

  private generateRandomNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
