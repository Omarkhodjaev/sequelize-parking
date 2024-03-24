import { ResData } from 'src/lib/resData';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<ResData<UserEntity>>;
  findAll(): Promise<ResData<UserEntity[]>>;
  findOne(id: number): Promise<ResData<UserEntity>>;
  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResData<UserEntity>>;
  remove(id: number): Promise<ResData<UserEntity>>;
}
