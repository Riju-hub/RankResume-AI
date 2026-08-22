import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Landing Page
import LandingPage from './pages/LandingPage';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import CreateJob from './pages/recruiter/CreateJob';
import JobApplicants from './pages/recruiter/JobApplicants';
import PipelineView from './pages/recruiter/PipelineView';

// Candidate Pages
import JobBoard from './pages/candidate/JobBoard';
import MyApplications from './pages/candidate/MyApplications';

// 404 Page
import NotFound from './pages/NotFound';

// Modern App Layout Wrapper
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Fixed Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Top offset for fixed h-16 (64px) Navbar */}
      <div className="flex flex-1 pt-16">
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={`flex-1 px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300 ${
            isAuthenticated ? 'lg:ml-64' : ''
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* 1. Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. Standalone Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 3. Main Authenticated / App Shell */}
      <Route element={<AppLayout />}>
        {/* Public & Candidate Accessible Job Board */}
        <Route path="/jobs" element={<JobBoard />} />

        {/* Protected Candidate Routes */}
        <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        {/* Protected Recruiter Routes */}
        <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/create-job" element={<CreateJob />} />
          <Route path="/recruiter/jobs/:jobId/applicants" element={<JobApplicants />} />
          <Route path="/recruiter/jobs/:jobId/pipeline" element={<PipelineView />} />
        </Route>
      </Route>

      {/* 4. Standalone Catch-All 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;