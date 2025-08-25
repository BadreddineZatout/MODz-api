import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { extractTokenFromHeader } from 'src/utils/token';

@Injectable()
export class BanGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.findFirst({
        where: {
          id: payload.sub,
        },
        include: {
          profile: {
            include: {
              client: true,
              employee: true,
            },
          },
        },
      });
      if (
        user.profile.client?.status == Status.REFUSED ||
        user.profile.employee?.status == Status.REFUSED
      ) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
