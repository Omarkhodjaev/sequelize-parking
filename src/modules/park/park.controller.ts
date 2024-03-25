import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';

@Controller('park')
export class ParkController {
  constructor(
    @Inject('ParkService')
    private readonly parkService: IParkService,
  ) {}

  @Post()
  create(@Body() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @Get()
  findAll() {
    return this.parkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    return this.parkService.update(+id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkService.remove(+id);
  }
}
