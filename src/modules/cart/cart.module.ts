import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserSchemaModule } from '@Sahred/Modules';
import { Cart, CartRepository, CartSchema } from '@Models/Cart';


@Module(
{
  imports: [UserSchemaModule,MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}])],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartRepository], 
})
export class CartModule {}