import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { ReportService } from './service/report.service';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService, ReportService, ExcelService, StorageService],
})
export class ProcessModule {}
