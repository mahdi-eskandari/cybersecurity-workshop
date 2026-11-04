"use client" 
import React, { useEffect, useState } from "react"; 
import { EditorContent, useEditor } from "@tiptap/react"; 
import StarterKit from "@tiptap/starter-kit"; 
import { Mark, Extension, Node, mergeAttributes } from "@tiptap/core"; 
import LinkExtension from "@tiptap/extension-link"; 
import Underline from "@tiptap/extension-underline"; 
import { useTheme } from "../../.../../../../components/ThemeProvider" 
import Link from "next/link"; 
import {EmergencyModal} from "../../.../../../../components/CrisisReportForm" 
import { motion } from "framer-motion";
import ServiceFaq from "./ServiceFaq";

 
/* ─── ICONS ─── */ 
const IconBlockchain = ({ darkMode = true }: { darkMode?: boolean }) => ( 
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"> 
    <rect x="6" y="18" width="10" height="12" rx="2" /> 
    <rect x="19" y="6" width="10" height="12" rx="2" /> 
    <rect x="19" y="30" width="10" height="12" rx="2" /> 
    <rect x="32" y="18" width="10" height="12" rx="2" /> 
    <line x1="16" y1="24" x2="19" y2="24" /> 
    <line x1="29" y1="24" x2="32" y2="24" /> 
    <line x1="24" y1="18" x2="24" y2="18" /> 
    <line x1="24" y1="30" x2="24" y2="30" /> 
    <path d="M24 18V12" /> 
    <path d="M24 36v-6" /> 
    <circle cx="24" cy="24" r="2" fill={darkMode ? "rgba(0,229,255,0.4)" : "rgba(37,99,235,0.12)"} stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1" /> 
  </svg> 
); 
 
const IconTarget = ({ darkMode = true }: { darkMode?: boolean }) => ( 
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"> 
    <circle cx="24" cy="24" r="18" /> 
    <circle cx="24" cy="24" r="11" /> 
    <circle cx="24" cy="24" r="4" fill={darkMode ? "rgba(0,229,255,0.25)" : "rgba(37,99,235,0.12)"} /> 
    <line x1="24" y1="6" x2="24" y2="13" /> 
    <line x1="24" y1="35" x2="24" y2="42" /> 
    <line x1="6" y1="24" x2="13" y2="24" /> 
    <line x1="35" y1="24" x2="42" y2="24" /> 
    <path d="M36 12l-4 4" strokeWidth="1.8" /> 
  </svg> 
); 
 
const IconShieldDoc = ({ darkMode = true }: { darkMode?: boolean }) => ( 
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M24 4L8 10v14c0 10 7 18.5 16 22 9-3.5 16-12 16-22V10L24 4z" /> 
    <path d="M17 25l4 4 10-10" strokeWidth="1.8" /> 
    <line x1="20" y1="18" x2="28" y2="18" /> 
    <line x1="20" y1="22" x2="26" y2="22" /> 
  </svg> 
); 
 

const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const IconChevronLeft = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconBitcoin = ({ darkMode }: { darkMode: boolean }) => ( 
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
    <circle cx="12" cy="12" r="10" /> 
    <path d="M9 8h4.5a2 2 0 010 4H9v4h5a2 2 0 000-4" /> 
    <line x1="12" y1="6" x2="12" y2="8" /> 
    <line x1="12" y1="18" x2="12" y2="20" /> 
  </svg> 
); 
 
const IconLink = () => ( 
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /> 
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /> 
  </svg> 
); 
 
const IconTelegram = () => ( 
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M21.5 4.5L2.5 12l7 2.5" /> 
    <path d="M9.5 14.5l2.5 5 3-8" /> 
    <path d="M9.5 14.5l8-8" /> 
  </svg> 
); 
 
const IconMail = () => ( 
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> 
    <polyline points="22,6 12,13 2,6" /> 
  </svg> 
); 
 
const IconWarning = () => ( 
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /> 
    <line x1="12" y1="9" x2="12" y2="13" /> 
    <line x1="12" y1="17" x2="12.01" y2="17" /> 
  </svg> 
); 
 
const IconArrowLeft = () => ( 
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> 
    <line x1="19" y1="12" x2="5" y2="12" /> 
    <polyline points="12 19 5 12 12 5" /> 
  </svg> 
); 
 
const IconClose = () => ( 
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> 
    <line x1="18" y1="6" x2="6" y2="18" /> 
    <line x1="6" y1="6" x2="18" y2="18" /> 
  </svg> 
); 
 
const IconCheck = ({ darkMode = true }: { darkMode?: boolean }) => ( 
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> 
    <polyline points="20 6 9 17 4 12" /> 
  </svg> 
); 
 
/* ─── DECORATIVE: flowing blockchain path ─── */ 
const BlockchainHeroArt = ({ 
  darkMode = true, 
}: { 
  darkMode?: boolean; 
}) => ( 
  <svg 
    width="100%" 
    height="220" 
    viewBox="0 0 900 220" 
    preserveAspectRatio="xMidYMid meet" 
    className="w-full" 
    style={{ opacity: darkMode ? 0.22 : 0.42 }} 
  > 
    <defs> 
      <filter id="glow"> 
        <feGaussianBlur stdDeviation="3" result="blur" /> 
        <feMerge> 
          <feMergeNode in="blur" /> 
          <feMergeNode in="SourceGraphic" /> 
        </feMerge> 
      </filter> 
    </defs> 
 
    {/* Horizontal chain path */} 
    <path 
      d="M0 110 Q100 60 180 110 Q260 160 340 110 Q420 60 500 110 Q580 160 660 110 Q740 60 820 110 Q860 135 900 110" 
      stroke={ 
        darkMode 
          ? "rgba(0,229,255,0.5)" 
          : "rgba(37,99,235,0.38)" 
      } 
      strokeWidth="1" 
      fill="none" 
      filter="url(#glow)" 
    /> 
 
    {/* Block nodes on path */} 
    {[90, 260, 430, 600, 770].map((x, i) => ( 
      <g key={i}> 
        <rect 
          x={x - 18} 
          y={88} 
          width="36" 
          height="44" 
          rx="4" 
          fill={ 
            darkMode 
              ? "rgba(0,229,255,0.06)" 
              : "rgba(37,99,235,0.045)" 
          } 
          stroke={ 
            darkMode 
              ? "rgba(0,229,255,0.4)" 
              : "rgba(37,99,235,0.32)" 
          } 
          strokeWidth="1" 
        /> 
 
        <rect 
          x={x - 10} 
          y={97} 
          width="20" 
          height="3" 
          rx="1" 
          fill={ 
            darkMode 
              ? "rgba(0,229,255,0.3)" 
              : "rgba(37,99,235,0.25)" 
          } 
        /> 
 
        <rect 
          x={x - 10} 
          y={104} 
          width="14" 
          height="3" 
          rx="1" 
          fill={ 
            darkMode 
              ? "rgba(0,229,255,0.2)" 
              : "rgba(37,99,235,0.18)" 
          } 
        /> 
 
        <rect 
          x={x - 10} 
          y={111} 
          width="17" 
          height="3" 
          rx="1" 
          fill={ 
            darkMode 
              ? "rgba(0,229,255,0.2)" 
              : "rgba(37,99,235,0.18)" 
          } 
        /> 
 
        <rect 
          x={x - 10} 
          y={118} 
          width="10" 
          height="3" 
          rx="1" 
          fill={ 
            darkMode 
              ? "rgba(0,229,255,0.15)" 
              : "rgba(37,99,235,0.14)" 
          } 
        /> 
 
        <circle 
          cx={x} 
          cy={88} 
          r="3" 
          fill={darkMode ? "#00E5FF" : "#2563EB"} 
          filter="url(#glow)" 
        /> 
      </g> 
    ))} 
 
    {/* Secondary chain – lower opacity */} 
    <path 
      d="M0 170 Q80 140 160 170 Q240 200 320 165 Q400 130 480 170 Q560 210 640 170 Q720 130 800 165 Q860 182 900 165" 
      stroke={ 
        darkMode 
          ? "rgba(0,229,255,0.15)" 
          : "rgba(37,99,235,0.14)" 
      } 
      strokeWidth="1" 
      fill="none" 
    /> 
 
    {/* Vertical connectors at random points */} 
    {[170, 410, 650].map((x, i) => ( 
      <line 
        key={i} 
        x1={x} 
        y1={80} 
        x2={x} 
        y2={50} 
        stroke={ 
          darkMode 
            ? "rgba(0,229,255,0.2)" 
            : "rgba(37,99,235,0.18)" 
        } 
        strokeWidth="1" 
        strokeDasharray="3 3" 
      /> 
    ))} 
 
    {[170, 410, 650].map((x, i) => ( 
      <circle 
        key={i} 
        cx={x} 
        cy={46} 
        r="3" 
        fill={ 
          darkMode 
            ? "rgba(0,229,255,0.35)" 
            : "rgba(37,99,235,0.25)" 
        } 
        stroke={ 
          darkMode 
            ? "rgba(0,229,255,0.5)" 
            : "rgba(37,99,235,0.32)" 
        } 
        strokeWidth="1" 
      /> 
    ))} 
  </svg> 
); 



const PostCrisisPentestHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  const leftNodes = [
    { x: 50, y: 150 },
    { x: 120, y: 85 },
    { x: 195, y: 140 }, // compromised
    { x: 270, y: 80 },
    { x: 345, y: 125 },
  ];
  const leftEdges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ];

  const probePoints = [
    { x: 800, y: 70 },
    { x: 760, y: 110 },
    { x: 700, y: 110 },
    { x: 660, y: 80 },
    { x: 590, y: 80 },
    { x: 540, y: 110 },
  ];

  const attackPath = `M900 70 L${probePoints.map((p) => `${p.x} ${p.y}`).join(" L")} L482 110`;
  const healPath = "M418 110 L345 125 L270 80 L195 140";
  const shieldPath =
    "M450 72 L482 84 V112 C482 134 468 148 450 156 C432 148 418 134 418 112 V84 Z";

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="pentestGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="pentestShieldClip">
          <path d={shieldPath} />
        </clipPath>
      </defs>

      {/* Target rings around the shield */}
      {[50, 78, 105].map((r, i) => (
        <circle
          key={r}
          cx={450}
          cy={110}
          r={r}
          fill="none"
          stroke={c(
            `rgba(0,229,255,${0.7 - i * 0.1})`,
            `rgba(37,99,235,${0.65 - i * 0.08})`
          )}
          strokeWidth="1.5"
          strokeDasharray={i === 1 ? "4 4" : undefined}
        />
      ))}
      {/* Expanding pulse ring */}
      <circle cx={450} cy={110} r={50} fill="none" stroke={solid} strokeWidth="1.5">
        <animate attributeName="r" values="50;108" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="4s" repeatCount="indefinite" />
      </circle>
      <line x1={450} y1={5} x2={450} y2={18} stroke={mid} strokeWidth="1.5" />

      {/* Damaged network (left) */}
      {leftEdges.map(([a, b], i) => {
        const touchesBroken = a === 2 || b === 2;
        return (
          <line
            key={i}
            x1={leftNodes[a].x}
            y1={leftNodes[a].y}
            x2={leftNodes[b].x}
            y2={leftNodes[b].y}
            stroke={c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)")}
            strokeWidth="1.5"
            strokeDasharray={touchesBroken ? "3 4" : undefined}
          />
        );
      })}

      {/* Link from network to shield */}
      <line
        x1={345}
        y1={125}
        x2={418}
        y2={110}
        stroke={c("rgba(0,229,255,0.9)", "rgba(37,99,235,0.8)")}
        strokeWidth="1.5"
        filter="url(#pentestGlow)"
      />

      {leftNodes.map((n, i) =>
        i === 2 ? (
          <g key={i}>
            {/* rotating dashed ring */}
            <circle
              cx={n.x}
              cy={n.y}
              r={13}
              fill="none"
              stroke={c("rgba(0,229,255,1)", "rgba(37,99,235,0.9)")}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${n.x} ${n.y}`}
                to={`360 ${n.x} ${n.y}`}
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            {/* heal flash */}
            <circle cx={n.x} cy={n.y} r={13} fill="none" stroke={solid} strokeWidth="1.5">
              <animate attributeName="r" values="13;13;24;24" keyTimes="0;0.45;0.6;1" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0;0" keyTimes="0;0.45;0.6;1" dur="6s" repeatCount="indefinite" />
            </circle>
            {/* X (compromised) */}
            <g filter="url(#pentestGlow)">
              <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.45;0.5;0.9;1" dur="6s" repeatCount="indefinite" />
              <line x1={n.x - 5} y1={n.y - 5} x2={n.x + 5} y2={n.y + 5} stroke={solid} strokeWidth="2.2" strokeLinecap="round" />
              <line x1={n.x + 5} y1={n.y - 5} x2={n.x - 5} y2={n.y + 5} stroke={solid} strokeWidth="2.2" strokeLinecap="round" />
            </g>
            {/* Check (recovered) */}
            <path
              d={`M${n.x - 5} ${n.y} L${n.x - 1} ${n.y + 4} L${n.x + 6} ${n.y - 4}`}
              fill="none"
              stroke={solid}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pentestGlow)"
            >
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.45;0.5;0.9;1" dur="6s" repeatCount="indefinite" />
            </path>
          </g>
        ) : (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={5.5}
            fill={c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)")}
            stroke={c("rgba(0,229,255,1)", "rgba(37,99,235,0.85)")}
            strokeWidth="1.5"
          />
        )
      )}

      {/* Healing packet: shield → compromised node */}
      <circle r={3.5} fill={solid} filter="url(#pentestGlow)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={healPath}
          calcMode="linear"
          keyPoints="0;0;1;1"
          keyTimes="0;0.15;0.45;1"
        />
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.15;0.45;0.5;1" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* Shield */}
      <path
        d={shieldPath}
        fill={c("rgba(0,229,255,0.28)", "rgba(37,99,235,0.22)")}
        stroke={strong}
        strokeWidth="2"
        filter="url(#pentestGlow)"
      />
      {/* Scan line inside shield */}
      <g clipPath="url(#pentestShieldClip)">
        <line x1={414} y1={72} x2={486} y2={72} stroke={solid} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="y1" values="72;156;72" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="72;156;72" dur="3s" repeatCount="indefinite" />
        </line>
      </g>
      {/* Lock */}
      <rect
        x={440}
        y={108}
        width="20"
        height="16"
        rx="2"
        fill={c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.4)")}
        stroke={strong}
        strokeWidth="1.5"
      />
      <path d="M444 108 V102 a6 6 0 0 1 12 0 V108" fill="none" stroke={strong} strokeWidth="1.8" />
      <circle cx={450} cy={116} r={2.5} fill={solid} filter="url(#pentestGlow)" />

      {/* Probe / attack path (right) */}
      <path
        d={attackPath}
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#pentestGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>
      {probePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={c("rgba(0,229,255,0.7)", "rgba(37,99,235,0.6)")}
          stroke={strong}
          strokeWidth="1.5"
        />
      ))}

      {/* Attack packets + impact ripples */}
      {[0, 1.75].map((delay) => (
        <g key={delay}>
          <circle r={4} fill={solid} filter="url(#pentestGlow)">
            <animateMotion
              dur="3.5s"
              begin={`${delay}s`}
              repeatCount="indefinite"
              path={attackPath}
              calcMode="linear"
              keyPoints="0;1;1"
              keyTimes="0;0.85;1"
            />
            <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.85;1" dur="3.5s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={482} cy={110} r={4} fill="none" stroke={solid} strokeWidth="1.8">
            <animate attributeName="r" values="4;4;26" keyTimes="0;0.85;1" dur="3.5s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.85;1" dur="3.5s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Timeline: crisis → recovery → retest */}
      <line x1={60} y1={202} x2={840} y2={202} stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")} strokeWidth="1.5" />
      <line x1={60} y1={202} x2={60} y2={202} stroke={solid} strokeWidth="2" strokeLinecap="round">
        <animate attributeName="x2" values="60;840;840" keyTimes="0;0.9;1" dur="6s" repeatCount="indefinite" />
      </line>
      <circle cx={200} cy={202} r={4.5} fill={c("rgba(0,229,255,0.95)", "rgba(37,99,235,0.85)")} />
      <circle cx={450} cy={202} r={5.5} fill="none" stroke={strong} strokeWidth="1.5" />
      <circle cx={700} cy={202} r={8} fill={c("rgba(0,229,255,0.35)", "rgba(37,99,235,0.3)")} stroke={strong} strokeWidth="1.5" />
      <path d="M696 202 L699 205 L705 198" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={60} cy={202} r={3.5} fill={solid} filter="url(#pentestGlow)">
        <animate attributeName="cx" values="60;840;840" keyTimes="0;0.9;1" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};



const RansomwareNegotiationHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="ransomGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Encrypted files (left) */}
      {[62, 92, 122].map((y, i) => (
        <g key={i}>
          <rect x={50} y={y} width={90} height={24} rx={4} fill={fillSoft} stroke={mid} strokeWidth="1.5" />
          <rect x={58} y={y + 8} width={44} height={3} rx={1} fill={soft} />
          <rect x={58} y={y + 14} width={28} height={3} rx={1} fill={soft} />
          <line x1={118} y1={y + 8} x2={128} y2={y + 16} stroke={solid} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={128} y1={y + 8} x2={118} y2={y + 16} stroke={solid} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Big padlock */}
      <path
        d="M163 112 V105 a9 9 0 0 1 18 0 V112"
        fill="none"
        stroke={strong}
        strokeWidth="2"
      />
      <rect
        x={156}
        y={112}
        width={32}
        height={24}
        rx={3}
        fill={fillMid}
        stroke={strong}
        strokeWidth="2"
        filter="url(#ransomGlow)"
      />
      <circle cx={172} cy={123} r={3} fill={solid} />
      <line x1={172} y1={123} x2={172} y2={130} stroke={solid} strokeWidth="1.5" />

      {/* Countdown timer (top center) */}
      <circle cx={450} cy={40} r={18} fill="none" stroke={soft} strokeWidth="1.5" />
      <circle
        cx={450}
        cy={40}
        r={18}
        fill="none"
        stroke={strong}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="113"
        strokeDashoffset="0"
        transform="rotate(-90 450 40)"
        filter="url(#ransomGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="113" dur="6s" repeatCount="indefinite" />
      </circle>
      <line x1={450} y1={40} x2={450} y2={30} stroke={solid} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={450} y1={40} x2={457} y2={44} stroke={solid} strokeWidth="1.5" strokeLinecap="round" />

      {/* Chat bubble A (negotiator) */}
      <rect x={250} y={95} width={100} height={46} rx={10} fill={fillSoft} stroke={strong} strokeWidth="1.5" />
      <polygon points="266,141 258,158 282,141" fill={fillSoft} stroke={strong} strokeWidth="1.5" strokeLinejoin="round" />
      {[284, 300, 316].map((x, i) => (
        <circle key={i} cx={x} cy={118} r={3.5} fill={solid}>
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="1.4s"
            begin={`${i * 0.25}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Chat bubble B (attacker) */}
      <rect x={550} y={122} width={100} height={46} rx={10} fill={fillSoft} stroke={strong} strokeWidth="1.5" />
      <polygon points="622,168 644,168 646,184" fill={fillSoft} stroke={strong} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x={566} y={134} width={58} height={3} rx={1} fill={mid} />
      <rect x={566} y={144} width={40} height={3} rx={1} fill={soft} />
      <rect x={566} y={154} width={50} height={3} rx={1} fill={soft} />

      {/* Negotiation link */}
      <path
        d="M350 118 C 420 118, 480 145, 550 145"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#ransomGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>
      <polygon points="450,122 458,131 450,140 442,131" fill={fillMid} stroke={strong} strokeWidth="1.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </polygon>

      {/* Link to key */}
      <path
        d="M650 145 C 700 145, 720 110, 754 110"
        fill="none"
        stroke={mid}
        strokeWidth="1.5"
        strokeDasharray="6 6"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Recovery key (right) */}
      <circle cx={770} cy={110} r={16} fill={fillMid} stroke={strong} strokeWidth="2" filter="url(#ransomGlow)" />
      <circle cx={770} cy={110} r={5} fill={solid} />
      <line x1={786} y1={110} x2={860} y2={110} stroke={strong} strokeWidth="2.2" strokeLinecap="round" />
      <line x1={840} y1={110} x2={840} y2={124} stroke={strong} strokeWidth="2.2" strokeLinecap="round" />
      <line x1={852} y1={110} x2={852} y2={120} stroke={strong} strokeWidth="2.2" strokeLinecap="round" />

      {/* Timeline */}
      <line x1={60} y1={202} x2={840} y2={202} stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")} strokeWidth="1.5" />
      <circle cx={200} cy={202} r={4.5} fill={mid} />
      <circle cx={450} cy={202} r={5.5} fill="none" stroke={strong} strokeWidth="1.5" />
      <circle cx={700} cy={202} r={8} fill={fillMid} stroke={strong} strokeWidth="1.5" />
      <path d="M696 202 L699 205 L705 198" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};




const DigitalForensicsHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  const treeNodes = {
    root: { x: 760, y: 55 },
    mids: [
      { x: 700, y: 105 },
      { x: 820, y: 105 },
    ],
    leaves: [
      { x: 665, y: 155, p: 0 },
      { x: 725, y: 155, p: 0 },
      { x: 795, y: 155, p: 1 },
      { x: 855, y: 155, p: 1 },
    ],
  };

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="forensicGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hex dump (left) */}
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4, 5].map((col) => {
          const hot = r === 2 && (col === 2 || col === 3);
          return (
            <rect
              key={`${r}-${col}`}
              x={60 + col * 24}
              y={55 + r * 24}
              width={14}
              height={8}
              rx={1.5}
              fill={hot ? solid : (r + col) % 3 === 0 ? mid : soft}
              filter={hot ? "url(#forensicGlow)" : undefined}
            >
              {hot && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
              )}
            </rect>
          );
        })
      )}
      <rect x={50} y={45} width={154} height={124} rx={6} fill="none" stroke={soft} strokeWidth="1.5" />

      {/* Link hex → disk */}
      <path d="M204 107 L372 105" fill="none" stroke={mid} strokeWidth="1.5" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Disk platter */}
      <circle cx={450} cy={105} r={78} fill={fillSoft} stroke={mid} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx={450} cy={105} r={60} fill="none" stroke={mid} strokeWidth="1.5" />
      <circle cx={450} cy={105} r={40} fill="none" stroke={soft} strokeWidth="1.5" />
      <circle cx={450} cy={105} r={18} fill={fillMid} stroke={strong} strokeWidth="1.5" />
      <circle cx={450} cy={105} r={5} fill={solid} filter="url(#forensicGlow)" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={450}
          y1={27}
          x2={450}
          y2={45}
          stroke={soft}
          strokeWidth="1.5"
          transform={`rotate(${i * 30} 450 105)`}
        />
      ))}

      {/* Radar sweep */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 450 105"
          to="360 450 105"
          dur="5s"
          repeatCount="indefinite"
        />
        <path d="M450 105 L450 27 A78 78 0 0 1 489 37.5 Z" fill={fillMid} />
        <line x1={450} y1={105} x2={450} y2={27} stroke={strong} strokeWidth="1.8" filter="url(#forensicGlow)" />
      </g>

      {/* Magnifier */}
      <circle cx={528} cy={138} r={24} fill={fillSoft} stroke={strong} strokeWidth="2" filter="url(#forensicGlow)" />
      <line x1={545} y1={155} x2={568} y2={178} stroke={strong} strokeWidth="4" strokeLinecap="round" />

      {/* Link disk → tree */}
      <path
        d="M528 92 C 600 92, 680 55, 745 55"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#forensicGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Artifact tree (right) */}
      {treeNodes.mids.map((m, i) => (
        <line key={`r${i}`} x1={treeNodes.root.x} y1={treeNodes.root.y} x2={m.x} y2={m.y} stroke={mid} strokeWidth="1.5" />
      ))}
      {treeNodes.leaves.map((l, i) => (
        <line
          key={`l${i}`}
          x1={treeNodes.mids[l.p].x}
          y1={treeNodes.mids[l.p].y}
          x2={l.x}
          y2={l.y}
          stroke={soft}
          strokeWidth="1.5"
        />
      ))}
      <circle cx={treeNodes.root.x} cy={treeNodes.root.y} r={7} fill={fillMid} stroke={strong} strokeWidth="1.5" />
      {treeNodes.mids.map((m, i) => (
        <circle key={`m${i}`} cx={m.x} cy={m.y} r={6} fill={fillSoft} stroke={mid} strokeWidth="1.5" />
      ))}
      {treeNodes.leaves.map((l, i) => (
        <rect key={`n${i}`} x={l.x - 7} y={l.y - 7} width={14} height={14} rx={2} fill={fillSoft} stroke={mid} strokeWidth="1.5" />
      ))}
      {/* Highlighted evidence */}
      <circle cx={795} cy={155} r={10} fill="none" stroke={solid} strokeWidth="1.5" filter="url(#forensicGlow)">
        <animate attributeName="r" values="9;15;9" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x={788} y={148} width={14} height={14} rx={2} fill={fillMid} stroke={strong} strokeWidth="1.5" />

      {/* Timeline ticks */}
      <line x1={60} y1={205} x2={840} y2={205} stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")} strokeWidth="1.5" />
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 60 + i * 40;
        const hot = x === 580;
        return (
          <line
            key={i}
            x1={x}
            y1={hot ? 197 : 200}
            x2={x}
            y2={hot ? 213 : 210}
            stroke={hot ? solid : mid}
            strokeWidth={hot ? 2.2 : 1.5}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};




const hexPoints = (cx: number, cy: number, r: number) =>
  [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(" ");

const CryptoTracingHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  const victim = { x: 90, y: 100 };
  const hacker = { x: 240, y: 100 };
  const col1 = [
    { x: 380, y: 48 },
    { x: 380, y: 100 },
    { x: 380, y: 152 },
  ];
  const col2 = [
    { x: 520, y: 48 },
    { x: 520, y: 100 },
    { x: 520, y: 152 },
  ];
  const exch = { x: 670, y: 100 };
  const vault = { x: 810, y: 100 };

  const hop1 = col1[0];
  const hop2 = col2[1];

  // مسیر واقعی (ردیابی‌شده)
  const trueEdges = [
    [victim, hacker],
    [hacker, hop1],
    [hop1, hop2],
    [hop2, exch],
    [exch, vault],
  ];
  // مسیرهای انحرافی
  const decoyEdges = [
    [hacker, col1[1]],
    [hacker, col1[2]],
    [col1[0], col2[0]],
    [col1[1], col2[0]],
    [col1[1], col2[2]],
    [col1[2], col2[1]],
    [col1[2], col2[2]],
    [col2[0], exch],
    [col2[2], exch],
  ];

  const tracePoints = [victim, hacker, hop1, hop2, exch, vault];
  const tracePath = "M" + tracePoints.map((p) => `${p.x} ${p.y}`).join(" L");

  // زمان‌بندی: ردیابی از T0 شروع و در T1 تمام می‌شود (از چرخه‌ی ۶ ثانیه‌ای)
  const T0 = 0.08;
  const T1 = 0.72;
  const segLens = tracePoints
    .slice(1)
    .map((p, i) => Math.hypot(p.x - tracePoints[i].x, p.y - tracePoints[i].y));
  const totalLen = segLens.reduce((a, b) => a + b, 0);
  let acc = 0;
  const reach = segLens.map((l) => {
    acc += l;
    return T0 + (T1 - T0) * (acc / totalLen);
  });
  // reach: [hacker, hop1, hop2, exch, vault]
  const f = (n: number) => n.toFixed(3);
  const glowTimes = (k: number) => `0;${f(k - 0.04)};${f(k)};${f(k + 0.2)};1`;
  const pulseTimes = (k: number) => `0;${f(k - 0.001)};${f(k)};${f(k + 0.15)};1`;

  const glowRing = (k: number) => (
    <animate
      attributeName="opacity"
      values="0;0;1;0;0"
      keyTimes={glowTimes(k)}
      dur="6s"
      repeatCount="indefinite"
    />
  );

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="scamGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* خطوط داخل گره‌ها دیده نشوند */}
        <mask id="cryptoEdgeMask" maskUnits="userSpaceOnUse" x="30" y="0" width="840" height="220">
          <rect x="30" y="0" width="840" height="220" fill="white" />
          <polygon points={hexPoints(victim.x, victim.y, 29)} fill="black" />
          <circle cx={hacker.x} cy={hacker.y} r={21} fill="black" />
          {[...col1, ...col2].map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={11} fill="black" />
          ))}
          <rect x={exch.x - 24} y={exch.y - 24} width={48} height={48} rx={8} fill="black" />
          <circle cx={vault.x} cy={vault.y} r={25} fill="black" />
        </mask>
      </defs>

      {/* ─── Edges + trace ─── */}
      <g mask="url(#cryptoEdgeMask)">
        {decoyEdges.map(([a, b], i) => (
          <line
            key={`d${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={soft}
            strokeWidth="1.3"
            strokeDasharray="3 5"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite" />
          </line>
        ))}
        {trueEdges.map(([a, b], i) => (
          <line
            key={`t${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={mid}
            strokeWidth="1.5"
            strokeDasharray="3 5"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite" />
          </line>
        ))}

        {/* مسیر پررنگ ردیابی که کشیده می‌شود */}
        <path
          d={tracePath}
          pathLength={1}
          fill="none"
          stroke={strong}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeDasharray="1 1"
          filter="url(#scamGlow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1;1;0;0"
            keyTimes={`0;${T0};${T1};1`}
            dur="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;1;0;0"
            keyTimes="0;0.88;0.97;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* ─── Victim wallet ─── */}
      <polygon
        points={hexPoints(victim.x, victim.y, 26)}
        fill={fillMid}
        stroke={strong}
        strokeWidth="2"
        filter="url(#scamGlow)"
      />
      <circle cx={victim.x} cy={victim.y} r={10} fill="none" stroke={solid} strokeWidth="1.5" />
      <circle cx={victim.x} cy={victim.y} r={4} fill={solid} />


      {/* ─── Hacker (hidden identity) ─── */}
      <circle
        cx={hacker.x}
        cy={hacker.y}
        r={18}
        fill={fillSoft}
        stroke={strong}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${hacker.x} ${hacker.y}`}
          to={`360 ${hacker.x} ${hacker.y}`}
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={hacker.x}
        cy={hacker.y - 5}
        r={4.5}
        fill={fillMid}
        stroke={strong}
        strokeWidth="1.5"
      />
      <path
        d={`M${hacker.x - 9} ${hacker.y + 9} C${hacker.x - 9} ${hacker.y + 2} ${hacker.x - 4} ${hacker.y} ${hacker.x} ${hacker.y} C${hacker.x + 4} ${hacker.y} ${hacker.x + 9} ${hacker.y + 2} ${hacker.x + 9} ${hacker.y + 9} Z`}
        fill={fillMid}
        stroke={strong}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ─── Hop wallets (mixer layers) ─── */}
      {[...col1, ...col2].map((n, i) => {
        const isTrue = n === hop1 || n === hop2;
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={7}
            fill={isTrue ? fillMid : fillSoft}
            stroke={isTrue ? strong : mid}
            strokeWidth="1.5"
          />
        );
      })}

      {/* ─── Exchange ─── */}
      <rect
        x={exch.x - 20}
        y={exch.y - 20}
        width={40}
        height={40}
        rx={6}
        fill={fillSoft}
        stroke={strong}
        strokeWidth="1.8"
      />
      <path
        d={`M${exch.x - 13} ${exch.y - 6} L${exch.x} ${exch.y - 15} L${exch.x + 13} ${exch.y - 6} Z`}
        fill="none"
        stroke={mid}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {[-8, 0, 8].map((dx) => (
        <line
          key={dx}
          x1={exch.x + dx}
          y1={exch.y - 3}
          x2={exch.x + dx}
          y2={exch.y + 9}
          stroke={mid}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <line
        x1={exch.x - 13}
        y1={exch.y + 13}
        x2={exch.x + 13}
        y2={exch.y + 13}
        stroke={mid}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ─── Vault (frozen funds) ─── */}
      <circle
        cx={vault.x}
        cy={vault.y}
        r={20}
        fill={fillSoft}
        stroke={strong}
        strokeWidth="2"
        filter="url(#scamGlow)"
      />
      <rect
        x={vault.x - 8}
        y={vault.y - 3}
        width={16}
        height={12}
        rx={2.5}
        fill={fillMid}
        stroke={strong}
        strokeWidth="1.5"
      />
      <circle cx={vault.x} cy={vault.y + 3} r={1.8} fill={solid} />
      <path
        d={`M${vault.x - 5} ${vault.y - 3} V${vault.y - 7} a5 5 0 0 1 10 0 V${vault.y - 3}`}
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 -4;0 -4;0 0;0 0"
          keyTimes={`0;${f(reach[4] - 0.02)};${f(reach[4] + 0.03)};1`}
          dur="6s"
          repeatCount="indefinite"
        />
      </path>

      {/* ─── Highlight rings when the trace reaches each node ─── */}
      <circle cx={hacker.x} cy={hacker.y} r={26} fill="none" stroke={solid} strokeWidth="1.5" opacity="0">
        {glowRing(reach[0])}
      </circle>
      <circle cx={hop1.x} cy={hop1.y} r={14} fill="none" stroke={solid} strokeWidth="1.5" opacity="0">
        {glowRing(reach[1])}
      </circle>
      <circle cx={hop2.x} cy={hop2.y} r={14} fill="none" stroke={solid} strokeWidth="1.5" opacity="0">
        {glowRing(reach[2])}
      </circle>
      <rect
        x={exch.x - 26}
        y={exch.y - 26}
        width={52}
        height={52}
        rx={10}
        fill="none"
        stroke={solid}
        strokeWidth="1.5"
        opacity="0"
      >
        {glowRing(reach[3])}
      </rect>

      {/* Freeze pulse at the vault */}
      <circle cx={vault.x} cy={vault.y} r={20} fill="none" stroke={solid} strokeWidth="1.5" opacity="0">
        <animate
          attributeName="r"
          values="20;20;20;46;46"
          keyTimes={pulseTimes(reach[4])}
          dur="6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0;0.9;0;0"
          keyTimes={pulseTimes(reach[4])}
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* ─── Tracing lens ─── */}
      <g filter="url(#scamGlow)" opacity="0">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={tracePath}
          calcMode="linear"
          keyPoints="0;0;1;1"
          keyTimes={`0;${T0};${T1};1`}
        />
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes={`0;0.05;${T0};${T1};0.78;1`}
          dur="6s"
          repeatCount="indefinite"
        />
        <circle cx={0} cy={0} r={9} fill={fillSoft} stroke={strong} strokeWidth="2" />
        <circle cx={0} cy={0} r={2.5} fill={solid} />
        <line x1={6.5} y1={6.5} x2={13} y2={13} stroke={strong} strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* ─── Timeline (synced with the trace) ─── */}
      <line
        x1={60}
        y1={205}
        x2={840}
        y2={205}
        stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")}
        strokeWidth="1.5"
      />
      <line x1={60} y1={205} x2={60} y2={205} stroke={solid} strokeWidth="2" strokeLinecap="round">
        <animate
          attributeName="x2"
          values="60;60;840;840"
          keyTimes={`0;${T0};${T1};1`}
          dur="6s"
          repeatCount="indefinite"
        />
      </line>
      <circle cx={200} cy={205} r={4.5} fill={mid} />
      <circle cx={450} cy={205} r={5.5} fill="none" stroke={strong} strokeWidth="1.5" />
      <circle cx={700} cy={205} r={8} fill={fillMid} stroke={strong} strokeWidth="1.5" />
      <path
        d="M696 205 L699 208 L705 201"
        fill="none"
        stroke={solid}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={60} cy={205} r={3.5} fill={solid} filter="url(#scamGlow)">
        <animate
          attributeName="cx"
          values="60;60;840;840"
          keyTimes={`0;${T0};${T1};1`}
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};



const HiddenIdentityHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  const printRings = [
    { r: 12, dash: "30 6" },
    { r: 24, dash: "50 8 14 6" },
    { r: 36, dash: "80 10" },
    { r: 48, dash: "110 8 20 6" },
  ];

  const traceNodes = [
    { x: 55, y: 50 },
    { x: 80, y: 168 },
    { x: 245, y: 48 },
    { x: 250, y: 168 },
  ];

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="identityGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Digital traces around the fingerprint */}
      {traceNodes.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={150} y2={105} stroke={soft} strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx={n.x} cy={n.y} r={5} fill={fillSoft} stroke={mid} strokeWidth="1.5" />
        </g>
      ))}

      {/* Fingerprint (left) */}
      {printRings.map((p, i) => (
        <ellipse
          key={p.r}
          cx={150}
          cy={105}
          rx={p.r}
          ry={p.r * 1.2}
          fill="none"
          stroke={i > 1 ? mid : strong}
          strokeWidth="1.5"
          strokeDasharray={p.dash}
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={i % 2 === 0 ? "-60" : "60"}
            dur="8s"
            repeatCount="indefinite"
          />
        </ellipse>
      ))}
      <circle cx={150} cy={105} r={3} fill={solid} filter="url(#identityGlow)" />

      {/* Link fingerprint → subject */}
      <path
        d="M202 105 C 290 105, 340 125, 400 125"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#identityGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Hidden subject silhouette */}
      <circle
        cx={450}
        cy={82}
        r={26}
        fill={fillSoft}
        stroke={strong}
        strokeWidth="2"
        strokeDasharray="4 4"
        filter="url(#identityGlow)"
      />
      <path
        d="M398 162 C398 132 420 118 450 118 C480 118 502 132 502 162 Z"
        fill={fillSoft}
        stroke={strong}
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Scan frame */}
      <path d="M416 58 V48 H426" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M474 48 H484 V58" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M416 106 V116 H426" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M474 116 H484 V106" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Scan line */}
      <line x1={418} y1={50} x2={482} y2={50} stroke={solid} strokeWidth="2" strokeLinecap="round" filter="url(#identityGlow)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 62; 0 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

      {/* Link subject → ID card */}
      <path
        d="M502 120 C 540 120, 560 112, 600 112"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#identityGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* ID card (right) */}
      <rect x={600} y={70} width={160} height={90} rx={8} fill={fillSoft} stroke={strong} strokeWidth="1.8" />
      <rect x={614} y={84} width={38} height={48} rx={4} fill={fillMid} stroke={mid} strokeWidth="1.5" />
      <circle cx={633} cy={101} r={7} fill="none" stroke={strong} strokeWidth="1.5" />
      <path d="M621 128 C621 118 626 114 633 114 C640 114 645 118 645 128" fill="none" stroke={strong} strokeWidth="1.5" strokeLinecap="round" />
      <rect x={666} y={86} width={78} height={4} rx={1.5} fill={mid} />
      <rect x={666} y={98} width={60} height={3} rx={1} fill={soft} />
      <rect x={666} y={108} width={70} height={3} rx={1} fill={soft} />
      <rect x={666} y={118} width={46} height={3} rx={1} fill={soft} />
      <rect x={614} y={142} width={130} height={4} rx={1.5} fill={soft} />

      {/* Match badge */}
      <circle cx={760} cy={70} r={14} fill={fillMid} stroke={strong} strokeWidth="2" filter="url(#identityGlow)">
        <animate attributeName="r" values="13;16;13" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <path d="M753 70 L758 75 L767 64" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Timeline */}
      <line x1={60} y1={202} x2={840} y2={202} stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")} strokeWidth="1.5" />
      <circle cx={200} cy={202} r={4.5} fill={c("rgba(0,229,255,0.95)", "rgba(37,99,235,0.85)")} />
      <circle cx={450} cy={202} r={5.5} fill="none" stroke={strong} strokeWidth="1.5" />
      <circle cx={700} cy={202} r={8} fill={c("rgba(0,229,255,0.35)", "rgba(37,99,235,0.3)")} stroke={strong} strokeWidth="1.5" />
      <path d="M696 202 L699 205 L705 198" fill="none" stroke={solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};


const ThreatIntelHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,1)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.8)", "rgba(37,99,235,0.75)");
  const soft = c("rgba(0,229,255,0.5)", "rgba(37,99,235,0.45)");
  const fillMid = c("rgba(0,229,255,0.4)", "rgba(37,99,235,0.35)");
  const fillSoft = c("rgba(0,229,255,0.2)", "rgba(37,99,235,0.18)");
  const solid = c("#00E5FF", "#2563EB");

  // شبکه دارک‌وب (چپ)
  const nodes = [
    { x: 60, y: 55 },
    { x: 130, y: 105 },
    { x: 75, y: 160 },
    { x: 200, y: 60 },
    { x: 230, y: 150 },
    { x: 300, y: 105 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [3, 5],
    [4, 5],
    [0, 3],
  ];
  const flagged = 3;
  const squareNodes = [2, 4];

  const eyePath = "M385 105 Q450 62 515 105 Q450 148 385 105 Z";
  const shieldPath =
    "M700 62 L734 75 V108 C734 132 718 148 700 156 C682 148 666 132 666 108 V75 Z";

  return (
    <svg
      width="100%"
      viewBox="30 0 840 220"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ opacity: darkMode ? 0.7 : 0.95 }}
    >
      <defs>
        <filter id="threatGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark web network (left) */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={soft}
          strokeWidth="1.5"
          strokeDasharray={a === flagged || b === flagged ? "3 4" : undefined}
        />
      ))}
      {nodes.map((n, i) =>
        i === flagged ? (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={13}
              fill="none"
              stroke={strong}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${n.x} ${n.y}`}
                to={`360 ${n.x} ${n.y}`}
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={n.x} cy={n.y} r={13} fill="none" stroke={solid} strokeWidth="1.5">
              <animate attributeName="r" values="13;26" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={n.x} cy={n.y} r={6} fill={fillMid} stroke={strong} strokeWidth="1.5" filter="url(#threatGlow)" />
            <circle cx={n.x} cy={n.y} r={2.2} fill={solid} />
          </g>
        ) : squareNodes.includes(i) ? (
          <rect
            key={i}
            x={n.x - 7}
            y={n.y - 7}
            width={14}
            height={14}
            rx={2}
            fill={fillSoft}
            stroke={mid}
            strokeWidth="1.5"
          />
        ) : (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={5.5}
            fill={fillMid}
            stroke={mid}
            strokeWidth="1.5"
          />
        )
      )}

      {/* Link: network → eye */}
      <path
        d="M300 105 L362 105"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#threatGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Onion rings around the eye */}
      <circle cx={450} cy={105} r={88} fill={fillSoft} stroke={mid} strokeWidth="1.5" strokeDasharray="4 5">
        <animateTransform attributeName="transform" type="rotate" from="0 450 105" to="360 450 105" dur="24s" repeatCount="indefinite" />
      </circle>
      <circle cx={450} cy={105} r={66} fill="none" stroke={soft} strokeWidth="1.5" strokeDasharray="12 6 3 6">
        <animateTransform attributeName="transform" type="rotate" from="360 450 105" to="0 450 105" dur="18s" repeatCount="indefinite" />
      </circle>
      <circle cx={450} cy={105} r={46} fill="none" stroke={soft} strokeWidth="1" />

      {/* Radar sweep */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 450 105" to="360 450 105" dur="6s" repeatCount="indefinite" />
        <path d="M450 105 L450 17 A88 88 0 0 1 512 43 Z" fill={fillMid} />
        <line x1={450} y1={105} x2={450} y2={17} stroke={strong} strokeWidth="1.8" filter="url(#threatGlow)" />
      </g>

      {/* Eye */}
      <path d={eyePath} fill={c("rgba(10,17,40,0.85)", "rgba(255,255,255,0.9)")} stroke={strong} strokeWidth="2" filter="url(#threatGlow)" />
      <circle cx={450} cy={105} r={19} fill={fillMid} stroke={strong} strokeWidth="1.5" />
      <circle cx={450} cy={105} r={9} fill={solid} filter="url(#threatGlow)">
        <animate attributeName="r" values="8;11;8" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={455} cy={100} r={2.5} fill={c("#0A1128", "#FFFFFF")} opacity="0.85" />


      {/* Link: eye → shield */}
      <path
        d="M538 105 L666 105"
        fill="none"
        stroke={strong}
        strokeWidth="1.8"
        strokeDasharray="6 6"
        filter="url(#threatGlow)"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Alert shield (right) */}
      <circle cx={700} cy={108} r={34} fill="none" stroke={solid} strokeWidth="1.5">
        <animate attributeName="r" values="34;56" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <path d={shieldPath} fill={fillMid} stroke={strong} strokeWidth="2" filter="url(#threatGlow)" />
      <line x1={700} y1={86} x2={700} y2={114} stroke={solid} strokeWidth="3" strokeLinecap="round" />
      <circle cx={700} cy={127} r={2.8} fill={solid}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>

      {/* Threat level bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={770 + i * 17}
          y={150 - (14 + i * 11)}
          width={10}
          height={14 + i * 11}
          rx={2}
          fill={i > 2 ? fillMid : fillSoft}
          stroke={i > 2 ? strong : mid}
          strokeWidth="1.5"
        >
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}

      {/* Timeline */}
      <line x1={60} y1={205} x2={840} y2={205} stroke={c("rgba(0,229,255,0.6)", "rgba(37,99,235,0.55)")} strokeWidth="1.5" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1={60 + i * 40}
          y1={200}
          x2={60 + i * 40}
          y2={210}
          stroke={mid}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx={60} cy={205} r={3.5} fill={solid} filter="url(#threatGlow)">
        <animate attributeName="cx" values="60;840;840" keyTimes="0;0.9;1" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};
 
