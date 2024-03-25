import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { ParkRepository } from './park.repository';
import { ParkEntity } from './entities/park.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([ParkEntity, UserEntity])],
  controllers: [ParkController],
  providers: [
    { provide: 'ParkService', useClass: ParkService },
    { provide: 'ParkRepository', useClass: ParkRepository },
    { provide: 'UserService', useClass: UserService },
    { provide: 'UserRepository', useClass: UserRepository },
  ],
})
export class ParkModule {}
