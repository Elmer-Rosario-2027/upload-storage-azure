import { Module } from '@nestjs/common';
import { GatewayService } from './service/gateway.service';
import { GatewayController } from './gateway.controller';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
    imports: [KafkaModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
