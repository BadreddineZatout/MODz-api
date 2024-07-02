import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/orders/guards/token.guard';
import { Owner } from 'src/users/decorators/owner.decorator';
import { ConstructionOffersService } from './construction-offers.service';
import { ConstructionOfferQuery } from './dto/construction-offer-query.dto';
import { CreateConstructionOfferDto } from './dto/create-construction-offer.dto';
import { UpdateConstructionOfferDto } from './dto/update-construction-offer.dto';

@Controller('construction-offers')
@UseGuards(TokenGuard)
export class ConstructionOffersController {
  constructor(
    private readonly constructionOffersService: ConstructionOffersService,
  ) {}

  @Post()
  create(@Body() createConstructionOfferDto: CreateConstructionOfferDto) {
    return this.constructionOffersService.create(createConstructionOfferDto);
  }

  @Get()
  findAll(@Query() query: ConstructionOfferQuery) {
    return this.constructionOffersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.constructionOffersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConstructionOfferDto: UpdateConstructionOfferDto,
    @Owner() owner: number,
  ) {
    return this.constructionOffersService.update(
      id,
      updateConstructionOfferDto,
      owner,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Owner() owner: number) {
    return this.constructionOffersService.remove(id, owner);
  }
}
