import { Controller, Post, Body, Get } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() user: User) {
        const register = await this.authService.register(user);
        return register;
    }


}
