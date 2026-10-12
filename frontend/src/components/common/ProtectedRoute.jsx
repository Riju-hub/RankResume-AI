// import React from 'react';
// import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import { Loader2, ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';

// export const ProtectedRoute = ({ allowedRoles, showUnauthorizedScreen = false }) => {
//   const { user, isAuthenticated, loading } = useAuthContext();
//   const location = useLocation();

//   // Role redirect fallback resolver
//   const getFallbackRoute = (role) => {
//     const roleRoutes = {
//       recruiter: '/recruiter/dashboard',
//       candidate: '/jobs',
//       admin: '/admin/dashboard',
//     };
//     return roleRoutes[role] || '/login';
//   };

//   // 1. High-end Branded Full-Screen Loader (White-Blue-Pink Theme)
//   if (loading) {
//     return (
//       <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f8fbff] px-4 font-sans antialiased">
//         {/* Hardware-Accelerated Ambient Glowing Mesh */}
//         <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//           <div className="absolute -top-24 -left-20 h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-[120px] will-change-transform" />
//           <div className="absolute -bottom-24 -right-20 h-[540px] w-[540px] rounded-full bg-pink-500/25 blur-[130px] will-change-transform" />
          
//           {/* Subtle Dual-Color Pattern Grid */}
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(236,72,153,0.18)_1px,transparent_1px)] [background-size:26px_26px] opacity-35 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)]" />
//         </div>

//         <div className="relative z-10 flex flex-col items-center text-center">
//           {/* Animated Multi-Color Brand Emblem */}
//           <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/95 bg-white/90 shadow-[0_20px_50px_rgba(37,99,235,0.15),0_10px_30px_rgba(236,72,153,0.12)] backdrop-blur-2xl">
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-pink-500/20 animate-pulse" />
//             <Sparkles className="h-7 w-7 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            
//             {/* Spinning Neon Gradient Ring */}
//             <div className="absolute -inset-1.5 rounded-3xl border-2 border-dashed border-blue-500/40 animate-spin [animation-duration:8s]" />
//           </div>

//           {/* Loading Status Typography */}
//           <div className="mt-7 flex items-center gap-2.5">
//             <Loader2 className="h-4 w-4 animate-spin text-pink-600 stroke-[2.5]" />
//             <span className="text-sm font-black tracking-tight text-slate-900">
//               Verifying credentials...
//             </span>
//           </div>
//           <p className="mt-1.5 font-mono text-xs font-semibold text-slate-500">
//             Connecting to secure neural session
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // 2. Unauthenticated Guard with Location State Preservation
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // 3. Role-Based Access Control
//   const isAuthorized = !allowedRoles || allowedRoles.includes(user?.role);

//   if (!isAuthorized) {
//     // Option A: Render a clean 403 Forbidden Screen
//     if (showUnauthorizedScreen) {
//       return (
//         <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f8fbff] p-4 font-sans antialiased">
//           {/* Ambient Glows */}
//           <div className="pointer-events-none fixed -top-20 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px] transform-gpu will-change-transform" />
//           <div className="pointer-events-none fixed -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500/20 blur-[100px] transform-gpu will-change-transform" />

//           <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/95 bg-white/90 p-7 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
//             {/* Top Multi-Color Rim */}
//             <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-xs">
//               <ShieldAlert className="h-7 w-7 stroke-[2.2]" />
//             </div>
            
//             <h2 className="mt-5 text-xl font-black text-slate-950">Access Restricted</h2>
//             <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600">
//               Your account role (<span className="font-extrabold text-blue-700 uppercase font-mono">{user?.role || 'Guest'}</span>) does not have authorization to view this workspace.
//             </p>

//             <div className="mt-6">
//               <Link
//                 to={getFallbackRoute(user?.role)}
//                 className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
//               >
//                 <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
//                 Return to Dashboard
//               </Link>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Option B: Direct Redirect to role-appropriate route
//     return <Navigate to={getFallbackRoute(user?.role)} replace />;
//   }

//   // 4. Render Authorized Route
//   return <Outlet />;
// };

// export default ProtectedRoute;








// frontend/src/components/common/ProtectedRoute.jsx
import React, { memo } from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Loader2, ShieldAlert, Sparkles, ArrowLeft, Lock } from 'lucide-react';

export const ProtectedRoute = memo(({ allowedRoles, showUnauthorizedScreen = false }) => {
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

  // 1. High-Performance Full-Screen Loader
  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {/* Static, Zero-Lag Atmospheric Mesh */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
          <div 
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Central Loader Card */}
        <div className="relative z-10 flex w-full max-w-xs flex-col items-center rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 text-center shadow-lg shadow-slate-200/50">
          {/* Top Multi-Color Brand Rim */}
          <div 
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 sm:h-1.5 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r from-cyan-400 via-blue-600 via-indigo-600 to-pink-500" 
          />

          {/* Emblem */}
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-pink-500 p-[2px] shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white text-blue-600">
              <Sparkles className="h-6 w-6 stroke-[2.2]" />
            </div>
          </div>

          {/* Loading Typography */}
          <div className="mt-5 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-600 stroke-[2.5]" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Verifying session...
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Checking workspace credentials
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Guard
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Role-Based Access Control
  const isAuthorized = !allowedRoles || allowedRoles.includes(user?.role);

  if (!isAuthorized) {
    // Option A: Render 403 Forbidden Screen
    if (showUnauthorizedScreen) {
      return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 p-4 sm:p-6 font-sans antialiased selection:bg-indigo-500 selection:text-white">
          {/* Static Ambient Mesh */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          >
            <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl sm:h-96 sm:w-96" />
            <div 
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 text-center shadow-xl shadow-slate-200/60">
            {/* Top Multi-Color Brand Rim */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500" 
            />

            {/* Warning Icon Badge */}
            <div className="mx-auto flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-2xs">
              <ShieldAlert className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.2]" />
            </div>
            
            {/* Tag Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
              <Lock className="h-3 w-3" />
              <span>Permission Required</span>
            </div>

            <h2 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-slate-950">
              Access Restricted
            </h2>
            
            <p className="mt-2 text-xs sm:text-[13px] font-normal leading-relaxed text-slate-600">
              Your account tier (<span className="font-mono font-bold text-indigo-600 uppercase">{user?.role || 'Guest'}</span>) does not have authorization to view this workspace.
            </p>

            {/* Return Action */}
            <div className="mt-6 pt-2">
              <Link
                to={getFallbackRoute(user?.role)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
                <span>Return to Workspace</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Option B: Redirect to role-appropriate route
    return <Navigate to={getFallbackRoute(user?.role)} replace />;
  }

  // 4. Authorized Route Rendering
  return <Outlet />;
});

ProtectedRoute.displayName = 'ProtectedRoute';
export default ProtectedRoute;