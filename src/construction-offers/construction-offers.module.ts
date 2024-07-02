import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionOffersController } from './construction-offers.controller';
import { ConstructionOffersService } from './construction-offers.service';

@Module({
  controllers: [ConstructionOffersController],
  providers: [ConstructionOffersService, PrismaService],
})
export class ConstructionOffersModule {}
