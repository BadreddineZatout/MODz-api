import { Reporter } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ConstructionExists } from 'src/constructions/decorators/construction-exists.decorator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
import { OrderExists } from 'src/offers/decorators/order-exists.decorator';
import { ClientExists } from 'src/orders/decorators/client-exists.decorator';

export class CreateProblemDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @ClientExists()
  client_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @EmployeeExists()
  employee_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @OrderExists()
  order_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @ConstructionExists()
  construction_id: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  report_date: string;

  @IsOptional()
  @IsBoolean()
  is_treated: boolean;

  @IsString()
  @IsEnum(Reporter)
  reporter: Reporter;
}
