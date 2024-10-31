import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // 로깅 레벨 설정
  });
  
  // CORS 설정
  app.enableCors({
    origin: true,  // 개발 환경에서는 모든 origin 허용
    credentials: true,
  });

  // 모든 IP에서 접근 가능하도록 설정
  await app.listen(8000, '0.0.0.0');
  console.log(`Application is running on http://localhost:8000`);
}
bootstrap();
