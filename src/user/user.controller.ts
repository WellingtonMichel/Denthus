import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, UserType } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.user({ id });
  }

  @Get()
  async list(@Query('type') type?: UserType) {
    return this.userService.listUsers(type);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
