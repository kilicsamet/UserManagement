import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE');
  }
  get httpListenPort(): string {
    return this.configService.get<string>('HTTP_LISTEN_PORT');
  }

}
