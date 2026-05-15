import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {

  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
  }

  async upload(fileName: string, buffer: Buffer | string) {
    //throw new Error('Error en upload de StorageService');

    const binaryBuffer = typeof buffer === 'string' ? Buffer.from(buffer, 'base64') : buffer;
    const containerName = process.env.AZURE_STORAGE_CONTAINER!;
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(binaryBuffer);
    return {
      message: 'Archivo subido correctamente',
      fileName,
      container: containerName,
      url: blockBlobClient.url,
    };
  }
}