import { registerDecorator, ValidationOptions } from 'class-validator';
import { EmployeeExistsConstraint } from '../validators/employee-exists.validator';

export function EmployeeExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'clientExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmployeeExistsConstraint,
    });
  };
}
