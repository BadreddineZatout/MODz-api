import { registerDecorator, ValidationOptions } from 'class-validator';
import { CategoryExistsConstraint } from '../validators/category-exists.validator';

export function CategoryExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'categoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CategoryExistsConstraint,
    });
  };
}
