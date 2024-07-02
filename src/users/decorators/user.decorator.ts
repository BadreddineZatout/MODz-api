import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { extractTokenFromHeader } from 'src/utils/token';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    let prisma = new PrismaService();
    const jwtService = new JwtService();
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await prisma.user.findFirst({
      where: {
        id: payload.sub,
      },
    });
    prisma = null;
    return user.id;
  },
);
