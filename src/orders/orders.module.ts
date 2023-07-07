import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService],
  imports: [PrismaModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
