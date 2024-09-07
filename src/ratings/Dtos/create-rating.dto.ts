import { Transform } from 'class-transformer';
import { IsOptional, IsString, Max, Min } from 'class-validator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
import { ClientExists } from 'src/orders/decorators/client-exists.decorator';

export class CreateRatingDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @ClientExists()
  client_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @EmployeeExists()
  employee_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(5)
  score: number;

  @IsOptional()
  @IsString()
  comment: string;
}
