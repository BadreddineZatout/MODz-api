import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Owner } from 'src/users/decorators/owner.decorator';
import { BanGuard } from 'src/users/guards/ban.guard';
import { OrderExists } from './decorators/order-exists.decorator';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQuery } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TokenGuard } from './guards/token.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(TokenGuard, BanGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: OrderQuery) {
    return this.ordersService.findAll(query);
  }

  @Get('/cancel-reasons/employee')
  getCancelReasonsForEmployee() {
    return this.ordersService.getCancelReasons(1);
  }

  @Get('/cancel-reasons/client')
  getCancelReasonsForClient() {
    return this.ordersService.getCancelReasons(0);
  }

  @Get(':id')
  findOne(@OrderExists() id: number) {
    return this.ordersService.getOrder(id);
  }

  @Put(':id')
  update(
    @OrderExists() id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Owner() owner: number,
  ) {
    return this.ordersService.update(id, updateOrderDto, owner);
  }

  @Post('/start/:id')
  start(@OrderExists() id: number) {
    return this.ordersService.start(id);
  }

  @Post('/cancel/:id')
  cancel(
    @OrderExists() id: number,
    @Body() cancelOrderDto: CancelOrderDto,
    @Owner() owner: number,
  ) {
    return this.ordersService.cancel(id, cancelOrderDto, owner);
  }

  @Delete(':id')
  remove(@OrderExists() id: number, @Owner() owner: number) {
    return this.ordersService.remove(id, owner);
  }

  @Post('/finish/:id')
  finish(@OrderExists() id: number, @Owner() owner: number) {
    return this.ordersService.finish(id, owner);
  }

  @Post('/validate/:id')
  validate(
    @OrderExists() id: number,
    @Body() { code }: { code: number },
    @Owner() owner: number,
  ) {
    return this.ordersService.validate(id, owner, code);
  }
}
