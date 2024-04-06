import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';

export class OrderQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  per_page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  client_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  category_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  job_type_id: number;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  is_urgent: boolean;
}
