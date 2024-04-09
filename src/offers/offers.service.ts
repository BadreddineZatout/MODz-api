import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async create(createOfferDto: CreateOfferDto) {
    return await this.prisma.offer.create({
      data: createOfferDto,
      include: {
        order: true,
      },
    });
  }

  findAll() {
    return `This action returns all offers`;
  }

  async findOne(id: number) {
    const offer = await this.prisma.offer.findFirst({
      where: { id },
      include: {
        order: {
          include: {
            category: true,
            job_type: true,
            client: true,
            items: {
              include: {
                item: true,
              },
            },
          },
        },
        employee: {
          include: {
            category: true,
            state: true,
            province: true,
            media: true,
          },
        },
      },
    });

    return {
      ...offer,
      order: {
        ...offer.order,
        items: offer.order.items.map((item) => {
          return {
            ...item.item,
            quantity: item.quantity,
          };
        }),
      },
    };
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    return await this.prisma.offer.update({
      where: { id },
      data: updateOfferDto,
      include: {
        order: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.offer.delete({
      where: { id: id },
    });
    return { message: 'Offer deleted' };
  }
}
