import { Module } from '@nestjs/common';
import { CategoryController } from '../category/category.controller';
import { CategoryService } from '../category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
