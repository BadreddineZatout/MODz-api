import { Transform } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';
import { ClientExists } from 'src/orders/decorators/client-exists.decorator';

export class RatingQueryDto {
  @IsOptional()
  page: number;
  @IsOptional()
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
}
