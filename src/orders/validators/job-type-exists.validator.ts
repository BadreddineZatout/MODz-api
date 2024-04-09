import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'jobTypeExists', async: true })
@Injectable()
export class JobTypeExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const job_type = await this.prisma.jobType.findFirst({ where: { id: id } });
    return job_type ? true : false;
  }

  defaultMessage() {
    return 'Job Type with ID $value does not exist.';
  }
}
