import { Types } from 'mongoose';
import { AddProductDTO } from './../dto/AddProduct.dto';
import { Injectable } from "@nestjs/common";
import { ProductEntity } from '../entity/AddProduct.entity';

@Injectable()
export class ProductFactory 
{

CreateProduct(addProductDTO:AddProductDTO,UserID:Types.ObjectId)
{

    const product = new ProductEntity()
    product.ProductName = addProductDTO.ProductName
    product.Brand = addProductDTO.Brand
    product.Category = addProductDTO.Category
    product.Description = addProductDTO.Description
    product.Variants = addProductDTO.Variants
    product.CreatedBy = UserID
    product.Price = addProductDTO.Price
    if(addProductDTO.DiscounstAmount)
    {
        product.DiscounstAmount = addProductDTO.DiscounstAmount
    }
    if(addProductDTO.DiscountType)
    {
        product.DiscountType = addProductDTO.DiscountType
    }
    return product 
}


}