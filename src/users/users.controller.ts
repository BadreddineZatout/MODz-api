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
import { AuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageConfig } from 'src/utils/storage';
import { ConfirmEmailGuard } from './guards/confirm-email.guard';
import { ResetPasswordGuard } from './guards/reset-password.guard';

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

  @Put('/update-profile/:id')
  @UseGuards(AuthGuard)
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: UpdateClientProfileDto | UpdateEmployeeProfileDto,
  ) {
    return this.usersService.updateProfile(id, data);
  }

  @Post('/upload-selfie/:id')
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
    return { message: `File ${file.originalname} Uploaded Successfully` };
  }

  @Post('/upload-id/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: getStorageConfig('public/ids') }),
  )
  uploadId(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.usersService.saveMedia(id, file, 'ID');
    return { message: `File ${file.originalname} Uploaded Successfully` };
  }

  @Post('/confirm-email/:id')
  sendConfirmEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { email: string },
  ) {
    return this.usersService.sendConfirmEmail(id, data.email);
  }

  @Post('/verify-email/:id')
  @UseGuards(ConfirmEmailGuard)
  verifyEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { email: string },
  ) {
    return this.usersService.verifyEmail(id, data.email);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() data: { email: string }) {
    return this.usersService.sendResetEmail(data.email);
  }

  @Post('/reset-password')
  @UseGuards(ResetPasswordGuard)
  resetPassword(@Body() data: { email: string; password: string }) {
    return this.usersService.resetPassword(data.email, data.password);
  }
}
