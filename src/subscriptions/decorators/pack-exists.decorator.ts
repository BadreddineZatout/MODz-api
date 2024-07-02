import { registerDecorator, ValidationOptions } from 'class-validator';
import { PackExistsConstraint } from '../validators/pack-exists.validator';

export function PackExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'packExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PackExistsConstraint,
    });
  };
}
