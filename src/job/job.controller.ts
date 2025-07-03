import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Prisma } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateJobDto, @CurrentUser() user:any) {
    return this.jobService.create(data, user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.JobUpdateInput) {
    return this.jobService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
