import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('park')
@Controller('park')
export class ParkController {
  constructor(
    @Inject('ParkService')
    private readonly parkService: IParkService,
  ) {}

  @Post()
  async create(@Body() createParkDto: CreateParkDto) {

    return this.parkService.create(createParkDto);
  }

  @Get()
  findAll() {
    return this.parkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParkDto: UpdateParkDto,
  ) {

    return this.parkService.update(id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkService.remove(id);
  }
}
