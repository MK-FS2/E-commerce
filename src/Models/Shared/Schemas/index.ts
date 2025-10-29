import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps:false,_id:false})
export class FileType
{
    @Prop({type:String,required:true})
    ID:string
    @Prop({type:String,required:true})
    URL:string
}

export const FileSchema = SchemaFactory.createForClass(FileType);
