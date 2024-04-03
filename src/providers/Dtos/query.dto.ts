import { IsOptional } from 'class-validator';

export class ProviderQueryDto {
  @IsOptional()
  page: number;
  @IsOptional()
  per_page: number;
}
