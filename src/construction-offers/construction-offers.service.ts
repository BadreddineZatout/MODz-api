import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionOfferQuery } from './dto/construction-offer-query.dto';
import { CreateConstructionOfferDto } from './dto/create-construction-offer.dto';
import { UpdateConstructionOfferDto } from './dto/update-construction-offer.dto';

@Injectable()
export class ConstructionOffersService {
  constructor(private prisma: PrismaService) {}
  async create(createConstructionOfferDto: CreateConstructionOfferDto) {
    return await this.prisma.constructionOffer.create({
      data: {
        employee_id: createConstructionOfferDto.employee_id,
        construction_id: createConstructionOfferDto.construction_id,
        can_travel: createConstructionOfferDto.can_travel,
        price: createConstructionOfferDto.price,
        categories: {
          connect: createConstructionOfferDto.categories,
        },
      },
      include: {
        employee: true,
        construction: true,
        categories: true,
      },
    });
  }

  async findAll(query: ConstructionOfferQuery) {
    const take = query.per_page ?? 10;

    const offers = await this.prisma.constructionOffer.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        employee_id: query.employee_id,
        construction_id: query.construction_id,
        status: query.status,
        can_travel: query.can_travel,
      },
      include: {
        construction: {
          include: {
            categories: true,
            client: true,
            items: {
              include: {
                item: true,
              },
            },
          },
        },
        employee: {
          include: {
            categories: true,
            state: true,
            province: true,
            media: true,
          },
        },
      },
    });

    return offers.map((offer) => {
      return {
        ...offer,
        construction: {
          ...offer.construction,
          items: offer.construction.items.map((item) => {
            return {
              ...item.item,
              quantity: item.quantity,
            };
          }),
        },
      };
    });
  }

  async findOne(id: number) {
    const offer = await this.prisma.constructionOffer.findFirst({
      where: { id },
      include: {
        construction: {
          include: {
            categories: true,
            client: true,
            items: {
              include: {
                item: true,
              },
            },
          },
        },
        employee: {
          include: {
            categories: true,
            state: true,
            province: true,
            media: true,
          },
        },
      },
    });

    if (!offer) return {};

    return {
      ...offer,
      construction: {
        ...offer.construction,
        items: offer.construction.items.map((item) => {
          return {
            ...item.item,
            quantity: item.quantity,
          };
        }),
      },
    };
  }

  async update(
    id: number,
    updateConstructionOfferDto: UpdateConstructionOfferDto,
    owner: number,
  ) {
    const offer = await this.prisma.constructionOffer.findFirst({
      where: {
        id,
        employee_id: owner,
      },
    });
    if (!offer || !owner)
      throw new HttpException(
        {
          message: "You can't update an offer you don't own",
        },
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.constructionOffer.update({
      where: { id },
      data: updateConstructionOfferDto,
      include: {
        employee: true,
        construction: true,
        categories: true,
      },
    });
  }

  async remove(id: number, owner: number) {
    const offer = await this.prisma.constructionOffer.findFirst({
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
    await this.prisma.constructionOffer.delete({
      where: { id: id },
    });
    return { message: 'Offer deleted' };
  }
}
