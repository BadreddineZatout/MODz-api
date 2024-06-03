import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'constructionExists', async: true })
@Injectable()
export class ConstructionExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const construction = await this.prisma.construction.findFirst({
      where: { id: id },
    });
    return construction ? true : false;
  }

  defaultMessage() {
    return 'Construction with ID $value does not exist.';
  }
}
