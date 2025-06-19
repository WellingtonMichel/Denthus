import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Prisma } from '@prisma/client';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() data: Prisma.SkillCreateInput) {
    return this.skillService.create(data);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.SkillUpdateInput) {
    return this.skillService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
