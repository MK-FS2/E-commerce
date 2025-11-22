import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomException } from '@Sahred/Filters';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomException());
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000,()=>{console.log(`Server is runing on port:${process.env.PORT}`)});
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
