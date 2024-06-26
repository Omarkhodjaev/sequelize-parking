import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: 'UserService', useClass: UserService },
    { provide: 'UserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
