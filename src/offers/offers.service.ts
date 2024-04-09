import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  create(createOfferDto: CreateOfferDto) {
    return this.prisma.offer.create({
      data: createOfferDto,
      include: {
        order: true,
      },
    });
  }

  findAll() {
    return `This action returns all offers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.prisma.offer.update({
      where: { id },
      data: updateOfferDto,
      include: {
        order: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
