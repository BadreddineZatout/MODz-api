import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'groupExists', async: true })
@Injectable()
export class GroupExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const user = await this.prisma.group.findFirst({ where: { id: id } });
    return user ? true : false;
  }

  defaultMessage() {
    return 'Group with ID $value does not exist.';
  }
}
