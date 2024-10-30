import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY } from '../../common/constants/token.constants';

@Injectable()
export class AtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const accessToken = await this.extractAccessTokenFromCookie(req);

    if (!accessToken) {
      return false;
    }
    try {
      await this.jwtService.verify(accessToken,{secret: JWT_KEY.secret});
      return true;
    } catch (e) {
      return false;
    }
  }

  private extractAccessTokenFromCookie(req: Request) {
    const cookie = req.cookies?.access_token;
    if (!cookie) {
      return null;
    }
    return cookie;
  }
}
