import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { MyPageResponseDto } from './mypage.response.dto';

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

    async getMyPageInfo(userId: string): Promise<MyPageResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // skillLevels가 문자열로 저장되어 있다면 파싱
        const skillLevels = typeof user.skillLevels === 'string' 
            ? JSON.parse(user.skillLevels) 
            : user.skillLevels;

        return {
            name: user.name,
            year: user.year,
            fileUpload: user.fileUpload,
            averageGrade: user.GPA,
            skillLevel: {
                algorithm: skillLevels.algorithm,
                language: skillLevels.language,
                server: skillLevels.server,
                cs: skillLevels.cs,
                ds: skillLevels.ds,
                ai: skillLevels.ai
            }
        };
    }
}