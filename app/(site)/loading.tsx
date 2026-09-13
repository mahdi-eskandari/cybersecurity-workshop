"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
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
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          scale: [0.92, 1.05, 0.92],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
            <motion.div
              className="absolute inset-0 rounded-full border border-[#2563EB]/10 dark:border-cyan-400/10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.65)] dark:bg-[#00E5FF] dark:shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
            </motion.div>

            {/* Second ring */}
            <motion.div
              className="absolute inset-[13px] rounded-full border border-[#2563EB]/15 dark:border-cyan-400/15"
              animate={{ rotate: -360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="absolute right-[7px] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#67E8F9]" />
            </motion.div>

            {/* Scan line */}
            <motion.div
              className="absolute left-[24px] right-[24px] top-[20px] h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent dark:via-[#00E5FF]/60"
              animate={{
                top: ["18%", "82%", "18%"],
                opacity: [0.15, 1, 0.15],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner glass */}
            <div className="absolute inset-[30px] flex items-center justify-center rounded-full border border-[#2563EB]/15 bg-white/80 shadow-[0_10px_40px_rgba(37,99,235,0.08)] backdrop-blur-sm dark:border-cyan-400/15 dark:bg-[#0B182A]/80 dark:shadow-[0_10px_45px_rgba(0,229,255,0.07)]">

              {/* Core */}
              <motion.div
                className="relative flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#2563EB]/25 bg-[#EFF6FF] dark:border-cyan-400/25 dark:bg-[#0D2235]"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(37,99,235,0)",
                    "0 0 28px rgba(37,99,235,0.16)",
                    "0 0 0 rgba(37,99,235,0)",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Parahoor mark */}
                <div className="relative h-7 w-7">

                  <motion.span
                    className="absolute left-1/2 top-0 h-7 w-[2px] -translate-x-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]"
                    animate={{
                      scaleY: [0.65, 1, 0.65],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.span
                    className="absolute left-0 top-1/2 h-[2px] w-7 -translate-y-1/2 rounded-full bg-[#1D4ED8] dark:bg-[#00E5FF]"
                    animate={{
                      scaleX: [0.65, 1, 0.65],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.15,
                    }}
                  />

                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E3A8A] shadow-[0_0_10px_rgba(30,58,138,0.35)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </motion.div>
            </div>

            {/* Orbit dots */}
            {[0, 120, 240].map((angle, index) => (
              <motion.span
                key={index}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
                style={{
                  transformOrigin: "0 0",
                }}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Brand */}
          <motion.div
            className="mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[18px] font-bold tracking-[0.18em] text-[#0F172A] dark:text-white">
              PARAHOOR
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]" />
          </motion.div>

          {/* Status */}
          <motion.div
            className="mb-7 flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-slate-400 dark:text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            />

            INITIALIZING SECURE SESSION
          </motion.div>

          {/* Progress */}
          <div className="h-[2px] w-[210px] overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
            <motion.div
              className="h-full w-[70px] rounded-full bg-[#2563EB] dark:bg-[#00E5FF]"
              animate={{
                x: [-80, 210],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Bottom status */}
          <motion.p
            className="mt-4 text-[9px] tracking-[0.12em] text-slate-300 dark:text-slate-600"
            animate={{
              opacity: [0.45, 0.8, 0.45],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SECURE • FORENSICS • INTELLIGENCE
          </motion.p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
      <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-[#2563EB]/15 dark:border-cyan-400/10" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[#2563EB]/15 dark:border-cyan-400/10" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#2563EB]/15 dark:border-cyan-400/10" />
    </main>
  );
}