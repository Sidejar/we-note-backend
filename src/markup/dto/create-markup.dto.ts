
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsUrl } from 'class-validator';


export class CreateMarkupDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;


  // Add other properties if needed
}