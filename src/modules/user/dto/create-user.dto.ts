import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
