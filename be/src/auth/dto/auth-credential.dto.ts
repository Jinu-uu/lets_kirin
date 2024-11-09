import { IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {

    @IsString()
    id: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    pw: string;

    @IsString()
    name: string;

    @IsString()
    year: string;
}
