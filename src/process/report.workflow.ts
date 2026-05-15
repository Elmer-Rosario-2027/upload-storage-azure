import { proxyActivities } from '@temporalio/workflow';

export interface ReportRequest {
  userId: string;
}

export interface Transaction {
  id: number;
  userId: string;
  transactionType: string;
  amount: any;
  status: string;
  createdAt: Date;
}

export interface ExcelResult {
  fileName: string;
  buffer: string;
}

export interface UploadResult {
  message: string;
  fileName: string;
  container: string;
  url: string;
}

const { getTransactionsActivity, generateExcelActivity, uploadToStorageActivity } =
  proxyActivities<{
    getTransactionsActivity: (payload: ReportRequest) => Promise<Transaction[]>;
    generateExcelActivity: (transactions: Transaction[]) => Promise<ExcelResult>;
    uploadToStorageActivity: (fileName: string, buffer: string) => Promise<UploadResult>;
  }>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 4,
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