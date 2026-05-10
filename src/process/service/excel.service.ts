import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExcelService {

  async generateExcel(data: any[]) {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'USER', key: 'userId', width: 20 },
      { header: 'TYPE', key: 'transactionType', width: 20 },
      { header: 'AMOUNT', key: 'amount', width: 15 },
      { header: 'STATUS', key: 'status', width: 15 }
    ];

    data.forEach(item => {
      worksheet.addRow(item);
    });

    const fileName =`report-${uuid()}.xlsx`;
    console.log("++++++++++++++++++++++++++++++++++++++  " + fileName)
    const path = `./tmp/${fileName}`;
    try {
      await workbook.xlsx.writeFile(path);
    } catch (error) {
      console.error('Error writing Excel file:', error);
      throw error;
    }
    return path;
  }
}