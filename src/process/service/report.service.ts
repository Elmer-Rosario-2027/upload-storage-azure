import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ExcelService } from './excel.service';
import { StorageService } from './storage.service';

@Injectable()
export class ReportService {

  private prisma = new PrismaClient();

  constructor(
    private readonly excelService: ExcelService,
    private readonly storageService: StorageService
  ) {}

  async process(payload: any) {
    /*
    const transactions =
      await this.prisma.userTransaction.findMany({
        where: {
          userId: payload.userId
        }
      });
    */
    const transactions = await this.prisma.userTransaction.findMany();
    console.log("##################################################################");
    const filePath = await this.excelService.generateExcel(transactions);
    console.log("filePath 000000000000000000000000000000000000000");
    console.log(filePath);
    const url = await this.storageService.upload(filePath);

    console.log(url);
  }
}

/*
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReportService {

  private prisma = new PrismaClient();
  constructor() {}

  async process(payload: any) {

    const result =
      await this.prisma.userTransaction.findMany({
        where: {
          userId: payload.userId
        }
      });

    console.log(JSON.stringify(result));
    return result;
  }
}
*/
