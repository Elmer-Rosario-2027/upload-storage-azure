import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { run } from './temporal.worker';

dotenv.config();

async function bootstrap() {

  const port = process.env.PORT ?? 3000;
  console.log(`[Main] Iniciando aplicación NestJS en puerto ${port}...`);
  const app = await NestFactory.create(AppModule);

  // inicia api http
  await app.listen(port);
  console.log(`[Main] API HTTP corriendo en: http://localhost:${port}`);

  // Start Temporal Worker
  console.log('[Main] Iniciando worker de Temporal...');
  await run();
}

bootstrap();