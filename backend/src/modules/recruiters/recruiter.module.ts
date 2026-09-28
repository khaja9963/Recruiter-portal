import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RecruiterController } from './recruiter.controller';
import { RecruiterService } from './recruiter.service';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'clyptus-job-portal-jwt-secret-key-2026',
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [RecruiterController],
  providers: [RecruiterService, PrismaService],
  exports: [RecruiterService]
})
export class RecruiterModule {}
