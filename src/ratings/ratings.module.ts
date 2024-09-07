import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, PrismaService],
})
export class RatingsModule {}
