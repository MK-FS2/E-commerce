import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileData, PublicBypass, Roles, UserData } from '@Sahred/Decorators';
import { Types } from 'mongoose';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { ParseAndValidateJsonPipe, ValidMongoID } from '@Sahred/Pipes';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { UpdateVariantDTO } from './dto/UpdateVariant';
import { Filecount } from '@Sahred/Enums';
import { FileInterceptor } from '@Sahred/Interceptors';
import { FileTypes } from '@Sahred/Interfaces';
import { AddProductDTO } from './dto';
import { UpdateImageDTO } from './dto/UpdateImage.dto';
import { FilesInterceptor } from '@Sahred/Interceptors/FilesUpload.interceptor';




@Controller('product')
@UseGuards(AuthGuard,RoleGuard)
@Roles(["Admin","Seller"])
export class ProductController 
{
constructor(private readonly productService: ProductService) {}

//  to modefiy the custome inteceptor so it can hamdle multible files and be named not postionla



@Post("addproduct")
@UseInterceptors(new FileInterceptor(FileTypes.Image,50,Filecount.Files,"ProductImages",false))
// ParseAndValidateJsonPipe auto validate with the  DTO you send  do not ever add the return the :DTO 
async AddProduct(@Body("ProductData",new ParseAndValidateJsonPipe(AddProductDTO)) AddProductDTO:any,@UserData("_id") UserID:Types.ObjectId,@UploadedFiles() ProductImages:Express.Multer.File[])
{
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
 const Result = await this.productService.AddProduct(AddProductDTO,UserID,ProductImages)
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

@Delete("delectproduct/:ProductID")
async DeletProduct(@Param("ProductID",ValidMongoID) ProductID:Types.ObjectId,@UserData("_id")UserID:Types.ObjectId)
{
const Result = await this.productService.DeleteProduct(ProductID,UserID)
 if(Result == true)
 return{ message: `Product deleted successfully`, status: 200};
}

@Delete("delectvariant/:ProductID/:VariantID")
async DeleteVariant(@Param("ProductID",ValidMongoID) ProductID:Types.ObjectId,@Param("VariantID",ValidMongoID) VariantID:Types.ObjectId,@UserData("_id") UserID:Types.ObjectId)
{
const Result = await this.productService.DeleteVariant(VariantID,ProductID,UserID)
 if(Result == true)
return{ message:`Varinat deleted successfully`, status: 200};
}

@Put("updateproductimage/:ProductID")
@UseInterceptors(new FileInterceptor(FileTypes.Image,10,Filecount.File,"Image",false))
async UpdateproductImage(@Body()updateImageDTO:UpdateImageDTO,@Param("ProductID",ValidMongoID)ProductID:Types.ObjectId,@UserData("_id")UserID:Types.ObjectId,@UploadedFiles() File:Express.Multer.File)
{
const Result = await this.productService.UpdateProductImage(UserID,updateImageDTO,ProductID,File)
if(Result == true)
return{ message: `Image updated successfully`, status: 200};
}

@Get("getpostedproducts")
async GetAllownedProducts(@UserData("_id")UserID:Types.ObjectId,@Query("Page",ParseIntPipe)Page:number=1,@Query("Limit",ParseIntPipe)Limit:number=10)
{
const Data = await this.productService.GetAllownedProducts(UserID,Page,Limit)
return {Data:Data ,status:200}
}

@Delete("deletproductimage/:ProductID")
async DeleteProductImage(@Param("ProductID",ValidMongoID)ProductID:Types.ObjectId,@UserData("_id")UserID:Types.ObjectId,@Body()updateImageDTO:UpdateImageDTO)
{
const Result = await this.productService.DeleteProductImage(updateImageDTO,UserID,ProductID)
if(Result == true)
return{ message: `Image updated successfully`, status: 200};
}


@Get("mok")
@PublicBypass()
@UseInterceptors(
    new FilesInterceptor([
        {
            Filecount: Filecount.File,
            Optional: true,
            Size: 5 * 1024 * 1024,
            FileType:FileTypes.Image,
            FieldName: 'avatar'
        },
        {
            Filecount: Filecount.Files,
            Optional: true,
            Size: 10 * 1024 * 1024,
            FileType:FileTypes.Image,
            FieldName: 'gallery',
            MaxImagecount: 5
        }
    ])
)
mock(@FileData({optional:true,fieldname:"avatar"})avatar:Express.Multer.File,@FileData({optional:false,fieldname:"gallery"})gallery:Express.Multer.File[])
{

 return { avatar,gallery };
}
}
