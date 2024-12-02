import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateParticipantDto{

    @IsString()
    @MinLength(5)
    fullname: string;
    
    @IsEmail()
    email: string;

    @IsOptional()
    phone?: string;
}