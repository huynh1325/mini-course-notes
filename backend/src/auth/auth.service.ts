import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { parseExpire } from 'src/helpers/time';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService
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

    async login(user: User, response: Response) {
        const { id, username } = user;
        const payload = {
            sub: 'token login',
            iss: 'from server',
            id,
            username
        };
        const refresh_token = this.createRefreshToken(payload);

        await this.usersService.updateUserToken(refresh_token, id);


        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: parseExpire(this.configService.get<string>("JWT_REFRESH_EXPIRE")) * 1000
        })

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                username,
            }
        };
    }

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: parseExpire(this.configService.get<string>("JWT_REFRESH_EXPIRE")),
        });
        return refresh_token
    }

    processNewToken = async (refreshToken: string, response: Response) => {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            })
            let user = await this.usersService.findUserByToken(refreshToken);
            if (user) {
                const { id, username } = user;
                const payload = {
                    sub: 'token refresh',
                    iss: 'from server',
                    id,
                    username,
                };

                const refresh_token = this.createRefreshToken(payload);
        
                await this.usersService.updateUserToken(refresh_token, id);

                response.clearCookie("refresh_token");
                response.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                maxAge: parseExpire(this.configService.get<string>("JWT_REFRESH_EXPIRE")) * 1000
            })
        
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    id,
                    username
                }
            };
        }
        } catch (error) {
            throw new BadRequestException('Refresh token không hợp lệ, vui lòng đăng nhập')
        }
    }
}
