import { Injectable } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { StorageService } from './storage.service';
import { PrismaService } from '../prismaService/prisma.service';

@Injectable()
export class ReportService {

  constructor(
    private readonly prisma: PrismaService,
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
    const { fileName, buffer } = await this.excelService.generateExcel(transactions);
    console.log(fileName);
    const url = await this.storageService.upload(fileName, buffer);
    console.log(url);
    return url;
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
