import { DatabaseService } from './service/database.service';
import { ExcelService } from './service/excel.service';
import { StorageService } from './service/storage.service';
import { ReportRequest, Transaction, ExcelResult, UploadResult } from './report.workflow';

export async function getTransactionsActivity(
  payload: ReportRequest,
  dbService: DatabaseService
): Promise<Transaction[]> {
  console.log(`[Actividad] Consultando transacciones para usuario: ${payload.userId}`);
  const transactions = await dbService.getTransactions(payload);
  console.log(`[Actividad] Transacciones obtenidas: ${transactions.length}`);
  return transactions;
}

export async function generateExcelActivity(
  transactions: Transaction[],
  excelService: ExcelService
): Promise<ExcelResult> {
  console.log(`[Actividad] Generando Excel con ${transactions.length} transacciones`);
  const result = await excelService.generateExcel(transactions);
  console.log(`[Actividad] Excel generado: ${result.fileName} (${result.buffer.length} bytes en base64)`);
  return {
    fileName: result.fileName,
    buffer: result.buffer.toString('base64'), // encode to base64
  };
}

export async function uploadToStorageActivity(
  excelResult: ExcelResult,
  storageService: StorageService
): Promise<UploadResult> {
  console.log(`[Actividad] Subiendo archivo ${excelResult.fileName} a Azure Storage`);
  const buffer = Buffer.from(excelResult.buffer, 'base64'); // decode from base64
  const result = await storageService.upload(excelResult.fileName, buffer);
  console.log(`[Actividad] Archivo subido exitosamente: ${result.url}`);
  return result;
}