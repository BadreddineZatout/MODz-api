import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/utils/token';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const jwtService = new JwtService();
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return parseInt(payload.sub);
  },
);
