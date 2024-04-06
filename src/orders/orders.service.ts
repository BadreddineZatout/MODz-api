import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
