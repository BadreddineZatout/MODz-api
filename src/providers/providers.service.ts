import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProviderQueryDto } from './Dtos/query.dto';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}
  async getProviders(query: ProviderQueryDto) {
    const page = query.page ?? 1;
    const per_page = query.per_page ?? 5;
    const providers = await this.prisma.provider.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
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

    return Promise.all(
      providers.map(async (provider) => {
        const media = await this.prisma.media.findMany({
          where: {
            model_type: 'App\\Models\\Provider',
            model_id: provider.id,
          },
        });
        return {
          ...provider,
          social_media: provider.social_media.map((social_media) => {
            return {
              id: social_media.social_media_id,
              name: social_media.social_media.name,
              link: social_media.link,
            };
          }),
          media: media.map((media) => {
            return {
              id: Number(media.id),
              name: media.file_name,
              path: `${process.env.ADMIN_URL}/storage/${media.id}/${media.file_name}`,
              type: 'PROVIDER',
            };
          }),
        };
      }),
    );
  }

  async getProvider(id: number) {
    const provider = await this.prisma.provider.findFirst({
      where: { id },
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

    const media = await this.prisma.media.findMany({
      where: {
        model_type: 'App\\Models\\Provider',
        model_id: provider.id,
      },
    });

    return {
      ...provider,
      social_media: provider.social_media.map((social_media) => {
        return {
          id: social_media.social_media_id,
          name: social_media.social_media.name,
          link: social_media.link,
        };
      }),
      media: media.map((media) => {
        return {
          id: Number(media.id),
          name: media.file_name,
          path: `${process.env.ADMIN_URL}/storage/${media.id}/${media.file_name}`,
          type: 'PROVIDER',
        };
      }),
    };
  }
}
