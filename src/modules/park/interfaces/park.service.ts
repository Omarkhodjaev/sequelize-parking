import { ResData } from 'src/lib/resData';
import { ParkEntity } from '../entities/park.entity';
import { UpdateParkDto } from '../dto/update-park.dto';
import { CreateParkDto } from '../dto/create-park.dto';

export interface IParkService {
  create(createParkDto: CreateParkDto): Promise<ResData<ParkEntity>>;
  findAll(): Promise<ResData<ParkEntity[]>>;
  findOne(id: number): Promise<ResData<ParkEntity>>;
  update(
    id: number,
    updateParkDto: UpdateParkDto,
  ): Promise<ResData<ParkEntity[]>>;
  remove(id: number): Promise<ResData<ParkEntity>>;
}
