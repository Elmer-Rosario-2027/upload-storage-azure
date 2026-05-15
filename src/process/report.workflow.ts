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

// Actividad 1: 1 reintento
const { getTransactionsActivity } = proxyActivities<{
  getTransactionsActivity: (payload: ReportRequest) => Promise<Transaction[]>;
}>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 1,
    initialInterval: '5 seconds',
    maximumInterval: '5 seconds',
    backoffCoefficient: 1,
  },
});

// Actividad 2: 2 reintentos
const { generateExcelActivity } = proxyActivities<{
  generateExcelActivity: (transactions: Transaction[]) => Promise<ExcelResult>;
}>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 2,
    initialInterval: '5 seconds',
    maximumInterval: '5 seconds',
    backoffCoefficient: 1,
  },
});

// Actividad 3: 6 reintentos
const { uploadToStorageActivity } = proxyActivities<{
  uploadToStorageActivity: (fileName: string, buffer: string) => Promise<UploadResult>;
}>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 6,
    initialInterval: '5 seconds',
    maximumInterval: '5 seconds',
    backoffCoefficient: 1,
  },
});

export async function reportGenerationWorkflow(payload: ReportRequest): Promise<UploadResult> {

  const transactions = await getTransactionsActivity(payload);
  const excelResult = await generateExcelActivity(transactions);
  const uploadResult = await uploadToStorageActivity(excelResult.fileName, excelResult.buffer);
  console.log(`[Workflow] Archivo subido exitosamente: ${uploadResult.url}`);
  console.log(`[Workflow] Workflow completado para usuario ${payload.userId}`);
  return uploadResult;
}