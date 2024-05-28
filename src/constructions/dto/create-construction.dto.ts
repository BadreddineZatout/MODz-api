import { ConstructionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
import { ClientExists } from 'src/orders/decorators/client-exists.decorator';

export class CreateConstructionDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @ClientExists()
  client_id: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  hour: string;

  @Transform(({ value }) => parseInt(value))
  @IsArray()
  categories: number[];

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @EmployeeExists()
  emlpoyee: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  group: number;

  @IsOptional()
  @IsString()
  @IsEnum(ConstructionType)
  type: ConstructionType;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  floors_nbr: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  chambers_nbr: number;
}
