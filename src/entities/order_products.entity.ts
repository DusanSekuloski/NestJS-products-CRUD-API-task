import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { Order } from './orders.entity';

@Entity('order_products')
export class OrderProduct {
  constructor(initialData: Partial<OrderProduct> = null) {
    if (initialData !== null) {
      Object.assign(this, initialData);
    }
  }

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_price', type: 'numeric' })
  productPrice: number;

  @Column({ name: 'product_quantity', type: 'numeric' })
  productQuantity: number;

  @ManyToOne(() => Product, (product) => product.orderProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProduct)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'orderId' })
  order: Order;
}
