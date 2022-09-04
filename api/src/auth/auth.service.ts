import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosRequestConfig } from 'axios';
import { RawToken } from './interfaces/Token';
@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  login() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params,
    };
    console.log('id', process.env.CLIENT_ID);
    console.log('secret', process.env.CLIENT_SECRET);
    console.log(config);
    return this.http.request<RawToken>(config);
  }
  getTrackAnalysis(accessToken: string, id: string) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.spotify.com/v1/audio-analysis/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return this.http.request<unknown>(config);
  }
}
