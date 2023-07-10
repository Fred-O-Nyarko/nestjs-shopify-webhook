import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { OrdersService } from './orders.service';
import OrderQueries from './orders.queries';
import { orderCreateFixture } from './fixtures/order.create';
import { orderFulfillFixture } from './fixtures/order.fulfill';
import { ShopifyOrderResponse } from 'src/types';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, PrismaService, MailerService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onOrderReceived', () => {
    it('should save the order, notify customer if specific product exists, and return the order', async () => {
      const mockData = orderCreateFixture as unknown as ShopifyOrderResponse;

      jest.spyOn(OrderQueries, 'saveOrder').mockResolvedValueOnce({} as any);
      jest.spyOn(service, 'notifyCustomer').mockResolvedValueOnce();

      const result = await service.onOrderReceived(mockData);

      expect(OrderQueries.saveOrder).toHaveBeenCalledWith(
        prismaService,
        mockData,
      );
      expect(service.notifyCustomer).toHaveBeenCalledWith(
        mockData,
        expect.any(String),
      );
      expect(result).toEqual({});
    });

    it('should save the order and return the order if specific product does not exist', async () => {
      const mockData = {
        ...orderCreateFixture,
        line_items: [
          {
            ...orderCreateFixture.line_items[0],
            product_id: 123,
            name: 'Not a specific product',
          },
        ],
      } as Omit<ShopifyOrderResponse, 'fulfillment_status'>;

      jest.spyOn(OrderQueries, 'saveOrder').mockResolvedValueOnce({} as any);
      jest.spyOn(service, 'notifyCustomer').mockResolvedValueOnce({} as any);

      const result = await service.onOrderReceived(
        mockData as ShopifyOrderResponse,
      );

      expect(OrderQueries.saveOrder).toHaveBeenCalledWith(
        prismaService,
        mockData,
      );
      expect(service.notifyCustomer).not.toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('onOrderFulfilled', () => {
    it('should update the order if a specific product exists', async () => {
      const mockData = {
        ...orderFulfillFixture,
      } as Omit<ShopifyOrderResponse, 'fulfillment_status'>;

      jest.spyOn(OrderQueries, 'updateOrder').mockResolvedValueOnce({} as any);

      await service.onOrderFulfilled(mockData as ShopifyOrderResponse);

      expect(OrderQueries.updateOrder).toHaveBeenCalledWith(
        prismaService,
        mockData,
      );
    });

    it('should not update the order if a specific product does not exist', async () => {
      const mockData = orderCreateFixture as unknown as ShopifyOrderResponse;

      jest.spyOn(OrderQueries, 'updateOrder');

      await service.onOrderFulfilled(mockData);

      expect(OrderQueries.updateOrder).not.toHaveBeenCalled();
    });
  });

  describe('notifyCustomer', () => {
    it('should send an email to the customer', async () => {
      const mockOrder = orderCreateFixture as unknown as ShopifyOrderResponse;

      jest.spyOn(mailerService, 'sendMail').mockResolvedValueOnce({} as any);

      await service.notifyCustomer(mockOrder, 'test@example.com');

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: ['test@example.com'],
        subject: 'Order fulfilled!',
        text: 'Hey there your order is finally fulfilled',
        html: '<h1>Hey there your order is finally fulfilled</h1>',
      });
    });

    it('should not send an email to the customer if the customer email is not provided', async () => {
      const mockOrder = orderCreateFixture as unknown as ShopifyOrderResponse;
      jest.spyOn(mailerService, 'sendMail');

      await service.notifyCustomer(mockOrder, '');

      expect(mailerService.sendMail).not.toHaveBeenCalled();
    });
  });
});
