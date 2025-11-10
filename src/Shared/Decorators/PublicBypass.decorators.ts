import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "./AllowedRoles.decorator";



export const PublicBypass=()=>SetMetadata(ROLES_KEY,["Public"]) 
