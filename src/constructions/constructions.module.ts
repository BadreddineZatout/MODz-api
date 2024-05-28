import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionsController } from './constructions.controller';
import { ConstructionsService } from './constructions.service';

@Module({
  controllers: [ConstructionsController],
  providers: [ConstructionsService, PrismaService],
})
export class ConstructionsModule {}
