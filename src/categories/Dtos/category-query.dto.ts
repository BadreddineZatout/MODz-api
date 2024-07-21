import { Transform } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class CategoryQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  per_page: number;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  urgent: boolean;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  for_construction: boolean;
}
