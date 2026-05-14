import { proxyActivities } from '@temporalio/workflow';

export interface ReportRequest {
  userId: string;
}

export interface Transaction {
  id: number;
  userId: string;
  transactionType: string;
  amount: any; // Decimal from Prisma
  status: string;
  createdAt: Date;
}

export interface ExcelResult {
  fileName: string;
  buffer: string; // base64 encoded
}

export interface UploadResult {
  message: string;
  fileName: string;
  container: string;
  url: string;
}

const { getTransactionsActivity, generateExcelActivity, uploadToStorageActivity } = proxyActivities<{
  getTransactionsActivity: (payload: ReportRequest) => Promise<Transaction[]>;
  generateExcelActivity: (transactions: Transaction[]) => Promise<ExcelResult>;
  uploadToStorageActivity: (excelResult: ExcelResult) => Promise<UploadResult>;
}>({
  startToCloseTimeout: '1 minute',
});

export async function reportGenerationWorkflow(payload: ReportRequest): Promise<UploadResult> {
  console.log(`[Workflow] Iniciando workflow de generación de reporte para usuario: ${payload.userId}`);
  
  const transactions = await getTransactionsActivity(payload);
  console.log(`[Workflow] Obtenidas ${transactions.length} transacciones para el usuario ${payload.userId}`);
  
  const excelResult = await generateExcelActivity(transactions);
  console.log(`[Workflow] Excel generado: ${excelResult.fileName}`);
  
  const uploadResult = await uploadToStorageActivity(excelResult);
  console.log(`[Workflow] Archivo subido exitosamente: ${uploadResult.url}`);
  
  console.log(`[Workflow] Workflow completado para usuario ${payload.userId}`);
  return uploadResult;
}