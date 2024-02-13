import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { Category } from './categories.entity';
import { OrderProduct } from './order_products.entity';

const numberTransformer: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string) => parseFloat(databaseValue),
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'short_description', type: 'text', nullable: false })
  shortDescription: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    name: 'product_prices',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: numberTransformer,
  })
  productPrice: number;

  @Column({ name: 'product_quantity', nullable: false })
  productQuantity: number;

  @ManyToOne(() => Category, (categories) => categories.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    cascade: true,
  })
  orderProduct: OrderProduct[];
}
