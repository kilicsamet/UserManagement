import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: mysql.Connection;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.db = await mysql.createConnection({
      host: this.configService.dbHost,
      user: this.configService.dbUser,
      password: this.configService.dbPassword, 
      database: this.configService.dbDatabase, 
    });

    await this.createDatabase();
    await this.createUsersTable();
    await this.seedUsers();
  }
  get connection(): mysql.Connection {
    return this.db; 
  }

  private async createDatabase() {
    const dbName = this.configService.dbDatabase; 
    await this.db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await this.db.query(`USE \`${dbName}\`;`);
  }

  private async createUsersTable() {
    const dbName = this.configService.dbDatabase; 
    await this.db.query(`USE \`${dbName}\`;`);

    await this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(255),
        age INT,
        country VARCHAR(255),
        district VARCHAR(255),
        role VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  }
  private async seedUsers() {
    const users = [
      {
        name: 'admin',
        surname: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        phone: '1234567890',
        age: 30,
        country: 'TURKIYE',
        district: 'Ist',
        role: 'user',
      },
      {
        name: 'samet',
        surname: 'kılıç',
        email: 'samet@samet.com',
        password: 'samet',
        phone: '0987654321',
        age: 28,
        country: 'TURKIYE',
        district: 'Ist',
        role: 'user',
      },
      {
        name: 'ayşe',
        surname: 'yılmaz',
        email: 'ayse.yilmaz@example.com',
        password: 'ayse123',
        phone: '5551234567',
        age: 25,
        country: 'TURKIYE',
        district: 'Ankara',
        role: 'user',
      },
      {
        name: 'mehmet',
        surname: 'demir',
        email: 'mehmet.demir@example.com',
        password: 'mehmet456',
        phone: '5557654321',
        age: 35,
        country: 'TURKIYE',
        district: 'İzmir',
        role: 'user',
      },
      {
        name: 'elif',
        surname: 'çelik',
        email: 'elif.celik@example.com',
        password: 'elif789',
        phone: '5559876543',
        age: 27,
        country: 'TURKIYE',
        district: 'Bursa',
        role: 'admin',
      },
      {
        name: 'can',
        surname: 'erdoğan',
        email: 'can.erdogan@example.com',
        password: 'can321',
        phone: '5553216549',
        age: 29,
        country: 'TURKIYE',
        district: 'Antalya',
        role: 'user',
      },
      {
        name: 'deniz',
        surname: 'akman',
        email: 'deniz.akman@example.com',
        password: 'deniz654',
        phone: '5556547890',
        age: 32,
        country: 'TURKIYE',
        district: 'Konya',
        role: 'user',
      },
      {
        name: 'test',
        surname: 'test',
        email: 'test.test@example.com',
        password: 'test',
        phone: '5556547890',
        age: 32,
        country: 'TURKIYE',
        district: 'Konya',
        role: 'user',
      },
      {
        name: 'murat',
        surname: 'yıldız',
        email: 'murat.yildiz@example.com',
        password: 'murat123',
        phone: '5559871234',
        age: 40,
        country: 'TURKIYE',
        district: 'Sakarya',
        role: 'user',
      },
      {
        name: 'seda',
        surname: 'çetin',
        email: 'seda.cetin@example.com',
        password: 'seda456',
        phone: '5553219870',
        age: 26,
        country: 'TURKIYE',
        district: 'Bodrum',
        role: 'user',
      },
      {
        name: 'ali',
        surname: 'özdemir',
        email: 'ali.ozdemir@example.com',
        password: 'ali789',
        phone: '5556543210',
        age: 34,
        country: 'TURKIYE',
        district: 'Eskişehir',
        role: 'admin',
      },
      {
        name: 'zehra',
        surname: 'akbulut',
        email: 'zehra.akbulut@example.com',
        password: 'zehra101',
        phone: '5559876543',
        age: 31,
        country: 'TURKIYE',
        district: 'Trabzon',
        role: 'user',
      },
      {
        name: 'burak',
        surname: 'kaya',
        email: 'burak.kaya@example.com',
        password: 'burak202',
        phone: '5553214567',
        age: 29,
        country: 'TURKIYE',
        district: 'Kayseri',
        role: 'user',
      },
      {
        name: 'aylin',
        surname: 'demirtaş',
        email: 'aylin.demirtas@example.com',
        password: 'aylin303',
        phone: '5553216548',
        age: 24,
        country: 'TURKIYE',
        district: 'Adana',
        role: 'user',
      },
      {
        name: 'burcu',
        surname: 'öztürk',
        email: 'burcu.ozturk@example.com',
        password: 'burcu404',
        phone: '5551234560',
        age: 22,
        country: 'TURKIYE',
        district: 'Kocaeli',
        role: 'user',
      },
      {
        name: 'emre',
        surname: 'unal',
        email: 'emre.unal@example.com',
        password: 'emre505',
        phone: '5559876548',
        age: 33,
        country: 'TURKIYE',
        district: 'Sakarya',
        role: 'user',
      },
      {
        name: 'selin',
        surname: 'yılmaz',
        email: 'selin.yilmaz@example.com',
        password: 'selin606',
        phone: '5559876542',
        age: 30,
        country: 'TURKIYE',
        district: 'Gaziantep',
        role: 'user',
      },
      {
        name: 'gökhan',
        surname: 'şahin',
        email: 'gokhan.sahin@example.com',
        password: 'gokhan707',
        phone: '5553216543',
        age: 36,
        country: 'TURKIYE',
        district: 'Mersin',
        role: 'admin',
      },
      {
        name: 'çınar',
        surname: 'yurt',
        email: 'cinar.yurt@example.com',
        password: 'cinar808',
        phone: '5559876540',
        age: 29,
        country: 'TURKIYE',
        district: 'Kayseri',
        role: 'user',
      },
    ];
    
    
  
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await this.db.query(`
        INSERT IGNORE INTO users (name, surname, email, password, phone, age, country, district, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `, [user.name, user.surname, user.email, hashedPassword, user.phone, user.age, user.country, user.district, user.role]);
    }
  }
  
}
