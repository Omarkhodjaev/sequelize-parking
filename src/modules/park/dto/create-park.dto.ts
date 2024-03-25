import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateParkDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsString()
  emptyPlaceCount: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  userId: number;
}
