import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.group.findMany({
      include: {
        employees: {
          include: {
            employee: {
              include: { category: true, state: true, province: true },
            },
          },
        },
      },
    });
  }

  async getGroup(id: number) {
    return await this.prisma.group.findFirst({
      where: { id },
      include: {
        employees: {
          include: {
            employee: {
              include: { category: true, state: true, province: true },
            },
          },
        },
      },
    });
  }
}
