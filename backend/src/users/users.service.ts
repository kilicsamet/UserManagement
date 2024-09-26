import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.interface'; 
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise'; 
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(page: number = 1, pageSize: number = 10, filter?: string): Promise<{ users: User[], total: number }> {
    const offset = (page - 1) * pageSize;

    let query = 'SELECT * FROM users';
    const values: (string | number)[] = [];

    if (filter) {
        query += ' WHERE name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ? OR country LIKE ? OR district LIKE ? OR role LIKE ?';
        const searchPattern = `%${filter}%`;
        values.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    const countQuery = filter 
        ? 'SELECT COUNT(*) as total FROM users WHERE name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ? OR country LIKE ? OR district LIKE ? OR role LIKE ?'
        : 'SELECT COUNT(*) as total FROM users';

    const [countRows]: [RowDataPacket[], any] = await this.databaseService.connection.query(countQuery, values.slice(0, filter ? 7 : 0));
    const total = countRows[0].total;

    query += ' LIMIT ? OFFSET ?';
    values.push(pageSize, offset);

    const [rows]: [RowDataPacket[], any] = await this.databaseService.connection.query(query, values);
    
    return { users: rows as User[], total };
}


  async findById(id: number): Promise<User> {
    const [rows]: [RowDataPacket[], any] = await this.databaseService.connection.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    
    return rows[0] as User;
  }

async save(userData: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const query = 'INSERT INTO users (name, surname, email, password, phone, age, country, district, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      userData.name,
      userData.surname,
      userData.email,
      hashedPassword,
      userData.phone,
      userData.age,
      userData.country,
      userData.district,
      userData.role,
    ];

    const [result]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.connection.query(query, values);

    return {
      id: result.insertId, 
      ...userData,
      password: undefined 
    };
  }
  async update(id: number, userData: Partial<User>): Promise<User> {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const query = 'UPDATE users SET name = ?, surname = ?, email = ?, password = ?, phone = ?, age = ?, country = ?, district = ?, role = ? WHERE id = ?';
    const values = [
        userData.name || null,
        userData.surname || null,
        userData.email || null,
        userData.password || null,
        userData.phone || null,
        userData.age || null,
        userData.country || null,
        userData.district || null,
        userData.role || null,
        id,
    ];

    const [result]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.connection.query(query, values);

    if (result.affectedRows === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
        id,
        name: userData.name || '',
        surname: userData.surname || '',
        email: userData.email || '',
        password: '',
        phone: userData.phone || '',
        age: userData.age || 0,
        country: userData.country || '',
        district: userData.district || '',
        role: userData.role || '',
    };
}
async delete(id: number): Promise<void> {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result]: [ResultSetHeader,FieldPacket[] ] = await this.databaseService.connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }


}
