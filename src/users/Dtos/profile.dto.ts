import { plainToClass, Transform } from 'class-transformer';
import { IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { IsNationalIdUniqueConstraint } from '../validators/is-national-id-unique.validator';
import { IsPhoneUnique } from '../validators/is-phone-unique.validator';

export class CreateProfileDto {
  @IsNotEmpty()
  current_role: string;
  @IsNotEmpty()
  user_id: number;
  @ValidateNested()
  @Transform(({ value, obj }) => {
    if (obj.current_role === 'CLIENT') {
      return plainToClass(CreateClientProfileDto, value);
    }
    return plainToClass(CreateEmployeeProfileDto, value);
  })
  data: CreateClientProfileDto | CreateEmployeeProfileDto;
}

export class CreateClientProfileDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  @IsPhoneUnique('CLIENT')
  phone: string;
}

export class CreateEmployeeProfileDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  @IsPhoneUnique('EMPLOYEE')
  phone: string;
  @IsNotEmpty()
  @Validate(IsNationalIdUniqueConstraint)
  national_id: string;
  @IsNotEmpty()
  latitude: number;
  @IsNotEmpty()
  longitude: number;
  @IsNotEmpty()
  category_id: number;
}

export class UpdateClientProfileDto {
  first_name: string;
  last_name: string;
  phone: string;
}

export class UpdateEmployeeProfileDto {
  first_name: string;
  last_name: string;
  phone: string;
  national_id: string;
  latitude: number;
  longitude: number;
  category_id: number;
}
