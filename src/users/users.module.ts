import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST, // Your SMTP host
        port: parseInt(process.env.MAIL_PORT), // Your SMTP port
        secure: false, // Set true if you're using SSL/TLS
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"MODZ" <${process.env.MAIL_USER}>`, // Sender email address
      },
      template: {
        dir: 'src/email-templates', // Path to your email templates directory
        adapter: new HandlebarsAdapter(), // You may need to import HandlebarsAdapter from @nestjs-modules/mailer
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, IsEmailUniqueConstraint],
})
export class UsersModule {}
