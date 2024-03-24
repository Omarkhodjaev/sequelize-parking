import { InjectModel } from '@nestjs/sequelize';
import { IUserAttribute, UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/user.repository';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity) private userRepository: typeof UserEntity,
  ) {}

  async create(dto: CreateUserDto) {
    const newUser = await this.userRepository.create<UserEntity>({
      phone: dto.phone,
      fullName: dto.fullName,
      password: dto.password,
    });

    return newUser;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<Promise<number>> {
    return await this.userRepository.destroy({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<[affectedCount: number, affectedRows: UserEntity[]]> {
    return await this.userRepository.update<UserEntity>(updateDto, {
      fields: ['phone', 'fullName', 'password'],
      where: { id },
      returning: true,
    });
  }

  async findOneByPhone(phone: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { phone } });
  }
}
