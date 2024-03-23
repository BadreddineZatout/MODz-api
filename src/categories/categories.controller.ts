import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { getStorageConfig } from 'src/utils/storage';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/save-media/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: getStorageConfig('public/categories'),
    }),
  )
  saveMedia(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesService.saveMedia(id, files);
  }
}
