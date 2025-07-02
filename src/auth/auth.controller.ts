import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Controller('Auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: SignInDto) {
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req: { user: { sub: string} }) {
    return { userId: req.user.sub };
  }
}