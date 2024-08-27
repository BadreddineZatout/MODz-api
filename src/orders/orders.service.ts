import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma.service';
import { CancelOrderDto } from './dto/cancel-order.dto';
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
        state_id: createOrderDto.state_id,
        province_id: createOrderDto.province_id,
        items: {
          create: createOrderDto.items,
        },
      },
      include: {
        category: true,
        job_type: true,
        state: true,
        province: true,
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
        category_id: {
          in: query.categories,
        },
        job_type_id: query.job_type_id,
        status: query.status,
        is_urgent: query.is_urgent,
        employee_id: query.employee_id,
        state_id: query.state_id,
        province_id: query.province_id,
      },
      include: {
        category: true,
        job_type: true,
        client: true,
        employee: true,
        state: true,
        province: true,
        offers: true,
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
        offers: undefined,
        offer: order.employee_id
          ? order.offers.find(
              (offer) =>
                offer.employee_id == order.employee_id &&
                offer.status == 'ACCEPTED',
            )
          : null,
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
        employee: true,
        state: true,
        province: true,
        offers: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return {
      ...order,
      offers: undefined,
      offer: order.employee_id
        ? order.offers.find(
            (offer) =>
              offer.employee_id == order.employee_id &&
              offer.status == 'ACCEPTED',
          )
        : null,
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
        state_id: updateOrderDto.state_id,
        province_id: updateOrderDto.province_id,
        accepted_at: updateOrderDto.accepted_at
          ? new Date(updateOrderDto.accepted_at)
          : updateOrderDto.accepted_at,
        employee_id: updateOrderDto.employee_id,
      },
      include: {
        category: true,
        job_type: true,
        state: true,
        province: true,
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

  async getCancelReasons(for_employee: number) {
    return await this.prisma.cancelReason.findMany({
      where: { cancelBy: for_employee ? 'EMPLOYEE' : 'CLIENT' },
    });
  }

  async cancel(id: number, cancelOrderDto: CancelOrderDto, owner: number) {
    const order = await this.prisma.order.findFirst({
      where: { id },
    });
    if (cancelOrderDto.cancel_by === 'CLIENT' && order.client_id !== owner) {
      throw new HttpException(
        {
          message: "You can't cancel an order you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      cancelOrderDto.cancel_by === 'EMPLOYEE' &&
      order.employee_id !== owner
    ) {
      if (order.employee_id !== owner) {
        throw new HttpException(
          {
            message: "You can't cancel an order you don't work on",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return await this.prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancel_reason: cancelOrderDto.reason,
      },
    });
  }

  async start(id: number) {
    return await this.prisma.order.update({
      where: { id },
      data: {
        status: 'PROCESSING',
        started_at: moment().toDate(),
      },
      include: {
        category: true,
        job_type: true,
        employee: true,
        state: true,
        province: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async finish(id: number, owner: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!order || !owner)
      throw new HttpException(
        {
          message: "You can't finish a order job you don't work on",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.order.update({
      where: { id },
      data: {
        status: 'WAITING',
        code: Math.floor(1000 + Math.random() * 9000),
      },
      include: {
        category: true,
        job_type: true,
        employee: true,
        state: true,
        province: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async validate(id: number, owner: number, code: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!order || !owner)
      throw new HttpException(
        {
          message: "You can't finish a order job you don't work on",
        },
        HttpStatus.BAD_REQUEST,
      );
    if (order.code !== code)
      throw new HttpException(
        {
          message: 'Wrong Validation Code',
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.order.update({
      where: { id },
      data: {
        status: 'DONE',
      },
      include: {
        category: true,
        job_type: true,
        employee: true,
        state: true,
        province: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }
}
