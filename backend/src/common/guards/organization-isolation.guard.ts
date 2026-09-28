import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class OrganizationIsolationGuard implements CanActivate {
  constructor(private readonly prisma?: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const organizationId = request.params?.organizationId;
    const user = request.user;

    if (!organizationId) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException('User is not authenticated');
    }

    // Verify user belongs to requested organization
    if (user.organizationId && user.organizationId !== organizationId) {
      throw new ForbiddenException(
        `Cross-organization access forbidden: User belongs to ${user.organizationId}, but requested ${organizationId}`
      );
    }

    // Attach validated organizationId to request for downstream handlers
    request.organizationId = organizationId;
    return true;
  }
}
