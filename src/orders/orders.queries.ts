import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopifyOrderResponse } from 'src/types';

class OrderQueries {
  static saveOrder(prisma: PrismaService, order: ShopifyOrderResponse) {
    return prisma.order.upsert({
      where: {
        orderId: order.id.toString(),
      },
      create: {
        orderId: order.id.toString(),
        metaData: order as unknown as Prisma.JsonObject,
      },
      update: {
        metaData: order as unknown as Prisma.JsonObject,
      },
    });
  }

  static updateOrder(prisma: PrismaService, order: Prisma.OrderUpdateInput) {
    return prisma.order.update({
      data: order,
      where: {
        orderId: order.orderId?.toString(),
      },
    });
  }
}

export default OrderQueries;
