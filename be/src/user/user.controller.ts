import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        await this.userService.createUser(authCredentialDto);
    }

    @Get(':id')
    public async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get()
    public async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.removeUser(id);
    }
}
