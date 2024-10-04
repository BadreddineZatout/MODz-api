import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, PrismaService],
})
export class AdsModule {}
