import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
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
  @EmployeeExists()
  employee_id: number;

  @IsOptional()
  @Transform(({ value }) => value.map((item) => parseInt(item)))
  @IsArray()
  categories: number[];

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

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  radius: number;
}
