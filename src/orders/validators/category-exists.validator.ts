import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'categoryExists', async: true })
@Injectable()
export class CategoryExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id: id },
    });
    return category ? true : false;
  }

  defaultMessage() {
    return 'Category with ID $value does not exist.';
  }
}
