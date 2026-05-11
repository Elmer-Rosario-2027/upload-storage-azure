import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ReportService } from './service/report.service';


@Controller()
export class ReportConsumer {

  constructor(private readonly reportService: ReportService) {}

 @EventPattern('report-requested')
  async handleReport(@Payload() payload: any) {
    console.log('Received report request :::::::::::::::::::::: ', payload);
    return await this.reportService.process(payload);
  }
}
