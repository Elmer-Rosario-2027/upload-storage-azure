import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {

  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  // Kafka Microservice
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
  await app.startAllMicroservices();

  // inicia api http
  await app.listen(port);
  console.log(`HTTP Server running: http://localhost:${port} Kafka Microservice running: localhost:9092 `);
}

bootstrap();