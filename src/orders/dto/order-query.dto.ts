import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { CategoryExists } from '../decorators/category-exists.decorator';
import { ClientExists } from '../decorators/client-exists.decorator';
import { JobTypeExists } from '../decorators/job-type-exists.decorator';

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
  @ClientExists()
  client_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @CategoryExists()
  category_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @JobTypeExists()
  job_type_id: number;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  is_urgent: boolean;
}
