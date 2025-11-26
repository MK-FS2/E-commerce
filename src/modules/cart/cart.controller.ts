import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { Roles, UserData } from '@Sahred/Decorators';
import { AddTocartDTO } from './dto/Addtocart.dto';
import { Types } from 'mongoose';
import { ValidMongoID } from '@Sahred/Pipes';

@Roles(["Customer"])
@UseGuards(AuthGuard,RoleGuard)
@Controller('cart')
export class CartController 
{
  constructor(private readonly cartService: CartService) {}

@Post("addproduct/:ProductID/:VariantID")
 async AddTocart(@Body() addTocartDTO:AddTocartDTO,@UserData("_id") UserID:Types.ObjectId,@Param("ProductID",ValidMongoID)ProductID:Types.ObjectId,@Param("VariantID",ValidMongoID) VariantID:Types.ObjectId)
 {
  const Result = await this.cartService.AddTocart(addTocartDTO,UserID,ProductID,VariantID)
  if(Result==true)
  return{message: "Cart updated successfully", status: 200}
 }

@Put("reduceiteam/:ProductID/:VariantID")
async Reduceiteam(@UserData("_id")UserID:Types.ObjectId,@Param("ProductID",ValidMongoID)ProductID:Types.ObjectId,@Param("VariantID",ValidMongoID)VariantID:Types.ObjectId)
{
const Result = await this.cartService.Reducefromcart(UserID,ProductID,VariantID)
if(Result == true)
return{message: "Cart updated successfully", status: 200}
}

@Delete("removeiteam/:ProductID/:VariantID")
async RemoveIteam(@UserData("_id")UserID:Types.ObjectId,@Param("ProductID",ValidMongoID)ProductID:Types.ObjectId,@Param("VariantID",ValidMongoID)VariantID:Types.ObjectId)
{
const Result = await this.cartService.RemoveIteam(UserID,ProductID,VariantID)
if(Result == true)
return{message: "Cart updated successfully", status: 200}
}

@Get("getcart")
async GetCart(@UserData("_id") UserID:Types.ObjectId)
{

const Data = await this.cartService.Getcart(UserID)
return {Data}
}

}
