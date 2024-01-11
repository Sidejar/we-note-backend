import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  xCord: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  yCord: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}
