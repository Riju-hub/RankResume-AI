import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Loader2, ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';

export const ProtectedRoute = ({ allowedRoles, showUnauthorizedScreen = false }) => {
  const { user, isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Role redirect fallback resolver
  const getFallbackRoute = (role) => {
    const roleRoutes = {
      recruiter: '/recruiter/dashboard',
      candidate: '/jobs',
      admin: '/admin/dashboard',
    };
    return roleRoutes[role] || '/login';
  };

  // 1. High-end Branded Full-Screen Loader
  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated Brand Emblem */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 animate-pulse" />
            <Sparkles className="h-6 w-6 text-indigo-400" />
            <div className="absolute -inset-1 rounded-2xl border border-indigo-500/20 animate-spin [animation-duration:3s]" />
          </div>

          {/* Loading status */}
          <div className="mt-6 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">
              Verifying credentials...
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Connecting to secure session</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Guard with Location State Preservation
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Role-Based Access Control
  const isAuthorized = !allowedRoles || allowedRoles.includes(user?.role);

  if (!isAuthorized) {
    // Option A: Render a clean 403 Forbidden Screen
    if (showUnauthorizedScreen) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 text-center backdrop-blur-xl shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            
            <h2 className="mt-4 text-lg font-bold text-zinc-100">Access Restricted</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Your account role (<span className="font-semibold text-zinc-200">{user?.role || 'Guest'}</span>) does not have permission to view this section.
            </p>

            <div className="mt-6">
              <Link
                to={getFallbackRoute(user?.role)}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 text-xs font-medium text-zinc-200 transition-all hover:bg-zinc-700 active:scale-95"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Option B: Direct Redirect to role-appropriate route
    return <Navigate to={getFallbackRoute(user?.role)} replace />;
  }

  // 4. Render Authorized Route
  return <Outlet />;
};

export default ProtectedRoute;