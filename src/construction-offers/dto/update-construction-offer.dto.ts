import { OfferStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, Min } from 'class-validator';

export class UpdateConstructionOfferDto {
  @IsOptional()
  @IsBoolean()
  can_travel: boolean;

  @IsOptional()
  @Min(1)
  price: number;

  @IsOptional()
  @IsEnum(OfferStatus)
  status: OfferStatus;
}
