import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CategoryQueryDto {
  @IsOptional()
  @Transform(({ value }) => value == 'true')
  urgent: boolean;
}
