import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getHashPassword, comparePasswordHelper } from 'src/helpers/utils';
import { IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from 'src/core/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto, createdBy?: number) {
    const { username, password } = createUserDto;

    const isExist = await this.userRepository.findOne({
      where: { username, deletedAt: IsNull(), }
    });
    if (isExist) {
      throw new BadRequestException(
        `Username ${username} đã tồn tại. Vui lòng sử dụng username khác.`,
      );
    }

    const hashPassword = await getHashPassword(password);
    let newUser = this.userRepository.create({
      username,
      password: hashPassword,
      createdBy
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username, deletedAt: IsNull() }
    });
  }
  
  isValidPassword(password: string, hash: string) {
    return comparePasswordHelper(password, hash);
  }

  async updateUserToken(refreshToken: string, id: number) {
    const user = await this.userRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!user) return null;

    user.refreshToken = refreshToken;
    return await this.userRepository.save(user);
  }

  async findUserByToken(refreshToken: string) {
    return await this.userRepository.findOne({
      where: { refreshToken },
      select: {
        id: true,
        username: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
