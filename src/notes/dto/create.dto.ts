import { Transform } from 'class-transformer';
import { IsObject, IsString, IsUrl } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  readonly note: string;

  @IsUrl()
  readonly url: string;

  @IsObject()
  @Transform(({ value }) => JSON.parse(value))
  readonly meta: JSON;
}
