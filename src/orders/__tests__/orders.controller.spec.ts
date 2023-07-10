import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { ShopifyOrderResponse } from 'src/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { orderFulfillFixture } from '../fixtures/order.fulfill';
import { orderCreateFixture } from '../fixtures/order.create';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, PrismaService, MailerService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(ordersService).toBeDefined();
  });

  describe('processOrder', () => {
    it('should call the onOrderReceived method of OrdersService', async () => {
      const orderResponse =
        orderCreateFixture as unknown as ShopifyOrderResponse;

      const onOrderReceivedSpy = jest.spyOn(ordersService, 'onOrderReceived');
      await controller.processOrder(orderResponse);

      expect(onOrderReceivedSpy).toHaveBeenCalledWith(orderResponse);
    });
  });

  describe('fulfillOrder', () => {
    it('should call the onOrderFulfilled method of OrdersService', async () => {
      const orderResponse = orderFulfillFixture as ShopifyOrderResponse;

      const onOrderFulfilledSpy = jest.spyOn(ordersService, 'onOrderFulfilled');
      await controller.fulfillOrder(orderResponse);

      expect(onOrderFulfilledSpy).toHaveBeenCalledWith(orderResponse);
    });
  });
});
