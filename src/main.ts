import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para React
  app.enableCors({
    origin: 'http://localhost:5173', // o el puerto de tu Vite
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();