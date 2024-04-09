import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { EmployeeExistsConstraint } from './validators/employee-exists.validator';
import { OrderExistsConstraint } from './validators/order-exists.validator';

@Module({
  controllers: [OffersController],
  providers: [
    OffersService,
    PrismaService,
    OrderExistsConstraint,
    EmployeeExistsConstraint,
  ],
})
export class OffersModule {}
