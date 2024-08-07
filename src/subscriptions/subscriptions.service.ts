import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}
  private free_pack = 1;

  async create(createSubscriptionDto: CreateSubscriptionDto, user: number) {
    return await this.prisma.subscription.create({
      data: {
        user_id: user,
        pack_id: createSubscriptionDto.pack_id,
      },
      include: {
        pack: true,
      },
    });
  }

  async getPacks(duration: number) {
    return {
      packs: duration
        ? await this.prisma.pack.findMany({
            where: {
              duration,
            },
          })
        : await this.prisma.pack.findMany(),
      durations: {
        '1 Month': 1,
        '3 Months': 3,
        '6 Months': 6,
        '1 Year': 12,
      },
    };
  }

  async findAll(user: number) {
    return await this.prisma.subscription.findMany({
      where: { user_id: user },
      include: {
        pack: true,
      },
    });
  }

  async getCurrent(user: number) {
    return await this.prisma.subscription.findFirst({
      where: { user_id: user, status: 'ACTIVE' },
      include: {
        pack: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.subscription.findFirst({
      where: { id: id },
      include: {
        pack: true,
      },
    });
  }

  async cancel(id: number, user: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        id,
        user_id: user,
      },
    });
    if (!subscription || !user)
      throw new HttpException(
        {
          message: "You can't cancel a subscription you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    if (subscription.status != 'ACTIVE')
      throw new HttpException(
        {
          message: 'You can only cancel active subscriptions',
        },
        HttpStatus.BAD_REQUEST,
      );
    await this.prisma.subscription.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });

    return await this.prisma.subscription.create({
      data: {
        user_id: user,
        pack_id: this.free_pack,
      },
    });
  }

  async remove(id: number, user: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        id,
        user_id: user,
      },
    });
    if (!subscription || !user)
      throw new HttpException(
        {
          message: "You can't delete a subscription you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    if (subscription.status != 'PENDING')
      throw new HttpException(
        {
          message: 'You can only delete pending subscriptions',
        },
        HttpStatus.BAD_REQUEST,
      );

    await this.prisma.subscription.delete({
      where: { id: id },
    });
    return { message: 'Subscription deleted' };
  }
}
