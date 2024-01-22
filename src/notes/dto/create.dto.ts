import { Transform } from 'class-transformer';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  readonly note: string;

  @IsUrl()
  readonly url: string;

  @IsArray()
  @Transform(({ value }) => value.split(',').map(Number))
  readonly position: number[];

  @IsArray()
  @Transform(({ value }) => value.split(',').map(Number))
  readonly dimensions: number[];

  @IsArray()
  @Transform(({ value }) => value.split(',').map(Number))
  readonly scroll: number[];
}
