import { Body, Controller, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Post('create')
  createOrder(@Body() body: any) {
    console.log(body);
    return 'order created';
  }
}
