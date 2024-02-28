import { Category } from 'src/entities/categories.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { OrderProduct } from './src/entities/order_products.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [Category, Product, User, Order, OrderProduct],
  synchronize: true,
};

export default config;
