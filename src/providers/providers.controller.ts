import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProviderQueryDto } from './Dtos/query.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('/')
  getProviders(@Query() query: ProviderQueryDto) {
    return this.providersService.getProviders(query);
  }

  @Get('/:id')
  getProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.getProvider(id);
  }
}
