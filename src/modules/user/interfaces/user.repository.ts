import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(dto: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity | undefined>;
  delete(id: number): Promise<Promise<number>>;
  update(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<[affectedCount: number, affectedRows: UserEntity[]]>;
}
