import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  current_role: string;
  @IsNotEmpty()
  user_id: number;
  data: CreateClientProfileDto | CreateEmployeeProfileDto;
}

export class CreateClientProfileDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  phone: string;
}

export class CreateEmployeeProfileDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  state_id: number;
  @IsNotEmpty()
  province_id: number;
  @IsNotEmpty()
  category_id: number;
}
