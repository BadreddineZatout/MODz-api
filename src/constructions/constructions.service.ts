import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionQuery } from './dto/constructions-query.dto';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';

@Injectable()
export class ConstructionsService {
  constructor(private prisma: PrismaService) {}

  create(createConstructionDto: CreateConstructionDto) {
    return 'This action adds a new construction';
  }

  async findAll(query: ConstructionQuery) {
    const take = query.per_page ?? 10;
    return await this.prisma.construction.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        client_id: query.client_id,
        employee_id: query.employee_id,
        group_id: query.group_id,
        type: query.type,
        status: query.status,
        categories: query.category_id && {
          some: {
            id: query.category_id,
          },
        },
      },
      include: {
        client: true,
        categories: true,
        Employee: true,
        Group: {
          include: {
            employees: {
              include: {
                Employee: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.construction.findMany({
      where: { id },
      include: {
        client: true,
        categories: true,
        Employee: true,
        Group: {
          include: {
            employees: {
              include: {
                Employee: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateConstructionDto: UpdateConstructionDto) {
    return `This action updates a #${id} construction`;
  }

  async remove(id: number) {
    return this.prisma.construction.delete({
      where: { id },
    });
  }
}
