/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import OrderQueries from './orders.queries';
import { LineItem, ShopifyOrderResponse } from 'src/types';
import Constants from 'src/constants';
import { MailerService } from 'src/mailer/mailer.service';
import { MailgunMessageData } from 'mailgun.js';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async onOrderReceived(data: ShopifyOrderResponse) {
    const order = await OrderQueries.saveOrder(this.prisma, data);

    const product = this.getSpecificProduct(data.line_items);

    if (!!product)
      await this.notifyCustomer(data, {
        to: Constants.SPECIFIC_EMAIL,
        subject: 'Order Received',
        text: `Order ${data.id} received`,
        html: `<div>
      <p>Order ${data.id} received</p>
      <p>Product: ${product.name}</p>
      <p>Quantity: ${product.quantity}</p>
      <p>Price: ${product.price}</p>
      </div>`,
      });

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

  async notifyCustomer(
    order: ShopifyOrderResponse,
    options: MailgunMessageData,
  ) {
    console.log(`Notifying customer ${options.to} ${order.id}`);
    if (!options.to) return;
    await this.mailer
      .sendMail({
        ...options,
      })
      .then((msg) => console.log('Email sent successfully =>', msg))
      .catch((err) => console.log('Error sending email =>', err));
  }
}
