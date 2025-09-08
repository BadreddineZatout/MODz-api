import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemQuery } from './dto/problems-query.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}
  async create(createProblemDto: CreateProblemDto) {
    if (!createProblemDto.client_id && !createProblemDto.employee_id) {
      throw new HttpException(
        {
          message: 'Client or employee id is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!createProblemDto.order_id && !createProblemDto.construction_id) {
      throw new HttpException(
        {
          message: 'You should choose an order or a construction job',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.problem.create({
      data: createProblemDto,
      include: {
        client: true,
        employee: true,
        order: true,
        construction: true,
      },
    });
  }

  async findAll(query: ProblemQuery) {
    const take = query.per_page ?? 10;
    return await this.prisma.problem.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        client_id: query.client_id,
        employee_id: query.employee_id,
        is_treated: query.is_treated,
      },
      include: {
        client: true,
        employee: true,
        order: true,
        construction: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.problem.findMany({
      where: { id },
      include: {
        client: true,
        employee: true,
        order: true,
        construction: true,
      },
    });
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    return await this.prisma.problem.update({
      where: { id },
      data: updateProblemDto,
      include: {
        client: true,
        employee: true,
        order: true,
        construction: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.problem.delete({
      where: { id },
    });
  }
}
