import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderProduct } from './order_product.entity';
import { OrderStatus } from 'src/common/enums/orderStatus.enum';

@Entity('orders')
export class Order {
  constructor(intialData: Partial<Order> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount: number;

  @Column({
    name: 'order_status',
    type: 'varchar',
    default: OrderStatus.Created,
  })
  order_status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  order_product: OrderProduct[];
}
