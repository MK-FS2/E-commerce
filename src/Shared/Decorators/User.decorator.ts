import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserData = createParamDecorator(
  (data: any, ctx: ExecutionContext) => 
    {
    const req = ctx.switchToHttp().getRequest();
    const User = req.User
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
     return data ? User?.[data] : User;
  },
);