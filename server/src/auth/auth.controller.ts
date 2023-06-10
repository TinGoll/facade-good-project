import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserLoginInput } from './user.login.input';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() input: UserLoginInput) {
    return this.authService.login(input);
  }
}
