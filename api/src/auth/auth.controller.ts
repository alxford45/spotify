import { Controller, Get } from '@nestjs/common';
import { AxiosError } from 'axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Token } from './interfaces/Token';

@Controller('auth')
export class AuthController {
  private token: Token;
  constructor(private readonly authService: AuthService) {}
  async login() {
    const $res = this.authService.login();
    this.token = await lastValueFrom(
      $res.pipe(
        map((res) => res.data),
        map((rawToken) => new Token(rawToken)),
      ),
    );
  }
  @Get('track')
  async getTrackAnalysis() {
    console.log('getting track');
    if (!this.token || +this.token.expiration <= Date.now()) {
      console.log('token not found');
      await this.login();
    } else {
      console.log('token found');
    }
    console.log('fetching track');
    return this.authService
      .getTrackAnalysis(this.token.access, '11dFghVXANMlKmJXsNCbNl')
      .pipe(map((res) => res.data));
  }
}
