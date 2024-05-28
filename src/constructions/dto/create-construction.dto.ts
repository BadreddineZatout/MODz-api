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
import { GroupExists } from 'src/groups/decorators/group-exists.decorator';
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

  @Transform(({ value }) =>
    value.map((item) => {
      return { id: item };
    }),
  )
  @IsArray()
  categories: { id: number }[];

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @EmployeeExists()
  employee_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @GroupExists()
  group_id: number;

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
