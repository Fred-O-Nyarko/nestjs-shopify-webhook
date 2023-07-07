import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersService } from './orders.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  providers: [OrdersService],
  imports: [PrismaModule, MailerModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
