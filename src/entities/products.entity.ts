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
import { Categories } from './categories.entity';
import { OrderProduct } from './order_product.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  short_description: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  product_price: number;

  @Column({ nullable: false })
  product_quantity: number;

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @Column({ name: 'category_id' })
  category_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    cascade: true,
  })
  order_product: OrderProduct[];
}
