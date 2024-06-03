import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionQuery } from './dto/constructions-query.dto';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';

@Injectable()
export class ConstructionsService {
  constructor(private prisma: PrismaService) {}

  async create(createConstructionDto: CreateConstructionDto) {
    return await this.prisma.construction.create({
      data: {
        client_id: createConstructionDto.client_id,
        description: createConstructionDto.description,
        date: new Date(createConstructionDto.date),
        hour: createConstructionDto.hour,
        job_type_id: createConstructionDto.type,
        categories: {
          connect: createConstructionDto.categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async findAll(query: ConstructionQuery) {
    const take = query.per_page ?? 10;
    return await this.prisma.construction.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        client_id: query.client_id,
        job_type_id: query.job_type_id,
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
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.construction.findMany({
      where: { id },
      include: {
        client: true,
        categories: true,
      },
    });
  }

  async update(
    id: number,
    updateConstructionDto: UpdateConstructionDto,
    owner: number,
  ) {
    const construction = await this.prisma.construction.findFirst({
      where: {
        id,
        client_id: owner,
      },
    });
    if (!construction || !owner)
      throw new HttpException(
        {
          message: "You can't update a construction job you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.construction.update({
      where: { id },
      data: {
        description: updateConstructionDto.description,
        date: updateConstructionDto.date
          ? new Date(updateConstructionDto.date)
          : updateConstructionDto.date,
        hour: updateConstructionDto.hour,
        job_type_id: updateConstructionDto.type,
        status: updateConstructionDto.status,
        accepted_at: updateConstructionDto.accepted_at
          ? new Date(updateConstructionDto.accepted_at)
          : updateConstructionDto.accepted_at,
        categories: updateConstructionDto.categories && {
          set: updateConstructionDto.categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async remove(id: number, owner: number) {
    const construction = await this.prisma.construction.findFirst({
      where: {
        id,
        client_id: owner,
      },
    });
    if (!construction || !owner)
      throw new HttpException(
        {
          message: "You can't delete a construction job you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.construction.delete({
      where: { id, client_id: owner },
    });
  }
}
