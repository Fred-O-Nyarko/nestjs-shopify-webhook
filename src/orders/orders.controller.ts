import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('create')
  async createOrder(@Body() body: any) {
    return this.ordersService.dumpData({
      dump: body,
      orderId: body.id.toString(),
    });
  }
}
