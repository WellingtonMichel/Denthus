import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, JobType } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateJobDto): Promise<any> {
    const { skills, type, labId, ...jobData } = data;

    // 1. Verifica se há crédito disponível para o tipo de trabalho
    const credit = await this.prisma.credit.findFirst({
      where: {
        userId: labId,
        type: type as JobType,
        remaining: { gt: 0 },
      },
    });

    if (!credit) {
      throw new BadRequestException(
        'Sem créditos disponíveis para esse tipo de trabalho.',
      );
    }

    // 2. Cria o job com referência ao crédito usado
    const job = await this.prisma.job.create({
      data: {
        ...jobData,
        labId,
        type: type as JobType,
        creditId: credit.id,
      },
      include: {
        lab: true,
      },
    });

    // 3. Decrementa o crédito
    await this.prisma.credit.update({
      where: { id: credit.id },
      data: { remaining: { decrement: 1 } },
    });

    // 4. Cria as relações de skills
    if (skills && skills.length > 0) {
      await this.prisma.job.update({
        where: { id: job.id },
        data: {
          skills: {
            create: skills.map((skillId) => ({
              skill: {
                connect: { id: skillId },
              },
            })),
          },
        },
      });
    }

    // 5. Retorna o job completo
    return this.prisma.job.findUnique({
      where: { id: job.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        lab: true,
        creditUsed: true,
      },
    });
  }

  async findAll() {
    const jobs = await this.prisma.job.findMany({
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        cadista: true,
        lab: true,
        creditUsed: true,
        transactions: true,
      },
    });

    return jobs.map((job) => ({
      ...job,
      skills: job.skills.map((s) => s.skill),
    }));
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        cadista: true,
        lab: true,
        creditUsed: true,
        transactions: true,
      },
    });

    if (!job) return null;

    return {
      ...job,
      skills: job.skills.map((s) => s.skill),
    };
  }

  async update(id: string, data: Prisma.JobUpdateInput) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({ where: { id } });
  }
}
