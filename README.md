# Clyptus — Recruiter & Employer Portal

A full-stack, enterprise-grade Recruiter Portal and Applicant Tracking System (ATS) engineered for modern talent acquisition teams. Built with a clean, focused **White & Blue** aesthetic, high data density, and human-in-the-loop AI workflows.

---

## 🌟 Architecture Overview

```
recruiter-portal/
├── frontend/             # React 19 + TypeScript + Vite + Tailwind CSS + Zustand
│   ├── src/
│   │   ├── components/   # Modular UI components (Tables, Modals, Stats, Charts)
│   │   ├── layouts/      # Recruiter layout with 16-item navigation & persistent header
│   │   ├── pages/        # 16 Recruiter-specific modules + Employer Login
│   │   ├── services/     # Axios API client with org isolation headers
│   │   ├── store/        # Zustand global state management
│   │   └── types/        # Strongly-typed TypeScript interfaces
│   └── ...
└── backend/              # NestJS + TypeScript + Prisma ORM + PostgreSQL
    ├── src/
    │   ├── common/       # Guards, Decorators (Org-Isolation, Roles, JWT)
    │   ├── infrastructure/ # Prisma ORM database connection & service
    │   └── modules/      # Recruiter module, controller, DTOs & business logic
    ├── prisma/           # PostgreSQL schema with ATS models
    └── ...
```

---

## 🚀 Key Modules & Capabilities

The portal is strictly scoped to the **Recruiter / Employer** operational role:

1. **Employer Login**: Clean corporate authentication card with validation, remember me, and role enforcement.
2. **Dashboard**: High-level KPIs, recruitment funnel, trend analysis, active requisitions, upcoming interviews, and recent applications.
3. **Job Management**: Create, edit, publish/unpublish, and review requisitions with compensation ranges, department mapping, and requirements.
4. **Candidate Directory & Search**: Multi-facet candidate discovery with boolean search, skill tags, location filters, and experience level sorting.
5. **ATS Pipeline (Kanban)**: Interactive 7-stage hiring pipeline (`Applied` ➔ `Screening` ➔ `Shortlisted` ➔ `Interview` ➔ `Offer` ➔ `Hired` / `Rejected`).
6. **Interview Scheduling**: Multi-round interview coordination with calendar sync, meeting links, and structured feedback rubrics.
7. **Offer Management**: Offer letter drafting, compensation breakdowns, expiration timers, and approval status tracking.
8. **Recruiter Messages**: In-app candidate messaging threads with templates and quick replies.
9. **Tasks & Reminders**: Daily recruiter agenda tracking (`Due Today`, `Upcoming`, `Overdue`, `Completed`).
10. **AI Decision Support**: Human-in-the-loop resume parsing, scorecard synthesis, interview question generation, and job description drafting powered by Google Gemini API.
11. **Token Allocation**: Real-time balance tracker (Allocated: 10,000 / Used: 2,840 / Remaining: 7,160) and consumption ledger.
12. **Analytics & Funnel**: Real-time recruitment velocity and conversion metrics.
13. **Notifications**: Priority hiring alerts, status updates, and candidate response alerts.
14. **Profile & Governance**: Recruiter profile management within strictly enforced organization boundaries.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS (Enterprise White & Blue theme `#2563EB`, `#1E3A8A`, `#0F172A`)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Forms & Validation**: Zod + React Hook Form

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database & ORM**: PostgreSQL via Prisma ORM
- **Authentication**: JWT & Passport
- **Architecture**: Modular Domain-Driven Design with Strict Multi-Tenant Organization Isolation (`OrganizationIsolationGuard`)
- **API Documentation**: OpenAPI / Swagger (`/api/docs`)
- **Caching & Queues**: Redis & BullMQ ready
- **AI Engine**: Google Gemini API integration

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL instance (optional for local mock mode)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will launch at `http://127.0.0.1:5173`.

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update DATABASE_URL and secrets in .env if running with live PostgreSQL
npx prisma generate
npm run start:dev
```
The REST API will launch at `http://127.0.0.1:3000/api/v1` and Swagger documentation at `http://127.0.0.1:3000/api/docs`.

---

## 🔒 Security & Multi-Tenancy

- **Strict Organization Isolation**: Every API endpoint under `/api/v1/org/:organizationId/recruiter/*` validates that the authenticated recruiter belongs solely to the target organization (`organizationId`).
- **Recruiter Role Guard**: Access is restricted strictly to Recruiter and Employer roles. Platform admin, org admin, and candidate portal surfaces are completely isolated.
- **Input Validation**: All payloads are validated using NestJS `ValidationPipe` with `class-validator` DTOs.

---

## 📄 License
Private & Proprietary — Clyptus Inc. All rights reserved.
