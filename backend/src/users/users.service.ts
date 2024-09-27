import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.interface'; 
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise'; 
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  async findAll(
    page: number = 1,
    pageSize: number = 10,
    filter?: string,
    ageRange?: { min?: number; max?: number },
    role?: string,
    country?: string,
    district?: string
  ): Promise<{ users: User[], total: number }> {
    const offset = (page - 1) * pageSize;
    const values: (string | number)[] = [];
    
    // Ana sorguyu oluştur
    let query = 'SELECT * FROM users WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
  
    // Filter için koşulları ekle
    if (filter) {
      const searchPattern = `%${filter}%`;
      query += ' AND (name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ?)';
      countQuery += ' AND (name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ?)';
      values.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }
  
    // Yaş aralığı koşullarını ekle
    if (ageRange?.min !== undefined) {
      query += ' AND age >= ?';
      countQuery += ' AND age >= ?';
      values.push(ageRange.min);
    }
  
    if (ageRange?.max !== undefined) {
      query += ' AND age <= ?';
      countQuery += ' AND age <= ?';
      values.push(ageRange.max);
    }
  
    // Rol, ülke ve ilçe için koşulları ekle
    if (role) {
      query += ' AND role = ?';
      countQuery += ' AND role = ?';
      values.push(role);
    }
  
    if (country) {
      query += ' AND country = ?';
      countQuery += ' AND country = ?';
      values.push(country);
    }
  
    if (district) {
      query += ' AND district = ?';
      countQuery += ' AND district = ?';
      values.push(district);
    }
  
    // Kullanıcı sayısını almak için countQuery oluştur
    const [countRows]: [RowDataPacket[], any] = await this.databaseService.connection.query(countQuery, values);
    const total = countRows[0].total;
  
    // Limit ve offset ekle
    query += ' LIMIT ? OFFSET ?';
    values.push(pageSize, offset);
  
    // Kullanıcıları al
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
    const exists = await this.emailExists(userData.email);
    if (exists) {
      throw new ConflictException('Email already exists'); 
    }
  
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
  
  async emailExists(email: string): Promise<boolean> {
    const [rows]: [RowDataPacket[], any] = await this.databaseService.connection.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [email]);
    return rows[0].count > 0;
  }
  
  async update(id: number, userData: Partial<User>): Promise<User> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
    }

    if (userData.email && userData.email !== existingUser.email) {
        const exists = await this.emailExists(userData.email);
        if (exists) {
            throw new ConflictException('Email already exists'); 
        }
    }

    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const query = 'UPDATE users SET name = ?, surname = ?, email = ?, password = ?, phone = ?, age = ?, country = ?, district = ?, role = ? WHERE id = ?';
    const values = [
        userData.name || existingUser.name,
        userData.surname || existingUser.surname,
        userData.email || existingUser.email,
        userData.password || existingUser.password,
        userData.phone || existingUser.phone,
        userData.age || existingUser.age,
        userData.country || existingUser.country,
        userData.district || existingUser.district,
        userData.role || existingUser.role,
        id,
    ];

    const [result]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.connection.query(query, values);

    if (result.affectedRows === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
        id,
        name: userData.name || existingUser.name,
        surname: userData.surname || existingUser.surname,
        email: userData.email || existingUser.email,
        password: '', 
        phone: userData.phone || existingUser.phone,
        age: userData.age || existingUser.age,
        country: userData.country || existingUser.country,
        district: userData.district || existingUser.district,
        role: userData.role || existingUser.role,
    };
}

async getUserById(id: number): Promise<User | null> {
  const [rows]: [RowDataPacket[], any] = await this.databaseService.connection.query('SELECT * FROM users WHERE id = ?', [id]);
  if (rows.length === 0) {
      return null; 
  }

  const user: User = {
      id: rows[0].id,
      name: rows[0].name,
      surname: rows[0].surname,
      email: rows[0].email,
      password: rows[0].password, 
      phone: rows[0].phone,
      age: rows[0].age,
      country: rows[0].country,
      district: rows[0].district,
      role: rows[0].role,
  };

  return user; 
}

async delete(id: number): Promise<void> {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result]: [ResultSetHeader,FieldPacket[] ] = await this.databaseService.connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
