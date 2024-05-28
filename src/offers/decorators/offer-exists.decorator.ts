import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const OfferExists = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let prisma = new PrismaService();
    const { id } = request.params;

    const offer = await prisma.offer.findFirst({ where: { id: parseInt(id) } });

    if (!offer) {
      throw new HttpException(
        {
          message: ['Offer not found'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    prisma = null;
    return parseInt(id);
  },
);
