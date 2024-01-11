import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  seriesNo: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  xCord: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  yCord: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}
