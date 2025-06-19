import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SkillCreateInput) {
    return this.prisma.skill.create({ data });
  }

  async findAll() {
    return this.prisma.skill.findMany();
  }

  async findOne(id: string) {
    return this.prisma.skill.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.SkillUpdateInput) {
    return this.prisma.skill.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
