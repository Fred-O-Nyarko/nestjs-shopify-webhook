import { Test, TestingModule } from '@nestjs/testing';
import { OrdersModule } from '../orders.module';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';

describe('OrdersModule', () => {
  let module: TestingModule;
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OrdersModule, PrismaModule, MailerModule],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should resolve the OrdersController', () => {
    expect(controller).toBeDefined();
  });

  it('should resolve the OrdersService', () => {
    expect(service).toBeDefined();
  });
});
