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
import { OrderExists } from './decorators/order-exists.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQuery } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TokenGuard } from './guards/token.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(TokenGuard)
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

  @Delete(':id')
  remove(@OrderExists() id: number, @Owner() owner: number) {
    return this.ordersService.remove(id, owner);
  }
}
