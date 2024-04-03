import { Controller, Get, Query } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProviderQueryDto } from './Dtos/Query.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('/')
  getProviders(@Query() query: ProviderQueryDto) {
    return this.providersService.getProviders(query);
  }
}
