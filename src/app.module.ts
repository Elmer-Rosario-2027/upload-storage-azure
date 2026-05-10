import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [GatewayModule, ProcessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
