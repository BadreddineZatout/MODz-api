import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { ConstructionsModule } from './constructions/constructions.module';
import { GroupsModule } from './groups/groups.module';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';
import { ProvidersModule } from './providers/providers.module';
import { StatesModule } from './states/states.module';
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
    GroupsModule,
    ConstructionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
