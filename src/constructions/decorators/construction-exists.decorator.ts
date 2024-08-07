import { registerDecorator, ValidationOptions } from 'class-validator';
import { ConstructionExistsConstraint } from '../validators/construction-exists.validator';

export function ConstructionExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'constructionExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ConstructionExistsConstraint,
    });
  };
}
