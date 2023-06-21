import { Module, forwardRef } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "../auth/auth.module";
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.model';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category]),
    forwardRef(() => AuthModule),
],
  exports: [
    CategoriesService,
  ]
})
export class CategoriesModule {}

