import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './service/report.service';

@Controller('process')
export class ProcessController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async process(@Body() payload: any) {
    return await this.reportService.process(payload);
  }
}
