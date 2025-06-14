import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'isPhoneUnique', async: true })
@Injectable()
export class IsPhoneUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(phone: string, args: ValidationArguments) {
    const [current_role] = args.constraints;
    if (current_role == 'CLIENT') {
      const client = await this.prisma.client.findFirst({
        where: { phone: phone },
      });
      return !client;
    } else {
      const employee = await this.prisma.employee.findFirst({
        where: { phone: phone },
      });
      return !employee;
    }
  }

  defaultMessage() {
    return 'Phone $value is already taken.';
  }
}

export function IsPhoneUnique(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPgoneUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsPhoneUniqueConstraint,
    });
  };
}
