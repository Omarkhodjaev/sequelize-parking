import { HttpException, HttpStatus } from '@nestjs/common';

export class UserPhoneAlreadyExist extends HttpException {
  constructor() {
    super('User already exist', HttpStatus.BAD_REQUEST);
  }
}
export class UserNotFoundExist extends HttpException {
  constructor() {
    super('User not found', HttpStatus.BAD_REQUEST);
  }
}
