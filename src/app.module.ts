import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { ConstructionOffersModule } from './construction-offers/construction-offers.module';
import { ConstructionsModule } from './constructions/constructions.module';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';
import { ProblemsModule } from './problems/problems.module';
import { ProvidersModule } from './providers/providers.module';
import { StatesModule } from './states/states.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: 'public', // Adjust the path as needed
      serveRoot: '/public', // The URL path from which to serve the files
    }),
    CategoriesModule,
    StatesModule,
    ProvidersModule,
    OrdersModule,
    OffersModule,
    ConstructionsModule,
    ProblemsModule,
    ConstructionOffersModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
