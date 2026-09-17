// "use client";

// import { motion } from "framer-motion";

// export default function Loading() {
//   return (
//     <main
//       dir="rtl"
//       className="relative min-h-screen w-full overflow-hidden bg-white text-[#0F172A] dark:bg-[#07111F] dark:text-white"
//     >
//       {/* Background Grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)
//           `,
//           backgroundSize: "42px 42px",
//         }}
//       />

//       {/* Soft ambient glow */}
//       <motion.div
//         className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
//         animate={{
//           scale: [0.92, 1.05, 0.92],
//           opacity: [0.12, 0.2, 0.12],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         style={{
//           background:
//             "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 38%, transparent 72%)",
//         }}
//       />

//       {/* Main loader */}
//       <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
//         <div className="flex w-full max-w-[420px] flex-col items-center">

//           {/* Scanner / Core */}
//           <div className="relative mb-10 h-[150px] w-[150px]">

//             {/* Outer rotating ring */}
//             <motion.div
//               className="absolute inset-0 rounded-full border border-[#2563EB]/10 dark:border-cyan-400/10"
//               animate={{ rotate: 360 }}
//               transition={{
//                 duration: 12,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.65)] dark:bg-[#00E5FF] dark:shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
//             </motion.div>

//             {/* Second ring */}
//             <motion.div
//               className="absolute inset-[13px] rounded-full border border-[#2563EB]/15 dark:border-cyan-400/15"
//               animate={{ rotate: -360 }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               <span className="absolute right-[7px] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#67E8F9]" />
//             </motion.div>

//             {/* Scan line */}
//             <motion.div
//               className="absolute left-[24px] right-[24px] top-[20px] h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent dark:via-[#00E5FF]/60"
//               animate={{
//                 top: ["18%", "82%", "18%"],
//                 opacity: [0.15, 1, 0.15],
//               }}
//               transition={{
//                 duration: 2.6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             {/* Inner glass */}
//             <div className="absolute inset-[30px] flex items-center justify-center rounded-full border border-[#2563EB]/15 bg-white/80 shadow-[0_10px_40px_rgba(37,99,235,0.08)] backdrop-blur-sm dark:border-cyan-400/15 dark:bg-[#0B182A]/80 dark:shadow-[0_10px_45px_rgba(0,229,255,0.07)]">

//               {/* Core */}
//               <motion.div
//                 className="relative flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#2563EB]/25 bg-[#EFF6FF] dark:border-cyan-400/25 dark:bg-[#0D2235]"
//                 animate={{
//                   boxShadow: [
//                     "0 0 0 rgba(37,99,235,0)",
//                     "0 0 28px rgba(37,99,235,0.16)",
//                     "0 0 0 rgba(37,99,235,0)",
//                   ],
//                 }}
//                 transition={{
//                   duration: 2.4,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 {/* Parahoor mark */}
//                 <div className="relative h-7 w-7">

//                   <motion.span
//                     className="absolute left-1/2 top-0 h-7 w-[2px] -translate-x-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]"
//                     animate={{
//                       scaleY: [0.65, 1, 0.65],
//                     }}
//                     transition={{
//                       duration: 1.8,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />

//                   <motion.span
//                     className="absolute left-0 top-1/2 h-[2px] w-7 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]"
//                     animate={{
//                       scaleX: [0.65, 1, 0.65],
//                     }}
//                     transition={{
//                       duration: 1.8,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: 0.15,
//                     }}
//                   />

//                   <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E3A8A] shadow-[0_0_10px_rgba(30,58,138,0.35)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Orbit dots */}
//             {[0, 120, 240].map((angle, index) => (
//               <motion.span
//                 key={index}
//                 className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
//                 style={{
//                   transformOrigin: "0 0",
//                 }}
//                 animate={{
//                   rotate: [angle, angle + 360],
//                 }}
//                 transition={{
//                   duration: 5 + index,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Brand */}
//           <motion.div
//             className="mb-2 flex items-center gap-2"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[18px] font-bold tracking-[0.18em] text-[#0F172A] dark:text-white">
//               PARAHOOR
//             </span>

//             <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
//           </motion.div>

