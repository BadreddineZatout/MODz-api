import { registerDecorator, ValidationOptions } from 'class-validator';
import { OrderExistsConstraint } from '../validators/order-exists.validator';

export function OrderExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'clientExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OrderExistsConstraint,
    });
  };
}
