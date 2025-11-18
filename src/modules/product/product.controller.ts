import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDTO } from './dto';
import { Roles, UserData } from '@Sahred/Decorators';
import { Types } from 'mongoose';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { ValidMongoID } from '@Sahred/Pipes';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { UpdateVariantDTO } from './dto/UpdateVariant';


@Controller('product')
@UseGuards(AuthGuard,RoleGuard)
@Roles(["Admin","Seller"])
export class ProductController 
{
constructor(private readonly productService: ProductService) {}

@Post("addproduct")
async AddProduct(@Body() AddProductDTO:AddProductDTO ,@UserData("_id") UserID:Types.ObjectId)
{
 const Result = await this.productService.AddProduct(AddProductDTO,UserID)
 if(Result==true)
 return{ message: `product Added successfully`, status: 200};
}

@Get("specificproduct/:ProductID")
async GetOneProduct(@Param("ProductID",ValidMongoID) ProductID:Types.ObjectId)
{
  const Data = await this.productService.GetOneProduct(ProductID)
  return{Data:Data,status:200}
}

@Get("getallproducts")
async GetManyProducts(@Query("Page",ParseIntPipe) Page:number=1,@Query("Limit",ParseIntPipe) Limit:number=10)
{
const Data = await this.productService.GetManyProducts(Page,Limit)
return{Data:Data,status:200}
}

@Put("updateproduct/:PrandID")
async UpdateProducts(@Body() updateProductDTO:UpdateProductDTO,@UserData("_id") UserID:Types.ObjectId,@Param("PrandID") PrandID:Types.ObjectId)
{
const Result = await this.productService.UpdateProduct(updateProductDTO,UserID,PrandID)
if(Result==true)
 return{ message: `product updated successfully`, status: 200};
}


@Put("updatevariant/:ProductID/:VariantID")
async UpdateVariant(@Body() updateVariantDTO:UpdateVariantDTO, @UserData("_id") UserID:Types.ObjectId,@Param("VariantID") VariantID:Types.ObjectId,@Param("ProductID") ProductID:Types.ObjectId)
{
const Result = await this.productService.UpdateVariant(updateVariantDTO,UserID,VariantID,ProductID)
 if(Result == true)
 return{ message: `variant updated successfully`, status: 200};
}

}
