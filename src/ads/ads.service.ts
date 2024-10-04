import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const ads = await this.prisma.ad.findMany({
      where: {
        is_shown: true,
      },
    });

    return Promise.all(
      ads.map(async (ad) => {
        const media = await this.prisma.media.findMany({
          where: {
            model_type: 'App\\Models\\Ad',
            model_id: ad.id,
            collection_name: 'default',
          },
        });
        return {
          id: ad.id,
          name: ad.name,
          media: media
            .map((media) => {
              return {
                id: Number(media.id),
                name: media.file_name,
                path: `${process.env.ADMIN_URL}/storage/${media.id}/${media.file_name}`,
                type: 'AD',
              };
            })
            ?.shift(),
        };
      }),
    );
  }
}
