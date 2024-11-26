import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { loginDto } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ){}

    // Method to validate user credentials

    async validateUser(email: string,password: string): Promise<any>{

        const user = await this.usersService.findByEmail(email);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(user && isPasswordValid ){
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    // Login method

    async login(loginDto: loginDto): Promise< {acces_token: string}>{

        const user = await this.validateUser(loginDto.email,loginDto.password);
        const payload = {sub: user.id, email: user.email};

        return {
            acces_token : await this.jwtService.signAsync(payload),
        }
    }

    // Register method

    async register(registerDto: RegisterDto){
        const user = this.usersService.createUser(registerDto);
        return user;
    }
    
}
