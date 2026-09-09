// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import geminiLogo from '../../assets/gemini-svg.svg';
// import { 
//   LogOut, 
//   Menu, 
//   ShieldCheck, 
//   Sparkles,
//   ArrowRight,
//   ChevronDown
// } from 'lucide-react';

// export const Navbar = ({ toggleSidebar }) => {
//   const { user, isAuthenticated, logout, isRecruiter } = useAuthContext();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/', { replace: true });
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .trim()
//       .split(/\s+/)
//       .map((n) => n[0])
//       .slice(0, 2)
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 sm:px-8 backdrop-blur-xl transition-all font-sans">
//       {/* Left: Brand Logo & Mobile Sidebar Toggle */}
//       <div className="flex items-center gap-3.5">
//         {isAuthenticated && (
//           <button
//             type="button"
//             onClick={toggleSidebar}
//             className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white lg:hidden cursor-pointer active:scale-95"
//             aria-label="Toggle Navigation Sidebar"
//           >
//             <Menu className="h-4 w-4" />
//           </button>
//         )}
//         <Link to="/" className="group flex items-center gap-3" title="RankResume AI Home">
//           <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 p-1.5 shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-500/30">
//             <img 
//               src={geminiLogo} 
//               alt="RankResume AI Logo" 
//               className="h-full w-full object-contain" 
//             />
//           </div>
//           <div className="flex flex-col select-none">
//             <span className="text-sm font-black tracking-tight text-white sm:text-base flex items-center gap-1 leading-none">
//               RankResume{' '}
//               <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
//                 AI
//               </span>
//             </span>
//             <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mt-0.5">
//               Neural ATS
//             </span>
//           </div>
//         </Link>
//       </div>

//       {/* Right: Authenticated Profile or Guest Actions */}
//       <div className="flex items-center gap-3">
//         {isAuthenticated ? (
//           <div className="flex items-center gap-2 sm:gap-3">
            
//             {/* Modern Glassmorphic User Profile Capsule */}
//             <div className="group relative flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 py-1.5 pl-2.5 pr-3.5 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90">
              
//               {/* Gradient Glowing Avatar with Online Radar Ping */}
//               <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1px] shadow-sm">
//                 <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 font-mono text-[11px] font-black text-slate-100 tracking-wider">
//                   {getInitials(user?.name)}
//                 </div>
                
//                 {/* Radar Status Ping */}
//                 <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
//                   <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
//                     isRecruiter ? 'bg-pink-400' : 'bg-cyan-400'
//                   }`} />
//                   <span className={`relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${
//                     isRecruiter ? 'bg-pink-500' : 'bg-cyan-400'
//                   }`} />
//                 </span>
//               </div>

//               {/* User Meta Information */}
//               <div className="flex flex-col text-left">
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-xs font-bold tracking-tight text-slate-100 group-hover:text-white max-w-[120px] sm:max-w-[160px] truncate">
//                     {user?.name || 'Candidate'}
//                   </span>
                  
//                   {/* Subtle verified badge */}
//                   <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   {isRecruiter ? (
//                     <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-pink-400">
//                       <ShieldCheck className="h-2.5 w-2.5 text-pink-400" />
//                       Recruiter Hub
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
//                       <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
//                       Pro Candidate
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Modern Subtle Logout Action */}
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3 text-xs font-semibold text-slate-400 transition-all duration-200 hover:border-rose-500/40 hover:bg-rose-950/20 hover:text-rose-300 active:scale-95 cursor-pointer shadow-sm"
//               title="Sign out of account"
//             >
//               <LogOut className="h-3.5 w-3.5" />
//               <span className="hidden md:inline">Sign Out</span>
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 sm:gap-3">
//             <Link
//               to="/login"
//               className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white"
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/register"
//               className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95"
//             >
//               <Sparkles className="h-3 w-3 text-pink-300" />
//               <span>Get Started</span>
//               <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
//             </Link>
//           </div>
//         )}
        
//       </div>
//     </header>
//   );
// };

// export default Navbar;





import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import geminiLogo from '../../assets/gemini-svg.svg';
import { 
  Menu, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  User as UserIcon
} from 'lucide-react';

export const Navbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated, isRecruiter } = useAuthContext();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/70 bg-white/80 px-3 sm:px-8 backdrop-blur-xl shadow-[0_4px_25px_rgba(59,130,246,0.08)] transition-all font-sans antialiased">
      {/* Top Multi-Color Ambient Glow Rim */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.3)]" />

      {/* Left: Mobile Sidebar Toggle & Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
        {isAuthenticated && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-2xs transition-all hover:border-pink-300 hover:bg-pink-50/50 hover:text-pink-600 lg:hidden cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-4 w-4 stroke-[2.2]" />
          </button>
        )}

        <Link to="/" className="group flex items-center gap-2 sm:gap-3 min-w-0" title="RankResume AI Home">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-1.5 shadow-md shadow-blue-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-500/35">
            <img 
              src={geminiLogo} 
              alt="RankResume AI Logo" 
              className="h-full w-full object-contain filter brightness-110" 
            />
          </div>
          <div className="flex flex-col select-none truncate">
            <span className="text-xs sm:text-base font-black tracking-tight text-slate-950 flex items-center gap-1 leading-none">
              <span className="truncate">RankResume</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                AI
              </span>
            </span>
            <span className="hidden sm:inline text-[9px] font-mono tracking-widest uppercase font-extrabold text-blue-600 mt-0.5">
              Neural ATS
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Authenticated Profile Capsule or Guest Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {isAuthenticated ? (
          <Link
            to="/profile"
            className="group relative flex items-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/90 p-1 sm:py-1.5 sm:pl-2.5 sm:pr-3.5 backdrop-blur-md shadow-xs transition-all duration-200 hover:border-pink-300 hover:shadow-sm"
            title="View Account Profile"
          >
            {/* Avatar with Status Radar Ping */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-[1.5px] shadow-xs">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] sm:rounded-[10px] bg-white font-mono text-[11px] font-black text-slate-900 tracking-wider">
                {getInitials(user?.name)}
              </div>
              
              {/* Radar Status Ping */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isRecruiter ? 'bg-pink-500' : 'bg-blue-500'
                }`} />
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white ${
                  isRecruiter ? 'bg-pink-600' : 'bg-blue-600'
                }`} />
              </span>
            </div>

            {/* Mobile Person Icon Indicator */}
            <div className="flex sm:hidden pr-1 items-center text-slate-600 group-hover:text-blue-600 transition-colors">
              <UserIcon className="h-3.5 w-3.5 stroke-[2.2]" />
            </div>

            {/* Desktop User Metadata */}
            <div className="hidden sm:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-tight text-slate-950 group-hover:text-blue-700 max-w-[120px] md:max-w-[160px] truncate transition-colors">
                  {user?.name || 'Candidate'}
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              </div>
              <div className="flex items-center gap-1.5">
                {isRecruiter ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-pink-700">
                    <ShieldCheck className="h-3 w-3 text-pink-600 stroke-[2.5]" />
                    Recruiter Hub
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    Pro Candidate
                  </span>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to="/login"
              className="rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-slate-950"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden xs:inline">Get Started</span>
              <span className="xs:hidden">Join</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;