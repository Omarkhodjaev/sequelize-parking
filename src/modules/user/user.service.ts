import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ResData } from 'src/lib/resData';
import { UserEntity } from './entities/user.entity';
import {
  UserNotFoundException,
  UserPhoneAlreadyExistExpception,
} from './exception/user.exception';
import { generateToken } from 'src/lib/jsonwebtoken';
import { IRegisterData, IUserService } from './interfaces/user.service';
import { hashed } from 'src/lib/bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<ResData<IRegisterData>> {
    const foundUser = await this.findByPhoneNumber(createUserDto.phone);

    if (foundUser) {
      throw new UserPhoneAlreadyExistExpception();
    }

    createUserDto.password = await hashed(createUserDto.password);

    const user = await this.userRepository.create(createUserDto);
    const token = generateToken(user.id);

    return new ResData<IRegisterData>('User is created', HttpStatus.CREATED, {
      user,
      token,
    });
  }

  async findByPhoneNumber(phone: number) {
    const foundUser = await this.userRepository.findOneByPhone(phone);

    return foundUser;
  }

  async findAll(): Promise<ResData<UserEntity[]>> {
    const users = await this.userRepository.findAll();
    return new ResData('All users found', HttpStatus.OK, users);
  }

  async findOne(id: number) {
    const foundUser = await this.userRepository.findOne(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    return new ResData('User is found', HttpStatus.OK, foundUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResData<UserEntity[]>> {
    await this.findOne(id);
    const foundUser = await this.findByPhoneNumber(updateUserDto.phone);

    if (foundUser) {
      throw new UserPhoneAlreadyExistExpception();
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);

    return new ResData('User is updated', HttpStatus.OK, updatedUser[1]);
  }

  async remove(id: number): Promise<ResData<UserEntity>> {
    const { data: deletedUser } = await this.findOne(id);
    await this.userRepository.delete(id);

    return new ResData('User is deleted', HttpStatus.OK, deletedUser);
  }
}
