import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'employeeExists', async: true })
@Injectable()
export class EmployeeExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const employee = await this.prisma.employee.findFirst({
      where: { id: id },
    });
    return employee ? true : false;
  }

  defaultMessage() {
    return 'Employee with ID $value does not exist.';
  }
}
