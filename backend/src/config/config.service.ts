import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly defaultEnvContent = `
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_DATABASE=user_management
HTTP_LISTEN_PORT=3001
`;

  constructor(private configService: NestConfigService) {}

  onModuleInit() {
    this.ensureEnvFileExists();
  }

  private ensureEnvFileExists() {
    if (!fs.existsSync('.env')) {
      fs.writeFileSync('.env', this.defaultEnvContent);
      console.log('.env dosyası oluşturuldu.');
    }
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST') || 'localhost';
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER') || 'root';
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD') || 'admin';
  }

  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE') || 'user_management';
  }

  get httpListenPort(): string {
    return this.configService.get<string>('HTTP_LISTEN_PORT') || '3001';
  }
}
