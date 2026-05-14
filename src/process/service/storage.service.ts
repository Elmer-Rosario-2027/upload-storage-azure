import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {

  private blobServiceClient: BlobServiceClient;

  constructor() {

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING!
      );
  }

  async upload(
    fileName: string,
    buffer: Buffer,
  ) {
    console.log(`[StorageService] Iniciando subida de archivo: ${fileName} (${buffer.length} bytes)`);
    const containerName =
      process.env.AZURE_STORAGE_CONTAINER!;

    const containerClient =
      this.blobServiceClient.getContainerClient(
        containerName,
      );

    await containerClient.createIfNotExists();
    console.log(`[StorageService] Contenedor verificado/creado: ${containerName}`);

    const blockBlobClient =
      containerClient.getBlockBlobClient(
        fileName,
      );

    await blockBlobClient.uploadData(buffer);
    console.log(`[StorageService] Archivo subido exitosamente a: ${blockBlobClient.url}`);

    return {
      message: 'Archivo subido correctamente',
      fileName,
      container: containerName,
      url: blockBlobClient.url,
    };
  }
}