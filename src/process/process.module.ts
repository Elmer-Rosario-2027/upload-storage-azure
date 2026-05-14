import { Module } from '@nestjs/common';
import { ReportConsumer } from './report.consumer';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';
import { PrismaService } from './prismaService/prisma.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { DatabaseService } from './service/database.service';

@Module({
  imports: [KafkaModule],
  controllers: [ReportConsumer],
  providers: [
    ExcelService,
    StorageService,
    PrismaService,
    DatabaseService
  ],
})
export class ProcessModule {}
