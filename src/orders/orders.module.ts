import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CategoryExistsConstraint } from './validators/category-exists.validator';
import { ClientExistsConstraint } from './validators/client-exists.validator';
import { JobTypeExistsConstraint } from './validators/job-type-exists.validator';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    ClientExistsConstraint,
    CategoryExistsConstraint,
    JobTypeExistsConstraint,
  ],
})
export class OrdersModule {}
