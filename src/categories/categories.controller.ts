import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryQueryDto } from './Dtos/category-query.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  getCategories(@Query() query: CategoryQueryDto) {
    return this.categoriesService.getCategories(query);
  }
}