/* ─── RICH TEXT DISPLAY ─── */
const EMPTY_TIPTAP_CONTENT = { type: "doc", content: [] };

const ServiceTextStyle = Mark.create({
  name: "serviceTextStyle",
  addAttributes() {
    return {
      fontFamily: { default: null, parseHTML: (el: HTMLElement) => el.style.fontFamily || null, renderHTML: (a: any) => a.fontFamily ? { style: `font-family: ${a.fontFamily}` } : {} },
      fontSize: { default: null, parseHTML: (el: HTMLElement) => el.style.fontSize || null, renderHTML: (a: any) => a.fontSize ? { style: `font-size: ${a.fontSize}` } : {} },
      color: { default: null, parseHTML: (el: HTMLElement) => el.style.color || null, renderHTML: (a: any) => a.color ? { style: `color: ${a.color}` } : {} },
      backgroundColor: { default: null, parseHTML: (el: HTMLElement) => el.style.backgroundColor || null, renderHTML: (a: any) => a.backgroundColor ? { style: `background-color: ${a.backgroundColor}` } : {} },
    };
  },
  parseHTML() { return [{ tag: "span[style]" }]; },
  renderHTML({ HTMLAttributes }) { return ["span", mergeAttributes(HTMLAttributes), 0]; },
});

