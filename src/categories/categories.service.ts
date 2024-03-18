import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async saveMedia(id: number, files: Array<Express.Multer.File>) {
    const promises = files.map(async (file) => {
      const media = await this.prisma.media.create({
        data: {
          name: file.filename,
          path: file.destination + '/' + file.filename,
          type: 'CATEGORY',
        },
      });
      await this.prisma.category.update({
        where: { id: id },
        data: {
          media: {
            connect: { id: media.id },
          },
        },
        include: {
          media: true,
        },
      });
    });
  }
}
