import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { calculateDistance } from 'src/utils/distance';
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
        construction_type: createConstructionDto.construction_type,
        description: createConstructionDto.description,
        date: new Date(createConstructionDto.date),
        hour: createConstructionDto.hour,
        latitude: createConstructionDto.latitude,
        longitude: createConstructionDto.longitude,
        categories: {
          connect: createConstructionDto.categories,
        },
        items: {
          create: createConstructionDto.items,
        },
      },
      include: {
        client: true,
        categories: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findAll(query: ConstructionQuery) {
    const take = query.per_page ?? 10;
    const constructions = await this.prisma.construction.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        client_id: query.client_id,
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
        employees: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (query.latitude && query.longitude) {
      return constructions.filter((construction) => {
        const distance = calculateDistance(
          query.latitude,
          query.longitude,
          construction.latitude,
          construction.longitude,
        );
        return distance <= (query.radius ?? 50);
      });
    }

    return constructions;
  }

  async findOne(id: number) {
    return await this.prisma.construction.findMany({
      where: { id },
      include: {
        client: true,
        categories: true,
        employees: true,
        items: {
          include: {
            item: true,
          },
        },
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
    if (updateConstructionDto.items) {
      await this.prisma.construction.update({
        where: { id },
        data: {
          items: {
            deleteMany: {},
            create: updateConstructionDto.items,
          },
        },
      });
    }
    return await this.prisma.construction.update({
      where: { id },
      data: {
        construction_type: updateConstructionDto.construction_type,
        description: updateConstructionDto.description,
        date: updateConstructionDto.date
          ? new Date(updateConstructionDto.date)
          : updateConstructionDto.date,
        hour: updateConstructionDto.hour,
        status: updateConstructionDto.status,
        accepted_at: updateConstructionDto.accepted_at
          ? new Date(updateConstructionDto.accepted_at)
          : updateConstructionDto.accepted_at,
        categories: updateConstructionDto.categories && {
          set: updateConstructionDto.categories,
        },
        latitude: updateConstructionDto.latitude,
        longitude: updateConstructionDto.longitude,
      },
      include: {
        client: true,
        categories: true,
        employees: true,
        items: {
          include: {
            item: true,
          },
        },
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

  async start(id: number, owner: number) {
    const construction = await this.prisma.construction.findFirst({
      where: {
        id,
        client_id: owner,
      },
    });
    if (!construction || !owner)
      throw new HttpException(
        {
          message: "You can't start a construction job you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.construction.update({
      where: { id },
      data: {
        status: 'PROCESSING',
      },
      include: {
        client: true,
        categories: true,
        employees: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async finish(id: number, owner: number) {
    const construction = await this.prisma.construction.findFirst({
      where: {
        id,
        client_id: owner,
      },
    });
    if (!construction || !owner)
      throw new HttpException(
        {
          message: "You can't finish a construction job you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.construction.update({
      where: { id },
      data: {
        status: 'DONE',
      },
      include: {
        client: true,
        categories: true,
        employees: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }
}
