import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { SagaService } from './saga.service';


@Controller()
export class ReportConsumer {

  constructor(private readonly sagaService: SagaService) {}

 @EventPattern('report-requested')
  async handleReport(@Payload() payload: any) {
    console.log('Received report request ', payload);
    return await this.sagaService.process(payload);
  }
}
