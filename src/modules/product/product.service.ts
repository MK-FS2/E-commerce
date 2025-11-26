import { UploadServices } from './../../Shared/Upload/Upload.Service';

import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { Types } from 'mongoose';
import { ProductFactory } from './factory';
import { BrandRepository } from '@Models/Brands';
import { CategoryRepository } from '@Models/Categories';
import { ProductRepository } from '@Models/Product';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { UpdateVariantDTO } from './dto/UpdateVariant';
import { FolderTypes } from '@Sahred/Enums';
import { UpdateImageDTO } from './dto/UpdateImage.dto';


//  refactor the varinat and subvarinat so a varinat reflect the subvarinats not a separate entity


@Injectable()
export class ProductService 
{
constructor(private readonly brandRepository:BrandRepository,private readonly categoryRepository:CategoryRepository, private readonly productFactor:ProductFactory,private readonly productRepository:ProductRepository,private readonly uploadServices:UploadServices){}

// removed CoverImage:Express.Multer.File temporarly until i add the multible feilds
async AddProduct(addProductDTO:AddProductDTO,UserID:Types.ObjectId,ProductImages:Express.Multer.File[])
{
const BrandExist = await this.brandRepository.GetOne({_id:addProductDTO.Brand})
if(!BrandExist)
{
    throw  new NotFoundException("No brand found")
}
const CategoryExist = await this.categoryRepository.Exist({_id:addProductDTO.Category})
if(!CategoryExist)
{
     throw  new NotFoundException("No category found")
}

const ConstrcutedProduct = this.productFactor.CreateProduct(addProductDTO,UserID)

const CreationResul = await this.productRepository.CreatDocument(ConstrcutedProduct)
if(!CreationResul)
{
    throw new InternalServerErrorException()
}

const ImgesPathes = ProductImages.map((Image)=>{return Image.path})
const Folder = `${FolderTypes.App}/${FolderTypes.Products}/${CreationResul._id.toString()}/${FolderTypes.Photos}`

const UploadedImages = await this.uploadServices.uploadMany(ImgesPathes,Folder)
if(!UploadedImages)
{
  await this.uploadServices.deleteFolder(Folder)
  await this.productRepository.DeleteOne({_id:CreationResul._id})
  throw new InternalServerErrorException("Error C-U")
}

// const UploadCover = await this.uploadServices.uploadOne(CoverImage.path,Folder)
// if(!UploadCover)
// {
//   await this.uploadServices.deleteFolder(Folder)
//   await this.productRepository.DeleteOne({_id:CreationResul._id})
//   throw new InternalServerErrorException("Error C-U")
// }

const UpdateResult = await this.productRepository.UpdateOne({_id:CreationResul._id},{$set:{ProductImages:UploadedImages,CoverImage:ImgesPathes}})
if(!UpdateResult)
{
  await this.uploadServices.deleteFolder(Folder)
  await this.productRepository.DeleteOne({_id:CreationResul._id})
  throw new InternalServerErrorException()
}

return true
}

async GetOneProduct(ProductId:Types.ObjectId)
{
  const product = await this.productRepository.GetOne({_id:ProductId})
  if(!product)
  {
    throw new NotFoundException("No produut found")
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return product
}

async GetManyProducts(Page:number,Limit:number)
{

  const Skip = Math.ceil((Page-1)*Limit)

  const Products = await this.productRepository.GetMany({},{},{skip:Skip,limit:Limit});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Products;
}

async UpdateProduct(updateProductDTO:UpdateProductDTO,UserID:Types.ObjectId,ProductID:Types.ObjectId)
{

  const ProductExist  = await this.productRepository.FindOne({_id:ProductID},{CreatedBy:1})

  if(!ProductExist)
  {
    throw new NotFoundException("No product found")
  }

 if(!ProductExist.CreatedBy.equals(UserID))
 {
  throw new UnauthorizedException(`Only the craetor can update`)
 }

 if(updateProductDTO.Brand)
 {
  const Brand = await this.brandRepository.GetOne({_id:updateProductDTO.Brand})
  if(!Brand)
  {
    throw new NotFoundException("No Brand found")
  }
 }

 if(updateProductDTO.Category)
 {
  const CategoryExit = await this.categoryRepository.Exist({_id:updateProductDTO.Category})
  if(!CategoryExit)
  {
    throw new NotFoundException("no category found")
  }
 }
 
 const ConstructedProduct = this.productFactor.UpdateProduct(updateProductDTO)

 const UpdatedResult = await this.productRepository.UpdateOne({_id:ProductID},{$set:ConstructedProduct})

 if(!UpdatedResult)
 {
  throw new InternalServerErrorException()
 }
 return true
}

async UpdateVariant(updateVariantDTO:UpdateVariantDTO,UserID:Types.ObjectId,VariantID:Types.ObjectId,ProductID:Types.ObjectId) 
{
  if(!updateVariantDTO.Variantname && !updateVariantDTO.VariantStock &&! updateVariantDTO.Variantstatus)
  {
  throw new BadRequestException("1 feild should be provided atleast")
  }
  const TargetExist = await this.productRepository.FindOne({$and:[{_id:ProductID},{$or:[{"Variants._id":VariantID},{"Variants.SubVariants._id":VariantID}]}]},{Variants:1,_id:0})

  if (!TargetExist) throw new NotAcceptableException("No variant found");
    
  let OldStock:number = 0

  // i cant make a complex query that return the target despite the layer and return its stock so i made this
  if (updateVariantDTO.VariantStock) 
  {
  for (const target of TargetExist.Variants) 
  {
    if (target._id?.equals(VariantID)) 
    {
      OldStock = target.VariantStock;
      break;
    }

    if (target.SubVariants?.length) 
    {
      for (const subVariant of target.SubVariants) 
      {
        if (subVariant._id?.equals(VariantID)) 
        {
          OldStock = subVariant.VariantStock;
          break;
        }
      }
      if (OldStock !== undefined) break;
    }
  }
}

const ConstructedProduct = this.productFactor.UpdateVariant(updateVariantDTO,OldStock)

const Result1 = await this.productRepository.UpdateOne({ _id: ProductID, "Variants._id": VariantID },
  {
    $set: {
      "Variants.$.Variantname": ConstructedProduct.Variantname,
      "Variants.$.VariantStock": ConstructedProduct.VariantStock,
      "Variants.$.Variantstatus": ConstructedProduct.Variantstatus,
    }
  }
);

if(!Result1) 
{
const Result2 = await this.productRepository.UpdateOne(
  { _id: ProductID },
  {
    $set: 
    {
      "Variants.$[v].SubVariants.$[sv].Variantname": ConstructedProduct.Variantname,
      "Variants.$[v].SubVariants.$[sv].VariantStock": ConstructedProduct.VariantStock,
      "Variants.$[v].SubVariants.$[sv].Variantstatus": ConstructedProduct.Variantstatus,
    }
  },
  {
    arrayFilters: 
    [
      {"v.SubVariants._id":VariantID},
      {"sv._id": VariantID}
    ]
  }
);
if(!Result2)
{
  throw new InternalServerErrorException()
}
}
return true
}

async DeleteProduct(ProductID:Types.ObjectId,UserID:Types.ObjectId)
{
const ProductExist = await this.productRepository.FindOne({_id:ProductID},{CreatedBy:1})
if(!ProductExist)
{
  throw new NotFoundException("No product found")
}
if(!ProductExist.CreatedBy.equals(UserID))
{
  throw new UnauthorizedException("You are not the owner")
}

const DeletionResult = await this.productRepository.DeleteOne({_id:ProductID})
if(!DeletionResult)
{
  throw new InternalServerErrorException()
}
return true
}

async DeleteVariant(VariantID:Types.ObjectId,ProductID:Types.ObjectId,UserID:Types.ObjectId)
{
const VariantExist = await this.productRepository.FindOne({$and:[{_id:ProductID},{"Variants._id":VariantID}]},{CreatedBy:1})
if(!VariantExist)
{
  throw new NotFoundException("varinat dont exist ")
}

if(!VariantExist.CreatedBy.equals(UserID))
{
  throw new  UnauthorizedException("You are not the owner")
}

const ResultVariant = await this.productRepository.UpdateOne({ _id: ProductID },{ $pull: { Variants: {_id:VariantID}}});
if(!ResultVariant)
{
  throw new InternalServerErrorException()
}

return true
}


async GetAllownedProducts(UserID:Types.ObjectId,Page:number,Limit:number)
{
const Skip = Math.ceil((Page-1)*Limit)


const Products = await this.productRepository.Find({CreatedBy:UserID},{},{skip:Skip,limit:Limit})
return Products
}


async UpdateProductImage(UserID:Types.ObjectId,updateImageDTO:UpdateImageDTO,ProductID:Types.ObjectId,File:Express.Multer.File)
{

  const product = await this.productRepository.FindOne({CreatedBy:UserID,_id:ProductID,ProductImages:{$elemMatch:{ID:updateImageDTO.ID}}},{"ProductImages.$":1})
  if(!product)
  {
   throw new NotFoundException("No product found")
  }

  const Folder = `${FolderTypes.App}/${FolderTypes.Products}/${ProductID.toString()}/${FolderTypes.Photos}`
  const NewFileResult = await this.uploadServices.ReplaceFile(File.path,updateImageDTO.ID,Folder)
  if(!NewFileResult)
  {
    throw new InternalServerErrorException("Update failed xc")
  }
  
  const updateProduct = await this.productRepository.UpdateOne({ _id:ProductID,CreatedBy:UserID,"ProductImages.ID": updateImageDTO.ID },{ $set: { "ProductImages.$": NewFileResult }});
  if(!updateProduct)
  {
    throw new InternalServerErrorException("Update failed vv")
  }
  return true
}


async DeleteProductImage(updateImageDTO:UpdateImageDTO,UserID:Types.ObjectId,ProductID:Types.ObjectId)
{
  console.log(`${updateImageDTO.ID}`)
const product = await this.productRepository.FindOne({_id:ProductID,CreatedBy:UserID,ProductImages:{$elemMatch:{ID:updateImageDTO.ID}}},{"ProductImages.$":1});
if(!product)
{
  throw new NotFoundException("No image found")
}

const Result = await this.uploadServices.DeleteFile(updateImageDTO.ID)
if(!Result)
{
  throw new InternalServerErrorException("Error deleting image")
}

const UpdateResult = await this.productRepository.UpdateOne({_id:ProductID,CreatedBy:UserID,ProductImages:{$elemMatch:{ID:updateImageDTO.ID}}},{$pull:{ProductImages:{ID:updateImageDTO.ID}}})
if(!UpdateResult)
{
    throw new InternalServerErrorException("Error Updating")
}

return true
}

}