const ServiceRawInlineStyle = Mark.create({
  name: "serviceRawInlineStyle",
  addAttributes() {
    return { htmlStyle: { default: null, parseHTML: (el: HTMLElement) => el.getAttribute("style") || null, renderHTML: (a: any) => a.htmlStyle ? { style: a.htmlStyle } : {} } };
  },
  parseHTML() { return [{ tag: "span[style]" }, { tag: "mark[style]" }]; },
  renderHTML({ HTMLAttributes }) { return ["span", mergeAttributes(HTMLAttributes), 0]; },
});

const ServiceSuper = Mark.create({ name: "serviceSuperscript", parseHTML: () => [{ tag: "sup" }], renderHTML: ({ HTMLAttributes }) => ["sup", mergeAttributes(HTMLAttributes), 0] });
const ServiceSub = Mark.create({ name: "serviceSubscript", parseHTML: () => [{ tag: "sub" }], renderHTML: ({ HTMLAttributes }) => ["sub", mergeAttributes(HTMLAttributes), 0] });
const InsertMark = Mark.create({ name: "insert", parseHTML: () => [{ tag: "ins" }], renderHTML: ({ HTMLAttributes }) => ["ins", mergeAttributes(HTMLAttributes), 0] });
const DeleteMark = Mark.create({ name: "delete", parseHTML: () => [{ tag: "del" }], renderHTML: ({ HTMLAttributes }) => ["del", mergeAttributes(HTMLAttributes), 0] });

