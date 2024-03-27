import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from '../Framework.js';
import { lucia } from '../lib/Lucia.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const { session, user } = await this.extractFromHeader(request);
      if (!session) {
        throw new UnauthorizedException();
      }

      request.user = user;
      request.session = session;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async extractFromHeader(request: Request) {
    return lucia.validateSession(request.cookies.auth_session)
  }
}
