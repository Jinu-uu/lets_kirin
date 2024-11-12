import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  // 서버 시작
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on http://localhost:3000`);
}
bootstrap();
