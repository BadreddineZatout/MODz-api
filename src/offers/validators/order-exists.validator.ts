import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'orderExists', async: true })
@Injectable()
export class OrderExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: id },
    });
    return order ? true : false;
  }

  defaultMessage() {
    return 'Order with ID $value does not exist.';
  }
}