const ServiceMore = Node.create({
  name: "serviceMore", group: "block", atom: true,
  parseHTML() { return [{ tag: "div[data-service-more]" }]; },
  renderHTML() { return ["div", { "data-service-more": "true" }, "ادامه مطلب"]; },
});
const MoreNode = Node.create({
  name: "more", group: "block", atom: true,
  parseHTML() { return [{ tag: 'div[data-service-more="true"]' }]; },
  renderHTML() { return ["div", { "data-service-more": "true" }, "ادامه مطلب"]; },
});

const ServiceParagraphStyle = Extension.create({
  name: "serviceParagraphStyle",
  addGlobalAttributes() {
    return [{
      types: ["paragraph", "heading"],
      attributes: {
        textAlign: { default: "right", parseHTML: (el: HTMLElement) => el.style.textAlign || "right", renderHTML: (a: any) => a.textAlign ? { style: `text-align: ${a.textAlign}` } : {} },
        textDirection: { default: "rtl", parseHTML: (el: HTMLElement) => el.getAttribute("dir") || "rtl", renderHTML: (a: any) => a.textDirection ? { dir: a.textDirection } : {} },
        indent: { default: 0, parseHTML: (el: HTMLElement) => Number(el.getAttribute("data-indent") || 0), renderHTML: (a: any) => a.indent ? { "data-indent": String(a.indent), style: `text-indent: ${(a.indent || 0) * 2}em;` } : {} },
        htmlStyle: { default: null, parseHTML: (el: HTMLElement) => el.getAttribute("data-html-style") || null, renderHTML: (a: any) => a.htmlStyle ? { "data-html-style": a.htmlStyle } : {} },
      },
    }];
  },
});

const sanitizeSvg = (svg: string) => svg
  .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
  .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
  .replace(/\s(?:href|xlink:href)\s*=\s*(['"])\s*javascript:[^'"]*\1/gi, "");


const toLatinDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));

const toPersianDigits = (value: string) =>
  value.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const AnimatedStatNumber = ({
  value,
  darkMode,
}: {
  value: string;
  darkMode: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = React.useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();

        const raw = toLatinDigits(String(value)).replace(/,/g, "").trim();
        const target = Number(raw);
        if (!Number.isFinite(target)) {
          setDisplayValue(value);
          return;
        }

        const decimalPlaces = (raw.split(".")[1] || "").length;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          const formatted = decimalPlaces > 0
            ? current.toFixed(decimalPlaces)
            : Math.round(current).toString();
          setDisplayValue(toPersianDigits(formatted));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {displayValue}
    </span>
  );
};

const StepIcon = ({ icon, index, darkMode }: { icon?: string; index: number; darkMode: boolean }) => {
  const customIcon = typeof icon === "string" ? icon.trim() : "";
  if (customIcon && /<svg[\s\S]*<\/svg>/i.test(customIcon)) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: darkMode ? "#00E5FF" : "#1565C0",
        }}
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(customIcon) }}
      />
    );
  }
  const DefaultIcon = index === 0 ? IconBlockchain : index === 1 ? IconTarget : IconShieldDoc;
  return <DefaultIcon darkMode={darkMode} />;
};

const RichTextDisplay = ({ 
  content, 
  darkMode, 
}: { 
  content: any; 
  darkMode: boolean; 
}) => { 
  const editor = useEditor({ 
    extensions: [ 
      StarterKit.configure({ 
        heading: { 
          levels: [1, 2, 3, 4, 5, 6], 
        }, 
      }),
      ServiceTextStyle,
      ServiceRawInlineStyle,
      ServiceSuper,
      ServiceSub,
      ServiceMore,
      ServiceParagraphStyle,
      InsertMark,
      DeleteMark,
      MoreNode,
      Underline, 
      LinkExtension.configure({ 
        openOnClick: true, 
        autolink: true, 
        linkOnPaste: true, 
        HTMLAttributes: { 
          target: "_blank", 
          rel: "noopener noreferrer", 
        }, 
      }), 
    ], 
    content: (content?.type === "doc" 
      ? content 
      : EMPTY_TIPTAP_CONTENT) as any, 
    editable: false, 
    immediatelyRender: false, 
  }); 
 
  useEffect(() => { 
    if (!editor) return; 
 
    const nextContent = 
      content?.type === "doc" 
        ? content 
        : EMPTY_TIPTAP_CONTENT; 
 
    const currentContent = JSON.stringify(editor.getJSON()); 
    const nextJson = JSON.stringify(nextContent); 
 
    if (currentContent !== nextJson) { 
      editor.commands.setContent(nextContent as any); 
    } 
  }, [editor, content]); 
 
  if (!editor) return null; 
 
  return ( 
    <div 
      className="service-urgency-content" 
      style={{ 
        color: darkMode ? "#94A3B8" : "#475569", 
        fontSize: "clamp(0.88rem, 1.6vw, 1rem)", 
        lineHeight: 1.9, 
        direction: "rtl", 
        textAlign: "right", 
      }} 
    > 
      <EditorContent editor={editor} /> 
    </div> 
  ); 
}; 
 
const hasTiptapContent = (value: any) => 
  Boolean( 
    value && 
      value.type === "doc" && 
      Array.isArray(value.content) && 
      value.content.some((node: any) => { 
        if (node?.type === "paragraph" || node?.type === "heading") { 
          return Array.isArray(node.content) 
            ? node.content.some((child: any) => String(child?.text || "").trim()) 
            : false; 
        } 
 
        return ["bulletList", "orderedList", "blockquote", "horizontalRule"].includes( 
          node?.type 
        ); 
      }) 
  ); 


  
 
/* ─── APP ─── */ 
export type SingleServiceInitialData = {
  service: any;
  error: string;
};






const HERO_ARTS: Record<string, React.ComponentType<{ darkMode?: boolean }>> = {
  pentest: PostCrisisPentestHeroArt,
  ransomware: RansomwareNegotiationHeroArt,
  forensics: DigitalForensicsHeroArt,
  crypto: CryptoTracingHeroArt,
  identity: HiddenIdentityHeroArt,
  "threat-intel": ThreatIntelHeroArt,
};

