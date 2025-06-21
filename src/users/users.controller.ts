import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { getStorageConfig } from 'src/utils/storage';
import { LoginDTO, RegisterDTO } from './Dtos/auth.dto';
import {
  CreateClientProfileDto,
  CreateEmployeeProfileDto,
  CreateProfileDto,
  UpdateClientProfileDto,
  UpdateEmployeeProfileDto,
} from './Dtos/profile.dto';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmEmailGuard } from './guards/confirm-email.guard';
import { ResetPasswordGuard } from './guards/reset-password.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() data: RegisterDTO) {
    return this.usersService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.usersService.login(data);
  }

  @Get('users/:id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post('/users/create-profile')
  @UseGuards(AuthGuard)
  createProfile(
    @Body()
    data: CreateProfileDto,
  ) {
    if (data.current_role === 'CLIENT') {
      this.usersService.updateRole(data.user_id, 'CLIENT');
      return this.usersService.createClientProfile(
        data.user_id,
        data.data as CreateClientProfileDto,
      );
    }
    this.usersService.updateRole(data.user_id, 'EMPLOYEE');
    return this.usersService.createEmployeeProfile(
      data.user_id,
      data.data as CreateEmployeeProfileDto,
    );
  }

  @Patch('/users/update-email/:id')
  @UseGuards(AuthGuard)
  updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: { email: string },
  ) {
    return this.usersService.updateEmail(id, data.email);
  }

  @Patch('/users/update-password/:id')
  @UseGuards(AuthGuard)
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: { password: string; password_confirmation: string },
  ) {
    if (data.password !== data.password_confirmation) {
      throw new HttpException(
        {
          message: ['Password Mismatch'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.updatePassword(id, data.password);
  }

  @Put('/users/update-profile/:id')
  @UseGuards(AuthGuard)
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: UpdateClientProfileDto | UpdateEmployeeProfileDto,
  ) {
    return this.usersService.updateProfile(id, data);
  }

  @Post('/users/upload-selfie/:id')
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
    return this.usersService.saveMedia(id, [file], 'SELFIE');
  }

  @Post('/users/upload-id/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 2, { storage: getStorageConfig('public/ids') }),
  )
  uploadId(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.saveMedia(id, files, 'ID');
  }

  @Delete('/users/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Post('/users/confirm-email/:id')
  sendConfirmEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { email: string },
  ) {
    return this.usersService.sendConfirmEmail(id, data.email);
  }

  @Post('/users/verify-email/:id')
  @UseGuards(ConfirmEmailGuard)
  verifyEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { email: string },
  ) {
    return this.usersService.verifyEmail(id, data.email);
  }

  @Post('/users/forgot-password')
  forgotPassword(@Body() data: { email: string }) {
    return this.usersService.sendResetEmail(data.email);
  }

  @Post('/users/reset-password')
  @UseGuards(ResetPasswordGuard)
  resetPassword(
    @Body()
    data: {
      email: string;
      password: string;
      password_confirmation: string;
    },
  ) {
    if (data.password !== data.password_confirmation) {
      throw new HttpException(
        {
          message: ['Password Mismatch'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.resetPassword(data.email, data.password);
  }
}
