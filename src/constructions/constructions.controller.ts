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
import { ConstructionsService } from './constructions.service';
import { ConstructionQuery } from './dto/constructions-query.dto';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';

@Controller('constructions')
@UseGuards(TokenGuard)
export class ConstructionsController {
  constructor(private readonly constructionsService: ConstructionsService) {}

  @Post()
  create(@Body() createConstructionDto: CreateConstructionDto) {
    return this.constructionsService.create(createConstructionDto);
  }

  @Get()
  findAll(@Query() query: ConstructionQuery) {
    return this.constructionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.constructionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConstructionDto: UpdateConstructionDto,
  ) {
    return this.constructionsService.update(id, updateConstructionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.constructionsService.remove(id);
  }
}
