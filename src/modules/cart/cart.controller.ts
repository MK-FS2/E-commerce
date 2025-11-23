import { Controller, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { Roles } from '@Sahred/Decorators';

@Roles(["Customer"])
@UseGuards(AuthGuard,RoleGuard)
@Controller('cart')
export class CartController 
{
  constructor(private readonly cartService: CartService) {}

 async AddTocart()
 {
  
 }


}
