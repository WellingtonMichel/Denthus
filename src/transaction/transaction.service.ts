import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDto) {
    return this.prisma.transaction.create({ data });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: { job: true, user: true, cadista: true, lab: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: { job: true, user: true, cadista: true, lab: true },
    });
  }

  async remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
