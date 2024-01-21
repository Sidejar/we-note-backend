import { Injectable } from '@nestjs/common';
import { GoogleConnectDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';

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
        user,
        token: accessToken,
      };
    } else {
      const payload = { sub: user.id, username: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        user,
        token: accessToken,
      };
    }
  }
}
