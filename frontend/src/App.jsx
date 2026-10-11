// frontend/src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Chatbot from './components/common/Chatbot';
import ProtectedRoute from './components/common/ProtectedRoute';
import ATS from './components/common/ATS';

// Landing Page & Auth
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import MarketJobs from './pages/recruiter/MarketJobs'; // <--- Import MarketJobs
import CreateJob from './pages/recruiter/CreateJob';
import JobApplicants from './pages/recruiter/JobApplicants';
import PipelineView from './pages/recruiter/PipelineView';

// Candidate Pages
import JobBoard from './pages/candidate/JobBoard';
import MyApplications from './pages/candidate/MyApplications';
import JobDetails from './pages/candidate/JobDetails';
import SavedJobs from './pages/candidate/SavedJobs';

// Shared Pages
import Profile from './components/common/Profile';
import HelpFeedback from './components/common/HelpFeedback';
import TermsConditions from './components/common/TermsConditions';
import NotFound from './pages/NotFound';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8fbff] text-slate-900 selection:bg-pink-500 selection:text-white antialiased font-sans">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[120px] will-change-transform" />
        <div className="absolute top-1/3 -right-20 h-[520px] w-[520px] rounded-full bg-pink-500/15 blur-[130px] will-change-transform" />
      </div>

      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="relative z-10 flex flex-1 pt-16">
        {isAuthenticated && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`flex min-h-[calc(100vh-4rem)] flex-1 flex-col transition-all duration-300 ${
            isAuthenticated ? 'lg:pl-[280px]' : ''
          }`}
        >
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<AppLayout />}>
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/help" element={<HelpFeedback />} />
          <Route path="/ats" element={<ATS />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={['candidate', 'recruiter']} />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={['candidate']} />}
          >
            <Route path="/my-applications" element={<MyApplications />} />
          </Route>
          <Route path="/candidate/jobs/:id" element={<JobDetails />} />
          <Route path="/candidate/saved-jobs" element={<SavedJobs />} />

          <Route
            element={<ProtectedRoute allowedRoles={['recruiter']} />}
          >
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/market-jobs" element={<MarketJobs />} /> {/* <--- New Route */}
            <Route path="/recruiter/create-job" element={<CreateJob />} />
            <Route
              path="/recruiter/jobs/:jobId/applicants"
              element={<JobApplicants />}
            />
            <Route
              path="/recruiter/jobs/:jobId/pipeline"
              element={<PipelineView />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;