//           {/* Status */}
//           <motion.div
//             className="mb-7 flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-slate-400 dark:text-slate-500"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.25, duration: 0.6 }}
//           >
//             <motion.span
//               className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
//               animate={{
//                 opacity: [0.3, 1, 0.3],
//               }}
//               transition={{
//                 duration: 1.4,
//                 repeat: Infinity,
//               }}
//             />

//             INITIALIZING SECURE SESSION
//           </motion.div>

//           {/* Progress */}
//           <div className="h-[2px] w-[210px] overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
//             <motion.div
//               className="h-full w-[70px] rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
//               animate={{
//                 x: [-80, 210],
//               }}
//               transition={{
//                 duration: 1.7,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </div>

//           {/* Bottom status */}
//           <motion.p
//             className="mt-4 text-[9px] tracking-[0.12em] text-slate-300 dark:text-slate-600"
//             animate={{
//               opacity: [0.45, 0.8, 0.45],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             SECURE • FORENSICS • INTELLIGENCE
//           </motion.p>
//         </div>
//       </div>

//       {/* Corner decorations */}
//       <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
//       <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
//       <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[#2563EB]/15 dark:border-cyan-400/10" />
//       <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#2563EB]/15 dark:border-cyan-400/10" />
//     </main>
//   );
// }


