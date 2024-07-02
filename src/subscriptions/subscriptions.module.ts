import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { PackExistsConstraint } from './validators/pack-exists.validator';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService, PackExistsConstraint],
})
export class SubscriptionsModule {}
