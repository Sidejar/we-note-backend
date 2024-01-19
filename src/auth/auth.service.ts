import { Injectable } from '@nestjs/common';
import { GoogleConnectDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { google, oauth2_v2 } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async googleSignIn(signInDto: GoogleConnectDto) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: signInDto.token });
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const response = await oauth2.userinfo.get();
    const { data } = response;

    const user = await this.usersRepository.findOneBy({ email: data.email });
    if (!user) {
      const user = await this.usersService.create({
        googleId: data.id,
        name: data.name,
        email: data.email,
      });
      const payload = { sub: user.id, username: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        ...user,
        access_token: accessToken,
      };
    } else {
      const payload = { sub: user.id, username: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        ...user,
        access_token: accessToken,
      };
    }
  }

  // async refreshAccessToken(
  //   refreshToken: string,
  // ): Promise<{ access_token: string }> {
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(refreshToken);
  //     await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
  //     const payload = { sub: decoded.sub, username: decoded.username };
  //     const accessToken = await this.jwtService.signAsync(payload);
  //     return { access_token: accessToken };
  //   } catch (error) {
  //     this.logger.error(`Error: ${error.message}`);
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  // async invalidateToken(accessToken: string): Promise<void> {
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(accessToken);
  //     await this.refreshTokenIdsStorage.invalidate(decoded.sub);
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid access token');
  //   }
  // }
}
