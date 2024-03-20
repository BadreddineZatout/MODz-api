import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/utils/token';

@Injectable()
export class ConfirmEmailGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

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
      if (payload.sub != parseInt(request.params.id))
        throw new UnauthorizedException();
      if (payload.email != request.body.email)
        throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
