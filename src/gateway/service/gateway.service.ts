import {
  Inject,
  Injectable,
  OnModuleInit
} from '@nestjs/common';

import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GatewayService
  implements OnModuleInit {

  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async processReport(payload: any) {

    await this.kafkaClient.emit('report-requested', payload);
    return { message: 'Proceso enviado a Kafka'};
  }
}