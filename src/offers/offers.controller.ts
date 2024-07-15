import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/orders/guards/token.guard';
import { Owner } from 'src/users/decorators/owner.decorator';
import { OfferExists } from './decorators/offer-exists.decorator';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferQuery } from './dto/offer-query.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(TokenGuard)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll(@Query() query: OfferQuery) {
    return this.offersService.findAll(query);
  }

  @Get(':id')
  findOne(@OfferExists() id: number) {
    return this.offersService.findOne(id);
  }

  @Put(':id')
  update(
    @OfferExists() id: number,
    @Body() updateOfferDto: UpdateOfferDto,
    @Owner() owner: number,
  ) {
    return this.offersService.update(id, updateOfferDto, owner);
  }

  @Patch('/accept/:id')
  accept(@OfferExists() id: number, @Owner() owner: number) {
    return this.offersService.accept(id, owner);
  }

  @Patch('/refuse/:id')
  refuse(@OfferExists() id: number, @Owner() owner: number) {
    return this.offersService.refuse(id, owner);
  }

  @Delete(':id')
  remove(@OfferExists() id: number, @Owner() owner: number) {
    return this.offersService.remove(id, owner);
  }
}
