import { ConstructionType, OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { GroupExists } from 'src/groups/decorators/group-exists.decorator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
import { CategoryExists } from 'src/orders/decorators/category-exists.decorator';
import { ClientExists } from 'src/orders/decorators/client-exists.decorator';

export class ConstructionQuery {
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
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @GroupExists()
  group_id: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @CategoryExists()
  category_id: number;

  @IsOptional()
  @IsString()
  @IsEnum(ConstructionType)
  type: ConstructionType;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
