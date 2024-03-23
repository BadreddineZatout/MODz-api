import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}
  async getStates() {
    return this.prisma.state.findMany({
      include: {
        provinces: true,
      },
    });
  }
}
