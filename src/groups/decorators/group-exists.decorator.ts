import { registerDecorator, ValidationOptions } from 'class-validator';
import { GroupExistsConstraint } from '../validators/group-exists.validator';

export function GroupExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'GlientExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: GroupExistsConstraint,
    });
  };
}
