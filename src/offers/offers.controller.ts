import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/orders/guards/token.guard';
import { OfferExists } from './decorators/offer-exists.decorator';
import { CreateOfferDto } from './dto/create-offer.dto';
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
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@OfferExists() id: number) {
    return this.offersService.findOne(id);
  }

  @Put(':id')
  update(@OfferExists() id: number, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  remove(@OfferExists() id: number) {
    return this.offersService.remove(id);
  }
}
