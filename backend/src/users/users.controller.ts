import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('filter') filter?: string,
    @Query('minAge') minAge?: string,
    @Query('maxAge') maxAge?: string,
    @Query('role') role?: string,
    @Query('country') country?: string,
    @Query('district') district?: string,
  ): Promise<{ users: User[], total: number }> {
    const pageNum = parseInt(page, 10) || 1; 
    const sizeNum = parseInt(pageSize, 10) || 10; 
    const ageRange = {
      min: minAge ? parseInt(minAge, 10) : undefined,
      max: maxAge ? parseInt(maxAge, 10) : undefined,
    };
  
    return this.usersService.findAll(pageNum, sizeNum, filter, ageRange, role, country, district);
  }
  
  

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> { 
    return this.usersService.findById(id);
  }

  @Post('save')
  async saveUser(@Body() userData: User) {
    return this.usersService.save(userData);
  }

  @Patch('update/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<User>) {
    return this.usersService.update(id, userData);
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.delete(id);
    return { message: `User with id ${id} has been deleted` };
  }
}
