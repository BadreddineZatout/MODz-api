import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async create(createOfferDto: CreateOfferDto) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: createOfferDto.order_id,
      },
    });
    if (order.status !== 'PENDING')
      throw new HttpException(
        {
          message: 'You can create an offer only for pending orders',
        },
        HttpStatus.BAD_REQUEST,
      );

    const acceptedOffer = await this.prisma.offer.findFirst({
      where: {
        order_id: createOfferDto.order_id,
        status: 'ACCEPTED',
      },
    });
    if (acceptedOffer)
      throw new HttpException(
        {
          message: 'There is already an accepted offer for this order',
        },
        HttpStatus.BAD_REQUEST,
      );

    return await this.prisma.offer.create({
      data: createOfferDto,
      include: {
        order: true,
      },
    });
  }

  async findAll(query) {
    const take = query.per_page ?? 10;

    const offers = await this.prisma.offer.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        employee_id: query.employee_id,
        order_id: query.order_id,
        status: query.status,
        can_travel: query.can_travel,
      },
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
            categories: true,
            state: true,
            province: true,
            media: true,
          },
        },
      },
    });

    return offers.map((offer) => {
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
    });
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
            categories: true,
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

  async update(id: number, updateOfferDto: UpdateOfferDto, owner: number) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!offer || !owner)
      throw new HttpException(
        {
          message: "You can't update an offer you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.offer.update({
      where: { id },
      data: updateOfferDto,
      include: {
        order: true,
      },
    });
  }

  async accept(id: number, owner: number) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id,
      },
    });
    const order = await this.prisma.order.findFirst({
      where: {
        id: offer.order_id,
        client_id: owner,
      },
    });
    if (!order || !owner)
      throw new HttpException(
        {
          message: "You can't accept an offer for an order you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );

    const acceptedOffer = await this.prisma.offer.findFirst({
      where: {
        order_id: order.id,
        status: 'ACCEPTED',
      },
    });
    if (acceptedOffer)
      throw new HttpException(
        {
          message: 'There is already an accepted offer for this order',
        },
        HttpStatus.BAD_REQUEST,
      );

    await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        employee_id: offer.employee_id,
      },
    });

    return await this.prisma.offer.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
      },
      include: {
        order: true,
      },
    });
  }

  async refuse(id: number, owner: number) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id,
      },
    });
    const order = await this.prisma.order.findFirst({
      where: {
        id: offer.order_id,
        client_id: owner,
      },
    });
    if (!order || !owner)
      throw new HttpException(
        {
          message: "You can't refuse an offer for an order you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    if (offer.status === 'ACCEPTED')
      await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          employee_id: null,
        },
      });

    return await this.prisma.offer.update({
      where: { id },
      data: {
        status: 'REFUSED',
      },
      include: {
        order: true,
      },
    });
  }

  async remove(id: number, owner: number) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!offer || !owner)
      throw new HttpException(
        {
          message: "You can't delete an offer you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    await this.prisma.offer.delete({
      where: { id: id },
    });
    return { message: 'Offer deleted' };
  }
}
