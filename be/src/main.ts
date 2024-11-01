import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // 로깅 레벨 설정
  });
  
  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 URL
    credentials: true, // 필요 시 쿠키를 포함시키기 위한 설정
  });

  // 모든 IP에서 접근 가능하도록 설정
  await app.listen(8000, '0.0.0.0');
  console.log(`Application is running on http://localhost:8000`);
}
bootstrap();
