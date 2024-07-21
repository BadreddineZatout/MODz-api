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
    @Owner() owner: number,
  ) {
    return this.constructionsService.update(id, updateConstructionDto, owner);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Owner() owner: number) {
    return this.constructionsService.remove(id, owner);
  }

  @Post('/start/:id')
  start(@Param('id', ParseIntPipe) id: number, @Owner() owner: number) {
    return this.constructionsService.start(id, owner);
  }

  @Post('/finish/:id')
  finish(@Param('id', ParseIntPipe) id: number, @Owner() owner: number) {
    return this.constructionsService.finish(id, owner);
  }
}
