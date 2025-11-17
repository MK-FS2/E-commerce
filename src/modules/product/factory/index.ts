import { UpdateProductDTO } from './../dto/UpdateProduct.dto';
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

UpdateProduct(updateProductDTO: UpdateProductDTO) 
{
  const product = new ProductEntity();

  if (updateProductDTO.ProductName !== undefined) 
  {
    product.ProductName = updateProductDTO.ProductName;
  }

  if (updateProductDTO.Description !== undefined) 
  {
    product.Description = updateProductDTO.Description;
  }

  if (updateProductDTO.Brand !== undefined)
  {
    product.Brand = updateProductDTO.Brand;
  }

  if (updateProductDTO.Category !== undefined) 
 {
    product.Category = updateProductDTO.Category;
  }

  if (updateProductDTO.DiscounstAmount !== undefined) 
  {
    product.DiscounstAmount = updateProductDTO.DiscounstAmount;
  }

  if (updateProductDTO.DiscountType !== undefined) 
  {
    product.DiscountType = updateProductDTO.DiscountType;
  }

  if (updateProductDTO.Price !== undefined) 
  {
    product.Price = updateProductDTO.Price;
  }

  if (updateProductDTO.Productstatus !== undefined) 
  {
    product.Productstatus = updateProductDTO.Productstatus;
  }

  if(updateProductDTO.DiscountStatus !== undefined)
  {
    product.DiscountStatus= updateProductDTO.DiscountStatus
  } 
  return product;
}

}