const DEPARTMENTS: Record<string, string> = {
  pentest: "دپارتمان کشف آسیب‌پذیری",
  ransomware: "دپارتمان مهندسی معکوس",
  forensics: "دپارتمان پزشکی قانونی دیجیتال",
  identity: "دپارتمان کشف هویت",
  crypto: "دپارتمان ردیابی مالی",
  "threat-intel": "دپارتمان هوش تهدیدات",
};

export default function App({
  initialService,
  initialServiceError = "",
}: {
  initialService: any;
  initialServiceError?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { darkMode } = useTheme();
  const [crisisOpen, setCrisisOpen] = useState(false);

  const service = initialService;
  const loadingService = false;
  const serviceError = initialServiceError;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

 const department =
  DEPARTMENTS[service?.key] || service?.categoryLabel || "دپارتمان ردیابی مالی";

  return ( 
    
 <div
  dir="rtl"
  className="min-h-full transition-colors duration-300 pt-[var(--header-h,60px)] min-[840px]:pt-[var(--header-h,80px)]"
  style={{
    color: darkMode ? "#E2E8F0" : "#0F172A",
    fontFamily: "var(--font-vazirmatn), sans-serif",
    backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
  }}
>
  {/* ─── BREADCRUMB ─── */}
  <section style={{ background: darkMode ? "#070D1E" : "#F1F5FB" }}>
    <nav
      aria-label="مسیر راهنما"
      className="mx-auto w-full max-w-5xl px-4 py-2.5 sm:px-6 min-[840px]:px-12 min-[840px]:py-3"
    >
      <ol className="flex min-w-0 items-center justify-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs">
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            className={`flex items-center gap-1.5 leading-none transition-colors ${
              darkMode
                ? "text-[#90a4c1] hover:text-[#00E5FF]"
                : "text-[#475569] hover:text-[#1565C0]"
            }`}
          >
            <IconHome />
            خانه
          </Link>
        </li>

        <li
          aria-hidden="true"
          className={`flex shrink-0 items-center ${
            darkMode ? "text-[#334155]" : "text-[#94A3B8]"
          }`}
        >
          <IconChevronLeft />
        </li>

        <li className="shrink-0">
          <Link
            href="/services"
            className={`transition-colors ${
              darkMode
                ? "text-[#90a4c1] hover:text-[#00E5FF]"
                : "text-[#475569] hover:text-[#1565C0]"
            }`}
          >
            خدمات ما
          </Link>
        </li>

        <li
          aria-hidden="true"
          className={`flex shrink-0 items-center ${
            darkMode ? "text-[#334155]" : "text-[#94A3B8]"
          }`}
        >
          <IconChevronLeft />
        </li>

        <li className="min-w-0">
          <span
            aria-current="page"
            className="inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1 sm:px-2.5"
            style={{
              color: darkMode ? "#00E5FF" : "#1565C0",
              background: darkMode ? "rgba(0,229,255,0.055)" : "rgba(21,101,192,0.08)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.1)"
                : "1px solid rgba(21,101,192,0.2)",
            }}
          >
            <span
              className="inline-block h-1 w-1 shrink-0 rounded-full"
              style={{ background: darkMode ? "#00E5FF" : "#1565C0" }}
            />
            <span className="truncate">
              {service?.categoryLabel || "خدمات"}
            </span>
          </span>
        </li>
      </ol>
    </nav>
  </section>

     {crisisOpen && (
<EmergencyModal
  onClose={() => setCrisisOpen(false)}
  serviceLabel={service?.title}
  serviceKey={service?.key}
/>
      )}

       <motion.div
        className="relative flex flex-col items-center text-center px-6 pt-20 pb-10 md:pt-28 md:pb-14 overflow-hidden" 
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
        {/* Radial glow */} 
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: darkMode 
              ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,229,255,0.065) 0%, transparent 70%)" 
              : "", }} 
        /> 
 
        <div className="relative z-10 max-w-3xl mx-auto"> 
          {/* Eyebrow */} 
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold" 
            style={{ 
              background: darkMode ? "rgba(0,229,255,0.07)" : "#EBF3FF", 
              border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(43, 86, 205, 0.32)", 
              color: darkMode ? "#00E5FF" : "#1565C0" 
            }} 
          > 
            <IconBitcoin darkMode={darkMode} /> 
            {department}
          </div> 
 
          {/* H1 */} 
          <h1 
            className="font-black leading-snug mb-5" 
            style={{ 
              fontSize: "56px", 
              color: darkMode ? "#fff" : "#0F172A", 
              textShadow: darkMode 
                ? "0 0 50px rgba(0,229,255,0.15), 0 0 100px rgba(0,229,255,0.05)" 
                : "0 0 30px rgba(37,99,235,0.06)", 
              lineHeight: 1.28, 
              fontWeight: "500"
            }} 
          > 
            {loadingService ? (
              <span aria-label="در حال بارگذاری عنوان خدمت" style={{ display: "inline-block", width: "min(100%, 620px)", height: "1.35em", borderRadius: 10, background: darkMode ? "linear-gradient(90deg, rgba(255,255,255,0.07), rgba(0,229,255,0.16), rgba(255,255,255,0.07))" : "linear-gradient(90deg, rgba(15,23,42,0.06), rgba(37,99,235,0.13), rgba(15,23,42,0.06))", backgroundSize: "200% 100%", animation: "serviceTitleSkeleton 1.5s ease-in-out infinite", verticalAlign: "middle" }} />
            ) : (
              service?.title || "ردیابی رمزارزهای سرقت‌شده و کلاهبرداری‌های پانزی"
            )} 
          </h1> 
 
          {/* Sub-headline */} 
          <p 
            className="max-w-2xl mx-auto mb-8 leading-relaxed" 
            style={{ color: darkMode ? "#94A3B8" : "#475569", fontSize: "16px", fontWeight: 500, lineHeight: "1.75" }} 
          > 
            {service?.shortDesc || 
              "مجرمان سایبری فکر می‌کنند تراکنش‌های کریپتو غیرقابل رهگیری است. ما با استفاده از پیشرفته‌ترین ابزارهای آن‌چین (On-chain)، تتر و بیت‌کوینِ سرقتی شما را تا صرافی نهایی ردیابی می‌کنیم."} 
          </p> 
 
          {/* Primary CTA */} 
          <button 
            onClick={() => setCrisisOpen(true)} 
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-bold transition-all duration-300 mb-4" 
           style={{ 
                background: "#EF4444", 
                color: "#ffffff", 
                border:
                   "1px solid rgba(239, 68, 68, 0.6)",
                boxShadow:
                   "0 0 15px rgba(239,68,68,0.35)"
              }} 
              onMouseEnter={(e) => { 
                e.currentTarget.style.boxShadow =
                   "0 0 22px rgba(239,68,68,0.55)"
                    e.currentTarget.style.transform = "translateY(-1px)";
 

              }} 
              onMouseLeave={(e) => { 
                e.currentTarget.style.boxShadow =
                   "0 0 15px rgba(239,68,68,0.35)" 
                   e.currentTarget.style.transform = "none";
 

              }} 
          > 
            <IconWarning /> 
           درخواست کمک فوری   
          </button> 
 
          
        </div> 
 
        {/* Blockchain art */} 
        <div className="relative z-10 w-full max-w-4xl mt-10 -mb-4"> 
{(() => {
  const HeroArt = HERO_ARTS[service?.key] ?? BlockchainHeroArt;
  return <HeroArt darkMode={darkMode} />;
})()}
        </div>  
</motion.div>
 


      {/* ─── PAIN POINT BANNER ─── */} 

       <motion.div
        className="px-6 py-16 md:px-12"  
        style={{ 
          background: darkMode ? "#060b199d" : "#F8FAFC", 
          borderBottom: darkMode 
            ? "1px solid #060b1986" 
            : "1px solid rgba(29,78,216,0.12)" 
        }}  
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-3xl mx-auto" style={{ paddingTop: "10px" }}> 
 
          {loadingService ? ( 
            <div style={{ color: "#64748B", fontSize: "0.9rem" }}> 
              در حال بارگذاری محتوای هشدار... 
            </div> 
          ) : serviceError ? ( 
            <div style={{ color: "#EF4444", fontSize: "0.9rem" }}> 
              {serviceError} 
            </div> 
          ) : hasTiptapContent(service?.urgencyContent) ? ( 
            <RichTextDisplay 
              content={service.urgencyContent} 
              darkMode={darkMode} 
            /> 
          ) : ( 
            <div style={{ color: "#64748B", fontSize: "0.9rem" }}> 
              برای این خدمت محتوای هشدار ثبت نشده است. 
            </div> 
          )} 
 
        </div> 
</motion.div>
 
{/* ─── HOW WE TRACK ─── */} 
        <motion.div
        className="px-6 py-20 md:px-12" 
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-4xl mx-auto"> 
          {/* Header */} 
          <div className="text-center mb-14"> 
            <span 
              style={{ fontFamily: "'JetBrains Mono',monospace", color: darkMode ? "rgba(0,229,255,0.5)" : "#1565C0", letterSpacing: "0.18em", textTransform: "uppercase" }} 
              className="block mb-3 data-label" 
            > 
              HOW IT WORK 
            </span> 

            <h2  
              className="font-bold"  
              style={{ 
                fontSize: "42px", 
                color: darkMode ? "#fff" : "#0F172A",
                fontWeight: "500",
                lineHeight: "1.33" 
              }}  
            >  
              {service?.trackingTitle || "مراحل شناسایی و ردیابی"} 
            </h2> 

