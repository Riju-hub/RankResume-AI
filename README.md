# RankResume AI 🚀
### AI-Powered Applicant Tracking System & Semantic Candidate Ranking Engine

RankResume AI is a full-stack recruitment platform designed to organize hiring workflows and support recruiters with AI-assisted resume evaluation. It brings job discovery, applications, resume processing, candidate match scoring, and recruiter pipeline management into one place.

> **Note:** AI-generated scores are decision-support signals, not definitive judgments of a candidate's ability. Recruiters should review resumes and apply consistent, job-related criteria.

## 🌐 Live Demo

- **Frontend:** https://rankresume.vercel.app/
- **Backend API:** https://rankresume-ai.onrender.com

## ✨ Key Features

### 👤 Candidate Portal
- Browse and search job listings.
- Filter jobs and view job details.
- Save jobs for later.
- Submit applications with a PDF resume.
- Track submitted applications and their stages.
- Share ratings and comments on job listings.

### 🧑‍💼 Recruiter Workspace
- View recruitment activity from a dashboard.
- Create, edit, and manage job postings.
- Review applicants and AI-assisted match scores.
- Manage candidates with a Kanban-style pipeline:
  `Applied → Screening → Interview → Offer / Rejected`
- Trigger email notifications when application statuses change.

### 🤖 AI-Assisted Resume Evaluation
- Extract text from uploaded PDF resumes.
- Evaluate resume information against job-specific requirements using Google Gemini.
- Help recruiters compare relevant skills, experience, and project evidence.
- Store evaluation results with the related application.

### 🔐 Authentication & Security
- JWT-based authentication.
- Role-based access control for candidates and recruiters.
- Password hashing with Bcrypt.js.
- Password-reset tokens generated using Node.js cryptographic utilities, stored as hashes, and configured with an expiry.
- Centralized API error handling and protected routes.

## 🧰 Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React 18, Vite, Material UI, Tailwind CSS, Framer Motion |
| API communication | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| AI evaluation | Google Gemini 2.5 via `@google/genai` |
| Resume processing | Multer, PDF text extraction (`pdf-parse`) |
| File storage | Supabase Storage |
| Authentication | JSON Web Tokens (JWT), Bcrypt.js |
| Email notifications | Nodemailer and/or Resend, depending on configuration |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## 🏗️ Architecture Overview

```text
┌────────────────────────────┐
│       React + Vite UI      │
│ Candidate & Recruiter Apps │
└──────────────┬─────────────┘
               │ HTTPS / REST API
               ▼
┌────────────────────────────┐
│     Node.js + Express      │
│ Routes · Controllers       │
│ Auth/RBAC · Services       │
└───────┬─────────┬──────────┘
        │         │
        ▼         ▼
┌────────────┐  ┌──────────────────┐
│ MongoDB    │  │ External Services│
│ Atlas      │  │ Gemini · Supabase│
└────────────┘  │ Email Provider   │
                └──────────────────┘
```

## 📂 Project Structure

```text
RankResume-AI/
├── README.md
├── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── jobs/
│   │   │   └── kanban/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── candidate/
│   │   │   └── recruiter/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vercel.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    └── package.json
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (preferably Node.js 20 LTS, or the version supported by your dependencies)
- npm
- MongoDB Atlas or another compatible MongoDB instance
- Supabase project and Storage bucket (if using resume storage)
- Google Gemini API key (for AI evaluation)
- Email provider credentials (if email notifications are enabled)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/RankResume-AI.git
cd RankResume-AI
```

Replace `YOUR_USERNAME` with your GitHub username and adjust the repository URL if needed.

### 2. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in both `frontend/` and `backend/`. **Do not commit real secrets.**

#### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, set the frontend variable to the deployed backend API base URL:

```env
VITE_API_BASE_URL=https://rankresume-ai.onrender.com/api
```

#### `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password_or_app_password
RESEND_API_KEY=your_resend_api_key

