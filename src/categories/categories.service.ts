import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(urgent?: boolean) {
    const categories = await this.prisma.category.findMany({
      where: {
        urgent,
      },
      include: {
        job_types: true,
      },
    });

    return Promise.all(
      categories.map(async (category) => {
        const media = await this.prisma.media.findMany({
          where: {
            model_type: 'App\\Models\\Category',
            model_id: category.id,
          },
        });
        return {
          ...category,
          media: media.map((media) => {
            return {
              id: Number(media.id),
              name: media.file_name,
              path: `${process.env.ADMIN_URL}/storage/${media.id}/${media.file_name}`,
              type: 'CATEGORY',
            };
          }),
        };
      }),
    );
  }
}
