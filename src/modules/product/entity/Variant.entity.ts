import { BaseVariant } from "@Models/Product";




export class VariantEntity implements BaseVariant
{
Variantname: string | number;
VariantStock: number;
Variantstatus: boolean;
}