import { Module } from '@nestjs/common';
import { ReportConsumer } from './report.consumer';
import { ReportService } from './service/report.service';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';
import { PrismaService } from './prismaService/prisma.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [ReportConsumer],
  providers: [
    ReportService,
    ExcelService,
    StorageService,
    PrismaService,
  ],
})
export class ProcessModule {}
