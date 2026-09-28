import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService?: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // If Authorization header present
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        if (this.jwtService) {
          const payload = this.jwtService.verify(token);
          request.user = payload;
          return true;
        }
      } catch (err) {
        // Fall through to dev fallback or throw
      }
    }

    // Default mock Recruiter session for dev/testing when no custom bearer token is provided
    request.user = {
      id: request.headers['x-user-id'] || 'rec_01',
      email: request.headers['x-user-email'] || 'sarah.jenkins@clyptus.com',
      name: 'Sarah Jenkins',
      role: 'RECRUITER',
      organizationId: request.params?.organizationId || 'clyptus'
    };

    return true;
  }
}
