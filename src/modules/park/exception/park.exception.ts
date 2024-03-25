import { HttpException, HttpStatus } from '@nestjs/common';

export class ParkAlreadyExistExpception extends HttpException {
  constructor() {
    super('Park already exist', HttpStatus.BAD_REQUEST);
  }
}
export class ParkNotFoundException extends HttpException {
  constructor() {
    super('Park not found', HttpStatus.NOT_FOUND);
  }
}
