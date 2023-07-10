import { LineItem } from './types';

const Constants = {
  SPECIFIC_ORDER_ID: 'specific_order_id',
  SPECIFIC_EMAIL: process.env.TEST_EMAIL || 'nernuer@gmail.com',
  SPECIFIC_PRODUCT: {
    id: 13987619176767,
    product_id: 8521487941951,
    name: 'The Collection Snowboard: Liquid',
  } as Pick<LineItem, 'id' | 'name' | 'product_id'>,
};
export default Constants;
