import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Products } from './products.entity';
import { Order } from './orders.entity';

@Entity()
export class OrderProduct {
  constructor(intialData: Partial<OrderProduct> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }

  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @ManyToOne(() => Products, (product) => product.order_product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Products;

  @ManyToOne(() => Order, (order) => order.order_product)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
  order: Order;
}
