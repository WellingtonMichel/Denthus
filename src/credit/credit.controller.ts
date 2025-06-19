import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';

@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post()
  create(@Body() data: CreateCreditDto) {
    return this.creditService.create(data);
  }

  @Get()
  findAll() {
    return this.creditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditService.remove(id);
  }
}
