import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRatingDto } from './Dtos/create-rating.dto';
import { RatingQueryDto } from './Dtos/rating-query.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('/')
  Create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get('/')
  getRatings(@Query() query: RatingQueryDto) {
    return this.ratingsService.findAll(query);
  }

  @Get('/:id')
  getRating(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findOne(id);
  }
}
