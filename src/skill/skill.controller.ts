import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Prisma } from '@prisma/client';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() data: CreateSkillDto, @CurrentUser() user: any,) {
    if (user.type !== 'CADISTA') {
      throw new ForbiddenException('Apenas cadistas podem criar habilidades')
    }

    return this.skillService.create({
      name: data.name,
    });
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
