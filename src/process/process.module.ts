import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';
import { PrismaService } from './prismaService/prisma.service';
import { DatabaseService } from './service/database.service';

@Module({
  controllers: [ReportController],
  providers: [
    ExcelService,
    StorageService,
    PrismaService,
    DatabaseService
  ],
})
export class ProcessModule {}
