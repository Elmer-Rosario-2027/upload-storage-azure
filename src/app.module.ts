import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ProcessModule } from './process/process.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [GatewayModule, ProcessModule, KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
