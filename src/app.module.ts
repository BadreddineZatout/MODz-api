import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: 'public', // Adjust the path as needed
      serveRoot: '/public', // The URL path from which to serve the files
    }),
    CategoriesModule,
    StatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
