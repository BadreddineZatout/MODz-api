import { Transform } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { EmployeeExists } from '../decorators/employee-exists.decorator';
import { OrderExists } from '../decorators/order-exists.decorator';

export class CreateOfferDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @EmployeeExists()
  employee_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @OrderExists()
  order_id: number;

  @IsOptional()
  can_travel: boolean;

  @Min(1)
  price: number;
}
