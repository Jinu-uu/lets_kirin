import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    userService: any;
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        try {
            await this.userRepository.createUser(authCredentialDto);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('이미 존재하는 이메일입니다.');
            } else {
                throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
            }
        }
    }

    async signIn(authCredentialDto: AuthCredentialDto) : Promise<{ accessToken: string }> {
        const { id, pw } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { id } });

        if (user && (await bcrypt.compare(pw, user.pw))) {
            // user token 생성
            const payload = { id: user.id };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}