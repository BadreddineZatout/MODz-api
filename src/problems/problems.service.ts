import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemQuery } from './dto/problems-query.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}
  create(createProblemDto: CreateProblemDto) {
    return 'This action adds a new problem';
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

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
