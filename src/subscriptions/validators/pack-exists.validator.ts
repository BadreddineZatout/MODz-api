import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'packExists', async: true })
@Injectable()
export class PackExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const pack = await this.prisma.pack.findFirst({
      where: { id: id },
    });
    return pack ? true : false;
  }

  defaultMessage() {
    return 'Pack with ID $value does not exist.';
  }
}
