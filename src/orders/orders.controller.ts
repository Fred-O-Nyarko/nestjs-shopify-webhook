import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ShopifyOrderResponse } from 'src/types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('create')
  async processOrder(@Body() body: ShopifyOrderResponse) {
    return this.ordersService.onOrderReceived(body);
  }

  @Post('fulfilled')
  async fulfillOrder(@Body() body: ShopifyOrderResponse) {
    return this.ordersService.onOrderFulfilled(body);
  }
}
