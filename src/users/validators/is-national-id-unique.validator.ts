import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'isNationalIdUnique', async: true })
@Injectable()
export class IsNationalIdUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(nationalId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { national_id: nationalId },
    });
    return !employee;
  }

  defaultMessage() {
    return 'National id $value is already taken.';
  }
}
