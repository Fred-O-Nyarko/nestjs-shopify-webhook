import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import OrderQueries from './orders.queries';
import { LineItem, ShopifyOrderResponse } from 'src/types';
import Constants from 'src/constants';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async onOrderReceived(data: ShopifyOrderResponse) {
    const order = await OrderQueries.saveOrder(this.prisma, data);

    const emails = new Set([
      data.email,
      data.customer?.email,
      Constants.SPECIFIC_EMAIL,
    ]);

    const product = this.getSpecificProduct(data.line_items);
    if (!!product) await this.notifyCustomer(data, emails);

    return order;
  }

  async onOrderFulfilled(data: ShopifyOrderResponse) {
    const fulfilledLineItems = data.fulfillments.reduce(
      (acc: LineItem[], fulfillment) => {
        return [...acc, ...fulfillment.line_items];
      },
      [],
    );
    const product = this.getSpecificProduct(fulfilledLineItems);

    if (!product) {
      console.log('No specific product found');
      return;
    }

    await OrderQueries.updateOrder(this.prisma, data);
  }

  private getSpecificProduct(orderedItems: LineItem[]) {
    return orderedItems.find(
      (item) =>
        item.product_id === Constants.SPECIFIC_PRODUCT.product_id ||
        item.name === Constants.SPECIFIC_PRODUCT.name,
    );
  }

  async notifyCustomer(order: ShopifyOrderResponse, emails: Set<string>) {
    console.log(`Notifying customer ${emails} ${order.id}`);
  }
}
