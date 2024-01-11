import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';

import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('v1/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // @UseGuards(JwtRefreshTokenGuard)
  // @Post('refresh-token')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('invalidate-token')
  // async invalidateToken(@Headers('authorization') authorization: string) {
  //   const token = authorization.split(' ')[1];
  //   await this.authService.invalidateToken(token);
  //   return { message: 'Token invalidated successfully' };
  // }
}
