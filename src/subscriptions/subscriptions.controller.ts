import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/orders/guards/token.guard';
import { User } from 'src/users/decorators/user.decorator';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
@UseGuards(TokenGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @User() user: number,
  ) {
    return this.subscriptionsService.create(createSubscriptionDto, user);
  }

  @Get('/packs')
  getPacks() {
    return this.subscriptionsService.getPacks();
  }

  @Get()
  findAll(@User() user: number) {
    return this.subscriptionsService.findAll(user);
  }

  @Get('/current')
  getCurrent(@User() user: number) {
    return this.subscriptionsService.getCurrent(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id);
  }

  @Post('cancel/:id')
  cancel(@Param('id', ParseIntPipe) id: number, @User() user: number) {
    return this.subscriptionsService.cancel(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: number) {
    return this.subscriptionsService.remove(id, user);
  }
}
