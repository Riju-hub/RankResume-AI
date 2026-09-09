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

//   // 1. High-end Branded Full-Screen Loader
//   if (loading) {
//     return (
//       <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4">
//         {/* Subtle Ambient Radial Glow */}
//         <div className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        
//         <div className="relative z-10 flex flex-col items-center text-center">
//           {/* Animated Brand Emblem */}
//           <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 animate-pulse" />
//             <Sparkles className="h-6 w-6 text-indigo-400" />
//             <div className="absolute -inset-1 rounded-2xl border border-indigo-500/20 animate-spin [animation-duration:3s]" />
//           </div>

//           {/* Loading status */}
//           <div className="mt-6 flex items-center gap-2">
//             <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
//             <span className="text-sm font-medium tracking-wide text-zinc-300">
//               Verifying credentials...
//             </span>
//           </div>
//           <p className="mt-1 text-xs text-zinc-500">Connecting to secure session</p>
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
//         <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4">
//           <div className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 text-center backdrop-blur-xl shadow-2xl">
//             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
//               <ShieldAlert className="h-6 w-6" />
//             </div>
            
//             <h2 className="mt-4 text-lg font-bold text-zinc-100">Access Restricted</h2>
//             <p className="mt-2 text-xs leading-relaxed text-zinc-400">
//               Your account role (<span className="font-semibold text-zinc-200">{user?.role || 'Guest'}</span>) does not have permission to view this section.
//             </p>

//             <div className="mt-6">
//               <Link
//                 to={getFallbackRoute(user?.role)}
//                 className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 text-xs font-medium text-zinc-200 transition-all hover:bg-zinc-700 active:scale-95"
//               >
//                 <ArrowLeft className="h-3.5 w-3.5" />
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

  // 1. High-end Branded Full-Screen Loader (White-Blue-Pink Theme)
  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f8fbff] px-4 font-sans antialiased">
        {/* Hardware-Accelerated Ambient Glowing Mesh */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
          <div className="absolute -top-24 -left-20 h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-[120px] will-change-transform" />
          <div className="absolute -bottom-24 -right-20 h-[540px] w-[540px] rounded-full bg-pink-500/25 blur-[130px] will-change-transform" />
          
          {/* Subtle Dual-Color Pattern Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(236,72,153,0.18)_1px,transparent_1px)] [background-size:26px_26px] opacity-35 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated Multi-Color Brand Emblem */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/95 bg-white/90 shadow-[0_20px_50px_rgba(37,99,235,0.15),0_10px_30px_rgba(236,72,153,0.12)] backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-pink-500/20 animate-pulse" />
            <Sparkles className="h-7 w-7 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            
            {/* Spinning Neon Gradient Ring */}
            <div className="absolute -inset-1.5 rounded-3xl border-2 border-dashed border-blue-500/40 animate-spin [animation-duration:8s]" />
          </div>

          {/* Loading Status Typography */}
          <div className="mt-7 flex items-center gap-2.5">
            <Loader2 className="h-4 w-4 animate-spin text-pink-600 stroke-[2.5]" />
            <span className="text-sm font-black tracking-tight text-slate-900">
              Verifying credentials...
            </span>
          </div>
          <p className="mt-1.5 font-mono text-xs font-semibold text-slate-500">
            Connecting to secure neural session
          </p>
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
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f8fbff] p-4 font-sans antialiased">
          {/* Ambient Glows */}
          <div className="pointer-events-none fixed -top-20 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px] transform-gpu will-change-transform" />
          <div className="pointer-events-none fixed -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500/20 blur-[100px] transform-gpu will-change-transform" />

          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/95 bg-white/90 p-7 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
            {/* Top Multi-Color Rim */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-xs">
              <ShieldAlert className="h-7 w-7 stroke-[2.2]" />
            </div>
            
            <h2 className="mt-5 text-xl font-black text-slate-950">Access Restricted</h2>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600">
              Your account role (<span className="font-extrabold text-blue-700 uppercase font-mono">{user?.role || 'Guest'}</span>) does not have authorization to view this workspace.
            </p>

            <div className="mt-6">
              <Link
                to={getFallbackRoute(user?.role)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
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