FRONTEND_URL=http://localhost:5173
```

Configure only the variables required by your selected integrations. Variable names must match those read by your backend code. If both Nodemailer and Resend are present, configure the provider your email service actually uses.

**Never push `.env` files, database URIs, API keys, JWT secrets, email credentials, or private tokens to GitHub.** Add environment files to `.gitignore`; you may commit an `.env.example` containing placeholders.

### 4. Run the backend

In a terminal:

```bash
cd backend
npm run dev
```

If `backend/package.json` does not define a `dev` script, use the script configured there, or add a development script such as `nodemon src/server.js` if Nodemon is installed. The backend should listen on the port configured by `PORT` (typically `5000`).

### 5. Run the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Vite typically serves the frontend at `http://localhost:5173`. Check the `scripts` section in each `package.json` if your local commands differ.

## 🔑 Environment Variables Reference

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Frontend base URL for API requests |
| `PORT` | Backend listening port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing and verification secret |
| `SUPABASE_URL` | Supabase project endpoint |
| `SUPABASE_KEY` | Supabase key used by the backend |
| `GEMINI_API_KEY` | Gemini API access |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials if Nodemailer is configured |
| `RESEND_API_KEY` | Resend API access if that provider is configured |
| `FRONTEND_URL` | Frontend origin for redirects, CORS, or email links |

Use minimum-required permissions for provider keys. Keep privileged Supabase keys server-side only.

## 🧭 Main Application Flow

1. A recruiter creates a job listing and defines its requirements.
2. A candidate discovers the role and submits an application with a resume PDF.
3. The backend processes the uploaded document and extracts its text.
4. The AI service evaluates the extracted content against job criteria.
5. The application and evaluation details are saved for recruiter review.
6. Recruiters review applicants and update their pipeline stage.
7. The configured email service can notify candidates about status changes.

AI evaluation quality depends on text extraction, prompt design, job criteria, and model output. Review results manually.

## 🚀 Deployment

### Frontend — Vercel
1. Import the GitHub repository into Vercel.
2. Set the frontend project root directory to `frontend`.
3. Set `VITE_API_BASE_URL` to the deployed backend API base URL.
4. Confirm the build command and output directory (`dist`) match the project configuration.
5. Ensure SPA rewrites support client-side routes when refreshing nested pages.

### Backend — Render
1. Create a Web Service connected to the repository.
2. Set the root directory to `backend` if deploying from a monorepo.
3. Configure build and start commands based on `backend/package.json`.
4. Add required environment variables in Render's dashboard.
5. Configure CORS and `FRONTEND_URL` for the deployed frontend origin.
6. Verify database, storage, Gemini, and email integrations after deployment.

Set secrets in the hosting provider's environment configuration; do not rely on local `.env` files in cloud deployments.

## 🛡️ Security & Responsible Use

- Keep secrets out of source control and rotate any key that was accidentally exposed.
- Validate uploaded file types and sizes, and handle malformed PDFs safely.
- Restrict private API endpoints with authentication and role checks.
- Use HTTPS in production and apply least-privilege database and storage permissions.
- Avoid exposing private resume URLs or candidate information publicly.
- Provide understandable evaluation criteria and encourage human review.
- Test account deletion and associated file/data cleanup before production use.
- Follow applicable privacy, employment, and data-protection requirements.

## 🔮 Future Enhancements

- Google Calendar integration for interview scheduling.
- Candidate-to-recruiter chat using WebSockets.
- Structured AI-generated feedback summaries.
- Evaluation explanations linking job criteria to resume evidence.
- Automated tests, audit logging, monitoring, and analytics.

## 👨‍💻 Author

**Bhabasindhu Das**

- **Project:** RankResume AI
- **Frontend:** https://rankresume.vercel.app/
- **Backend:** https://rankresume-ai.onrender.com

## 📄 License

No license has been specified yet. If you plan to make this repository open source, add a `LICENSE` file with your chosen license. Until then, all rights are reserved by default.

---

<p align="center">
  Built with React, Node.js, MongoDB, Supabase, and Google Gemini.
  <br />
  <strong>Smarter screening. Clearer workflows. Human-led hiring.</strong>
</p>
