import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class GoogleConnectDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
