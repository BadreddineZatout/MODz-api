import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRatingDto } from './Dtos/create-rating.dto';
import { RatingQueryDto } from './Dtos/rating-query.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto) {
    return await this.prisma.rating.create({
      data: createRatingDto,
      include: {
        client: true,
        employee: true,
      },
    });
  }

  async findAll(query: RatingQueryDto) {
    const page = query.page ?? 1;
    const per_page = query.per_page ?? 5;
    return await this.prisma.rating.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
      where: {
        client_id: query.client_id,
        employee_id: query.employee_id,
      },
      include: {
        client: true,
        employee: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.rating.findFirst({
      where: { id },
      include: {
        client: true,
        employee: true,
      },
    });
  }
}
