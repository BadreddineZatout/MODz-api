import { ConstructionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
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

  @IsString()
  @IsEnum(ConstructionType)
  construction_type: ConstructionType;

  @Transform(({ value }) =>
    value.map((item) => {
      return { id: item };
    }),
  )
  @IsArray()
  categories: { id: number }[];

  @IsArray()
  items: ConstructionItem[];

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  state_id: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  province_id: number;
}

type ConstructionItem = {
  item_id: number;
  quantity: number;
};
