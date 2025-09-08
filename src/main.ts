import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 8080;

  app.setGlobalPrefix('api/v1', { exclude: [''] });

  app.useGlobalPipes(new ValidationPipe({
    //Chỉ cho phép các thuộc tính được định nghĩa trong DTO (Data Transfer Object) được gửi trong request. Các thuộc tính không được khai báo trong DTO sẽ bị loại bỏ tự động.
    whitelist: true,
    //Ném ra lỗi (HTTP 400 Bad Request) nếu request chứa các thuộc tính không được định nghĩa trong DTO, thay vì chỉ loại bỏ chúng như whitelist.
    forbidNonWhitelisted: true
  }));

  await app.listen(port);
}
bootstrap();
