import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [PrismaModule, OrdersModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
