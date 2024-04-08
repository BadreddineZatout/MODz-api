import { registerDecorator, ValidationOptions } from 'class-validator';
import { JobTypeExistsConstraint } from '../validators/job-type-exists.validator';

export function JobTypeExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'jobTypeExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: JobTypeExistsConstraint,
    });
  };
}
