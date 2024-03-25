import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';
import { ResData } from 'src/lib/resData';
import { ParkEntity } from './entities/park.entity';
import { IParkRepository } from './interfaces/park.repository';

@Injectable()
export class ParkService implements IParkService {
  constructor(
    @Inject('ParkRepository')
    private readonly parkRepository: IParkRepository,
  ) {}

  async create(createParkDto: CreateParkDto): Promise<ResData<ParkEntity>> {
    const park = await this.parkRepository.create(createParkDto);

    return new ResData('Park is created', HttpStatus.CREATED, park);
  }

  async findAll(): Promise<ResData<ParkEntity[]>> {
    const parks = await this.parkRepository.findAll();
    throw new Error('Method not implemented.');
  }

  async findOne(id: number): Promise<ResData<ParkEntity>> {
    const park = await this.parkRepository.findOne(id);

    return new ResData('Park is found', HttpStatus.OK, park);
  }
  
  update(
    id: number,
    updateParkDto: UpdateParkDto,
  ): Promise<ResData<ParkEntity[]>> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<ResData<ParkEntity>> {
    throw new Error('Method not implemented.');
  }
}
