import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

@Injectable()
export class UserService {
    signIn(authCredentialDto: AuthCredentialDto): { accessToken: string; } | PromiseLike<{ accessToken: string; }> {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        await this.userRepository.createUser(authCredentialDto);
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async removeUser(id: string) {
        const user = await this.findOne(id);
        if (user) {
            await this.userRepository.remove(user);
        }
    }
}