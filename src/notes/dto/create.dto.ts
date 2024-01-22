import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  readonly note: string;

  @IsArray()
  @ValidateNested({ each: true })
  readonly position: number[];

  @IsArray()
  @ValidateNested({ each: true })
  readonly dimensions: number[];

  @IsArray()
  @ValidateNested({ each: true })
  readonly scroll: number[];
}
