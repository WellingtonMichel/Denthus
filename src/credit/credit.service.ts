import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCreditDto } from './dto/create-credit.dto';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCreditDto) {
    const { userId, type, quantity, expiresAt } = data;

    const existingCredit = await this.prisma.credit.findFirst({
      where: { userId, type },
    });

    if (existingCredit) {
      return this.prisma.credit.update({
        where: { id: existingCredit.id },
        data: {
          quantity: { increment: quantity },
          remaining: { increment: quantity },
          expiresAt: expiresAt ?? existingCredit.expiresAt,
        },
      });
    }

    return this.prisma.credit.create({
      data: {
        userId,
        type,
        quantity,
        remaining: quantity,
        expiresAt,
      },
    });
  }

  async findAll() {
    return this.prisma.credit.findMany({ include: { user: true, jobs: true } });
  }

  async findOne(id: string) {
    return this.prisma.credit.findUnique({
      where: { id },
      include: { jobs: true },
    });
  }

  async remove(id: string) {
    return this.prisma.credit.delete({ where: { id } });
  }
}
