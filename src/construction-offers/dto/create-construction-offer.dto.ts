import { Transform } from 'class-transformer';
import { IsArray, IsOptional, Min } from 'class-validator';
import { ConstructionExists } from 'src/constructions/decorators/construction-exists.decorator';
import { EmployeeExists } from 'src/offers/decorators/employee-exists.decorator';

export class CreateConstructionOfferDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @EmployeeExists()
  employee_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @ConstructionExists()
  construction_id: number;

  @Transform(({ value }) =>
    value.map((item) => {
      return { id: item };
    }),
  )
  @IsArray()
  categories: { id: number }[];

  @IsOptional()
  can_travel: boolean;

  @Min(1)
  price: number;
}