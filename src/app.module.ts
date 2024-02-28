import { Module } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../src/user/user.module';
import { ProductModule } from '../src/product/product.module';
import { CategoryModule } from '../src/category/category.module';
import { AuthModule } from '../src/auth/auth.module';
import { OrderModule } from '../src/order/order.module';
import config from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
