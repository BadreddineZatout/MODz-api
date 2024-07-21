import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryQueryDto } from './Dtos/category-query.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(query: CategoryQueryDto) {
    const take = query.per_page ?? 10;

    const categories = await this.prisma.category.findMany({
      skip: query.page ? (query.page - 1) * take : 0,
      take,
      where: {
        urgent: query.urgent,
        for_construction: query.for_construction ?? false,
      },
      include: {
        job_types: {
          include: {
            items: true,
          },
        },
        items: query.for_construction ?? false,
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
          job_types: category.job_types.map((job_type) => {
            return {
              ...job_type,
              items: job_type.items.filter(
                (item) => item.category_id === category.id,
              ),
            };
          }),
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
