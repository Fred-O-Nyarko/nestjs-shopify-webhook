/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import OrderQueries from './orders.queries';
import { LineItem, ShopifyOrderResponse } from 'src/types';
import Constants from 'src/constants';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async onOrderReceived(data: ShopifyOrderResponse) {
    const order = await OrderQueries.saveOrder(this.prisma, data);

    const product = this.getSpecificProduct(data.line_items);
    console.log('product', product?.product_id);
    if (!!product) await this.notifyCustomer(data, Constants.SPECIFIC_EMAIL);

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
      console.log('No specific product found', data.id);
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

  async notifyCustomer(order: ShopifyOrderResponse, email: string) {
    console.log(`Notifying customer ${email} ${order.id}`);
    if (!email) return;
    await this.mailer
      .sendMail({
        to: [email],
        subject: 'Order fulfilled!',
        text: 'Hey there your order is finally fulfilled',
        html: '<h1>Hey there your order is finally fulfilled</h1>',
      })
      .then((msg) => console.log('Email sent successfully =>', msg))
      .catch((err) => console.log('Error sending email =>', err));
  }
}
