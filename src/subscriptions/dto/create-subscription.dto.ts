import { Transform } from 'class-transformer';
import { Min } from 'class-validator';
import { PackExists } from '../decorators/pack-exists.decorator';

export class CreateSubscriptionDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @PackExists()
  pack_id: number;
}
