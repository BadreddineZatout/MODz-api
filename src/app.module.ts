import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: 'public', // Adjust the path as needed
      serveRoot: '/public', // The URL path from which to serve the files
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
