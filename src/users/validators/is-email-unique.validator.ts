import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return !user; // Return true if email is unique, false otherwise
  }

  defaultMessage() {
    return 'Email $value is already taken.';
  }
}
