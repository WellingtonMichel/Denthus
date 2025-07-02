import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, UserType } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard'

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

  @UseGuards(AuthGuard)
  @Get('me')
  getMyProfile(@Request() req: any) {
    return {
      message: 'Usuário autenticado com sucesso!',
      userId: req.user.sub,
      email: req.user.email,
    };
  }
}
