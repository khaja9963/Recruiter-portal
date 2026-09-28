import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam
} from '@nestjs/swagger';
import { RecruiterService } from './recruiter.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { OrganizationIsolationGuard } from '../../common/guards/organization-isolation.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CandidateSearchDto } from './dto/candidate-search.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';
import { CreateApplicationNoteDto } from './dto/create-application-note.dto';
import { ScheduleInterviewDto } from './dto/schedule-interview.dto';
import { CreateInterviewFeedbackDto } from './dto/create-interview-feedback.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateRecruiterProfileDto } from './dto/update-recruiter-profile.dto';
import { JobStatus, ApplicationStage, InterviewStatus, OfferStatus } from '@prisma/client';

@ApiTags('Recruiter')
@ApiBearerAuth()
@Controller('org/:organizationId/recruiter')
@UseGuards(JwtAuthGuard, RolesGuard, OrganizationIsolationGuard)
@Roles('RECRUITER')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  // 1. RECRUITER DASHBOARD
  @Get('dashboard')
  @ApiOperation({ summary: 'Get recruiter dashboard KPIs, metrics, and active items' })
  @ApiParam({ name: 'organizationId', description: 'Organization tenant ID' })
  @ApiResponse({ status: 200, description: 'Dashboard stats and recent activity retrieved' })
  async getDashboard(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.getDashboard(organizationId, user.id);
  }

  // 2. JOB MANAGEMENT
  @Get('jobs')
  @ApiOperation({ summary: 'List organization jobs with filtering and pagination' })
  async getJobs(
    @CurrentOrg() organizationId: string,
    @Query('status') status?: JobStatus,
    @Query('search') search?: string,
    @Query('department') department?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.recruiterService.getJobs(organizationId, {
      status,
      search,
      department,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined
    });
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Get details of a specific job requisition' })
  async getJobById(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string
  ) {
    return this.recruiterService.getJobById(organizationId, jobId);
  }

  @Post('jobs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new job posting' })
  async createJob(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateJobDto
  ) {
    return this.recruiterService.createJob(organizationId, user.id, dto);
  }

  @Patch('jobs/:jobId')
  @ApiOperation({ summary: 'Update an existing job posting' })
  async updateJob(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string,
    @Body() dto: UpdateJobDto
  ) {
    return this.recruiterService.updateJob(organizationId, jobId, dto);
  }

  @Post('jobs/:jobId/publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publish a draft or paused job' })
  async publishJob(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string
  ) {
    return this.recruiterService.publishJob(organizationId, jobId);
  }

  @Post('jobs/:jobId/pause')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pause an active job posting' })
  async pauseJob(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string
  ) {
    return this.recruiterService.pauseJob(organizationId, jobId);
  }

  @Post('jobs/:jobId/close')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Close a job posting' })
  async closeJob(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string
  ) {
    return this.recruiterService.closeJob(organizationId, jobId);
  }

  @Delete('jobs/:jobId')
  @ApiOperation({ summary: 'Delete a job posting' })
  async deleteJob(
    @CurrentOrg() organizationId: string,
    @Param('jobId') jobId: string
  ) {
    return this.recruiterService.deleteJob(organizationId, jobId);
  }

  // 3. CANDIDATE SEARCH & PROFILES
  @Get('candidates')
  @ApiOperation({ summary: 'Search and filter candidate talent pool' })
  async searchCandidates(
    @CurrentOrg() organizationId: string,
    @Query() query: CandidateSearchDto
  ) {
    return this.recruiterService.searchCandidates(organizationId, query);
  }

  @Get('candidates/:candidateId')
  @ApiOperation({ summary: 'Get candidate full profile with application & interview history' })
  async getCandidateById(
    @CurrentOrg() organizationId: string,
    @Param('candidateId') candidateId: string
  ) {
    return this.recruiterService.getCandidateById(organizationId, candidateId);
  }

  @Get('candidates/:candidateId/resume')
  @ApiOperation({ summary: 'Get candidate secure verified resume signed URL' })
  async getCandidateResume(
    @CurrentOrg() organizationId: string,
    @Param('candidateId') candidateId: string
  ) {
    return this.recruiterService.getCandidateResume(organizationId, candidateId);
  }

  // 4. APPLICATION MANAGEMENT
  @Get('applications')
  @ApiOperation({ summary: 'List candidate applications with filters' })
  async getApplications(
    @CurrentOrg() organizationId: string,
    @Query('jobId') jobId?: string,
    @Query('stage') stage?: ApplicationStage,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.recruiterService.getApplications(organizationId, {
      jobId,
      stage,
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined
    });
  }

  @Get('applications/pipeline')
  @ApiOperation({ summary: 'Get Kanban pipeline counts by stage' })
  async getPipeline(
    @CurrentOrg() organizationId: string,
    @Query('jobId') jobId?: string
  ) {
    return this.recruiterService.getPipeline(organizationId, jobId);
  }

  @Patch('applications/:applicationId/stage')
  @ApiOperation({ summary: 'Update recruitment stage of an application' })
  async updateApplicationStage(
    @CurrentOrg() organizationId: string,
    @Param('applicationId') applicationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateApplicationStageDto
  ) {
    return this.recruiterService.updateApplicationStage(
      organizationId,
      applicationId,
      dto.stage,
      user.id,
      dto.reason
    );
  }

  @Post('applications/:applicationId/shortlist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Shortlist an application' })
  async shortlistApplication(
    @CurrentOrg() organizationId: string,
    @Param('applicationId') applicationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.shortlistApplication(organizationId, applicationId, user.id);
  }

  @Post('applications/:applicationId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject an application' })
  async rejectApplication(
    @CurrentOrg() organizationId: string,
    @Param('applicationId') applicationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.rejectApplication(organizationId, applicationId, user.id);
  }

  @Post('applications/:applicationId/notes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an internal confidential note to an application' })
  async addApplicationNote(
    @CurrentOrg() organizationId: string,
    @Param('applicationId') applicationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateApplicationNoteDto
  ) {
    return this.recruiterService.addApplicationNote(organizationId, applicationId, user.id, dto.content);
  }

  // 5. INTERVIEW MANAGEMENT
  @Get('interviews')
  @ApiOperation({ summary: 'List recruiter interviews' })
  async getInterviews(
    @CurrentOrg() organizationId: string,
    @Query('status') status?: InterviewStatus
  ) {
    return this.recruiterService.getInterviews(organizationId, { status });
  }

  @Post('interviews')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule an interview round' })
  async scheduleInterview(
    @CurrentOrg() organizationId: string,
    @Body() dto: ScheduleInterviewDto
  ) {
    return this.recruiterService.scheduleInterview(organizationId, dto);
  }

  @Post('interviews/:interviewId/feedback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit interview feedback and rating' })
  async addInterviewFeedback(
    @CurrentOrg() organizationId: string,
    @Param('interviewId') interviewId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateInterviewFeedbackDto
  ) {
    return this.recruiterService.addInterviewFeedback(organizationId, interviewId, user.id, dto);
  }

  // 6. OFFERS
  @Get('offers')
  @ApiOperation({ summary: 'List recruiter offers' })
  async getOffers(
    @CurrentOrg() organizationId: string,
    @Query('status') status?: OfferStatus
  ) {
    return this.recruiterService.getOffers(organizationId, { status });
  }

  @Post('offers')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate and send offer package to candidate' })
  async createOffer(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateOfferDto
  ) {
    return this.recruiterService.createOffer(organizationId, user.id, dto);
  }

  // 7. ANALYTICS
  @Get('analytics')
  @ApiOperation({ summary: 'Get recruiter-specific performance analytics' })
  async getAnalytics(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.getAnalytics(organizationId, user.id);
  }

  // 8. NOTIFICATIONS
  @Get('notifications')
  @ApiOperation({ summary: 'Get recruiter notifications' })
  async getNotifications(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.getNotifications(organizationId, user.id);
  }

  // 9. RECRUITER PROFILE
  @Get('profile')
  @ApiOperation({ summary: 'Get recruiter profile details' })
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.recruiterService.getProfile(user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update recruiter profile details' })
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateRecruiterProfileDto
  ) {
    return this.recruiterService.updateProfile(user.id, dto);
  }

  // 10. ATS KANBAN PIPELINE
  @Get('ats')
  @ApiOperation({ summary: 'Get full ATS Kanban pipeline data by job' })
  async getAts(
    @CurrentOrg() organizationId: string,
    @Query('jobId') jobId?: string
  ) {
    return this.recruiterService.getAtsPipeline(organizationId, jobId);
  }

  // 11. RECRUITER TASKS
  @Get('tasks')
  @ApiOperation({ summary: 'List recruiter assigned recruitment tasks' })
  async getTasks(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query('status') status?: string,
    @Query('priority') priority?: string
  ) {
    return this.recruiterService.getTasks(organizationId, user.id, { status, priority });
  }

  @Post('tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new recruiter task' })
  async createTask(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.createTask(organizationId, user.id, body);
  }

  @Patch('tasks/:taskId')
  @ApiOperation({ summary: 'Update recruiter task status or details' })
  async updateTask(
    @CurrentOrg() organizationId: string,
    @Param('taskId') taskId: string,
    @Body() body: any
  ) {
    return this.recruiterService.updateTask(organizationId, taskId, body);
  }

  @Delete('tasks/:taskId')
  @ApiOperation({ summary: 'Delete a recruiter task' })
  async deleteTask(
    @CurrentOrg() organizationId: string,
    @Param('taskId') taskId: string
  ) {
    return this.recruiterService.deleteTask(organizationId, taskId);
  }

  // 12. MESSAGING
  @Get('messages')
  @ApiOperation({ summary: 'Get recruitment candidate conversations and messages' })
  async getMessages(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query('candidateId') candidateId?: string
  ) {
    return this.recruiterService.getMessages(organizationId, user.id, candidateId);
  }

  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send recruitment message to candidate' })
  async sendMessage(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.sendMessage(organizationId, user.id, body);
  }

  // 13. TOKEN ACCOUNTING
  @Get('tokens')
  @ApiOperation({ summary: 'View allocated, used, and remaining recruitment AI tokens' })
  async getTokens(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.getTokens(organizationId, user.id);
  }

  @Post('tokens/consume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Transactionally record token consumption for an AI operation' })
  async consumeTokens(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { feature: string; tokens: number; description?: string }
  ) {
    return this.recruiterService.consumeTokens(organizationId, user.id, body);
  }

  // 14. AI RECRUITMENT SUITE
  @Post('ai/resume-parse')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Resume parsing and skill extraction' })
  async parseResume(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.useAiResumeParser(organizationId, user.id, body);
  }

  @Post('ai/match')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Candidate-Job semantic suitability matching' })
  async matchJob(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.useAiJobMatching(organizationId, user.id, body);
  }

  @Post('ai/job-description')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI enhanced job description assistance' })
  async generateJobDescription(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.useAiJobDescription(organizationId, user.id, body);
  }

  @Post('ai/interview-questions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI generation of role-specific interview scorecard questions' })
  async generateInterviewQuestions(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any
  ) {
    return this.recruiterService.useAiInterviewQuestions(organizationId, user.id, body);
  }

  // 15. SAVED CANDIDATES
  @Get('candidates/saved')
  @ApiOperation({ summary: 'List saved candidate bookmarks' })
  async getSavedCandidates(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser
  ) {
    return this.recruiterService.getSavedCandidates(organizationId, user.id);
  }

  @Post('candidates/:candidateId/save')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bookmark a candidate to saved talent pool' })
  async saveCandidate(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Param('candidateId') candidateId: string,
    @Body('notes') notes?: string
  ) {
    return this.recruiterService.saveCandidate(organizationId, user.id, candidateId, notes);
  }

  @Delete('candidates/:candidateId/save')
  @ApiOperation({ summary: 'Remove a candidate from saved talent pool' })
  async removeSavedCandidate(
    @CurrentOrg() organizationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Param('candidateId') candidateId: string
  ) {
    return this.recruiterService.removeSavedCandidate(organizationId, user.id, candidateId);
  }
}
