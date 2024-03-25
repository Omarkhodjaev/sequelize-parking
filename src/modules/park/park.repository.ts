import { InjectModel } from '@nestjs/sequelize';
import { IParkRepository } from './interfaces/park.repository';
import { ParkEntity } from './entities/park.entity';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';

export class ParkRepository implements IParkRepository {
  constructor(
    @InjectModel(ParkEntity) private parkRepository: typeof ParkEntity,
  ) {}

  async create(dto: CreateParkDto) {
    const newPark = await this.parkRepository.create<ParkEntity>({
      name: dto.name,
      location: dto.location,
      empty_place_count: dto.emptyPlaceCount,
      user_id: dto.userId,
    });

    return newPark;
  }

  async findAll() {
    return await this.parkRepository.findAll();
  }

  async findOne(id: number) {
    return await this.parkRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<Promise<number>> {
    return await this.parkRepository.destroy({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateParkDto,
  ): Promise<[affectedCount: number, affectedRows: ParkEntity[]]> {
    return await this.parkRepository.update<ParkEntity>(updateDto, {
      fields: ['name', 'location', 'empty_place_count', 'user_id'],
      where: { id },
      returning: true,
    });
  }
}
