import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async dumpData(data: Prisma.OrderCreateInput) {
    console.log(data);
    return await this.prisma.order.create({
      data,
    });
  }
}
