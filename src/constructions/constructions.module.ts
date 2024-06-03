import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConstructionsController } from './constructions.controller';
import { ConstructionsService } from './constructions.service';
import { ConstructionExistsConstraint } from './validators/construction-exists.validator';

@Module({
  controllers: [ConstructionsController],
  providers: [
    ConstructionsService,
    PrismaService,
    ConstructionExistsConstraint,
  ],
})
export class ConstructionsModule {}
