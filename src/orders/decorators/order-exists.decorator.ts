import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const OrderExists = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const prisma = new PrismaService();
    const { id } = request.params;

    const order = await prisma.order.findFirst({ where: { id: parseInt(id) } });

    if (!order) {
      throw new HttpException(
        {
          message: ['Order not found'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return parseInt(id);
  },
);
