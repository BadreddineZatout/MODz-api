import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { LoginDTO } from './Dtos/login.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.usersService.login(data);
  }
}
