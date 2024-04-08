import { OrderQuery } from './dto/order-query.dto';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

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
        job_type_id: query.client_id,
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    if (updateOrderDto.items) {
      await this.prisma.itemOrder.deleteMany({
        where: { order_id: id },
      });
      await this.prisma.order.update({
        where: { id },
        data: {
          items: {
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

  async remove(id: number) {
    await this.prisma.order.delete({
      where: { id: id },
    });
    return { message: 'Order deleted' };
  }
}
