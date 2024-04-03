import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryQueryDto } from './Dtos/Query.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  getCategories(@Query() { urgent }: CategoryQueryDto) {
    return this.categoriesService.getCategories(urgent);
  }
}
