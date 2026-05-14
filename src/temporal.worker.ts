import { Worker } from '@temporalio/worker';
import * as activities from './process/activities';
import { DatabaseService } from './process/service/database.service';
import { ExcelService } from './process/service/excel.service';
import { StorageService } from './process/service/storage.service';
import { PrismaService } from './process/prismaService/prisma.service';

export async function run() {
  console.log('[Worker] Inicializando servicios...');
  const prismaService = new PrismaService();
  await prismaService.$connect();
  console.log('[Worker] Conexión a Prisma establecida');

  const dbService = new DatabaseService(prismaService);
  const excelService = new ExcelService();
  const storageService = new StorageService();

  console.log('[Worker] Creando worker de Temporal...');
  const worker = await Worker.create({
    workflowsPath: require.resolve('./process/report.workflow'),
    activities: {
      getTransactionsActivity: (payload) => activities.getTransactionsActivity(payload, dbService),
      generateExcelActivity: (transactions) => activities.generateExcelActivity(transactions, excelService),
      uploadToStorageActivity: (excelResult) => activities.uploadToStorageActivity(excelResult, storageService),
    },
    taskQueue: 'report-queue',
  });

  console.log('[Worker] Worker de Temporal iniciado y ejecutándose en cola: report-queue');
  await worker.run();
}