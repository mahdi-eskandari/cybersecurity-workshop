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
    return <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: sanitizeSvg(customIcon) }} />;
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

 
  return ( 
    
 <div
    className="min-h-full transition-colors duration-300"
    style={{
      color: darkMode ? "#E2E8F0" : "#0F172A",
      fontFamily: "var(--font-vazirmatn), sans-serif",
      backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
      backgroundImage: darkMode
        ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
        : "linear-gradient(rgba(30,58,138,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.035) 1px,transparent 1px)",
      backgroundSize: "52px 52px",
      backgroundAttachment: "fixed",
    }}
  > 



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
              : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(30,58,138,0.10) 0%, transparent 70%)", }} 
        /> 
 
        <div className="relative z-10 max-w-3xl mx-auto"> 
          {/* Eyebrow */} 
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold" 
            style={{ 
              background: darkMode ? "rgba(0,229,255,0.07)" : "rgba(30,58,138,0.06)", 
              border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(29,78,216,0.20)", 
              color: darkMode ? "#00E5FF" : "#1E3A8A" 
            }} 
          > 
            <IconBitcoin darkMode={darkMode} /> 
            {service?.categoryLabel || "دپارتمان ردیابی مالی و بلاک‌چین"} 
          </div> 
 
          {/* H1 */} 
          <h1 
            className="font-black leading-snug mb-5" 
            style={{ 
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", 
              color: darkMode ? "#fff" : "#0F172A", 
              textShadow: darkMode 
                ? "0 0 50px rgba(0,229,255,0.15), 0 0 100px rgba(0,229,255,0.05)" 
                : "0 0 30px rgba(37,99,235,0.06)", 
              lineHeight: 1.35, 
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
            style={{ color: darkMode ? "#94A3B8" : "#475569", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", fontWeight: 400 }} 
          > 
            {service?.shortDesc || 
              "مجرمان سایبری فکر می‌کنند تراکنش‌های کریپتو غیرقابل رهگیری است. ما با استفاده از پیشرفته‌ترین ابزارهای آن‌چین (On-chain)، تتر و بیت‌کوینِ سرقتی شما را تا صرافی نهایی ردیابی می‌کنیم."} 
          </p> 
 
          {/* Primary CTA */} 
          <Link 
            onClick={() => setCrisisOpen(true)} 
            href="mailto:secure@parahoor.io" 
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300 mb-4" 
            style={{ 
              background: darkMode ? "#EF4444" : "#2563EB", 
              color: "#ffffff", 
              border: darkMode 
                ? "1px solid rgba(239, 68, 68, 0.6)" 
                : "1px solid rgba(37,99,235,0.6)", 
              boxShadow: darkMode 
                ? "0 0 15px rgba(239,68,68,0.35)" 
                : "0 0 15px rgba(37,99,235,0.18)", 
            }} 
            onMouseEnter={(e) => { 
              e.currentTarget.style.boxShadow = darkMode 
                ? "0 0 22px rgba(239,68,68,0.55)" 
                : "0 0 22px rgba(37,99,235,0.28)" 
 
              if (!darkMode) { 
                e.currentTarget.style.background = "#3B82F6" 
                e.currentTarget.style.borderColor = "#3B82F6" 
              } 
            }} 
            onMouseLeave={(e) => { 
              e.currentTarget.style.boxShadow = darkMode 
                ? "0 0 15px rgba(239,68,68,0.35)" 
                : "0 0 15px rgba(37,99,235,0.18)" 
 
              if (!darkMode) { 
                e.currentTarget.style.background = "#2563EB" 
                e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)" 
              } 
            }} 
          > 
            <IconWarning /> 
            درخواست ردیابی فوری      
          </Link> 
 
          {/* Trust micro-signals */} 
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2"> 
            {[ 
              "پاسخ اولیه در کمتر از ۲ ساعت", 
              "رازداری کامل پرونده", 
              "گزارش دادگاه‌پسند", 
            ].map((item) => ( 
              <div key={item} className="flex items-center gap-1.5"> 
                <IconCheck darkMode={darkMode} /> 
                <span style={{ color: darkMode ? "#64748B" : "#475569", fontSize: "0.78rem" }}>{item}</span> 
              </div> 
            ))} 
          </div> 
        </div> 
 
        {/* Blockchain art */} 
        <div className="relative z-10 w-full max-w-4xl mt-10 -mb-4"> 
          <BlockchainHeroArt darkMode={darkMode} /> 
        </div>  
</motion.div>
 


      {/* ─── PAIN POINT BANNER ─── */} 

       <motion.div
        className="px-6 py-16 md:px-12"  
        style={{ 
          background: darkMode ? "#060B19" : "#F8FAFC", 
          borderBottom: darkMode 
            ? "1px solid rgba(0,229,255,0.07)" 
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
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: darkMode ? "rgba(0,229,255,0.45)" : "#1E3A8A", letterSpacing: "0.18em", textTransform: "uppercase" }} 
              className="block mb-3" 
            > 
              INVESTIGATION PIPELINE 
            </span> 

            <h2  
              className="font-bold"  
              style={{ 
                fontSize: "clamp(1.3rem, 2.8vw, 2rem)", 
                color: darkMode ? "#fff" : "#0F172A" 
              }}  
            >  
              {service?.trackingTitle || "مراحل شناسایی و ردیابی"} 
            </h2> 

            <div 
              className="mt-4 mx-auto" 
              style={{ height: 1, width: 80, background: darkMode ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)" : "linear-gradient(90deg,transparent,rgba(29,78,216,0.35),transparent)" }} 
            /> 
          </div> 
 
          {/* 3 vertical cards */} 
          <div className="flex flex-col gap-5"> 
 
            {(service?.trackingSteps || []).slice(0, 3).map((step: any, index: number) => {
              return ( 
                <div key={index}> 
 
                  {/* Card */} 
                  <div 
                    className="glass-card p-7 flex items-start gap-6 group transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15 rounded-2xl" 
                    style={{ 
                      textAlign: "right", 
                      background: darkMode ? undefined : "#FFFFFF", 
                      borderColor: darkMode 
                        ? undefined 
                        : "rgba(141, 166, 228, 0.86)", 
                      boxShadow: darkMode 
                        ? undefined 
                        : "0 4px 20px rgba(15,23,42,0.06)", 
                    }} 
                    onMouseEnter={(e) => {
                      if (!darkMode) { 
                        e.currentTarget.style.transform = "translateY(-3px)"; 
                        e.currentTarget.style.boxShadow = 
                          "0  16px 40px rgba(66, 91, 158, 0.34)"; 
                        e.currentTarget.style.borderColor = 
                          "rgba(53, 95, 211, 0.52)"; 
                        e.currentTarget.style.background = 
                          "rgba(243, 248, 255, 0.6)"; 
                      } 
                    }} 
                    onMouseLeave={(e) => { 
                      if (!darkMode) { 
                        e.currentTarget.style.transform = "translateY(0)"; 
                        e.currentTarget.style.boxShadow = 
                          "0 4px 20px rgba(15,23,42,0.06)"; 
                        e.currentTarget.style.borderColor = 
                          "rgba(139, 158, 208, 0.2)"; 
                        e.currentTarget.style.background = "#FFFFFF"; 
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
                          : "1px solid rgba(29,78,216,0.20)", 
                      }} 
                    > 
                      <StepIcon
                        icon={step?.icon}
                        index={index}
                        darkMode={darkMode}
                      /> 
                    </div> 
 
                    <div className="flex-1"> 
 
                      <div className="flex items-center gap-3 mb-2"> 
                        <span 
                          style={{ 
                            fontFamily: "monospace", 
                            fontSize: "0.65rem", 
                            color: darkMode 
                              ? "rgba(0,229,255,0.4)" 
                              : "#1E3A8A", 
                            letterSpacing: "0.12em", 
                          }} 
                        > 
                          STEP {String(index + 1).padStart(2, "0")} 
                        </span> 
 
                        <div 
                          style={{ 
                            flex: 1, 
                            height: 1, 
                            background: darkMode 
                              ? "rgba(0,229,255,0.08)" 
                              : "rgba(29,78,216,0.12)", 
                          }} 
                        /> 
                      </div> 
 
                      <h3 
                        className="font-bold mb-2" 
                        style={{ 
                          color: darkMode ? "#fff" : "#0F172A", 
                          fontSize: "1.05rem", 
                        }} 
                      > 
                        {step?.title || ""} 
                      </h3> 
 
                      <p 
                        style={{ 
                          color: darkMode ? "#64748B" : "#475569", 
                          fontSize: "0.85rem", 
                          lineHeight: 1.8, 
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
                                className="px-2.5 py-0.5 rounded text-xs" 
                                style={{ 
                                  background: darkMode 
                                    ? "rgba(0,229,255,0.06)" 
                                    : "rgba(30,58,138,0.06)", 
                                  border: darkMode 
                                    ? "1px solid rgba(0,229,255,0.12)" 
                                    : "1px solid rgba(29,78,216,0.20)", 
                                  color: darkMode 
                                    ? "rgba(0,229,255,0.5)" 
                                    : "#1E3A8A", 
                                  fontFamily: "monospace", 
                                  fontWeight: 700, 
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
                      className="mt-2"
                        style={{ 
                          height: 24, 
                          width: 1, 
                          background: darkMode 
                            ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))" 
                            : "linear-gradient(180deg, rgba(29,78,216,0.16), rgba(29,78,216,0.58))", 
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
 
      {/* ─── STATS BAND ─── */} 
     <motion.div
        className="px-6 py-12 md:px-12" 
        style={{ 
          background: darkMode ? "rgba(0,229,255,0.025)" : "#F8FAFC", 
          borderTop: darkMode 
            ? "1px solid rgba(0,229,255,0.07)" 
            : "1px solid rgba(29,78,216,0.12)", 
          borderBottom: darkMode 
            ? "1px solid rgba(0,229,255,0.07)" 
            : "1px solid rgba(29,78,216,0.12)", 
        }} 
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"> 
          {[ 
            { 
              value: "+۳۰۰", 
              label: "پرونده بسته‌شده", 
            }, 
            { 
              value: "۴.۵", 
              unit: "M$", 
              label: "دارایی ردیابی‌شده", 
            }, 
            { 
              value: "۱۴", 
              label: "شبکه بلاک‌چین پشتیبانی", 
            }, 
            { 
              value: "۲", 
              unit: "h", 
              label: "میانگین پاسخ اولیه", 
            }, 
          ].map(({ value, unit, label }) => ( 
            <div key={label}> 
              <div 
                className="font-black mb-1" 
                style={{ 
                  fontSize: "clamp(1.75rem, 3.8vw, 2.55rem)", 
                  color: darkMode ? "#00E5FF" : "#1E3A8A", 
 
                  // یک فونت ثابت و تمیز در هر دو مود 
                  fontFamily: 
                    "Inter, Vazirmatn, IRANSansX, Arial, sans-serif", 
 
                  fontWeight: 800, 
 
                  // فاصله حروف کمی فشرده ولی نه بیش از حد 
                  letterSpacing: "-0.025em", 
 
                  // اعداد مرتب و هم‌عرض 
                  fontVariantNumeric: "tabular-nums lining-nums", 
                  fontFeatureSettings: '"tnum" 1, "lnum" 1', 
 
                  lineHeight: 1.05, 
 
                  // جلوگیری از به‌هم‌ریختن ترکیب فارسی و لاتین 
                  direction: "ltr", 
                  unicodeBidi: "isolate", 
 
                  // ظاهر نرم‌تر 
                  WebkitFontSmoothing: "antialiased", 
                  MozOsxFontSmoothing: "grayscale", 
                }} 
              > 
                <span 
                  style={{ 
                    display: "inline-block", 
                    verticalAlign: "baseline", 
                  }} 
                > 
                  <AnimatedStatNumber value={value} darkMode={darkMode} />
                </span> 
 
                {unit && ( 
                  <span 
                    style={{ 
                      display: "inline-block", 
                      marginRight: "0.08em", 
                      marginLeft: "0.08em", 
                      fontSize: "1em", 
                      fontWeight: 700, 
                      letterSpacing: "-0.025em", 
                      opacity: 0.95, 
                      verticalAlign: "baseline", 
                    }} 
                  > 
                    {unit} 
                  </span> 
                )} 
              </div> 
 
              <div 
                style={{ 
                  color: darkMode ? "#94A3B8" : "#334155", 
                  fontSize: "0.78rem", 
                  fontWeight: 600, 
                  lineHeight: 1.7, 
                }} 
              > 
                {label} 
              </div> 
            </div> 
          ))} 
        </div> 
</motion.div>









 
      {/* ─── BOTTOM CONVERSION AREA ─── */} 
          <motion.div
        className="px-6 py-20 md:px-12"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-2xl mx-auto"> 
          <div 
            className="relative p-8 md:p-12 rounded-2xl text-center overflow-hidden" 
            style={{ 
              background: darkMode ? "rgba(255,255,255,0.03)" : "#FFFFFF", 
              border: darkMode 
                ? "1px solid rgba(0,229,255,0.18)" 
                : "1px solid rgba(29,78,216,0.20)", 
              boxShadow: darkMode 
                ? "0 0 60px rgba(0,229,255,0.06), 0 0 120px rgba(0,229,255,0.03), inset 0 0 60px rgba(0,229,255,0.02)" 
                : "0 4px 20px rgba(15,23,42,0.06)", 
            }} 
          > 
            {/* Corner accents */} 
            <div 
              style={{ 
                position: "absolute", 
                top: 0, 
                right: 0, 
                width: 60, 
                height: 60, 
                borderTop: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid rgba(29,78,216,0.35)", 
                borderRight: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid rgba(29,78,216,0.35)", 
                borderRadius: "0 16px 0 0" 
              }} 
            /> 

            <div 
              style={{ 
                position: "absolute", 
                bottom: 0, 
                left: 0, 
                width: 60, 
                height: 60, 
                borderBottom: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid rgba(29,78,216,0.35)", 
                borderLeft: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid rgba(29,78,216,0.35)", 
                borderRadius: "0 0 0 16px" 
              }} 
            /> 
 
            <span 
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: darkMode ? "rgba(0,229,255,0.45)" : "#1E3A8A", letterSpacing: "0.2em", textTransform: "uppercase" }} 
              className="block mb-4" 
            > 
              FREE INITIAL ASSESSMENT 
            </span> 
 
            <h2 
              className="font-bold mb-4" 
              style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)", color: darkMode ? "#fff" : "#0F172A", lineHeight: 1.5 }} 
            > 
              همین الان پرونده خود را<br />برای بررسی اولیه ارسال کنید. 
            </h2> 
 
            <p 
              className="mb-8" 
              style={{ 
                color: darkMode ? "#606d7f" : "#475569", 
                fontSize: "0.88rem", 
                lineHeight: 1.8 
              }} 
            > 
              تیم فنی پاراهور پرونده شما را بدون هزینه ارزیابی اولیه می‌کند و امکان‌سنجی ردیابی را به شما اعلام می‌نماید. 
            </p> 
 
            <Link 
              onClick={() => setCrisisOpen(true)} 
              href="mailto:secure@parahoor.io" 
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300" 
              style={{ 
                background: darkMode ? "#EF4444" : "#2563EB", 
                color: "#ffffff", 
                border: darkMode 
                  ? "1px solid rgba(239, 68, 68, 0.6)" 
                  : "1px solid rgba(37,99,235,0.6)", 
                boxShadow: darkMode 
                  ? "0 0 15px rgba(239,68,68,0.35)" 
                  : "0 0 15px rgba(37,99,235,0.18)", 
              }} 
              onMouseEnter={(e) => { 
                e.currentTarget.style.boxShadow = darkMode 
                  ? "0 0 22px rgba(239,68,68,0.55)" 
                  : "0 0 22px rgba(37,99,235,0.28)" 
 
                if (!darkMode) { 
                  e.currentTarget.style.background = "#3B82F6" 
                  e.currentTarget.style.borderColor = "#3B82F6" 
                } 
              }} 
              onMouseLeave={(e) => { 
                e.currentTarget.style.boxShadow = darkMode 
                  ? "0 0 15px rgba(239,68,68,0.35)" 
                  : "0 0 15px rgba(37,99,235,0.18)" 
 
                if (!darkMode) { 
                  e.currentTarget.style.background = "#2563EB" 
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)" 
                } 
              }} 
            > 
              تکمیل فرم گزارش بحران 
              <IconLink /> 
            </Link> 
 
            {/* Modal */} 
            {crisisOpen && ( 
              <EmergencyModal 
                onClose={() => setCrisisOpen(false)} 
              /> 
            )} 
 
            <p 
              className="mt-4 text-xs" 
              style={{ color: darkMode ? "#606d7f" : "#475569" }} 
            > 
              بدون تعهد مالی • کاملاً محرمانه • پاسخ در کمتر از ۲ ساعت 
            </p> 
          </div> 
        </div> 
</motion.div>
 
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