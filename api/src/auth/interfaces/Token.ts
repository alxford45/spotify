export class RawToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}
export class Token {
  access: string;
  expiration: Date;
  constructor(rawToken: RawToken) {
    this.access = rawToken.access_token;
    this.expiration = new Date(Date.now() + rawToken.expires_in * 1000);
  }
}
