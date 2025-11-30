/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CartFactory } from './factory/index';
import { BaseVariant } from '@Models/Product';
import { ProductRepository, Variants } from '@Models/Product';
import { CartRepository } from './../../Models/Cart/cart.Repository';
import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException} from '@nestjs/common';
import { Types } from 'mongoose';
import { AddTocartDTO } from './dto/Addtocart.dto';
import { CartProduct } from '@Models/Cart';

@Injectable()
export class CartService 
{
constructor(private readonly cartRepository:CartRepository,private readonly productRepository:ProductRepository,private readonly cartFactory:CartFactory){}

async AddTocart(addTocartDTO:AddTocartDTO,UserID:Types.ObjectId,ProductID:Types.ObjectId,VariantID:Types.ObjectId)
{
const ProductExist = await this.productRepository.FindOne({$and:[{_id:ProductID},{$or:[{"Variants._id": VariantID},{"Variants.SubVariants._id": VariantID }]}]},{Variants:{$elemMatch:{$or:[{_id:VariantID},{"SubVariants._id":VariantID}]}}});
let Target :Variants | BaseVariant | null = null;

if(!ProductExist)
{
throw new  NotFoundException("no product found")
}
if (ProductExist.Variants[0]._id!.equals(VariantID)) 
{
  Target = ProductExist.Variants[0];
} 
else 
{
  for (const subvariant of ProductExist.Variants[0].SubVariants || []) 
 {
    if (subvariant._id!.equals(VariantID)) 
    {
      Target = subvariant;
      break;
    }
  }
}
if(!Target)
{
    throw new InternalServerErrorException()
}
if(addTocartDTO.Quantity > Target.VariantStock)
{
    throw new BadRequestException("Quantity exceeds stock");
}

const UserCartExist = await this.cartRepository.FindOne({UserID:UserID})
if(!UserCartExist)
{
const result = await this.cartRepository.CreateCart(UserID)
if(!result){throw new InternalServerErrorException()}
}


let TargetCartProduct:CartProduct | null = null;

if(UserCartExist && UserCartExist.CartProducts && UserCartExist.CartProducts.length > 0)
{
for(const poduct of UserCartExist.CartProducts)
{
 if(poduct.VariantID.equals(VariantID))
 {
    TargetCartProduct = poduct
    break
 }
 else 
 {
    continue
 }

}
}

if (TargetCartProduct !== null) 
{
 if(addTocartDTO.Quantity>0)
 {
 const newQuantity = (TargetCartProduct.Quantity) + addTocartDTO.Quantity;
 if(newQuantity > Target.VariantStock)
 {
    throw new BadRequestException("Quantity exceeds stock");
 }
 const Updateresult = await this.cartRepository.UpdateOne({ UserID: UserID, "CartProducts.VariantID":VariantID},{$set:{"CartProducts.$.Quantity":newQuantity}});
 if (!Updateresult)
 {
    throw new InternalServerErrorException(`Error updating cart `)
 }
 }
 else 
 {
 const Removingresult = await this.cartRepository.UpdateOne({ UserID: UserID },{$pull:{CartProducts:{VariantID: VariantID}}});
 if(!Removingresult)
 {
  throw new InternalServerErrorException("Error updating cart 2")
 }
 }

}
else 
{
    const constructedcartproduct = this.cartFactory.CreateProduct(ProductID,VariantID,addTocartDTO.Quantity)
    const AddingtocartResult = await this.cartRepository.UpdateOne({UserID:UserID},{$push:{CartProducts:constructedcartproduct}})
    if(!AddingtocartResult)
    {
     throw new InternalServerErrorException("Error updating cart")
    }
}
    console.log(TargetCartProduct)
    return true
}

async Reducefromcart(UserID:Types.ObjectId,ProductID:Types.ObjectId,VariantID:Types.ObjectId,)
{

    const Cart = await this.cartRepository.FindOne({UserID:UserID})
    if(!Cart)
    {
        throw new InternalServerErrorException()
    }
     const ProductExist = await this.cartRepository.FindOne({ UserID, CartProducts: { $elemMatch: { ProductID:ProductID,VariantID:VariantID}}},{"CartProducts.$": 1 });
    if(!ProductExist)
    {
        throw new NotFoundException("No product found")
    }


   const OldQuantity = ProductExist.CartProducts![0].Quantity
   if(OldQuantity == 1)
   {
    const Updateresult = await this.cartRepository.UpdateOne({UserID},{$pull:{CartProducts:{ProductID,VariantID}}})
    if(!Updateresult)
    {
        throw new InternalServerErrorException()
    }
   }
   else
   {
    const NewQuantity = OldQuantity-1
     const Updateresult = await this.cartRepository.UpdateOne({ UserID: UserID,"CartProducts.VariantID":VariantID},{$set:{"CartProducts.$.Quantity":NewQuantity}});
     if(!Updateresult)
     {
        throw new InternalServerErrorException()
     }
   }
  return true
}


async RemoveIteam(UserID:Types.ObjectId,ProductID:Types.ObjectId,VariantID:Types.ObjectId)
{
const ProductExist = await this.cartRepository.FindOne({ UserID, CartProducts:{$elemMatch:{ProductID:ProductID,VariantID:VariantID}}},{"CartProducts.$": 1 });
if(!ProductExist)
{
    throw new NotFoundException("No product found")
}
const RemovingResult = await this.cartRepository.UpdateOne({UserID},{$pull:{CartProducts:{ProductID,VariantID}}})
if(!RemovingResult)
{
    throw new InternalServerErrorException()
}
return true
}


async Getcart(UserID:Types.ObjectId)
{
const Cart = await this.cartRepository.GetCart(UserID)
return Cart
}
}