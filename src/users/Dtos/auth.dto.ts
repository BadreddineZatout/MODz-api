import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsEmailUniqueConstraint } from '../validators/is-email-unique.validator';

export class RegisterDTO {
  @IsNotEmpty()
  @Validate(IsEmailUniqueConstraint, {
    message: 'Email $value is already taken.',
  })
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
