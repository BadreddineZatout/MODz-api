import { OfferStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { EmployeeExists } from '../decorators/employee-exists.decorator';
import { OrderExists } from '../decorators/order-exists.decorator';

export class OfferQuery {
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
  @EmployeeExists()
  employee_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @OrderExists()
  order_id: number;

  @IsOptional()
  @IsString()
  @IsEnum(OfferStatus)
  status: OfferStatus;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  can_travel: boolean;
}
