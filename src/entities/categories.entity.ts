import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ nullable: false })
  category_name: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
