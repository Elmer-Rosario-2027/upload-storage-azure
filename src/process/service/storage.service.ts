import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {

  private blobServiceClient: BlobServiceClient;

  constructor() {

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING!
      );
  }

  async upload(filePath: string) {

    const containerName =
      process.env.AZURE_STORAGE_CONTAINER!;

    const containerClient =
      this.blobServiceClient.getContainerClient(
        containerName
      );

    // crea el container si no existe
    await containerClient.createIfNotExists();

    // obtiene nombre archivo
    const fileName = path.basename(filePath);

    // cliente blob
    const blockBlobClient =
      containerClient.getBlockBlobClient(
        fileName
      );

    // leer archivo
    const fileBuffer = fs.readFileSync(filePath);

    // upload
    await blockBlobClient.uploadData(fileBuffer);

    return {
      message: 'Archivo subido correctamente',
      fileName,
      container: containerName,
      url: blockBlobClient.url
    };
  }
}