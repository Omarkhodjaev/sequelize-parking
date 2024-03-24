import { HttpException, HttpStatus } from '@nestjs/common';

export class UserPhoneAlreadyExistExpception extends HttpException {
  constructor() {
    super('User already exist', HttpStatus.BAD_REQUEST);
  }
}
export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.BAD_REQUEST);
  }
}
