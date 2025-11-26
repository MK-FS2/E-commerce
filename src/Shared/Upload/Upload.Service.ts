import { Injectable } from "@nestjs/common";
import { fileformat } from "@Sahred/Interfaces";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()


cloudinary.config(
{
  cloud_name: process.env.CloudName as string,
  api_key: process.env.CloudApiKey as string,
  api_secret: process.env.CloudSecret as string,
});

@Injectable()
export class UploadServices 
{
  
  // Convert Cloudinary response → your fileformat
  private mapCloudinaryToFileFormat(result: UploadApiResponse): fileformat 
  {
    return {
      ID: result.public_id,
      URL: result.secure_url,
    };
  }


async deleteFolder(folder:string): Promise<boolean> 
{
  try 
  {
    await cloudinary.api.delete_resources_by_prefix(folder,{
      resource_type: "image",
    });
    await cloudinary.api.delete_folder(folder);
    return true;
  } 
  catch (err) 
  {
    console.error("Cloudinary folder delete failed:", err);
    return false;
  }
 }

  // Upload a single file
  async uploadOne(filePath: string, folder: string): Promise<fileformat|null> 
  {
    try 
    {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return this.mapCloudinaryToFileFormat(result);
    }
    catch(err)
    {
      console.log(err)
      return null
    }
   
  }

 async uploadMany(filePaths: string[], folder: string): Promise<fileformat[]|null> 
 {
  try 
  {
  const results: fileformat[] = [];
  for (const path of filePaths) 
  {
    const uploadResult = await cloudinary.uploader.upload(path,{folder});
    const mapped = this.mapCloudinaryToFileFormat(uploadResult);
    results.push(mapped);
  }
  return results;
  }
  catch(err)
  {
  console.log(err)
  return null
  }
}


  async DeleteFile(publicId: string): Promise<boolean> 
  {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === "ok";
  }

}
