import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'clientExists', async: true })
@Injectable()
export class ClientExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const user = await this.prisma.client.findFirst({ where: { id: id } });
    return user ? true : false;
  }

  defaultMessage() {
    return 'Client with ID $value does not exist.';
  }
}
