import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';

@Module({
  controllers: [StatesController],
  providers: [StatesService, PrismaService],
})
export class StatesModule {}
