import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaService/prisma.service';

@Injectable()
export class DatabaseService {

  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(payload: any) {
    console.log(`[DatabaseService] Consultando transacciones en BD para userId: ${payload.userId}`);
    const transactions = await this.prisma.userTransaction.findMany({
        where: {
          userId: payload.userId
        }
      });
    console.log(`[DatabaseService] Encontradas ${transactions.length} transacciones`);
    return transactions;
  }
}