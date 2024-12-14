import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
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
  @CategoryExists()
  category_id: number;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}
