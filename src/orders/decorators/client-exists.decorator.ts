import { registerDecorator, ValidationOptions } from 'class-validator';
import { ClientExistsConstraint } from '../validators/client-exists.validator';

export function ClientExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'clientExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ClientExistsConstraint,
    });
  };
}
