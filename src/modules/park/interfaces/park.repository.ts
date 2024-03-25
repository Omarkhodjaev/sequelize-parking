import { CreateParkDto } from '../dto/create-park.dto';
import { UpdateParkDto } from '../dto/update-park.dto';
import { ParkEntity } from '../entities/park.entity';

export interface IParkRepository {
  create(dto: CreateParkDto): Promise<ParkEntity>;
  findAll(): Promise<ParkEntity[]>;
  findOne(id: number): Promise<ParkEntity | undefined>;
  delete(id: number): Promise<Promise<number>>;
  update(
    id: number,
    updateDto: UpdateParkDto,
  ): Promise<[affectedCount: number, affectedRows: ParkEntity[]]>;
}
