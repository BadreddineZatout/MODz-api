import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQuery } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        client_id: createOrderDto.client_id,
        description: createOrderDto.description,
        date: new Date(createOrderDto.date),
        hour: createOrderDto.hour,
        category_id: createOrderDto.category_id,
        job_type_id: createOrderDto.job_type_id,
        is_urgent: createOrderDto.is_urgent,
        items: {
          create: createOrderDto.items,
        },
      },
      include: {
        category: true,
        job_type: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findAll(query: OrderQuery) {
    const take = query.per_page ?? 10;
    const orders = await this.prisma.order.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        client_id: query.client_id,
        category_id: query.category_id,
        job_type_id: query.job_type_id,
        status: query.status,
        is_urgent: query.is_urgent,
      },
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
    });

    return orders.map((order) => {
      return {
        ...order,
        items: order.items.map((item) => {
          return {
            ...item.item,
            quantity: item.quantity,
          };
        }),
      };
    });
  }

  async getOrder(id: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: id },
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
    });

    return {
      ...order,
      items: order.items.map((item) => {
        return {
          ...item.item,
          quantity: item.quantity,
        };
      }),
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, owner: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!order || !owner)
      throw new HttpException(
        {
          message: "You can't update an order you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    if (updateOrderDto.items) {
      await this.prisma.order.update({
        where: { id },
        data: {
          items: {
            deleteMany: {},
            create: updateOrderDto.items,
          },
        },
      });
    }

    return await this.prisma.order.update({
      where: { id },
      data: {
        description: updateOrderDto.description,
        date: updateOrderDto.date
          ? new Date(updateOrderDto.date)
          : updateOrderDto.date,
        hour: updateOrderDto.hour,
        is_urgent: updateOrderDto.is_urgent,
        status: updateOrderDto.status,
        accepted_at: updateOrderDto.accepted_at
          ? new Date(updateOrderDto.accepted_at)
          : updateOrderDto.accepted_at,
        employee_id: updateOrderDto.employee_id,
      },
      include: {
        category: true,
        job_type: true,
        items: {
          include: {
            item: true,
          },
        },
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
    await this.prisma.order.delete({
      where: { id: id },
    });
    return { message: 'Order deleted' };
  }
}
