import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CategoryExists } from '../decorators/category-exists.decorator';
import { ClientExists } from '../decorators/client-exists.decorator';
import { JobTypeExists } from '../decorators/job-type-exists.decorator';

export class CreateOrderDto {
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
  @Min(1)
  @CategoryExists()
  category_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @JobTypeExists()
  job_type_id: number;

  @IsOptional()
  is_urgent: boolean;

  @IsOptional()
  @IsArray()
  items: ItemDto[];

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  state_id: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  province_id: number;
}

class ItemDto {
  item_id: number;
  quantity: number;
}
