import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
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

  @Transform(({ value }) =>
    value.map((item) => {
      return { id: item };
    }),
  )
  @IsArray()
  categories: { id: number }[];

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  type: number;
}
