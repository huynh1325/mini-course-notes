import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Public()
    @ResponseMessage('Register a new user')
    @Post('/register')
    handleRegister(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }
}