<div
  className={`w-24 mx-auto mt-4 ${
    darkMode
      ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      : "bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
  }`}
  style={{
    height: "1px",
    minHeight: "1px",
    maxHeight: "1px",
    flexShrink: 0,
  }}
/>
          </div> 
 
          {/* 3 vertical cards */} 
          <div className="flex flex-col gap-5"> 
 
            {(service?.trackingSteps || []).slice(0, 3).map((step: any, index: number) => {
              return ( 
                <div key={index}> 
 
                  {/* Card */} 
                  <div 
                    dir="rtl"
                    className="glass-card p-5 sm:p-7 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group transition-all duration-300 border border-cyan-500/30 hover:border-cyan-600 bg-[rgba(255,255,255,0.028)] hover:bg-cyan-900/15 rounded-2xl" 
                    style={{ 
                      textAlign: "right", 
                      background: darkMode ? undefined : "#ebebeb4b", 
                      borderColor: darkMode 
                        ? undefined 
                        : "rgba(90, 128, 226, 0.49)", 
                      boxShadow: darkMode 
                        ? undefined 
                        : "0 4px 20px rgba(15,23,42,0.06)", 
                         backdropFilter: "blur(10px)" 
                    }} 
                    onMouseEnter={(e) => {
                      if (!darkMode) { 
                        e.currentTarget.style.boxShadow = 
                          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"; 
                        e.currentTarget.style.borderColor = 
                          "#1565C0"; 
                        e.currentTarget.style.background = 
                          "#d0d0d035"; 
                      } 
                    }} 
                    onMouseLeave={(e) => { 
                      if (!darkMode) { 
                        e.currentTarget.style.boxShadow = 
                          "0 4px 20px rgba(15,23,42,0.06)"; 
                        e.currentTarget.style.borderColor = 
                          "rgba(90, 128, 226, 0.72)"; 
                        e.currentTarget.style.background = "#ebebeb4b"; 
                      } 
                    }} 
                  > 
 
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" 
                      style={{ 
                        background: darkMode 
                          ? "rgba(0,229,255,0.06)" 
                          : "#EFF6FF", 
                        border: darkMode 
                          ? "1px solid rgba(0,229,255,0.2)" 
                          : "1px solid #4685ccc2", 
                      }} 
                    > 
                      <StepIcon
                        icon={step?.icon}
                        index={index}
                        darkMode={darkMode}
                      /> 
                    </div> 
 
                    <div className="w-full min-w-0 sm:flex-1 text-right"> 
 
                      <div className="flex items-center gap-3 mb-2"> 
                        <span 
                          style={{ 
                           fontFamily: '"JetBrains Mono Variable"',
                            fontWeight: "500", 
                            color: darkMode 
                              ? "rgba(0,229,255,0.5)" 
                              : "#1565C0", 
                            letterSpacing: "0.05em", 
                            fontSize: "13px"
                            
                          }} 
                        > 
                          STEP {String(index + 1).padStart(2, "0")} 
                        </span> 
 
                       <div 
  style={{ 
    flex: 1, 
    height: 0, 
    borderTop: `1px solid ${
      darkMode ? "rgba(0, 229, 255, 0.17)" : "rgba(90, 128, 226, 0.52)"
    }`, 
  }} 
/> 
                      </div> 
 
                      <h3 
                        className="font-bold mb-2" 
                        style={{ 
                          
                          color: darkMode ? "#fff" : undefined, 
                          fontSize: "18px", 
                          lineHeight: "1.5",
                          fontWeight: "500"
                        }} 
                      > 
                        {step?.title || ""} 
                      </h3> 
 
                      <p 
                        style={{ 
                          color: darkMode ? "#64748B" : "#475569", 
                          fontSize: "14px", 
                          lineHeight: 2, 
                          fontWeight: "500"
                        }} 
                      > 
                        {step?.description || ""} 
                      </p> 
 
                      {step?.tag && ( 
                        <div className="flex flex-wrap gap-2 mt-3">
                          {String(step.tag)
                            .split(/[,،]/)
                            .map((tag: string) => tag.trim())
                            .filter(Boolean)
                            .map((tag: string, tagIndex: number) => (
                              <span 
                                key={`${tag}-${tagIndex}`}
                                className="px-2.5 py-0.5 rounded" 
                                style={{ 
                                  background: darkMode 
                                    ? "rgba(0,229,255,0.06)" 
                                    : "rgba(30,58,138,0.06)", 
                                  border: darkMode 
                                    ? "1px solid rgba(0,229,255,0.12)" 
                                    : "1px solid #1565c082", 
                                  color: darkMode 
                                    ? "rgba(0,229,255,0.5)" 
                                    : "#1565C0", 
                                  fontFamily: '"JetBrains Mono Variable"', 
                                  fontWeight: 500, 
                                  fontSize:"0.73rem",
                                  letterSpacing: "0.1em", 


                                }} 
                              > 
                                {tag}
                              </span>
                            ))}
                        </div>
                      )} 
 
                    </div> 
                  </div> 
 
                  {/* Connector */} 
                  {index < 2 && ( 
                    <div 
                      className="flex items-center justify-center -my-1" 
                      style={{ opacity: 1 }} 
                    > 
                      <div 
                      className="mt-3"
                        style={{ 
                          height: 24, 
                          width: 1, 
                          background: darkMode 
                            ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))" 
                            : "linear-gradient(180deg, rgba(29,78,216,0.16), #1565C0)", 
                          marginRight: "auto", 
                          marginLeft: "auto", 
                        }} 
                      /> 
                    </div> 
                  )} 
 
                </div> 
              ); 
            })} 
 
          </div> 
        </div> 
</motion.div>

      





<ServiceFaq faqs={service?.faqs} darkMode={darkMode} />




 
    
 
      <style jsx global>{`
        @keyframes serviceTitleSkeleton {
          0% { background-position: 200% 0; opacity: 0.65; }
          50% { opacity: 1; }
          100% { background-position: -200% 0; opacity: 0.65; }
        }

        .service-urgency-content .ProseMirror { 
          outline: none; 
          width: 100%; 
        } 
 
        .service-urgency-content .ProseMirror p { 
          margin: 0 0 14px; 
        } 
 
        .service-urgency-content .ProseMirror p:last-child { 
          margin-bottom: 0; 
        } 
 
        .service-urgency-content .ProseMirror h1, 
        .service-urgency-content .ProseMirror h2, 
        .service-urgency-content .ProseMirror h3 { 
          color: ${darkMode ? "#fff" : "#111827"}; 
          font-weight: 800; 
          line-height: 1.5; 
          margin: 0 0 14px; 
        } 
 
        .service-urgency-content .ProseMirror h1 { 
          font-size: clamp(1.5rem, 3vw, 2rem); 
        } 
 
        .service-urgency-content .ProseMirror h2 { 
          font-size: clamp(1.3rem, 2.8vw, 1.9rem); 
        } 
 
        .service-urgency-content .ProseMirror h3 { 
          font-size: clamp(1.2rem, 2.5vw, 1.55rem); 
        } 
 
        .service-urgency-content .ProseMirror strong { 
          color: ${darkMode ? "#E2E8F0" : "#1E293B"}; 
          font-weight: 800; 
        } 
 
        .service-urgency-content .ProseMirror u { 
          text-decoration-thickness: 1.5px; 
          text-underline-offset: 3px; 
        } 
 
        .service-urgency-content .ProseMirror ul, 
        .service-urgency-content .ProseMirror ol { 
          padding-right: 30px; 
          padding-left: 0; 
          margin: 10px 0 14px; 
        } 
 
        .service-urgency-content .ProseMirror ul { 
          list-style-type: disc; 
        } 
 
        .service-urgency-content .ProseMirror ol { 
          list-style-type: decimal; 
        } 
 
        .service-urgency-content .ProseMirror li { 
          display: list-item; 
          padding-right: 4px; 
          margin: 5px 0; 
        } 
 
        .service-urgency-content .ProseMirror li::marker { 
          color: ${darkMode ? "#00E5FF" : "#2563EB"}; 
          font-weight: 800; 
        } 
 
        .service-urgency-content .ProseMirror blockquote { 
          border-right: 3px solid ${darkMode ? "rgba(0,229,255,.35)" : "rgba(37,99,235,.3)"}; 
          margin: 14px 0; 
          padding: 8px 14px; 
          color: ${darkMode ? "#94A3B8" : "#475569"}; 
          background: ${darkMode ? "rgba(0,229,255,.025)" : "rgba(37,99,235,.035)"}; 
          border-radius: 6px; 
        } 
 
        .service-urgency-content .ProseMirror hr { 
          border: 0; 
          border-top: 1px solid ${darkMode ? "rgba(0,229,255,.15)" : "rgba(37,99,235,.15)"}; 
          margin: 18px 0; 
        } 
 
        .service-urgency-content .ProseMirror a { 
          color: ${darkMode ? "#00E5FF" : "#2563EB"}; 
          text-decoration: underline; 
          text-underline-offset: 3px; 
        } 
      `}</style> 
    </div> 
  ); 
} 