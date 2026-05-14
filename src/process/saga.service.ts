import { Injectable } from '@nestjs/common';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';
import { DatabaseService } from './service/database.service';

@Injectable()
export class SagaService {

  constructor(
    private readonly dbService: DatabaseService,
    private readonly excelService: ExcelService,
    private readonly storageService: StorageService
  ) {}

  async process(payload: any) {

    const transactions = await this.dbService.getTransactions(payload);
    const excelService = await this.excelService.generateExcel(transactions);
    const url = await this.storageService.upload(excelService.fileName, excelService.buffer);
    console.log(" URL: ", url);
    return url;
  }
}