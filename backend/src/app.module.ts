import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecruiterModule } from './modules/recruiters/recruiter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecruiterModule
  ]
})
export class AppModule {}
