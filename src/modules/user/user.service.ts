import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ResData } from 'src/lib/resData';
import { UserEntity } from './entities/user.entity';
import { UserPhoneAlreadyExist } from './exception/user.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.findOneByPhone(
      createUserDto.phone,
    );

    if (foundUser) {
      throw new UserPhoneAlreadyExist();
    }

    const user = await this.userRepository.create(createUserDto);

    return new ResData('User is created', HttpStatus.CREATED, user);
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
