import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';
import { ResData } from 'src/lib/resData';
import { ParkEntity } from './entities/park.entity';
import { IParkRepository } from './interfaces/park.repository';
import { ParkNotFoundException } from './exception/park.exception';

@Injectable()
export class ParkService implements IParkService {
  constructor(
    @Inject('ParkRepository')
    private readonly parkRepository: IParkRepository,
  ) {}

  async create(createParkDto: CreateParkDto): Promise<ResData<ParkEntity>> {
    const park = await this.parkRepository.create(createParkDto);

    return new ResData<ParkEntity>(
      'Park created successfully',
      HttpStatus.OK,
      park,
    );
  }

  async findAll(): Promise<ResData<ParkEntity[]>> {
    const parks = await this.parkRepository.findAll();
    return new ResData('All parks found', HttpStatus.OK, parks);
  }

  async findOne(id: number): Promise<ResData<ParkEntity>> {
    const park = await this.parkRepository.findOne(id);

    if (!park) {
      throw new ParkNotFoundException();
    }

    return new ResData('park found', HttpStatus.OK, park);
  }

  async update(
    id: number,
    updateParkDto: UpdateParkDto,
  ): Promise<ResData<ParkEntity[]>> {
    await this.findOne(id);

    const park = await this.parkRepository.update(id, updateParkDto);

    return new ResData('Park is updated', HttpStatus.OK, park[1]);
  }

  async remove(id: number): Promise<ResData<ParkEntity>> {
    const { data: park } = await this.findOne(id);

    await this.parkRepository.delete(id);

    return new ResData('Park is removed', HttpStatus.OK, park);
  }
}
