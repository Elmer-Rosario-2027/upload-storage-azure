import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaService/prisma.service';

@Injectable()
export class DatabaseService {

  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(payload: any) {

    const transactions = await this.prisma.userTransaction.findMany({
        where: {
          userId: payload.userId
        }
      });
    return transactions;
  }
}