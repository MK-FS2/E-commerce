import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDTO } from './dto';
import { Roles, UserData } from '@Sahred/Decorators';
import { Types } from 'mongoose';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';


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
 return{ message: `Category Added successfully`, status: 200};
}

}
