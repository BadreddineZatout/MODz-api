import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}
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

  async findAll(user: number) {
    return await this.prisma.subscription.findMany({
      where: { user_id: user },
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

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  async remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
