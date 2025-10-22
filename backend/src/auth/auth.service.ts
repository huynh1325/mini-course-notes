import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && await this.usersService.isValidPassword(pass, user.password)) {
            return { ...user };
        }
        return null;
    }

    async createUser(user: CreateUserDto) {
        let newUser = await this.usersService.create(user);
        return {
            id: newUser?.id,
            createdAt: newUser?.createdAt,
        };
    }
}
