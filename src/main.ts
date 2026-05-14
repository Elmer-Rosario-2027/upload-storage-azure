import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { run } from './temporal.worker';

dotenv.config();

async function bootstrap() {

  const port = process.env.PORT ?? 3000;
  console.log(`[Main] Iniciando aplicación NestJS en puerto ${port}...`);
  const app = await NestFactory.create(AppModule);

  // Kafka Microservice
  console.log('[Main] Configurando microservicio Kafka...');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'microservice-yape',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'microservice-yape-consumer',
      },
    },
  });

  // inicia microservicios
  console.log('[Main] Iniciando todos los microservicios...');
  await app.startAllMicroservices();

  // inicia api http
  await app.listen(port);
  console.log(`[Main] API HTTP corriendo en: http://localhost:${port}`);
  console.log('[Main] Microservicio Kafka corriendo en: localhost:9092');

  // Start Temporal Worker
  console.log('[Main] Iniciando worker de Temporal...');
  await run();
}

bootstrap();