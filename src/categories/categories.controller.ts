import { Controller, Get, Query } from '@nestjs/common';
import { CategoryQueryDto } from './Dtos/category-query.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  getCategories(@Query() query: CategoryQueryDto) {
    return this.categoriesService.getCategories(query);
  }
}
