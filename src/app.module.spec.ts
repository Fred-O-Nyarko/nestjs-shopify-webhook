import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { MailerModule } from './mailer/mailer.module';

describe('AppModule', () => {
  let module: TestingModule;
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, OrdersModule, MailerModule],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should resolve the AppController', () => {
    expect(controller).toBeDefined();
  });

  it('should resolve the AppService', () => {
    expect(service).toBeDefined();
  });
});
