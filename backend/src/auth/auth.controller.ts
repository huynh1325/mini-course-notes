import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Public()
    @ResponseMessage("Đăng nhập thành công!")
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    @Public()
    @ResponseMessage('Đăng ký thành công')
    @Post('/register')
    handleRegister(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }
}
