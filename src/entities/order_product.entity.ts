import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Products } from './products.entity';
import { Order } from './orders.entity';

@Entity()
export class OrderProduct {
  constructor(initialData: Partial<OrderProduct> = null) {
    if (initialData !== null) {
      Object.assign(this, initialData);
    }
  }

  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column({ name: 'product_price', type: 'numeric' })
  product_price: number;

  @Column({ type: 'numeric' })
  product_quantity: number;

  @ManyToOne(() => Products, (product) => product.order_product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Products;

  @ManyToOne(() => Order, (order) => order.order_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
  order: Order;
}
