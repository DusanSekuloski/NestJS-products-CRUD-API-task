import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../entities/products.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'category_name', nullable: false })
  categoryName: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

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
}
