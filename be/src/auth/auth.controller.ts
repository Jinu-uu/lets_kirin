import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from './get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    public async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<ResponseDto> {
        await this.authService.signUp(authCredentialDto);
        return new ResponseDto(true, '회원 가입을 성공했습니다.', null);
    }

    @Post('/signin')
    public async signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/authTest')
    test(@GetUser() user: User) {
        console.log('user',user);
    } 
}
