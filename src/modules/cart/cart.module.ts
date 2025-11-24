import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserSchemaModule } from '@Sahred/Modules';
import { Cart, CartRepository, CartSchema } from '@Models/Cart';
import { ProductModule } from '@modules/product';
import { CartFactory } from './factory';


@Module(
{
  imports: [UserSchemaModule,MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}]),ProductModule],
  controllers: [CartController],
  providers: [CartService,CartRepository,CartFactory],
  exports: [CartRepository], 
})
export class CartModule {}