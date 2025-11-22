import { Module } from "@nestjs/common";
import { UploadServices } from "./Upload.Service";





@Module({
providers:[UploadServices],
exports:[UploadServices]
})
export class UploadModule{}