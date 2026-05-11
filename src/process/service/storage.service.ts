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

    const containerName =
      process.env.AZURE_STORAGE_CONTAINER!;

    const containerClient =
      this.blobServiceClient.getContainerClient(
        containerName,
      );

    await containerClient.createIfNotExists();

    const blockBlobClient =
      containerClient.getBlockBlobClient(
        fileName,
      );

    await blockBlobClient.uploadData(buffer);

    return {
      message: 'Archivo subido correctamente',
      fileName,
      container: containerName,
      url: blockBlobClient.url,
    };
  }
}