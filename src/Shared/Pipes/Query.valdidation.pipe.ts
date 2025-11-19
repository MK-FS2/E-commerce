import { HttpException, PipeTransform } from "@nestjs/common";

export enum QueryTypes 
{
ID="ID",
Number="number",
String="string"
}


export class QueryPipe implements PipeTransform 
{
constructor(private readonly QueryType:QueryTypes ){}
transform(value: any) 
{
try 
{
if(typeof value == "string")
{
    return 1
}


}
catch(err)
{
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
throw new HttpException(err.message,500)
}
}
}