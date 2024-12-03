import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    first_name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}