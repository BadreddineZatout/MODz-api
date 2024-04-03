import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}
  async getProviders() {
    const providers = await this.prisma.provider.findMany({
      include: {
        province: true,
        state: true,
        category: true,
        social_media: {
          include: {
            social_media: true,
          },
        },
      },
    });

    return providers.map((provider) => {
      return {
        ...provider,
        social_media: provider.social_media.map((social_media) => {
          return {
            id: social_media.social_media_id,
            name: social_media.social_media.name,
            link: social_media.link,
          };
        }),
      };
    });
  }
}
