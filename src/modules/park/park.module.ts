import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { ParkRepository } from './park.repository';
import { ParkEntity } from './entities/park.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ParkEntity])],
  controllers: [ParkController],
  providers: [
    { provide: 'ParkService', useClass: ParkService },
    { provide: 'ParkRepository', useClass: ParkRepository },
  ],
})
export class ParkModule {}
