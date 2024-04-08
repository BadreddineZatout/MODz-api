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
import { OrderExists } from './decorators/order-exists.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQuery } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderGuard } from './guards/order.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(OrderGuard)
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrder(id);
  }

  @Put(':id')
  update(@OrderExists() id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@OrderExists() id: number) {
    return this.ordersService.remove(id);
  }
}
