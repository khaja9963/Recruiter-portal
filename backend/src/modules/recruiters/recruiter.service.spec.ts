import { Test, TestingModule } from '@nestjs/testing';
import { RecruiterService } from './recruiter.service';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApplicationStage, JobStatus, OfferStatus } from '@prisma/client';

describe('RecruiterService', () => {
  let service: RecruiterService;
  let prisma: PrismaService;

  const mockPrisma = {
    job: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    application: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      groupBy: jest.fn(),
    },
    candidate: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    interview: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    offer: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    organization: {
      findFirst: jest.fn(),
    },
    organizationMember: {
      findFirst: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
    applicationTimeline: {
      create: jest.fn(),
    },
    applicationNote: {
      create: jest.fn(),
    },
    interviewFeedback: {
      create: jest.fn(),
      findFirst: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecruiterService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<RecruiterService>(RecruiterService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Organization Isolation & Verification', () => {
    it('should throw ForbiddenException if user does not belong to organization', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 'org-clyptus', slug: 'clyptus' });
      mockPrisma.organizationMember.findFirst.mockResolvedValue(null);

      await expect(
        service.getDashboard('clyptus', 'user-foreign'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if organization does not exist', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);

      await expect(
        service.getDashboard('nonexistent-org', 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Job Management', () => {
    it('should validate valid job state transitions', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 'org-clyptus', slug: 'clyptus' });
      mockPrisma.organizationMember.findFirst.mockResolvedValue({ organizationId: 'org-clyptus', role: 'RECRUITER' });
      mockPrisma.job.findFirst.mockResolvedValue({
        id: 'job-101',
        organizationId: 'org-clyptus',
        status: JobStatus.DRAFT,
      });
      mockPrisma.job.update.mockResolvedValue({
        id: 'job-101',
        status: JobStatus.PUBLISHED,
      });

      const res = await service.publishJob('clyptus', 'job-101');
      expect(res.data.status).toBe(JobStatus.PUBLISHED);
    });

    it('should reject invalid transition (e.g. publishing an already closed job)', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 'org-clyptus', slug: 'clyptus' });
      mockPrisma.organizationMember.findFirst.mockResolvedValue({ organizationId: 'org-clyptus', role: 'RECRUITER' });
      mockPrisma.job.findFirst.mockResolvedValue({
        id: 'job-101',
        organizationId: 'org-clyptus',
        status: JobStatus.CLOSED,
      });

      await expect(
        service.publishJob('clyptus', 'job-101'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Application Stage Transitions', () => {
    it('should record stage change in application timeline and audit log', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 'org-clyptus', slug: 'clyptus' });
      mockPrisma.organizationMember.findFirst.mockResolvedValue({ organizationId: 'org-clyptus', role: 'RECRUITER' });
      mockPrisma.application.findFirst.mockResolvedValue({
        id: 'app-1',
        stage: ApplicationStage.APPLIED,
        job: { organizationId: 'org-clyptus' },
      });
      mockPrisma.application.update.mockResolvedValue({
        id: 'app-1',
        stage: ApplicationStage.SHORTLISTED,
      });

      const result = await service.updateApplicationStage(
        'clyptus',
        'app-1',
        ApplicationStage.SHORTLISTED,
        'recruiter-1',
      );

      expect(result.data.stage).toBe(ApplicationStage.SHORTLISTED);
      expect(mockPrisma.applicationTimeline.create).toHaveBeenCalled();
    });

    it('should reject illegal stage transition (e.g. HIRED to APPLIED)', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 'org-clyptus', slug: 'clyptus' });
      mockPrisma.organizationMember.findFirst.mockResolvedValue({ organizationId: 'org-clyptus', role: 'RECRUITER' });
      mockPrisma.application.findFirst.mockResolvedValue({
        id: 'app-1',
        stage: ApplicationStage.HIRED,
        job: { organizationId: 'org-clyptus' },
      });

      await expect(
        service.updateApplicationStage(
          'clyptus',
          'app-1',
          ApplicationStage.APPLIED,
          'recruiter-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Offer Management', () => {
    it('should allow creating and sending an offer package', async () => {
      mockPrisma.offer.create.mockResolvedValue({
        id: 'offer-1',
        organizationId: 'org-clyptus',
        candidateId: 'cand-1',
        jobId: 'job-1',
        baseSalary: 150000,
        status: OfferStatus.SENT,
      });
      mockPrisma.application.update.mockResolvedValue({
        id: 'app-1',
        stage: ApplicationStage.OFFER,
      });

      const res = await service.createOffer('org-clyptus', 'recruiter-1', {
        applicationId: 'app-1',
        candidateId: 'cand-1',
        jobId: 'job-1',
        baseSalary: 150000,
        joiningDate: '2026-10-15',
      });

      expect(res.data.status).toBe(OfferStatus.SENT);
      expect(res.success).toBe(true);
    });

    it('should list offers filtered by organization', async () => {
      mockPrisma.offer.findMany.mockResolvedValue([
        { id: 'off-1', organizationId: 'org-clyptus', baseSalary: 180000, status: OfferStatus.SENT },
      ]);

      const res = await service.getOffers('org-clyptus');
      expect(res.success).toBe(true);
      expect(res.data).toHaveLength(1);
    });
  });
});
