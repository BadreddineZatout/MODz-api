import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { LoginDTO } from './Dtos/login.dto';
import {
  CreateClientProfileDto,
  CreateEmployeeProfileDto,
  CreateProfileDto,
  UpdateClientProfileDto,
  UpdateEmployeeProfileDto,
} from './Dtos/profile.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getStorageConfig } from 'src/utils/storage';

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

  @Post('/create-profile')
  @UseGuards(AuthGuard)
  createProfile(
    @Body()
    data: CreateProfileDto,
  ) {
    if (data.current_role === 'CLIENT') {
      return this.usersService.createClientProfile(
        data.user_id,
        data.data as CreateClientProfileDto,
      );
    }
    return this.usersService.createEmployeeProfile(
      data.user_id,
      data.data as CreateEmployeeProfileDto,
    );
  }

  @Put('/:id/update-profile')
  @UseGuards(AuthGuard)
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: UpdateClientProfileDto | UpdateEmployeeProfileDto,
  ) {
    return this.usersService.updateProfile(id, data);
  }

  @Post('/:id/upload-selfie')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: getStorageConfig('public/selfies'),
    }),
  )
  uploadSelfie(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.usersService.saveMedia(id, file, 'SELFIE');
    return `File ${file.originalname} Uploaded Successfully`;
  }

  @Post('/:id/upload-id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: getStorageConfig('public/ids') }),
  )
  uploadId(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.usersService.saveMedia(id, file, 'ID');
    return `File ${file.originalname} Uploaded Successfully`;
  }
}