export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes loadingGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.12;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.2;
          }
        }

        @keyframes loadingRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loadingRotateReverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes loadingScan {
          0%, 100% {
            top: 18%;
            opacity: 0.15;
          }
          50% {
            top: 82%;
            opacity: 1;
          }
        }

        @keyframes loadingCore {
          0%, 100% {
            box-shadow: 0 0 0 rgba(37,99,235,0);
          }
          50% {
            box-shadow: 0 0 28px rgba(37,99,235,0.16);
          }
        }

        @keyframes loadingVertical {
          0%, 100% {
            transform: translateX(-50%) scaleY(0.65);
          }
          50% {
            transform: translateX(-50%) scaleY(1);
          }
        }

        @keyframes loadingHorizontal {
          0%, 100% {
            transform: translateY(-50%) scaleX(0.65);
          }
          50% {
            transform: translateY(-50%) scaleX(1);
          }
        }

        @keyframes loadingOrbit1 {
          from {
            transform: rotate(0deg) translateX(75px);
          }
          to {
            transform: rotate(360deg) translateX(75px);
          }
        }

        @keyframes loadingOrbit2 {
          from {
            transform: rotate(120deg) translateX(75px);
          }
          to {
            transform: rotate(480deg) translateX(75px);
          }
        }

        @keyframes loadingOrbit3 {
          from {
            transform: rotate(240deg) translateX(75px);
          }
          to {
            transform: rotate(600deg) translateX(75px);
          }
        }

        @keyframes loadingFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loadingFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes loadingStatusDot {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes loadingProgress {
          0% {
            transform: translateX(-80px);
          }
          100% {
            transform: translateX(210px);
          }
        }

        @keyframes loadingBottom {
          0%, 100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.8;
          }
        }

        .loading-glow {
          animation: loadingGlow 4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .loading-ring-outer {
          animation: loadingRotate 12s linear infinite;
          will-change: transform;
        }

        .loading-ring-inner {
          animation: loadingRotateReverse 8s linear infinite;
          will-change: transform;
        }

        .loading-scan {
          animation: loadingScan 2.6s ease-in-out infinite;
          will-change: top, opacity;
        }

        .loading-core {
          animation: loadingCore 2.4s ease-in-out infinite;
          will-change: box-shadow;
        }

        .loading-mark-vertical {
          animation: loadingVertical 1.8s ease-in-out infinite;
          will-change: transform;
        }

        .loading-mark-horizontal {
          animation: loadingHorizontal 1.8s ease-in-out 0.15s infinite;
          will-change: transform;
        }

        .loading-orbit-1 {
          animation: loadingOrbit1 5s linear infinite;
          will-change: transform;
        }

        .loading-orbit-2 {
          animation: loadingOrbit2 6s linear infinite;
          will-change: transform;
        }

        .loading-orbit-3 {
          animation: loadingOrbit3 7s linear infinite;
          will-change: transform;
        }

        .loading-brand {
          animation: loadingFadeUp 0.6s ease-out forwards;
        }

        .loading-status {
          animation: loadingFade 0.6s ease-out 0.25s forwards;
          opacity: 0;
        }

        .loading-status-dot {
          animation: loadingStatusDot 1.4s ease-in-out infinite;
        }

        .loading-progress {
          animation: loadingProgress 1.7s ease-in-out infinite;
          will-change: transform;
        }

        .loading-bottom {
          animation: loadingBottom 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-glow,
          .loading-ring-outer,
          .loading-ring-inner,
          .loading-scan,
          .loading-core,
          .loading-mark-vertical,
          .loading-mark-horizontal,
          .loading-orbit-1,
          .loading-orbit-2,
          .loading-orbit-3,
          .loading-brand,
          .loading-status,
          .loading-status-dot,
          .loading-progress,
          .loading-bottom {
            animation-play-state: running !important;
          }
        }
      `}</style>

      <main
        dir="rtl"
        className="relative min-h-screen w-full overflow-hidden bg-white text-[#0F172A] dark:bg-[#07111F] dark:text-white"
      >
        {/* Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Soft ambient glow */}
        <div
          className="loading-glow pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 38%, transparent 72%)",
          }}
        />

        {/* Main loader */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="flex w-full max-w-[420px] flex-col items-center">

            {/* Scanner / Core */}
            <div className="relative mb-10 h-[150px] w-[150px]">

              {/* Outer rotating ring */}
              <div className="loading-ring-outer absolute inset-0 rounded-full border border-[#2563EB]/10 dark:border-cyan-400/10">
                <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.65)] dark:bg-[#00E5FF] dark:shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
              </div>

              {/* Second ring */}
              <div className="loading-ring-inner absolute inset-[13px] rounded-full border border-[#2563EB]/15 dark:border-cyan-400/15">
                <span className="absolute right-[7px] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#67E8F9]" />
              </div>

              {/* Scan line */}
              <div className="loading-scan absolute left-[24px] right-[24px] top-[20px] h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent dark:via-[#00E5FF]/60" />

              {/* Inner glass */}
              <div className="absolute inset-[30px] flex items-center justify-center rounded-full border border-[#2563EB]/15 bg-white/80 shadow-[0_10px_40px_rgba(37,99,235,0.08)] backdrop-blur-sm dark:border-cyan-400/15 dark:bg-[#0B182A]/80 dark:shadow-[0_10px_45px_rgba(0,229,255,0.07)]">

                {/* Core */}
                <div className="loading-core relative flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#2563EB]/25 bg-[#EFF6FF] dark:border-cyan-400/25 dark:bg-[#0D2235]">

                  {/* Parahoor mark */}
                  <div className="relative h-7 w-7">

                    <span className="loading-mark-vertical absolute left-1/2 top-0 h-7 w-[2px] -translate-x-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]" />

                    <span className="loading-mark-horizontal absolute left-0 top-1/2 h-[2px] w-7 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]" />

                    <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E3A8A] shadow-[0_0_10px_rgba(30,58,138,0.35)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>
              </div>

              {/* Orbit dots */}
              <span className="loading-orbit-1 absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
              <span className="loading-orbit-2 absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
              <span className="loading-orbit-3 absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
            </div>

            {/* Brand */}
            <div className="loading-brand mb-2 flex items-center gap-2">
              <span className="text-[18px] font-bold tracking-[0.18em] text-[#0F172A] dark:text-white">
                PARAHOOR
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
            </div>

            {/* Status */}
            <div className="loading-status mb-7 flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-slate-400 dark:text-slate-500">
              <span className="loading-status-dot h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />

              INITIALIZING SECURE SESSION
            </div>

            {/* Progress */}
            <div className="h-[2px] w-[210px] overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
              <div className="loading-progress h-full w-[70px] rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
            </div>

            {/* Bottom status */}
            <p className="loading-bottom mt-4 text-[9px] tracking-[0.12em] text-slate-300 dark:text-slate-600">
              SECURE • FORENSICS • INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
        <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[#2563EB]/15 dark:border-cyan-400/10" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#2563EB]/15 dark:border-cyan-400/10" />
      </main>
    </>
  );
}