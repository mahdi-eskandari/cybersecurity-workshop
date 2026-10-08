
// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { EditorContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor, type Editor, type NodeViewProps } from "@tiptap/react";
// import { Extension, Mark, Node, mergeAttributes } from "@tiptap/core";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Underline from "@tiptap/extension-underline";
// import Placeholder from "@tiptap/extension-placeholder";

// /* ─────────────────────────────────────────────
//    ICONS
// ───────────────────────────────────────────── */

// const I = (paths: string | string[], w = 14, sw = 2) => (
//   <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
//     {(Array.isArray(paths) ? paths : [paths]).map((d, i) => <path key={i} d={d} />)}
//   </svg>
// );

// const IconPlus = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// const IconBold = () => I(["M6 4h8a4 4 0 010 8H6z", "M6 12h9a4 4 0 010 8H6z"]);
// const IconItalic = () => I(["M19 4h-9", "M14 20H5", "M15 4l-6 16"]);
// const IconUnderline = () => I(["M6 3v7a6 6 0 0012 0V3", "M4 21h16"]);
// const IconStrike = () => I(["M4 12h16", "M7 7c.8-2 2.8-3 5.5-3 3 0 5 1.3 5.5 3", "M17 17c-.9 1.9-2.8 3-5.5 3-3.1 0-5.1-1.3-5.6-3"]);
// const IconLink = () => I(["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"]);
// const IconList = () => I(["M9 6h11", "M9 12h11", "M9 18h11", "M4 6h.01", "M4 12h.01", "M4 18h.01"]);
// const IconListOrdered = () => I(["M10 6h11", "M10 12h11", "M10 18h11", "M4 5v2", "M3 7h2", "M3 11h2", "M4 10v3", "M3 18c.4-.8 1.1-1.2 2-1.2 1 0 1.6.5 1.6 1.2 0 .6-.4 1-1.2 1.5L3 21h4"]);
// const IconQuote = () => I(["M7 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4", "M18 17h-2a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4"]);
// const IconCode = () => I(["M8 6l-6 6 6 6", "M16 6l6 6-6 6", "M14 4l-4 16"]);
// const IconMinus = () => I("M4 12h16");
// const IconUndo = () => I(["M9 14L4 9l5-5", "M4 9h10a6 6 0 010 12h-1"]);
// const IconRedo = () => I(["M15 14l5-5-5-5", "M20 9H10a6 6 0 000 12h1"]);
// const IconAlignLeft = () => I(["M4 6h16", "M4 12h11", "M4 18h16"]);
// const IconAlignCenter = () => I(["M4 6h16", "M7 12h10", "M4 18h16"]);
// const IconAlignRight = () => I(["M4 6h16", "M9 12h11", "M4 18h16"]);
// const IconAlignJustify = () => I(["M4 6h16", "M4 12h16", "M4 18h16"]);
// const IconIndentIn = () => I(["M9 6h11", "M9 12h11", "M9 18h11", "M5 8l-3 4 3 4"]);
// const IconIndentOut = () => I(["M4 6h16", "M4 12h16", "M4 18h16", "M2 8l3 4-3 4"]);
// const IconSup = () => I(["M4 18l7-12", "M11 18L4 6", "M15 9h5l-4 5h4"]);
// const IconSub = () => I(["M4 6l7 12", "M11 6L4 18", "M15 15h5l-4 5h4"]);
// const IconMore = () => I(["M4 6h16v12H4z", "M8 12h.01", "M12 12h.01", "M16 12h.01"]);
// const IconSymbols = () => I(["M6 4v16", "M18 4v16", "M3 8h18", "M3 16h18"]);
// const IconClear = () => I(["M4 7h16", "M7 7v11a2 2 0 002 2h6a2 2 0 002-2V7", "M9 4h6", "M10 11v5", "M14 11v5"]);
// const IconEdit = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );

// const IconTrash = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6" />
//     <path d="M14 11v6" />
//     <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
//   </svg>
// );

// const IconEye = () => I(["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8", "M12 9a3 3 0 100 6 3 3 0 000-6z"]);
// const IconTag = () => I(["M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z", "M7 7h.01"]);
// const IconGlobe = () => I(["M12 2a10 10 0 100 20A10 10 0 0012 2z", "M2 12h20", "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"]);
// const IconImage = () => I(["M3 3h18v18H3z", "M8.5 8.5h.01", "M21 15l-5-5L5 21"]);
// const IconUpload = () => I(["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"]);
// const IconCheck = () => I("M20 6L9 17l-5-5", 12, 2.8);
// const IconX = () => I(["M18 6L6 18", "M6 6l12 12"], 11, 2.5);
// const IconClose = () => I(["M6 6l12 12", "M18 6L6 18"]);
// const IconHeading = () => I(["M5 5v14", "M19 5v14", "M5 12h14"]);
// const IconRtl = () => I(["M5 5h9", "M5 9h7", "M5 13h9", "M19 5v14", "M15 15l4 4 4-4", "M4 19h10"]);
// const IconLtr = () => I(["M10 5h9", "M12 9h7", "M10 13h9", "M5 5v14", "M1 9l4-4 4 4", "M5 19h10"]);

// /* ─────────────────────────────────────────────
//    DATA
// ───────────────────────────────────────────── */

// const CATS = [
//   { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
//   { id: "legal-news", label: "اخبار حقوقی" },
//   { id: "solved-cases", label: "پرونده‌های حل‌شده" },
//   { id: "security-alerts", label: "هشدارهای امنیتی" },
//   { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
// ];

// const CATEGORY_ID_ALIASES: Record<string, string> = {
//   solved: "solved-cases",
//   security: "security-education",
//   fraud: "security-alerts",
// };

// type MediaItem = {
//   id: string;
//   name: string;
//   url: string;
//   alt: string;
// };

// const INITIAL_CONTENT = `
// <p>در این پرونده، لاگ‌های سرور نشان می‌داد که مهاجم از طریق یک آسیب‌پذیری در پنل مدیریت، دسترسی به کیف پول گرم صرافی را به دست آورده است.</p>
// <h2>روش حمله</h2>
// <p>مهاجم با استفاده از یک حمله SQL Injection در فرم ورود، کوکی‌های session را استخراج کرده و سپس با جعل هویت مدیر سیستم، تراکنش‌های برداشت را تأیید کرده است.</p>
// <h2>ردیابی تراکنش‌ها</h2>
// <pre><code>TxID: 0x7f3a...b2c1
// از: 0x4a2b...c9d0
// به: 0x8e1f...d4a2
// مقدار: 5,000 USDT</code></pre>
// <p>کارآگاهان پاراهور با تحلیل گراف تراکنش، آدرس مقصد نهایی را شناسایی و به صرافی مربوطه اطلاع دادند.</p>`;

// const HTML_TAGS = [
//   ["<div>", "<div>", "</div>"], ["<section>", "<section>", "</section>"],
//   ["<article>", "<article>", "</article>"], ["<p>", "<p>", "</p>"],
//   ["<h2>", "<h2>", "</h2>"], ["<h3>", "<h3>", "</h3>"],
//   ["<span>", "<span>", "</span>"], ["<a>", '<a href="">', "</a>"],
//   ["<strong>", "<strong>", "</strong>"], ["<em>", "<em>", "</em>"],
//   ["<ul>", "<ul>", "</ul>"], ["<li>", "<li>", "</li>"],
//   ["<blockquote>", "<blockquote>", "</blockquote>"], ["<pre>", "<pre><code>", "</code></pre>"],
// ];

// const COMMON_SNIPPETS = [
//   { name: "HTML", code: `<article>\n  <h2>عنوان</h2>\n  <p>متن مقاله</p>\n</article>` },
//   { name: "Link", code: `<a href="https://example.com">متن لینک</a>` },
//   { name: "List", code: `<ul>\n  <li>آیتم اول</li>\n  <li>آیتم دوم</li>\n</ul>` },
// ];

// /* ─────────────────────────────────────────────
//    TIPTAP EXTENSIONS
// ───────────────────────────────────────────── */

// const ServiceTextStyle = Mark.create({
//   name: "serviceTextStyle",
//   addAttributes() {
//     return {
//       color: { default: null, parseHTML: (el) => el.style.color || null, renderHTML: (attrs) => attrs.color ? { style: `color: ${attrs.color}` } : {} },
//       backgroundColor: { default: null, parseHTML: (el) => el.style.backgroundColor || null, renderHTML: (attrs) => attrs.backgroundColor ? { style: `background-color: ${attrs.backgroundColor}` } : {} },
//       fontSize: { default: null, parseHTML: (el) => el.style.fontSize || null, renderHTML: (attrs) => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {} },
//     };
//   },
//   parseHTML() {
//     return [
//       { tag: "span" },
//       { tag: '[style*="color"]' },
//       { tag: '[style*="background-color"]' },
//       { tag: '[style*="font-size"]' },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) { return ["span", mergeAttributes(HTMLAttributes), 0]; },
//   addCommands() {
//     return {
//       setServiceTextStyle: (attrs: Record<string, string>) => ({ commands }: { commands: any }) => commands.setMark(this.name, attrs),
//       unsetServiceTextStyle: (attrs: Record<string, string>) => ({ commands }: { commands: any }) => commands.updateAttributes(this.name, attrs),
//     } as any;
//   },
// });

// const ServiceSup = Mark.create({
//   name: "serviceSuperscript",
//   parseHTML() { return [{ tag: "sup" }]; },
//   renderHTML() { return ["sup", 0]; },
//   addCommands() {
//     return { toggleServiceSuperscript: () => ({ commands }: { commands: any }) => commands.toggleMark(this.name) } as any;
//   },
// });

// const ServiceSub = Mark.create({
//   name: "serviceSubscript",
//   parseHTML() { return [{ tag: "sub" }]; },
//   renderHTML() { return ["sub", 0]; },
//   addCommands() {
//     return { toggleServiceSubscript: () => ({ commands }: { commands: any }) => commands.toggleMark(this.name) } as any;
//   },
// });

// const ServiceParagraphStyle = Extension.create({
//   name: "serviceParagraphStyle",
//   addGlobalAttributes() {
//     return [{ types: ["paragraph", "heading"], attributes: {
//       textAlign: { default: "right", parseHTML: (el) => el.style.textAlign || "right", renderHTML: (attrs) => attrs.textAlign ? { style: `text-align: ${attrs.textAlign}` } : {} },
//       textDirection: { default: "rtl", parseHTML: (el) => el.getAttribute("dir") || "rtl", renderHTML: (attrs) => attrs.textDirection ? { dir: attrs.textDirection } : {} },
//       indent: { default: 0, parseHTML: (el) => Number(el.getAttribute("data-indent") || 0), renderHTML: (attrs) => attrs.indent ? { "data-indent": String(attrs.indent) } : {} },
//     }}];
//   },
// });


// function ServiceImageView({ node, updateAttributes, selected, getPos, editor }: NodeViewProps) {
//   const [editing, setEditing] = useState(false);
//   const width = Number(node.attrs.width || 100);

//   const resize = (event: React.PointerEvent<HTMLDivElement>, direction: 1 | -1) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const startX = event.clientX;
//     const startWidth = width;
//     const host = event.currentTarget.closest(".service-image-node")?.parentElement;
//     const baseWidth = host?.getBoundingClientRect().width || 800;
//     const onMove = (e: PointerEvent) => {
//       const delta = ((e.clientX - startX) / baseWidth) * 100 * direction;
//       updateAttributes({ width: Math.max(20, Math.min(100, Math.round(startWidth + delta))) });
//     };
//     const onUp = () => {
//       window.removeEventListener("pointermove", onMove);
//       window.removeEventListener("pointerup", onUp);
//     };
//     window.addEventListener("pointermove", onMove);
//     window.addEventListener("pointerup", onUp);
//   };

//   const selectImage = () => {
//     const pos = typeof getPos === "function" ? getPos() : null;
//     if (typeof pos === "number") editor.commands.setNodeSelection(pos);
//     setEditing(true);
//   };

//   const replaceImage = () => {
//     const pos = typeof getPos === "function" ? getPos() : null;
//     if (typeof pos === "number") editor.commands.setNodeSelection(pos);
//     window.dispatchEvent(new CustomEvent("service-image-edit", { detail: { pos } }));
//   };

//   return (
//     <NodeViewWrapper className="service-image-node-wrapper">
//       <div className={`service-image-node ${selected ? "is-selected" : ""}`} style={{ width: `${width}%` }}>
//         <img src={node.attrs.src} alt={node.attrs.alt || ""} title={node.attrs.title || ""} draggable={false} onClick={selectImage} />
//         {selected && (
//           <>
//             <div className="service-image-actions">
//               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.stopPropagation(); replaceImage(); }}>ویرایش عکس</button>
//               <span>{width}%</span>
//             </div>
//             <div className="service-image-resize-handle service-image-resize-left" onPointerDown={(e) => resize(e, -1)} title="تغییر اندازه" />
//             <div className="service-image-resize-handle service-image-resize-right" onPointerDown={(e) => resize(e, 1)} title="تغییر اندازه" />
//           </>
//         )}
//       </div>
//     </NodeViewWrapper>
//   );
// }

// const ServiceImage = Node.create({
//   name: "serviceImage",
//   group: "block",
//   atom: true,
//   selectable: true,
//   draggable: true,
//   addAttributes() {
//     return {
//       src: { default: "" },
//       alt: { default: "" },
//       title: { default: "" },
//       width: { default: 100, parseHTML: (el) => Number((el as HTMLElement).style.width?.replace("%", "") || el.getAttribute("width") || 100), renderHTML: (attrs) => ({ style: `width: ${attrs.width}%;` }) },
//     };
//   },
//   parseHTML() { return [{ tag: "img[data-service-image]" }, { tag: "img" }]; },
//   renderHTML({ HTMLAttributes }) {
//     return ["img", mergeAttributes(HTMLAttributes, { "data-service-image": "true", class: "service-editor-image" })];
//   },
//   addNodeView() { return ReactNodeViewRenderer(ServiceImageView); },
//   addCommands() {
//     return {
//       setServiceImage: (attrs: { src: string; alt?: string; title?: string; width?: number }) => ({ commands }: { commands: any }) => commands.insertContent({ type: this.name, attrs }),
//     } as any;
//   },
// });

// const ServiceMore = Node.create({
//   name: "serviceMore",
//   group: "block",
//   atom: true,
//   selectable: true,
//   parseHTML() { return [{ tag: 'div[data-service-more]' }]; },
//   renderHTML() { return ["div", { "data-service-more": "true", class: "service-more-marker" }, "more"]; },
// });

// /* ─────────────────────────────────────────────
//    SHARED UI
// ───────────────────────────────────────────── */

// const buttonStyle = (active = false, extra = "") =>
//   `flex h-8 w-[34px] shrink-0 items-center justify-center rounded-[7px] border text-xs font-bold transition-colors ${active ? "border-[rgba(0,229,255,0.28)] bg-[rgba(0,229,255,0.10)] text-[#00E5FF]" : "border-transparent bg-transparent text-[#94A3B8] hover:bg-[rgba(0,229,255,0.07)] hover:text-[#00E5FF]"} cursor-pointer ${extra}`;

// const menuStyle = "absolute right-0 top-[calc(100%+6px)] z-[50] min-w-[160px] rounded-[9px] border border-[rgba(255,255,255,0.08)] bg-[#0B1224] p-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.45)]";

// function SideCard({ title, icon, children, accentColor = "#00E5FF" }: { title: string; icon: ReactNode; children: ReactNode; accentColor?: string }) {
//   return <div className="overflow-hidden rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
//     <div className="h-0.5" style={{ background: `linear-gradient(90deg,${accentColor}88,${accentColor}22,transparent)` }} />
//     <div className="flex items-center gap-[7px] border-b border-white/[0.04] px-4 py-[13px]">
//       <span className="flex opacity-70" style={{ color: accentColor }}>{icon}</span>
//       <span className="text-[0.82rem] font-bold text-white">{title}</span>
//     </div>
//     <div className="p-4">{children}</div>
//   </div>;
// }

// function F({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
//   return <div className="flex flex-col gap-[5px]">
//     <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-400">{label}</label>
//     {children}
//     {hint && <span className="text-[0.62rem] font-medium text-slate-400">{hint}</span>}
//   </div>;
// }

// const inputClass = "box-border w-full rounded-lg border border-white/[0.07] bg-[#060B19] px-[10px] py-[8px] text-[0.8rem] text-slate-200 outline-none caret-cyan-400 transition-all duration-150 focus:border-cyan-400/40 focus:ring-[3px] focus:ring-cyan-400/[0.04]";


// const FONT_SIZES = [
//   { label: "12", value: "12px" }, { label: "14", value: "14px" },
//   { label: "16", value: "16px" }, { label: "18", value: "18px" },
//   { label: "20", value: "20px" }, { label: "24", value: "24px" },
//   { label: "28", value: "28px" }, { label: "32", value: "32px" },
//   { label: "36", value: "36px" },
// ];

// /* ─────────────────────────────────────────────
//    EDITOR TOOLBAR
// ───────────────────────────────────────────── */

// function EditorToolbar({ editor, onOpenMediaLibrary, onOpenCodePanel }: { editor: Editor | null; onOpenMediaLibrary?: () => void; onOpenCodePanel?: () => void }) {
//   const [showHeading, setShowHeading] = useState(false);
//   const [showFontSize, setShowFontSize] = useState(false);
//   const [showMore, setShowMore] = useState(false);
//   const [showSymbols, setShowSymbols] = useState(false);
//   const [showLink, setShowLink] = useState(false);
//   const [linkUrl, setLinkUrl] = useState("");
//   const [textColor, setTextColor] = useState("#00E5FF");
//   const [highlightColor, setHighlightColor] = useState("#FFF59D");
//   const [, setSelectionVersion] = useState(0);
//   const selectionRef = useRef<{ from: number; to: number } | null>(null);

//   useEffect(() => {
//     const refresh = () => setSelectionVersion((v) => v + 1);
//     editor?.on("selectionUpdate", refresh);
//     return () => { editor?.off("selectionUpdate", refresh); };
//   }, [editor]);

//   if (!editor) return null;

//   const parent = editor.state.selection.$from.parent;
//   const headingLevel = editor.getAttributes("heading").level;
//   const currentIndent = Number(parent.attrs.indent || 0);
//   const run = (fn: () => boolean) => { fn(); editor.view.focus(); };
//   const updateBlock = (attrs: Record<string, any>) => {
//     const type = parent.type.name === "heading" ? "heading" : "paragraph";
//     editor.chain().focus().updateAttributes(type, attrs).run();
//   };
//   const changeIndent = (delta: number) => updateBlock({ indent: Math.max(0, Math.min(8, currentIndent + delta)) });
//   const openLinkEditor = () => {
//     setLinkUrl(editor.getAttributes("link").href || "");
//     setShowLink(true);
//   };
//   const applyLink = () => {
//     const url = linkUrl.trim();
//     if (!url) editor.chain().focus().unsetLink().run();
//     else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//     setShowLink(false);
//   };
//   const setHeading = (level?: number) => {
//     if (!level) editor.chain().focus().setParagraph().run();
//     else editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
//     setShowHeading(false);
//   };
//   const rememberSelection = () => {
//     const { from, to } = editor.state.selection;
//     selectionRef.current = { from, to };
//   };
//   const restoreSelection = () => {
//     const saved = selectionRef.current;
//     if (saved) editor.commands.setTextSelection(saved);
//   };
//   const setStyle = (attrs: Record<string, string>) => {
//     if (!editor) return;
//     restoreSelection();
//     editor.chain().focus().setMark("serviceTextStyle", attrs).run();
//     editor.view.focus();
//   };
//   const removeStyle = (key: string) => {
//     restoreSelection();
//     editor.chain().focus().unsetMark("serviceTextStyle").run();
//   };
//   const currentStyles = editor.getAttributes("serviceTextStyle");
//   const currentFontSize = currentStyles.fontSize || "16px";
//   const symbols = ["©","®","™","§","¶","†","‡","•","×","÷","±","≈","≠","≤","≥","∞","√","∑","π","µ","Ω","Δ","α","β","γ","→","←","↔","↑","↓","✓","★","☆","♥","♦","♣","♠","€","$","£","¥","٪","°","‰","…","—","–","·","№","@","#","&","/","\\","()","[]","{}","«","»","“","”","‘","’"];

//   return <div className="service-rich-editor">
//     <div className="service-rich-editor-toolbar">
//       <div className="service-rich-editor-toolbar-row">
//         <button type="button" title="بازگشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().undo().run())} className={buttonStyle()}><IconUndo /></button>
//         <button type="button" title="جلو" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().redo().run())} className={buttonStyle()}><IconRedo /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <div className="relative">
//           <button type="button" title="تیتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowHeading((v) => !v)} className={buttonStyle(!!headingLevel, "w-[48px]")}><IconHeading /><span className="mr-0.5 text-[9px]">⌄</span></button>
//           {showHeading && <div className={menuStyle}>
//             <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading()} className="flex w-full cursor-pointer justify-between rounded-md border-0 bg-transparent px-[9px] py-2 text-xs text-slate-300 hover:bg-white/[0.05]">متن <span className="text-slate-600">Aa</span></button>
//             {[1,2,3,4,5,6].map((n) => <button key={n} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading(n)} className={`flex w-full cursor-pointer justify-between rounded-md border-0 px-[9px] py-2 text-xs ${headingLevel === n ? "bg-cyan-400/[0.08] text-cyan-300" : "bg-transparent text-slate-300 hover:bg-white/[0.05]"}`}>تیتر {n}<span className="text-slate-600">H{n}</span></button>)}
//           </div>}
//         </div>
//         <div className="relative">
//           <button type="button" aria-label="اندازه فونت" title="اندازه فونت" onMouseDown={(e) => { e.preventDefault(); rememberSelection(); }} onClick={() => setShowFontSize((v) => !v)} className="flex h-9 w-[82px] items-center justify-between rounded-[8px] border border-cyan-400/[0.10] bg-[#0B1224] px-2.5 text-[12px] font-bold text-slate-300 outline-none transition-all hover:border-cyan-400/25 focus:border-cyan-400/40">
//             <span>{currentFontSize.replace("px", "")}px</span><span className="text-[9px] text-slate-300">⌄</span>
//           </button>
//           {showFontSize && <div className={menuStyle + " w-[96px]"}>
//             {FONT_SIZES.map((size) => (
//               <button key={size.value} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setStyle({ fontSize: size.value }); setShowFontSize(false); }} className={`flex w-full items-center justify-between rounded-md border-0 px-[9px] py-2 text-xs ${currentFontSize === size.value ? "bg-cyan-400/[0.08] text-cyan-300" : "bg-transparent text-slate-300 hover:bg-white/[0.05]"}`}>
//                 <span>{size.label}px</span><span className="text-[12px] text-slate-600">A</span>
//               </button>
//             ))}
//           </div>}
//         </div>
//         <span className="service-rich-editor-divider">|</span>
//         <button type="button" title="درشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBold().run())} className={buttonStyle(editor.isActive("bold"))}><IconBold /></button>
//         <button type="button" title="کج" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleItalic().run())} className={buttonStyle(editor.isActive("italic"))}><IconItalic /></button>
//         <button type="button" title="زیرخط" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleUnderline().run())} className={buttonStyle(editor.isActive("underline"))}><IconUnderline /></button>
//         <button type="button" title="خط خورده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleStrike().run())} className={buttonStyle(editor.isActive("strike"))}><IconStrike /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <div className="flex items-center gap-0.5"><button type="button" title="رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ color: textColor })} className={buttonStyle(false)}><span className="font-black leading-[1.1]" style={{ borderBottom: `3px solid ${textColor}` }}>A</span></button><input aria-label="رنگ متن" type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setStyle({ color: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
//         <div className="flex items-center gap-0.5"><button type="button" title="هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ backgroundColor: highlightColor })} className={buttonStyle(false)}><span className="rounded-[2px] px-[3px] py-px font-black text-[#020617]" style={{ background: highlightColor }}>H</span></button><input aria-label="رنگ هایلایت" type="color" value={highlightColor} onChange={(e) => { setHighlightColor(e.target.value); setStyle({ backgroundColor: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
//       </div>

//       <div className="service-rich-editor-toolbar-row">
//         <button type="button" title="راست‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "right" })} className={buttonStyle(parent.attrs.textAlign === "right")}><IconAlignRight /></button>
//         <button type="button" title="وسط‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "center" })} className={buttonStyle(parent.attrs.textAlign === "center")}><IconAlignCenter /></button>
//         <button type="button" title="چپ‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "left" })} className={buttonStyle(parent.attrs.textAlign === "left")}><IconAlignLeft /></button>
//         <button type="button" title="تمام‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "justify" })} className={buttonStyle(parent.attrs.textAlign === "justify")}><IconAlignJustify /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <button type="button" title="RTL - راست به چپ" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "rtl", textAlign: "right" })} className={buttonStyle(parent.attrs.textDirection === "rtl")}><IconRtl /></button>
//         <button type="button" title="LTR - چپ به راست" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "ltr", textAlign: "left" })} className={buttonStyle(parent.attrs.textDirection === "ltr")}><IconLtr /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <button type="button" title="کاهش تورفتگی" disabled={currentIndent === 0} onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(-1)} className={buttonStyle(false, currentIndent === 0 ? "opacity-35" : "")}><IconIndentOut /></button>
//         <button type="button" title="افزایش تورفتگی" onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(1)} className={buttonStyle()}><IconIndentIn /></button>
//       </div>

//       <div className="service-rich-editor-toolbar-row">
//         <button type="button" title="لیست نقطه‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBulletList().run())} className={buttonStyle(editor.isActive("bulletList"))}><IconList /></button>
//         <button type="button" title="لیست شماره‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())} className={buttonStyle(editor.isActive("orderedList"))}><IconListOrdered /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><IconQuote /></button>
//         <button type="button" title="کد درون متن" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCode().run())} className={buttonStyle(editor.isActive("code"))}><IconCode /></button>
//         <button type="button" title="Code — پنل HTML و تگ‌ها" onMouseDown={(e) => e.preventDefault()} onClick={() => onOpenCodePanel?.()} className={buttonStyle()}><span className="font-mono text-[9px] font-black">Code</span></button>
//         <button type="button" title="افزودن تصویر از کتابخانه رسانه" onMouseDown={(e) => e.preventDefault()} onClick={() => onOpenMediaLibrary?.()} className={buttonStyle()}><IconImage /></button>
//         <button type="button" title="لینک" onMouseDown={(e) => e.preventDefault()} onClick={openLinkEditor} className={buttonStyle(editor.isActive("link"))}><IconLink /></button>
//         <button type="button" title="پاک کردن قالب‌بندی" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().unsetAllMarks().clearNodes().run())} className={buttonStyle()}><IconClear /></button>
//         <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><IconMinus /></button>
//         <span className="service-rich-editor-divider">|</span>
//         <button type="button" title="ابزارهای بیشتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowMore((v) => !v)} className={buttonStyle(showMore)}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
//       </div>
//     </div>

//     {showMore && <div className="service-rich-editor-extra-toolbar">
//       <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">تنظیمات متن</span><div className="service-rich-editor-extra-buttons">
//         <button type="button" title="حذف رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("color")} className={buttonStyle()}><span className="font-black underline decoration-current underline-offset-[3px]">A</span></button>
//         <button type="button" title="حذف هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("backgroundColor")} className={buttonStyle()}><IconClear /></button>
//         <button type="button" title="بالانویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSuperscript())} className={buttonStyle(editor.isActive("serviceSuperscript"))}><IconSup /></button>
//         <button type="button" title="زیرنویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSubscript())} className={buttonStyle(editor.isActive("serviceSubscript"))}><IconSub /></button>
//       </div></div>
//       <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">بلوک‌ها</span><div className="service-rich-editor-extra-buttons">
//         <button type="button" title="بلوک کد" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCodeBlock().run())} className={buttonStyle(editor.isActive("codeBlock"))}><IconCode /></button>
//         <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><IconQuote /></button>
//         <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><IconMinus /></button>
//         <button type="button" title="More" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().insertContent({ type: "serviceMore" }).run())} className={buttonStyle(false, "w-[52px]")}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
//       </div></div>
//       <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">نمادها</span><div className="service-rich-editor-extra-buttons">
//         <div className="relative"><button type="button" title="نمادهای ویژه" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowSymbols((v) => !v)} className={buttonStyle(showSymbols)}><IconSymbols /></button>
//           {showSymbols && <div className={`${menuStyle} right-0 grid min-w-[288px] grid-cols-8 gap-[3px]`}>
//             {symbols.map((symbol) => <button key={symbol} type="button" title={`درج ${symbol}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { editor.chain().focus().insertContent(symbol).run(); setShowSymbols(false); }} className="h-[30px] cursor-pointer rounded-[5px] border-0 bg-transparent text-[13px] text-[#CBD5E1] hover:bg-white/[0.05] hover:text-cyan-300">{symbol}</button>)}
//           </div>}
//         </div>
//       </div></div>
//     </div>}

//     {showLink && <div className="service-rich-link-editor">
//       <input type="url" dir="ltr" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") setShowLink(false); }} placeholder="https://example.com" autoFocus />
//       <button type="button" onClick={applyLink}>اعمال لینک</button>
//       <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setShowLink(false); }} className="service-rich-link-remove">حذف لینک</button>
//       <button type="button" onClick={() => setShowLink(false)} className="service-rich-link-cancel">انصراف</button>
//     </div>}
//   </div>;
// }

// /* ─────────────────────────────────────────────
//    CODE PANEL
// ───────────────────────────────────────────── */

// function CodePanel({ editor, onClose }: { editor: Editor; onClose: () => void }) {
//   const [sourceCode, setSourceCode] = useState(() => editor.getHTML());
//   const insertIntoSource = (code: string) => setSourceCode((prev) => `${prev}${prev.trim() ? "\n" : ""}${code}`);
//   const insertTag = (open: string, close: string) => insertIntoSource(`${open}${close}`);
//   const applyHtml = () => {
//     editor.commands.setContent(sourceCode, { emitUpdate: false });
//     editor.commands.focus("end");
//     onClose();
//   };
//   return <div className="border-b border-cyan-400/[0.08] bg-[#070D1D] px-8 py-5">
//     <div className="mx-auto max-w-5xl">
//       <div className="mb-4 flex items-start justify-between gap-4">
//         <div><div className="flex items-center gap-2"><span className="text-cyan-400"><IconCode /></span><h3 className="text-sm font-bold text-slate-200">Code / HTML</h3></div><p className="mt-1 text-[12px] leading-5 text-slate-600">این بخش فقط برای کنترل ساختار HTML است؛ متن عادی را با ادیتور بنویس. تگ‌ها اینجا وارد می‌شوند و تا وقتی «اعمال HTML» نزنی وارد محتوای مقاله نمی‌شوند.</p></div>
//         <button type="button" onClick={onClose} title="بستن پنل" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-300"><IconClose /></button>
//       </div>
//       <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-white/[0.09] bg-[#050814] p-3">
//         <span className="ml-1 self-center text-[9px] font-bold text-slate-700">تگ‌های سریع</span>
//         {HTML_TAGS.map(([label, open, close]) => <button key={label} type="button" onClick={() => insertTag(open, close)} className="cursor-pointer rounded-md border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 font-mono text-[12px] text-slate-300 transition-all hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-300">{label}</button>)}
//       </div>
//       <div className="mb-3 flex flex-wrap gap-2">
//         {COMMON_SNIPPETS.map((item) => <button key={item.name} type="button" onClick={() => insertIntoSource(item.code)} className="cursor-pointer rounded-md border border-cyan-400/[0.12] bg-cyan-400/[0.04] px-3 py-1.5 font-mono text-[12px] text-cyan-300/80 hover:bg-cyan-400/[0.08] hover:text-cyan-200">+ {item.name}</button>)}
//       </div>
//       <textarea value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} spellCheck={false} placeholder="HTML محتوای مقاله..." rows={10} className="mb-3 min-h-[220px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#020617] px-4 py-3 font-mono text-[12px] leading-6 text-left text-cyan-100 outline-none focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/[0.05]" dir="ltr" />
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <div className="flex gap-2"><button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-[12px] font-bold text-slate-300 hover:bg-white/[0.05] hover:text-slate-300">انصراف</button><button type="button" onClick={applyHtml} className="cursor-pointer rounded-lg border border-cyan-300/30 bg-cyan-400 px-5 py-2 text-[12px] font-black text-[#04111C] shadow-[0_8px_24px_rgba(0,229,255,0.12)] hover:bg-cyan-300">اعمال HTML</button></div>
//       </div>
//     </div>
//   </div>;
// }

// const ADMIN_AUTHORS = [
//   { id: "admin-1", name: "محمدرضا یوسفی" },
//   { id: "admin-2", name: "علیرضا طباطبایی هاشمی" },
// ] as const;

// type PostFormValues = {
//   title: string;
//   slug: string;
//   content: string;
//   metaTitle: string;
//   metaDescription: string;
//   authorId: string;
// };


// function CustomSelect({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (value: string) => void;
//   options: { value: string; label: string }[];
// }) {
//   const [open, setOpen] = useState(false);
//   const selectedOption = options.find((option) => option.value === value) ?? options[0];

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#0B1224] px-3 text-right text-[11px] font-bold outline-none transition-all ${
//           open
//             ? "border-cyan-400/35 shadow-[0_0_16px_rgba(0,229,255,0.04)]"
//             : "border-white/[0.07] hover:border-cyan-400/15"
//         }`}
//       >
//         <span className="truncate text-slate-300">{selectedOption.label}</span>
//         <span
//           className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-white/[0.05] bg-white/[0.025] text-slate-500 transition-all duration-200 ${
//             open ? "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-300" : ""
//           }`}
//         >
//           <svg
//             width="11"
//             height="11"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
//           >
//             <path d="m6 9 6 6 6-6" />
//           </svg>
//         </span>
//       </button>

//       {open && (
//         <>
//           <button
//             type="button"
//             aria-label="بستن منو"
//             onClick={() => setOpen(false)}
//             className="fixed inset-0 z-40 cursor-default"
//           />
//           <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-white/[0.08] bg-[#0B1224] p-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
//             {options.map((option) => {
//               const selected = option.value === value;
//               return (
//                 <button
//                   key={option.value}
//                   type="button"
//                   onClick={() => {
//                     onChange(option.value);
//                     setOpen(false);
//                   }}
//                   className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${
//                     selected
//                       ? "bg-cyan-400/[0.08] text-cyan-300"
//                       : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
//                   }`}
//                 >
//                   <span className="truncate">{option.label}</span>
//                   {selected && (
//                     <span className="mr-2 shrink-0 text-cyan-300">
//                       <IconCheck />
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    PAGINATION
// ───────────────────────────────────────────── */

// function IconChevronLeft() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="15 18 9 12 15 6" />
//     </svg>
//   );
// }

// function IconChevronRight() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="9 18 15 12 9 6" />
//     </svg>
//   );
// }

// function getPaginationRange(currentPage: number, totalPages: number): (number | "...")[] {
//   // تا ۴ صفحه، همه‌شون رو کامل نشون بده — نقطه‌گذاری فقط از
//   // ۵ صفحه به بالا شروع می‌شه (مطابق همون رفتاری که توی فیدبک داریم).
//   if (totalPages <= 4) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   const range: (number | "...")[] = [];
//   const siblingCount = 1;

//   const start = Math.max(2, currentPage - siblingCount);
//   const end = Math.min(totalPages - 1, currentPage + siblingCount);

//   range.push(1);

//   if (start > 2) {
//     range.push("...");
//   }

//   for (let page = start; page <= end; page++) {
//     range.push(page);
//   }

//   if (end < totalPages - 1) {
//     range.push("...");
//   }

//   if (totalPages > 1) {
//     range.push(totalPages);
//   }

//   return range;
// }

// function Pagination({
//   currentPage,
//   totalPages,
//   onChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onChange: (page: number) => void;
// }) {
//   const pages = getPaginationRange(currentPage, totalPages).reverse();

//   return (
//     <div dir="ltr" className="mt-6 flex items-center justify-center gap-2">
//       <button
//         type="button"
//         onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07] bg-[#0B1224] text-slate-500 transition-all hover:border-cyan-400/25 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.07] disabled:hover:text-slate-500"
//       >
//         <IconChevronLeft />
//       </button>

//       {pages.map((page, index) =>
//         page === "..." ? (
//           <span
//             key={`ellipsis-${index}`}
//             className="flex h-9 w-9 shrink-0 items-center justify-center text-[12px] font-black text-slate-700"
//           >
//             …
//           </span>
//         ) : (
//           <button
//             key={page}
//             type="button"
//             onClick={() => onChange(page)}
//             className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border text-[12px] font-black transition-all ${
//               page === currentPage
//                 ? "border-cyan-400 bg-cyan-400 text-[#050814] shadow-[0_0_16px_rgba(0,229,255,0.35)]"
//                 : "border-white/[0.07] bg-[#0B1224] text-slate-400 hover:border-cyan-400/25 hover:text-cyan-300"
//             }`}
//           >
//             {page}
//           </button>
//         )
//       )}

//       <button
//         type="button"
//         onClick={() => onChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07] bg-[#0B1224] text-slate-500 transition-all hover:border-cyan-400/25 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.07] disabled:hover:text-slate-500"
//       >
//         <IconChevronRight />
//       </button>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN
// ───────────────────────────────────────────── */

// export default function PostsAdminPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState(INITIAL_CONTENT);
//   const [selectedCats, setSelectedCats] = useState<string[]>([]);
//   const [tags, setTags] = useState<string[]>(["#ردیابی_تتر", "#بلاکچین"]);
//   const [tagInput, setTagInput] = useState("");
//   const [slug, setSlug] = useState("ponzi-tracking-case-2025");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDesc, setMetaDesc] = useState("");
//   const [status, setStatus] = useState<"draft" | "published">("draft");
//   const [postType, setPostType] = useState<"normal" | "special">("normal");
//   const [authorId, setAuthorId] = useState<string>("");
//   const [createdAt, setCreatedAt] = useState<string>("");
//   const [updatedAt, setUpdatedAt] = useState<string>("");
//   const [savedAt, setSavedAt] = useState("۱۴:۳۲");
//   const [publishing, setPublishing] = useState(false);
//   const [published, setPublished] = useState(false);
//   const [coverUploaded, setCoverUploaded] = useState(false);
//   const [uploadHover, setUploadHover] = useState(false);
//   const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
//   const mediaSelectionRef = useRef<{ from: number; to: number } | null>(null);
//   const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
//   const [featuredMediaId, setFeaturedMediaId] = useState<string | null>(null);
//   const [featuredAlt, setFeaturedAlt] = useState("");
//   const mediaFileRef = useRef<HTMLInputElement>(null);
//   const [codePanelOpen, setCodePanelOpen] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);
//   const titleRef = useRef<HTMLTextAreaElement | null>(null);
//   type PostRecord = {
//     id: string;
//     title: string;
//     slug: string;
//     content: string;
//     status: "draft" | "published";
//     postType: "normal" | "special";
//     categoryId: string;
//     tags: string[];
//     updatedAt: string;
//     createdAt: string;
//     authorId: string;
//     readingTime: number;
//     metaTitle: string;
//     metaDescription: string;
//     featuredImage: string | null;
//     featuredImageAlt: string | null;
//   };

//   const [view, setView] = useState<"list" | "editor">("list");
//   const [posts, setPosts] = useState<PostRecord[]>([]);
//   const [editingPostId, setEditingPostId] = useState<string | null>(null);
//   const [deletePostId, setDeletePostId] = useState<string | null>(null);
//   const [postsLoading, setPostsLoading] = useState(true);
//   const [postsError, setPostsError] = useState<string | null>(null);
//   const [mediaLoading, setMediaLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
//   const [authorFilter, setAuthorFilter] = useState<"all" | "admin-1" | "admin-2">("all");

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 12;

//   const { register, setValue, handleSubmit, reset: resetForm, formState: { errors } } = useForm<PostFormValues>({
//     defaultValues: { title: "", slug: "", content: "", metaTitle: "", metaDescription: "", authorId: "" },
//     mode: "onSubmit",
//   });
//   const titleRegister = register("title", { required: "عنوان پست الزامی است." });


//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({ heading: { levels: [1,2,3,4,5,6] } }),
//       Underline,
//       ServiceTextStyle,
//       ServiceSup,
//       ServiceSub,
//       ServiceImage,
//       ServiceParagraphStyle,
//       ServiceMore,
//       Placeholder.configure({ placeholder: "متن گزارش یا پرونده را اینجا بنویسید..." }),
//       Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true, HTMLAttributes: { class: "text-cyan-400 underline underline-offset-4" } }),
//     ],
//     content: INITIAL_CONTENT,
//     editorProps: { attributes: { dir: "rtl", class: "service-rich-editor-content" } },
//     onUpdate: ({ editor: next }) => {
//       const html = next.getHTML();
//       setContent(html);
//       setValue("content", html, { shouldValidate: false });
//     },
//   });

//   useEffect(() => {
//     if (!title && content === INITIAL_CONTENT) return;
//     const t = setTimeout(() => setSavedAt(new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })), 1200);
//     return () => clearTimeout(t);
//   }, [title, content]);

//   useEffect(() => {
//     const onEditImage = (event: Event) => {
//       const pos = (event as CustomEvent<{ pos: number | null }>).detail?.pos;
//       if (editor && typeof pos === "number") mediaSelectionRef.current = { from: pos, to: pos };
//       setMediaLibraryOpen(true);
//     };
//     window.addEventListener("service-image-edit", onEditImage);
//     return () => window.removeEventListener("service-image-edit", onEditImage);
//   }, [editor]);

//   const toggleCat = (id: string) => setSelectedCats((c) => c.includes(id) ? [] : [id]);
//   const addTag = (e: React.KeyboardEvent) => {
//     if (e.key !== "Enter" || !tagInput.trim()) return;
//     e.preventDefault();
//     const t = tagInput.trim().startsWith("#") ? tagInput.trim() : `#${tagInput.trim()}`;
//     if (!tags.includes(t)) setTags((prev) => [...prev, t]);
//     setTagInput("");
//   };
//   const removeTag = (tag: string) => setTags((prev) => prev.filter((x) => x !== tag));
//   const openMediaLibraryForEditor = () => {
//     if (editor) mediaSelectionRef.current = { from: editor.state.selection.from, to: editor.state.selection.to };
//     setMediaLibraryOpen(true);
//   };
//   const insertMediaIntoEditor = (id: string) => {
//     const item = mediaItems.find((m) => m.id === id);
//     if (!item || !editor) return;
//     const selection = mediaSelectionRef.current;
//     if (selection && selection.from === selection.to) {
//       const nodeAt = editor.state.doc.nodeAt(selection.from);
//       if (nodeAt?.type.name === "serviceImage") {
//         editor.chain().focus().setNodeSelection(selection.from).updateAttributes("serviceImage", { src: item.url, alt: item.alt, title: item.name }).run();
//         mediaSelectionRef.current = null;
//         setMediaLibraryOpen(false);
//         return;
//       }
//     }
//     editor.chain().focus();
//     if (selection) editor.commands.setTextSelection(selection);
//     (editor.commands as any).setServiceImage({ src: item.url, alt: item.alt, title: item.name, width: 100 });
//     mediaSelectionRef.current = null;
//     setMediaLibraryOpen(false);
//   };

//   const loadMedia = async () => {
//     setMediaLoading(true);
//     try {
//       const response = await fetch("/api/media", { cache: "no-store" });
//       if (!response.ok) throw new Error("خطا در دریافت رسانه‌ها");
//       const data = await response.json();
//       setMediaItems(Array.isArray(data) ? data : Array.isArray(data?.media) ? data.media : []);
//     } catch (error) {
//       console.error("loadMedia error:", error);
//     } finally {
//       setMediaLoading(false);
//     }
//   };

//   const addMediaFiles = async (files: FileList | null) => {
//     if (!files?.length) return;
//     const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
//     if (!imageFiles.length) return;

//     try {
//       const uploaded: MediaItem[] = [];
//       for (const file of imageFiles) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("alt", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
//         const response = await fetch("/api/media", { method: "POST", body: formData });
//         if (!response.ok) throw new Error("آپلود تصویر انجام نشد");
//         const data = await response.json();
//         uploaded.push(data?.media ?? data);
//       }
//       if (!uploaded.length) return;
//       setMediaItems((prev) => [...uploaded, ...prev]);
//       if (!featuredMediaId) {
//         setFeaturedMediaId(uploaded[0].id);
//         setFeaturedAlt(uploaded[0].alt || "");
//         setCoverUploaded(true);
//       }
//       setMediaLibraryOpen(true);
//     } catch (error) {
//       console.error("addMediaFiles error:", error);
//       alert("آپلود تصویر انجام نشد.");
//     } finally {
//       if (mediaFileRef.current) mediaFileRef.current.value = "";
//     }
//   };
//   const updateMediaAlt = async (id: string, alt: string) => {
//     setMediaItems((prev) => prev.map((item) => item.id === id ? { ...item, alt } : item));
//     if (featuredMediaId === id) setFeaturedAlt(alt);
//     try {
//       await fetch(`/api/media/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alt }),
//       });
//     } catch (error) {
//       console.error("updateMediaAlt error:", error);
//     }
//   };

//   const removeMedia = async (id: string) => {
//     const target = mediaItems.find((item) => item.id === id);
//     try {
//       const response = await fetch(`/api/media/${id}`, { method: "DELETE" });
//       if (!response.ok) throw new Error("حذف تصویر انجام نشد");
//       setMediaItems((prev) => prev.filter((item) => item.id !== id));
//       if (target?.url && target.url.startsWith("blob:")) URL.revokeObjectURL(target.url);
//       if (featuredMediaId === id) {
//         const next = mediaItems.find((item) => item.id !== id);
//         setFeaturedMediaId(next?.id || null);
//         setFeaturedAlt(next?.alt || "");
//       }
//     } catch (error) {
//       console.error("removeMedia error:", error);
//       alert("حذف تصویر انجام نشد.");
//     }
//   };
//   const chooseFeatured = (id: string) => {
//     const item = mediaItems.find((m) => m.id === id);
//     setFeaturedMediaId(id);
//     setFeaturedAlt(item?.alt || "");
//     setCoverUploaded(true);
//   };
//   const normalizePost = (item: any): PostRecord => ({
//     id: String(item?._id ?? item?.id ?? ""),
//     title: item?.title ?? "",
//     slug: item?.slug ?? "",
//     content: item?.content ?? "",
//     status: item?.status === "published" ? "published" : "draft",
//     postType: item?.postType === "special" ? "special" : "normal",
//     categoryId: CATEGORY_ID_ALIASES[item?.categoryId] ?? item?.categoryId ?? "",
//     tags: Array.isArray(item?.tags) ? item.tags : [],
//     updatedAt: item?.updatedAt ? String(item.updatedAt) : "",
//     createdAt: item?.createdAt ? String(item.createdAt) : "",
//     authorId: ADMIN_AUTHORS.find((author) => author.name === item?.author)?.id ?? item?.authorId ?? "",
//     readingTime: Number(item?.readingTime ?? 0),
//     metaTitle: item?.metaTitle ?? "",
//     metaDescription: item?.metaDescription ?? "",
//     featuredImage: item?.featuredImage ?? null,
//     featuredImageAlt: item?.featuredImageAlt ?? null,
//   });

//   const loadPosts = async () => {
//     setPostsLoading(true);
//     setPostsError(null);
//     try {
//       const response = await fetch("/api/posts", { cache: "no-store" });
//       if (!response.ok) throw new Error("خطا در دریافت پست‌ها");
//       const data = await response.json();
//       const items = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
//       setPosts(items.map(normalizePost));
//     } catch (error) {
//       console.error(error);
//       setPostsError("دریافت لیست پست‌ها انجام نشد.");
//     } finally {
//       setPostsLoading(false);
//     }
//   };

//   useEffect(() => {
//     void loadPosts();
//     void loadMedia();
//   }, []);


//   useEffect(() => {
//     if (!editingPostId || !mediaItems.length) return;
//     const post = posts.find((item) => item.id === editingPostId);
//     if (!post?.featuredImage) return;
//     const matchingMedia = mediaItems.find((item) => item.url === post.featuredImage);
//     if (matchingMedia) {
//       setFeaturedMediaId(matchingMedia.id);
//       setFeaturedAlt(post.featuredImageAlt ?? matchingMedia.alt ?? "");
//       setCoverUploaded(true);
//     }
//   }, [editingPostId, mediaItems, posts]);
//   const persistPost = async (record: PostRecord, isEdit: boolean) => {
//     const payload = {
//       ...((isEdit ? record : (({ id: _id, ...rest }) => rest)(record)) as Record<string, unknown>),
//       author: ADMIN_AUTHORS.find((author) => author.id === record.authorId)?.name ?? record.authorId,
//       postType: record.postType,
//       categoryId: record.categoryId,
//       wordCount,
//       featuredImage: featuredMediaId
//         ? mediaItems.find((item) => item.id === featuredMediaId)?.url ?? null
//         : null,
//       featuredImageAlt: featuredAlt.trim() || null,
//     };

//     delete (payload as Record<string, unknown>).authorId;

//     const response = await fetch(isEdit ? `/api/posts/${record.id}` : "/api/posts", {
//       method: isEdit ? "PATCH" : "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
// if (!response.ok) {
//   const errorData = await response.json().catch(() => null);
//   if (response.status === 409) {
//     throw new Error("DUPLICATE_SLUG");
//   }
//   throw new Error(errorData?.message || "ذخیره پست انجام نشد");
// }
//     const data = await response.json();
//     return normalizePost(data?.post ?? data);
//   };

//   const resetEditor = () => {
//     setEditingPostId(null);
//     setTitle("");
//     setContent("");
//     setSelectedCats([]);
//     setTags([]);
//     setTagInput("");
//     setSlug("");
//     setMetaTitle("");
//     setMetaDesc("");
//     setStatus("draft");
//     setPostType("normal");
//     setAuthorId("");
//     setCreatedAt("");
//     setUpdatedAt("");
//     setPublished(false);
//     setFeaturedMediaId(null);
//     setFeaturedAlt("");
//     setMediaItems([]);
//     setCoverUploaded(false);
//     if (editor) editor.commands.setContent("");
//     resetForm({ title: "", slug: "", content: "", metaTitle: "", metaDescription: "", authorId: "" });
//   };

//   const openNewPost = () => {
//     resetEditor();
//     setView("editor");
//   };

//   const openEditPost = (post: PostRecord) => {
//     setEditingPostId(post.id);
//     setTitle(post.title);
//     setContent(post.content);
//     setSlug(post.slug);
//     setTags(post.tags);
//     setMetaTitle(post.metaTitle);
//     setMetaDesc(post.metaDescription);
//     setStatus(post.status);
//     setPostType(post.postType);
//     setSelectedCats(post.categoryId ? [post.categoryId] : []);
//     setAuthorId(post.authorId);
//     setSelectedCats(post.categoryId ? [post.categoryId] : ["forensic-reports"]);
//     setCreatedAt(post.createdAt);
//     setUpdatedAt(post.updatedAt);
//     setPublished(post.status === "published");
//     const matchingMedia = post.featuredImage ? mediaItems.find((item) => item.url === post.featuredImage) : undefined;
//     setFeaturedMediaId(matchingMedia?.id ?? null);
//     setFeaturedAlt(post.featuredImageAlt ?? matchingMedia?.alt ?? "");
//     setCoverUploaded(Boolean(post.featuredImage));
//     if (editor) editor.commands.setContent(post.content, { emitUpdate: false });
//     resetForm({ title: post.title, slug: post.slug, content: post.content, metaTitle: post.metaTitle, metaDescription: post.metaDescription, authorId: post.authorId });
//     setView("editor");
//   };

//   const savePostToList = async (values?: PostFormValues) => {
//     const now = new Date().toLocaleString("fa-IR", { dateStyle: "short", timeStyle: "short" });
//     const isEdit = Boolean(editingPostId);
//     const record: PostRecord = {
//       id: editingPostId ?? `post-${Date.now()}`,
//       title: (values?.title ?? title).trim(),
//       slug: values?.slug?.trim() || normalizedSlug || `post-${Date.now()}`,
//       content: editor?.getHTML() ?? content,
//       status,
//       postType,
//       categoryId: selectedCats[0] || "",
//       tags,
//       updatedAt: now,
//       createdAt: createdAt || now,
//       authorId: values?.authorId || authorId,
//       readingTime: readMin,
//       metaTitle: values?.metaTitle?.trim() || metaTitle.trim(),
//       metaDescription: values?.metaDescription?.trim() || metaDesc.trim(),
//       featuredImage: featuredMediaId ? mediaItems.find((item) => item.id === featuredMediaId)?.url ?? null : null,
//       featuredImageAlt: featuredAlt.trim() || null,
//     };

//     try {
//       setPostsError(null);
//       const saved = await persistPost(record, isEdit);
//       setPosts((items) => isEdit ? items.map((item) => item.id === saved.id ? saved : item) : [saved, ...items]);
//       setSavedAt(now);
//       setUpdatedAt(now);
//       setPublished(status === "published");
//       setView("list");
//       setEditingPostId(null);
//     } catch (error) {
//   console.error(error);

//   if (error instanceof Error && error.message === "DUPLICATE_SLUG") {
//     alert("این اسلاگ برای پست دیگری انتخاب شده است.");
//     return; // setPostsError صدا زده نمیشه، بنر بالای جدول نمیاد
//   }

//   const message = error instanceof Error ? error.message : "ذخیره پست انجام نشد. دوباره تلاش کنید.";
//   alert(message);
//   setPostsError(message);
// }
//   };

//   const onSubmit: SubmitHandler<PostFormValues> = async (values) => {
//     if (!editor?.getText().trim()) {
//       setValue("content", "", { shouldValidate: true });
//       alert("محتوای پست را وارد کنید.");
//       return;
//     }
//     if (!values.authorId) {
//       alert("نویسنده پست را انتخاب کنید.");
//       return;
//     }
//     if (!selectedCats[0]) {
//       alert("دسته‌بندی پست را انتخاب کنید.");
//       return;
//     }
//     setPublishing(true);
//     await savePostToList(values);
//     setPublishing(false);
//   };

//   const confirmDeletePost = async () => {
//     if (!deletePostId) return;
//     const id = deletePostId;
//     try {
//       setPostsError(null);
//       const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
//       if (!response.ok) throw new Error("حذف پست انجام نشد");
//       setPosts((items) => items.filter((item) => item.id !== id));
//       setDeletePostId(null);
//     } catch (error) {
//       console.error(error);
//       setPostsError("حذف پست انجام نشد. دوباره تلاش کنید.");
//     }
//   };

//   const normalizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
//   const wordCount = editor?.getText().split(/\s+/).filter(Boolean).length || 0;
//   const readMin = Math.max(1, Math.round(wordCount / 180));
//   const selectedAuthor = ADMIN_AUTHORS.find((a) => a.id === authorId);
//   const activeFilterKey = statusFilter !== "all" ? statusFilter : authorFilter !== "all" ? authorFilter : "all";
//   const filteredPosts = posts.filter((post) => {
//     const q = search.trim().toLocaleLowerCase();
//     if (
//       q &&
//       !post.title.toLocaleLowerCase().includes(q) &&
//       !post.slug.toLocaleLowerCase().includes(q) &&
//       !post.id.toLocaleLowerCase().includes(q)
//     ) return false;
//     if (statusFilter !== "all" && post.status !== statusFilter) return false;
//     if (authorFilter !== "all" && post.authorId !== authorFilter) return false;
//     return true;
//   });

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter, authorFilter]);

//   const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

//   useEffect(() => {
//     setCurrentPage((prev) => Math.min(prev, totalPages));
//   }, [totalPages]);

//   const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
//   useEffect(() => {
//     setValue("title", title, { shouldValidate: false });
//     setValue("slug", normalizedSlug, { shouldValidate: false });
//     setValue("content", content, { shouldValidate: false });
//     setValue("metaTitle", metaTitle, { shouldValidate: false });
//     setValue("metaDescription", metaDesc, { shouldValidate: false });
//     setValue("authorId", authorId, { shouldValidate: false });
//   }, [title, normalizedSlug, content, metaTitle, metaDesc, authorId, setValue]);

//   useEffect(() => {
//     if (titleRef.current) {
//       titleRef.current.style.height = "auto";
//       titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
//     }
//   }, [title]);

//   return <div className="min-h-screen w-full bg-[#050814] text-slate-200">
//     {view === "list" ? (
//       <div className="services-page-main min-h-screen w-full bg-[#050814] box-border px-6 py-6 md:px-7" dir="rtl">
//         <div className="w-full">
//           <div className="services-header mb-5 flex items-center justify-between gap-4">
//             <div>
//                <div
//               style={{
//                 display: "flex",
//                 alignItems:
//                   "center",
//                 gap: 7,
//                 marginBottom: 4,
//               }}
//             >
//               <span
//                 style={{
//                   width: 6,
//                   height: 6,
//                   borderRadius:
//                     "50%",
//                   background:
//                     "#00E5FF",
//                   boxShadow:
//                     "0 0 7px rgba(0,229,255,0.9)",
                    
//                 }}
//               />

//               <span
//                 style={{
//                   fontFamily:
//                     "monospace",
//                   fontSize:
//                     "0.6rem",
//                   color:
//                     "rgba(0,229,255,0.5)",
//                   letterSpacing:
//                     "0.18em",
//                 }}
//               >
//                 POST MANAGEMENT
//               </span>
//             </div>
//               <h1 className="text-xl font-black text-white">مدیریت پست‌ها</h1>
//               <p className="mt-1 text-xs text-slate-600">ایجاد، ویرایش، انتشار و حذف پست‌های سایت</p>
//             </div>
//             <button
//               type="button"
//               onClick={openNewPost}
//               className="posts-add-button"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: "9px 18px",
//                 borderRadius: 10,
//                 cursor: "pointer",
//                 background: "#00E5FF",
//                 border: "1px solid rgba(0,229,255,0.5)",
//                 color: "#050814",
//                 fontSize: "0.82rem",
//                 fontWeight: 700,
//                 fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
//                 boxShadow: "0 0 20px rgba(0,229,255,0.25)",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               <IconPlus />
//               افزودن پست جدید
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="mb-4 overflow-visible rounded-2xl border border-cyan-400/[0.08] bg-[#0A1128]">
//             <div className="border-b border-cyan-400/[0.06] px-5 py-3.5">
//               <span className="text-sm font-bold text-white">جستجو و فیلتر پست‌ها</span>
//             </div>
//             <div className="flex flex-col gap-2.5 px-5 py-3.5 sm:flex-row sm:flex-wrap sm:items-center" dir="rtl">
//               <div className="relative w-full sm:min-w-[220px] sm:flex-1">
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="جستجو در عنوان، نامک یا شناسه..."
//                   className="box-border h-10 w-full rounded-[8px] border border-white/[0.07] bg-[#0B1224] px-3 text-right text-[11px] font-bold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/35 focus:ring-[3px] focus:ring-cyan-400/[0.04]"
//                 />
//               </div>

//               <div className="w-full sm:w-[180px]">
//                 <CustomSelect
//                   value={statusFilter}
//                   onChange={(value) => setStatusFilter(value as "all" | "draft" | "published")}
//                   options={[
//                     { value: "all", label: "همه وضعیت‌ها" },
//                     { value: "published", label: "منتشر شده" },
//                     { value: "draft", label: "پیش‌نویس" },
//                   ]}
//                 />
//               </div>

//               <div className="w-full sm:w-[180px]">
//                 <CustomSelect
//                   value={authorFilter}
//                   onChange={(value) => setAuthorFilter(value as "all" | "admin-1" | "admin-2")}
//                   options={[
//                     { value: "all", label: "همه نویسندگان" },
//                     { value: "admin-1", label: "ادمین ۱" },
//                     { value: "admin-2", label: "ادمین ۲" },
//                   ]}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Posts table */}
//           <div className="overflow-hidden rounded-2xl border border-cyan-400/[0.08] bg-[#0A1128]">
//             <div className="flex items-center justify-between gap-2 border-b border-cyan-400/[0.06] px-5 py-3.5">
//               <span className="flex-1 text-sm font-bold text-white">فهرست پست‌ها</span>
//               <span className="font-mono text-[11px] text-slate-700">{filteredPosts.length} مورد</span>
//             </div>
//             {postsError && <div className="mx-5 mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-[12px] font-bold text-red-300"><span>{postsError}</span><button type="button" onClick={() => void loadPosts()} className="cursor-pointer rounded-md border border-red-400/15 bg-red-400/[0.05] px-2.5 py-1.5 text-[9px] text-red-300">تلاش دوباره</button></div>}
//             <div className="services-table-scroll overflow-x-auto">
//               <table className="services-table w-full min-w-[760px] border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/[0.04]">
//                     {['عنوان پست','نوع','نویسنده','مطالعه','وضعیت','عملیات'].map((h, i) => <th key={h} className="whitespace-nowrap px-5 py-2.5 text-right font-mono text-[11px] font-semibold text-slate-700" style={{width: i === 5 ? 130 : 'auto'}}>{h}</th>)}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {postsLoading ? <tr><td colSpan={6} className="px-5 py-14 text-center text-xs text-slate-700">در حال دریافت پست‌ها...</td></tr> : filteredPosts.length === 0 ? <tr><td colSpan={6} className="px-5 py-14 text-center text-xs text-slate-700">{posts.length === 0 ? "هنوز پستی ثبت نشده است." : "پستی با این فیلترها پیدا نشد."}</td></tr> : paginatedPosts.map((post) => <tr key={post.id} className="border-b border-white/[0.03] transition-colors hover:bg-cyan-400/[0.025]">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300"><IconHeading /></div>
//                         <div className="min-w-0 max-w-[250px]"><div className="truncate text-[0.8rem] font-bold text-slate-200" title={post.title}>{post.title}</div><div className="mt-0.5 truncate font-mono text-[9px] text-slate-700" title={post.id}>{post.id}</div></div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4"><span className={`inline-flex rounded-md border px-2 py-1 text-[9px] font-bold ${post.postType === "special" ? "border-purple-400/20 bg-purple-400/[0.08] text-purple-300" : "border-slate-400/15 bg-slate-400/[0.05] text-slate-400"}`}>{post.postType === "special" ? "ویژه" : "معمولی"}</span></td>
//                     <td className="px-5 py-4 text-[0.7rem] font-bold text-slate-300">{ADMIN_AUTHORS.find((a) => a.id === post.authorId)?.name || "—"}</td><td className="px-5 py-4 font-mono text-[12px] text-slate-600">{post.readingTime} دقیقه</td><td className="px-5 py-4"><span className={`inline-flex rounded-md border px-2 py-1 text-[9px] font-bold ${post.status === 'published' ? 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400' : 'border-amber-400/20 bg-amber-400/[0.06] text-amber-400'}`}>{post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}</span></td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-1.5">
//                         <button
//                           type="button"
//                           onClick={() => openEditPost(post)}
//                           title="ویرایش"
//                           className="service-edit-button flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.03] text-slate-600 transition-all"
//                         >
//                           <IconEdit />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setDeletePostId(post.id)}
//                           title="حذف"
//                           className="service-delete-button flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.03] text-slate-600 transition-all"
//                         >
//                           <IconTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>)}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onChange={setCurrentPage}
//             />
//           )}
//         </div>
//         {deletePostId && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0B1224] p-5 text-right shadow-2xl" dir="rtl"><h3 className="text-sm font-black text-white">حذف پست</h3><p className="mt-2 text-xs leading-6 text-slate-300">آیا مطمئن هستید که این پست حذف شود؟ این عملیات قابل بازگشت نیست.</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => setDeletePostId(null)} className="flex-1 cursor-pointer rounded-lg border border-white/[0.07] bg-white/[0.035] py-2 text-[12px] font-bold text-slate-300">انصراف</button><button type="button" onClick={confirmDeletePost} className="flex-1 cursor-pointer rounded-lg border border-red-400/20 bg-red-400/[0.08] py-2 text-[12px] font-bold text-red-300">حذف پست</button></div></div></div>}
//       </div>
//     ) : (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-screen w-full flex-col">
//       <input type="hidden" {...register("content", { required: "محتوای پست الزامی است." })} />
//       <div className="flex min-h-screen w-full flex-1 overflow-hidden">
//         <main className="flex min-h-screen min-w-0 flex-[0_0_70%] flex-col overflow-y-auto border-l border-cyan-400/[0.06]">
//           {editor && <EditorToolbar editor={editor} onOpenMediaLibrary={openMediaLibraryForEditor} onOpenCodePanel={() => setCodePanelOpen((v) => !v)} />}
//           {codePanelOpen && editor && <CodePanel editor={editor} onClose={() => setCodePanelOpen(false)} />}

//           <div className="px-12 pt-9">
//             <textarea {...titleRegister} ref={(element) => { titleRegister.ref(element); titleRef.current = element; }} value={title} onChange={(e) => { setTitle(e.target.value); setValue("title", e.target.value, { shouldValidate: false }); e.target.style.height = "auto"; e.target.style.height = `${e.target.scrollHeight}px`; }} placeholder="عنوان گزارش یا پرونده را اینجا بنویسید..." rows={1} className="w-full resize-none overflow-hidden border-0 border-b-2 border-cyan-400/[0.08] bg-transparent pb-4 text-[clamp(1.5rem,2.6vw,2.1rem)] font-black leading-[1.35] text-white outline-none placeholder:text-slate-800 caret-cyan-400 focus:border-cyan-400/30" />
//           </div>

//           {errors.title && <p className="px-12 pt-2 text-[0.65rem] font-bold text-red-400">{errors.title.message}</p>}

//           {(title || slug) && <div className="flex items-center gap-1.5 px-12 pt-2"><span className="font-mono text-[0.64rem] text-slate-800">parahoor.io/blog/</span><span className="font-mono text-[0.64rem] text-cyan-400/35">{normalizedSlug || "post-url-slug"}</span><button type="button" className="cursor-pointer border-0 bg-transparent font-mono text-[0.6rem] text-cyan-400/35 hover:text-cyan-300">ویرایش</button></div>}

//           <div className="flex flex-1 flex-col px-12 pb-16 pt-7">
//             <EditorContent editor={editor} className="w-full" />
//             <div className="mt-8 flex items-center justify-between border-t border-white/[0.04] pt-4"><div className="flex items-center gap-4"><span className="font-mono text-[12px] text-slate-700">{wordCount} کلمه</span><span className="font-mono text-[12px] text-slate-700">زمان مطالعه: {readMin} دقیقه</span></div><div className="flex items-center gap-3"><span className="font-mono text-[12px] text-slate-800">HTML / Tiptap</span>{errors.content && <span className="text-[0.62rem] font-bold text-red-400">{errors.content.message}</span>}</div></div>
//           </div>
//         </main>

//         <aside className="flex min-h-screen flex-[0_0_30%] flex-col gap-3.5 overflow-y-auto bg-[#050814] p-4">
//           <SideCard title="انتشار" icon={<IconEye />}>
//             <div className="flex flex-col gap-2.5">
//               <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.09] bg-[#070D1D] p-1">
//                 <button type="button" onClick={() => { setStatus("draft"); setPublished(false); }} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[0.76rem] font-bold transition-all ${status === "draft" ? "border-amber-400/35 bg-amber-400/[0.10] text-amber-300" : "border-transparent bg-transparent text-slate-600 hover:text-slate-200"}`}>پیش‌نویس</button>
//                 <button type="button" onClick={() => setStatus("published")} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[0.76rem] font-bold transition-all ${status === "published" ? "border-emerald-400/35 bg-emerald-400/[0.10] text-emerald-300" : "border-transparent bg-transparent text-slate-600 hover:text-slate-200"}`}>انتشار</button>
//               </div>
//                             <div className="rounded-xl border border-white/[0.09] bg-[#070D1D] p-2">
//                 <p className="mb-2 px-1 font-mono text-[0.62rem] tracking-widest text-slate-700">نویسنده پست</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {ADMIN_AUTHORS.map((author) => <button key={author.id} type="button" onClick={() => { setAuthorId(author.id); setValue("authorId", author.id, { shouldValidate: true }); }} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${authorId === author.id ? "border-cyan-400/35 bg-cyan-400/[0.10] text-cyan-300" : "border-transparent bg-transparent text-slate-600 hover:text-slate-200"}`}>{author.name}</button>)}
//                 </div>
//               </div>
//               <div className="rounded-xl border border-white/[0.09] bg-[#070D1D] p-2">
//                 <p className="mb-2 px-1 font-mono text-[0.62rem] tracking-widest text-slate-700">نوع پست</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button type="button" onClick={() => setPostType("normal")} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${postType === "normal" ? "border-slate-400/25 bg-slate-400/[0.08] text-slate-200" : "border-transparent bg-transparent text-slate-600 hover:text-slate-200"}`}>معمولی</button>
//                   <button type="button" onClick={() => setPostType("special")} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${postType === "special" ? "border-purple-400/35 bg-purple-400/[0.10] text-purple-300" : "border-transparent bg-transparent text-slate-600 hover:text-slate-200"}`}>ویژه</button>
//                 </div>
//               </div>
//               {!authorId && <p className="-mt-1 px-1 text-[0.6rem] font-bold text-red-400">انتخاب نویسنده الزامی است.</p>}
//               <div className="grid grid-cols-2 gap-2 text-[0.62rem] font-medium text-slate-400">
//                 <div className="rounded-lg border border-white/[0.04] bg-[#050814]/50 px-2.5 py-2">ایجاد: {createdAt || "پس از ذخیره"}</div>
//                 <div className="rounded-lg border border-white/[0.04] bg-[#050814]/50 px-2.5 py-2">ویرایش: {updatedAt || "هنوز ذخیره نشده"}</div>
//               </div>
//               <div className="rounded-lg border border-white/[0.04] bg-[#050814]/50 px-2.5 py-2 text-[0.64rem] text-slate-700">نویسنده فعلی: <span className="font-bold text-slate-300">{selectedAuthor?.name || "انتخاب نشده"}</span> · زمان مطالعه: <span className="font-bold text-slate-300">{readMin} دقیقه</span></div>
// <button type="submit" disabled={publishing} className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-cyan-400/35 bg-cyan-400/[0.10] py-2.5 text-[0.82rem] font-bold text-cyan-300 shadow-[0_0_18px_rgba(0,229,255,0.06)] transition-all hover:border-cyan-400/50 hover:bg-cyan-400/[0.16] disabled:cursor-not-allowed disabled:opacity-50">{publishing ? "در حال ذخیره تغییرات..." : "تأیید و ذخیره تغییرات"}</button>
//               <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.04] bg-[#050814]/50 px-2.5 py-2"><span className={published ? "text-[0.62rem] text-emerald-400" : "text-[0.62rem] text-amber-400"}>●</span><span className="font-mono text-[0.66rem] text-slate-700">آخرین ذخیره: {savedAt}</span></div>
//             </div>
//           </SideCard>

//           <SideCard title="دسته‌بندی و برچسب‌ها" icon={<IconTag />} accentColor="#A78BFA">
//             <div className="flex flex-col gap-3.5"><div><p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-widest text-slate-400">CATEGORIES</p><div className="flex flex-col gap-1.5">{CATS.map(({ id, label }) => { const checked = selectedCats.includes(id); return <div key={id} className="flex items-center gap-2.5"><button type="button" onClick={() => toggleCat(id)} className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] ${checked ? "border-[1.5px] border-cyan-400 bg-cyan-400/[0.12]" : "border-[1.5px] border-white/[0.15] bg-transparent"}`}>{checked && <IconCheck />}</button><button type="button" onClick={() => toggleCat(id)} className={`border-0 bg-transparent p-0 text-right text-[0.8rem] ${checked ? "text-slate-200" : "text-slate-600"}`}>{label}</button></div>; })}</div></div>
//               <div><p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-widest text-slate-400">TAGS</p><div className="mb-2 flex flex-wrap gap-1.5">{tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-md border border-purple-400/25 bg-purple-400/[0.10] px-2 py-[3px] font-mono text-[0.7rem] text-purple-400">{t}<button type="button" onClick={() => removeTag(t)} className="flex cursor-pointer border-0 bg-transparent p-0 text-purple-400/50 hover:text-red-400"><IconX /></button></span>)}</div><input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="مثلاً #ردیابی_تتر — Enter برای افزودن" className={inputClass} /></div>
//             </div>
//           </SideCard>

//           <SideCard title="پرونده‌های چندرسانه‌ای" icon={<IconImage />} accentColor="#38BDF8">
//             <input ref={mediaFileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addMediaFiles(e.target.files); e.currentTarget.value = ""; }} />
//             <div className="flex flex-col gap-2.5">
//               <button type="button" onClick={() => mediaFileRef.current?.click()} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-2.5 text-[0.76rem] font-bold text-cyan-300 transition-colors hover:bg-cyan-400/[0.10]"><IconUpload /> افزودن پرونده چندرسانه‌ای</button>
//               <button type="button" onClick={openMediaLibraryForEditor} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-[0.68rem] text-slate-300 hover:bg-white/[0.04] hover:text-slate-300"><span>کتابخانه رسانه</span><span className="font-mono text-cyan-400/60">{mediaItems.length} فایل</span></button>
//               {mediaItems.length === 0 && <p className="text-center text-[0.62rem] leading-5 text-slate-700">تصاویرت را اینجا اضافه کن تا برای هر عکس متن جایگزین و تصویر شاخص را مدیریت کنی.</p>}
//               {mediaItems.length > 0 && <div className="grid grid-cols-3 gap-1.5">{mediaItems.slice(0, 6).map((item) => <button key={item.id} type="button" onClick={() => chooseFeatured(item.id)} title={item.alt || item.name} className={`relative aspect-square overflow-hidden rounded-md border ${featuredMediaId === item.id ? "border-amber-400/70" : "border-white/[0.09]"}`}><img src={item.url} alt={item.alt} className="h-full w-full object-cover" />{featuredMediaId === item.id && <span className="absolute right-1 top-1 rounded bg-amber-400 px-1 py-0.5 text-[8px] font-black text-[#050814]">شاخص</span>}</button>)}</div>}
//             </div>
//           </SideCard>

//           <SideCard title="تصویر شاخص" icon={<IconImage />} accentColor="#F59E0B">
//             {featuredMediaId ? <div className="flex flex-col gap-2.5">
//               {(() => { const item = mediaItems.find((m) => m.id === featuredMediaId); return item ? <><div className="relative overflow-hidden rounded-lg border border-amber-400/20 bg-[#050814]"><img src={item.url} alt={featuredAlt} className="aspect-[16/9] w-full object-cover" /><span className="absolute right-2 top-2 rounded-md bg-[#050814]/85 px-2 py-1 text-[9px] font-bold text-amber-300">تصویر شاخص</span></div><F label="متن جایگزین تصویر شاخص" hint="برای دسترس‌پذیری و سئو"><input value={featuredAlt} onChange={(e) => updateMediaAlt(item.id, e.target.value)} placeholder="توضیح دقیق و کوتاه تصویر" className={inputClass} /></F><button type="button" onClick={openMediaLibraryForEditor} className="w-full cursor-pointer rounded-lg border border-white/[0.07] bg-transparent py-2 text-[0.68rem] text-slate-300 hover:bg-white/[0.03] hover:text-slate-300">تغییر تصویر شاخص</button></> : null; })()}
//             </div> : <div className="flex flex-col gap-2.5">
//               <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { addMediaFiles(e.target.files); e.currentTarget.value = ""; }} />
//               <button type="button" onClick={() => { if (mediaItems.length) setMediaLibraryOpen(true); else mediaFileRef.current?.click(); }} onMouseEnter={() => setUploadHover(true)} onMouseLeave={() => setUploadHover(false)} className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-[10px] border p-[22px_12px] transition-all ${uploadHover ? "border-[1.5px] border-dashed border-amber-400/55 bg-amber-400/[0.04]" : "border-[1.5px] border-dashed border-amber-400/20 bg-white/[0.01]"}`}><span className="text-amber-400/50"><IconUpload /></span><span className="text-center text-[0.76rem] text-amber-400/55">انتخاب از پرونده‌های چندرسانه‌ای</span><span className="text-center font-mono text-[0.62rem] font-medium text-slate-400">JPG/PNG/WEBP</span></button>
//             </div>}
//           </SideCard>

//           <SideCard title="تنظیمات سئو" icon={<IconGlobe />} accentColor="#10B981">
//             <div className="flex flex-col gap-3">
//               <F label="نامک (URL Slug)" hint="فقط حروف انگلیسی، اعداد و خط تیره"><input {...register("slug", { required: "نامک الزامی است." })} value={slug} maxLength={100} onChange={(e) => { const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"); setSlug(value); setValue("slug", value, { shouldValidate: false }); }} placeholder="post-url-slug" className={`${inputClass} font-mono text-[0.76rem]`} />{errors.slug && <p className="mt-1 text-[0.6rem] font-bold text-red-400">{errors.slug.message}</p>}</F>
//               <F label="عنوان سئو (Meta Title)" hint={`${metaTitle.length}/60 — بهتر است زیر 60 کاراکتر باشد`}><input {...register("metaTitle", { required: "عنوان سئو الزامی است." })} value={metaTitle} maxLength={60} onChange={(e) => { setMetaTitle(e.target.value); setValue("metaTitle", e.target.value, { shouldValidate: false }); }} placeholder="عنوان صفحه برای موتورهای جستجو" className={inputClass} /><div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]"><div className={`h-full transition-all ${metaTitle.length > 55 ? "bg-red-400" : metaTitle.length > 45 ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${Math.min(100, metaTitle.length / 60 * 100)}%` }} /></div>{errors.metaTitle && <p className="mt-1 text-[0.6rem] font-bold text-red-400">{errors.metaTitle.message}</p>}</F>
//               <F label="توضیحات متا (Meta Description)" hint={`${metaDesc.length}/160 — حدود 120 تا 160 کاراکتر مناسب است`}><textarea {...register("metaDescription", { required: "توضیحات متا الزامی است." })} value={metaDesc} maxLength={160} onChange={(e) => { setMetaDesc(e.target.value); setValue("metaDescription", e.target.value, { shouldValidate: false }); }} placeholder="توضیح کوتاه و جذاب برای نتایج جستجو..." rows={4} className={`${inputClass} resize-none leading-6`} />{errors.metaDescription && <p className="mt-1 text-[0.6rem] font-bold text-red-400">{errors.metaDescription.message}</p>}<div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]"><div className={`h-full transition-all ${metaDesc.length > 150 ? "bg-red-400" : metaDesc.length > 110 ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${Math.min(100, metaDesc.length / 160 * 100)}%` }} /></div></F>
//             </div>
//           </SideCard>

//           {mediaLibraryOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setMediaLibraryOpen(false); }}>
//             <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-cyan-400/[0.12] bg-[#080F20] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
//               <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-4"><div><h3 className="text-sm font-black text-white">پرونده‌های چندرسانه‌ای</h3><p className="mt-1 text-[0.65rem] text-slate-600">هر عکس متن جایگزین مستقل دارد و می‌توانی یکی را به‌عنوان تصویر شاخص انتخاب کنی.</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => mediaFileRef.current?.click()} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-2 text-[0.68rem] font-bold text-cyan-300 hover:bg-cyan-400/[0.10]"><IconUpload /> افزودن عکس</button><button type="button" onClick={() => setMediaLibraryOpen(false)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.07] bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-slate-200"><IconClose /></button></div></div>
//               <div className="overflow-y-auto p-5">
//                 {mediaItems.length === 0 ? <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01]"><span className="text-cyan-400/40"><IconImage /></span><p className="text-sm font-bold text-slate-300">هنوز عکسی در کتابخانه نیست</p><button type="button" onClick={() => mediaFileRef.current?.click()} className="cursor-pointer rounded-lg bg-cyan-400 px-4 py-2 text-[0.7rem] font-black text-[#050814]">افزودن عکس</button></div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   {mediaItems.map((item) => <div key={item.id} className={`overflow-hidden rounded-xl border bg-[#050814] ${featuredMediaId === item.id ? "border-amber-400/40" : "border-white/[0.07]"}`}>
//                     <div className="relative aspect-[16/9] overflow-hidden bg-black"><img src={item.url} alt={item.alt} className="h-full w-full object-cover" />{featuredMediaId === item.id && <span className="absolute right-2 top-2 rounded-md bg-amber-400 px-2 py-1 text-[9px] font-black text-[#050814]">تصویر شاخص</span>}</div>
//                     <div className="flex flex-col gap-2.5 p-3"><div className="flex items-center justify-between gap-2"><span className="truncate font-mono text-[0.62rem] text-slate-600" title={item.name}>{item.name}</span><button type="button" onClick={() => removeMedia(item.id)} className="shrink-0 cursor-pointer border-0 bg-transparent text-[0.62rem] text-red-400/60 hover:text-red-300">حذف</button></div><F label="متن جایگزین (Alt Text)" hint="برای هر عکس جداگانه تنظیم می‌شود"><input value={item.alt} onChange={(e) => updateMediaAlt(item.id, e.target.value)} placeholder="مثلاً تصویر نمودار تراکنش‌ها" className={inputClass} /></F><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => insertMediaIntoEditor(item.id)} className="cursor-pointer rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] py-2 text-[0.68rem] font-bold text-cyan-300 hover:bg-cyan-400/[0.11]">درج در متن</button><button type="button" onClick={() => chooseFeatured(item.id)} className={`cursor-pointer rounded-lg py-2 text-[0.68rem] font-bold ${featuredMediaId === item.id ? "border border-amber-400/35 bg-amber-400/[0.08] text-amber-300" : "border border-white/[0.07] bg-white/[0.035] text-slate-300 hover:bg-white/[0.04] hover:text-slate-300"}`}>{featuredMediaId === item.id ? "✓ تصویر شاخص" : "انتخاب به‌عنوان شاخص"}</button></div></div>
//                   </div>)}
//                 </div>}
//               </div>
//             </div>
//           </div>}
//         </aside>
//       </div>
//     </form>
//     )}

//     <style jsx global>{`
//       html, body { min-height: 100%; background: #050814; }
//       body { margin: 0; }
//       .service-rich-editor { width: 100%; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: visible; background: #060B19; }
//       .service-rich-editor-toolbar { display:flex; flex-direction:column; align-items:stretch; gap:5px; padding:7px 8px; background:rgba(255,255,255,0.025); border-bottom:1px solid rgba(255,255,255,0.06); position:sticky; top:0; z-index:30; backdrop-filter:blur(16px); }
//       .service-rich-editor-toolbar-row { display:flex; align-items:center; gap:3px; min-height:32px; flex-wrap:wrap; }
//       .service-rich-editor-divider { color:#475569; font-size:16px; line-height:1; margin:0 7px; user-select:none; }
//       .service-rich-editor-extra-toolbar { display:flex; flex-direction:column; align-items:stretch; gap:7px; padding:8px; background:rgba(0,229,255,0.018); border-bottom:1px solid rgba(255,255,255,0.06); }
//       .service-rich-editor-extra-group { display:flex; align-items:center; gap:6px; padding:3px 6px; border:1px solid rgba(255,255,255,0.055); border-radius:8px; background:rgba(255,255,255,0.018); }
//       .service-rich-editor-extra-label { color:#64748B; font-size:10px; font-weight:800; white-space:nowrap; }
//       .service-rich-editor-extra-buttons { display:flex; align-items:center; gap:2px; }
//       .service-rich-editor-content { min-height: calc(100vh - 190px); padding: 28px 4px 60px; outline:none; color:#E2E8F0; font-size:16px; line-height:2.15; direction:rtl; text-align:right; caret-color:#00E5FF; }
//       .service-rich-editor-content p { margin:0 0 1.25rem; color:#94A3B8; }
//       .service-rich-editor-content [style*="font-size"] { line-height: 1.8; }
//       .service-rich-editor-content h1 { margin:2rem 0 1rem; color:#F8FAFC; font-size:2rem; line-height:1.5; font-weight:900; }
//       .service-rich-editor-content h2 { margin:2rem 0 .8rem; color:#E2E8F0; font-size:1.35rem; line-height:1.6; font-weight:800; border-right:3px solid rgba(0,229,255,.45); padding-right:12px; }
//       .service-rich-editor-content .heading-with-accent { border-right:3px solid rgba(0,229,255,.45); padding-right:12px; }
//       .service-rich-editor-content h3 { margin:1.5rem 0 .7rem; color:#CBD5E1; font-size:1.1rem; font-weight:800; }
//       .service-rich-editor-content h4 { margin:1.3rem 0 .6rem; color:#CBD5E1; font-size:1rem; font-weight:800; }
//       .service-rich-editor-content h5 { margin:1.1rem 0 .5rem; color:#CBD5E1; font-size:.92rem; font-weight:800; }
//       .service-rich-editor-content h6 { margin:1rem 0 .5rem; color:#94A3B8; font-size:.84rem; font-weight:800; }
//       .service-rich-editor-content strong { color:#F8FAFC; font-weight:800; }
//       .service-rich-editor-content em { color:#A5B4FC; }
//       .service-rich-editor-content u { text-decoration-color:#00E5FF; text-underline-offset:4px; }
//       .service-rich-editor-content ul, .service-rich-editor-content ol { padding-right:2rem; padding-left:0; margin:1rem 0 1.5rem; direction:rtl; }
//       .service-rich-editor-content ul { list-style-type:disc; }
//       .service-rich-editor-content ol { list-style-type:decimal; }
//       .service-rich-editor-content li { display:list-item; margin:.35rem 0; padding-right:.25rem; color:#CBD5E1; }
//       .service-rich-editor-content li::marker { color:#22D3EE; font-size:.95em; font-weight:800; }
//       .service-rich-editor-content blockquote { border-right:3px solid rgba(0,229,255,.35); border-left:0; margin:1.5rem 0; padding:.8rem 1rem; background:rgba(0,229,255,.025); color:#94A3B8; border-radius:.5rem; }
//       .service-rich-editor-content pre { direction:ltr; text-align:left; margin:1.5rem 0; padding:1rem 1.1rem; overflow-x:auto; border-radius:.75rem; background:#020617; border:1px solid rgba(0,229,255,.1); box-shadow:0 20px 50px rgba(0,0,0,.25); }
//       .service-rich-editor-content pre code { background:transparent; border:0; padding:0; color:#67E8F9; font-family:"JetBrains Mono","Fira Code",monospace; font-size:.78rem; line-height:1.8; }
//       .service-rich-editor-content code { direction:ltr; color:#67E8F9; background:rgba(0,229,255,.06); border:1px solid rgba(0,229,255,.08); border-radius:5px; padding:2px 5px; font-family:monospace; font-size:.85em; }
//       .service-rich-editor-content a { color:#22D3EE; text-decoration:underline; text-underline-offset:4px; }
//        .service-rich-editor-content .service-editor-image { display:block; max-width:100%; height:auto; margin:0; border-radius:.75rem; border:1px solid rgba(0,229,255,.10); object-fit:contain; }
//       .service-image-node-wrapper { display:flex; justify-content:center; width:100%; margin:1.5rem 0; }
//       .service-image-node { position:relative; max-width:100%; margin:0 auto; line-height:0; }
//       .service-image-node img { display:block; width:100%; max-width:100%; height:auto; border-radius:.75rem; border:1px solid rgba(0,229,255,.10); object-fit:contain; cursor:pointer; user-select:none; }
//       .service-image-node.is-selected img { border-color:rgba(0,229,255,.65); box-shadow:0 0 0 2px rgba(0,229,255,.10); }
//       .service-image-actions { position:absolute; right:8px; top:8px; display:flex; align-items:center; gap:6px; padding:4px; border:1px solid rgba(0,229,255,.18); border-radius:8px; background:rgba(5,8,20,.92); backdrop-filter:blur(8px); z-index:5; }
//       .service-image-actions button { border:1px solid rgba(0,229,255,.18); border-radius:6px; background:rgba(0,229,255,.07); color:#67E8F9; padding:5px 8px; font-size:10px; font-weight:800; cursor:pointer; }
//       .service-image-actions button:hover { background:rgba(0,229,255,.14); color:#CFFAFE; }
//       .service-image-actions span { color:#64748B; font:700 9px ui-monospace,monospace; padding:0 4px; }
//       .service-image-resize-handle { position:absolute; top:50%; width:9px; height:48px; transform:translateY(-50%); border:1px solid rgba(0,229,255,.55); border-radius:5px; background:#071525; box-shadow:0 0 0 2px rgba(0,229,255,.08); cursor:ew-resize; z-index:6; }
//       .service-image-resize-left { left:-5px; }
//       .service-image-resize-right { right:-5px; }
//       .service-rich-editor-content hr { margin:2rem 0; border:0; border-top:1px solid rgba(255,255,255,.07); }
//       .service-rich-editor-content [data-indent="1"] { margin-right:2em; }
//       .service-rich-editor-content [data-indent="2"] { margin-right:4em; }
//       .service-rich-editor-content [data-indent="3"] { margin-right:6em; }
//       .service-rich-editor-content [data-indent="4"] { margin-right:8em; }
//       .service-rich-editor-content [data-indent="5"] { margin-right:10em; }
//       .service-rich-editor-content [data-indent="6"] { margin-right:12em; }
//       .service-rich-editor-content [data-indent="7"] { margin-right:14em; }
//       .service-rich-editor-content [data-indent="8"] { margin-right:16em; }
//       .service-rich-editor-content [dir="ltr"] { direction:ltr; text-align:left; }
//       .service-more-marker { display:flex; align-items:center; gap:10px; margin:18px 0; color:#64748B; font-size:10px; font-weight:800; text-align:center; }
//       .service-more-marker::before, .service-more-marker::after { content:""; flex:1; height:1px; background:rgba(148,163,184,.22); }
//       .service-rich-link-editor { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:8px; background:rgba(0,229,255,.035); border-bottom:1px solid rgba(255,255,255,.06); }
//       .service-rich-link-editor input { flex:1 1 260px; min-width:180px; height:32px; padding:0 10px; border-radius:7px; border:1px solid rgba(255,255,255,.09); outline:none; background:#0B1224; color:#E2E8F0; font-size:12px; }
//       .service-rich-link-editor button { height:32px; padding:0 10px; border-radius:7px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.04); color:#CBD5E1; cursor:pointer; font-size:11px; font-weight:700; }
//       .service-rich-link-editor button:hover { background:rgba(0,229,255,.08); color:#00E5FF; }
//       .service-rich-link-editor .service-rich-link-remove { color:#F87171; }
//       .service-rich-link-editor .service-rich-link-cancel { color:#94A3B8; }
//       .service-rich-editor-content p.is-editor-empty:first-child::before { content:attr(data-placeholder); float:right; height:0; color:#1E293B; pointer-events:none; }
//       .service-rich-editor-content sup { font-size:.72em; line-height:0; vertical-align:super; color:#67E8F9; }
//       .service-rich-editor-content sub { font-size:.72em; line-height:0; vertical-align:sub; color:#A5B4FC; }
//       textarea::placeholder, input::placeholder { color:#1E293B; }

//       /* Responsive layout — editor */
//       @media (max-width: 1100px) {
//         form > div {
//           flex-direction: column !important;
//           overflow: visible !important;
//         }

//         form > div > main,
//         form > div > aside {
//           flex: 0 0 auto !important;
//           width: 100% !important;
//           min-width: 0 !important;
//         }

//         form > div > main {
//           min-height: auto !important;
//           overflow: visible !important;
//           border-left: 0 !important;
//           border-bottom: 1px solid rgba(0,229,255,0.06);
//         }

//         form > div > aside {
//           min-height: auto !important;
//           overflow: visible !important;
//           display: grid !important;
//           grid-template-columns: repeat(2, minmax(0, 1fr));
//           align-items: start;
//         }

//         form > div > aside > div:not(.fixed) {
//           min-width: 0;
//         }

//         form > div > aside > div:not(.fixed):first-child {
//           grid-column: 1 / -1;
//         }
//       }

//       @media (max-width: 760px) {
//         .services-page-main {
//           padding: 20px 14px !important;
//         }

//         .services-header {
//           flex-direction: column !important;
//           gap: 16px !important;
//         }

//         .services-header > button {
//           width: 100%;
//           justify-content: center;
//         }

//         .post-filters {
//           justify-content: flex-start !important;
//         }

//         .posts-add-button {
//           width: 100% !important;
//         }

//         form > div > main {
//           width: 100% !important;
//         }

//         form > div > aside {
//           display: flex !important;
//           flex-direction: column !important;
//           gap: 12px !important;
//           padding: 12px !important;
//         }

//         form > div > aside > div:not(.fixed) {
//           width: 100%;
//         }

//         .service-rich-editor-toolbar {
//           position: sticky;
//           top: 0;
//           padding: 6px;
//         }

//         .service-rich-editor-toolbar-row {
//           gap: 2px;
//         }

//         .service-rich-editor-divider {
//           margin: 0 3px;
//         }

//         .service-rich-editor-extra-group {
//           align-items: flex-start;
//           flex-wrap: wrap;
//         }

//         .service-rich-link-editor input {
//           flex-basis: 100%;
//           min-width: 0;
//         }

//         form > div > main > div:has(> textarea),
//         form > div > main > div:has(.service-rich-editor-content),
//         form > div > main > div:has(> span.font-mono) {
//           padding-left: 14px !important;
//           padding-right: 14px !important;
//         }

//         .service-rich-editor-content {
//           min-height: 320px;
//           padding: 20px 2px 40px;
//         }

//         .service-rich-editor-content h1 {
//           font-size: 1.55rem;
//         }

//         .service-rich-editor-content h2 {
//           font-size: 1.2rem;
//         }

//         .service-image-actions {
//           right: 5px;
//           top: 5px;
//           max-width: calc(100% - 10px);
//         }

//         .service-image-actions button {
//           padding: 4px 6px;
//         }

//         .service-rich-link-editor {
//           align-items: stretch;
//         }

//         .service-rich-link-editor button {
//           flex: 1 1 auto;
//         }

//         form > div > aside .grid.grid-cols-2 {
//           grid-template-columns: 1fr;
//         }
//       }

//       @media (max-width: 480px) {
//         .services-page-main {
//           padding: 16px 10px !important;
//         }

//         .post-filters {
//           padding-left: 12px !important;
//           padding-right: 12px !important;
//         }

//         .service-rich-editor-toolbar-row > button {
//           width: 32px !important;
//         }

//         .service-rich-editor-toolbar-row > div > button {
//           max-width: 72px;
//         }

//         .service-rich-editor-content {
//           font-size: 15px;
//           line-height: 2;
//         }

//         .service-rich-editor-content pre {
//           margin-left: -2px;
//           margin-right: -2px;
//           padding: 0.8rem;
//         }

//         .service-rich-editor-content [data-indent="5"],
//         .service-rich-editor-content [data-indent="6"],
//         .service-rich-editor-content [data-indent="7"],
//         .service-rich-editor-content [data-indent="8"] {
//           margin-right: 1.5em;
//         }

//         form > div > main > div:has(> textarea),
//         form > div > main > div:has(.service-rich-editor-content),
//         form > div > main > div:has(> span.font-mono) {
//           padding-left: 10px !important;
//           padding-right: 10px !important;
//         }

//         .services-table {
//           min-width: 720px !important;
//         }

//         .services-table th,
//         .services-table td {
//           padding-left: 12px !important;
//           padding-right: 12px !important;
//         }
//       }

//       .service-edit-button:hover {
//         background: rgba(167, 139, 250, 0.08) !important;
//         border-color: rgba(167, 139, 250, 0.28) !important;
//         color: #A78BFA !important;
//         transform: translateY(-1px);
//         box-shadow: 0 0 12px rgba(167, 139, 250, 0.12);
//       }

//       .service-edit-button:active {
//         transform: translateY(0);
//       }

//       .service-delete-button:hover {
//         background: rgba(239, 68, 68, 0.08) !important;
//         border-color: rgba(239, 68, 68, 0.28) !important;
//         color: #EF4444 !important;
//         transform: translateY(-1px);
//         box-shadow: 0 0 12px rgba(239, 68, 68, 0.12);
//       }

//       .service-delete-button:active {
//         transform: translateY(0);
//       }
//     `}</style>
//     {view !== "list" && <button type="button" onClick={() => setView("list")} className="fixed bottom-5 left-5 z-50 rounded-lg border border-white/[0.08] bg-[#0B1224]/95 px-3 py-2 font-mono text-[12px] text-slate-300 shadow-xl hover:border-cyan-400/20 hover:text-cyan-300">بازگشت به فهرست پست‌ها</button>}
//   </div>;
// }











"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EditorContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor, type Editor, type NodeViewProps } from "@tiptap/react";
import { Extension, Mark, Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */

const I = (paths: string | string[], w = 14, sw = 2) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(paths) ? paths : [paths]).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const IconPlus = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconBold = () => I(["M6 4h8a4 4 0 010 8H6z", "M6 12h9a4 4 0 010 8H6z"]);
const IconItalic = () => I(["M19 4h-9", "M14 20H5", "M15 4l-6 16"]);
const IconUnderline = () => I(["M6 3v7a6 6 0 0012 0V3", "M4 21h16"]);
const IconStrike = () => I(["M4 12h16", "M7 7c.8-2 2.8-3 5.5-3 3 0 5 1.3 5.5 3", "M17 17c-.9 1.9-2.8 3-5.5 3-3.1 0-5.1-1.3-5.6-3"]);
const IconLink = () => I(["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"]);
const IconList = () => I(["M9 6h11", "M9 12h11", "M9 18h11", "M4 6h.01", "M4 12h.01", "M4 18h.01"]);
const IconListOrdered = () => I(["M10 6h11", "M10 12h11", "M10 18h11", "M4 5v2", "M3 7h2", "M3 11h2", "M4 10v3", "M3 18c.4-.8 1.1-1.2 2-1.2 1 0 1.6.5 1.6 1.2 0 .6-.4 1-1.2 1.5L3 21h4"]);
const IconQuote = () => I(["M7 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4", "M18 17h-2a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4"]);
const IconCode = () => I(["M8 6l-6 6 6 6", "M16 6l6 6-6 6", "M14 4l-4 16"]);
const IconMinus = () => I("M4 12h16");
const IconUndo = () => I(["M9 14L4 9l5-5", "M4 9h10a6 6 0 010 12h-1"]);
const IconRedo = () => I(["M15 14l5-5-5-5", "M20 9H10a6 6 0 000 12h1"]);
const IconAlignLeft = () => I(["M4 6h16", "M4 12h11", "M4 18h16"]);
const IconAlignCenter = () => I(["M4 6h16", "M7 12h10", "M4 18h16"]);
const IconAlignRight = () => I(["M4 6h16", "M9 12h11", "M4 18h16"]);
const IconAlignJustify = () => I(["M4 6h16", "M4 12h16", "M4 18h16"]);
const IconIndentIn = () => I(["M9 6h11", "M9 12h11", "M9 18h11", "M5 8l-3 4 3 4"]);
const IconIndentOut = () => I(["M4 6h16", "M4 12h16", "M4 18h16", "M2 8l3 4-3 4"]);
const IconSup = () => I(["M4 18l7-12", "M11 18L4 6", "M15 9h5l-4 5h4"]);
const IconSub = () => I(["M4 6l7 12", "M11 6L4 18", "M15 15h5l-4 5h4"]);
const IconMore = () => I(["M4 6h16v12H4z", "M8 12h.01", "M12 12h.01", "M16 12h.01"]);
const IconSymbols = () => I(["M6 4v16", "M18 4v16", "M3 8h18", "M3 16h18"]);
const IconClear = () => I(["M4 7h16", "M7 7v11a2 2 0 002 2h6a2 2 0 002-2V7", "M9 4h6", "M10 11v5", "M14 11v5"]);
const IconEdit = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const IconEye = () => I(["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8", "M12 9a3 3 0 100 6 3 3 0 000-6z"]);
const IconTag = () => I(["M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z", "M7 7h.01"]);
const IconGlobe = () => I(["M12 2a10 10 0 100 20A10 10 0 0012 2z", "M2 12h20", "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"]);
const IconImage = () => I(["M3 3h18v18H3z", "M8.5 8.5h.01", "M21 15l-5-5L5 21"]);
const IconUpload = () => I(["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"]);
const IconCheck = () => I("M20 6L9 17l-5-5", 12, 2.8);
const IconX = () => I(["M18 6L6 18", "M6 6l12 12"], 11, 2.5);
const IconClose = () => I(["M6 6l12 12", "M18 6L6 18"]);
const IconHeading = () => I(["M5 5v14", "M19 5v14", "M5 12h14"]);
const IconRtl = () => I(["M5 5h9", "M5 9h7", "M5 13h9", "M19 5v14", "M15 15l4 4 4-4", "M4 19h10"]);
const IconLtr = () => I(["M10 5h9", "M12 9h7", "M10 13h9", "M5 5v14", "M1 9l4-4 4 4", "M5 19h10"]);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const CATS = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

const CATEGORY_ID_ALIASES: Record<string, string> = {
  solved: "solved-cases",
  security: "security-education",
  fraud: "security-alerts",
};

type MediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
};

const INITIAL_CONTENT = `
<p>در این پرونده، لاگ‌های سرور نشان می‌داد که مهاجم از طریق یک آسیب‌پذیری در پنل مدیریت، دسترسی به کیف پول گرم صرافی را به دست آورده است.</p>
<h2>روش حمله</h2>
<p>مهاجم با استفاده از یک حمله SQL Injection در فرم ورود، کوکی‌های session را استخراج کرده و سپس با جعل هویت مدیر سیستم، تراکنش‌های برداشت را تأیید کرده است.</p>
<h2>ردیابی تراکنش‌ها</h2>
<pre><code>TxID: 0x7f3a...b2c1
از: 0x4a2b...c9d0
به: 0x8e1f...d4a2
مقدار: 5,000 USDT</code></pre>
<p>کارآگاهان پاراهور با تحلیل گراف تراکنش، آدرس مقصد نهایی را شناسایی و به صرافی مربوطه اطلاع دادند.</p>`;

const HTML_TAGS = [
  ["<div>", "<div>", "</div>"], ["<section>", "<section>", "</section>"],
  ["<article>", "<article>", "</article>"], ["<p>", "<p>", "</p>"],
  ["<h2>", "<h2>", "</h2>"], ["<h3>", "<h3>", "</h3>"],
  ["<span>", "<span>", "</span>"], ["<a>", '<a href="">', "</a>"],
  ["<strong>", "<strong>", "</strong>"], ["<em>", "<em>", "</em>"],
  ["<ul>", "<ul>", "</ul>"], ["<li>", "<li>", "</li>"],
  ["<blockquote>", "<blockquote>", "</blockquote>"], ["<pre>", "<pre><code>", "</code></pre>"],
];

const COMMON_SNIPPETS = [
  { name: "HTML", code: `<article>\n  <h2>عنوان</h2>\n  <p>متن مقاله</p>\n</article>` },
  { name: "Link", code: `<a href="https://example.com">متن لینک</a>` },
  { name: "List", code: `<ul>\n  <li>آیتم اول</li>\n  <li>آیتم دوم</li>\n</ul>` },
];

/* ─────────────────────────────────────────────
   TIPTAP EXTENSIONS
───────────────────────────────────────────── */

const ServiceTextStyle = Mark.create({
  name: "serviceTextStyle",
  addAttributes() {
    return {
      color: { default: null, parseHTML: (el) => el.style.color || null, renderHTML: (attrs) => attrs.color ? { style: `color: ${attrs.color}` } : {} },
      backgroundColor: { default: null, parseHTML: (el) => el.style.backgroundColor || null, renderHTML: (attrs) => attrs.backgroundColor ? { style: `background-color: ${attrs.backgroundColor}` } : {} },
      fontSize: { default: null, parseHTML: (el) => el.style.fontSize || null, renderHTML: (attrs) => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {} },
    };
  },
  parseHTML() {
    return [
      { tag: "span" },
      { tag: '[style*="color"]' },
      { tag: '[style*="background-color"]' },
      { tag: '[style*="font-size"]' },
    ];
  },
  renderHTML({ HTMLAttributes }) { return ["span", mergeAttributes(HTMLAttributes), 0]; },
  addCommands() {
    return {
      setServiceTextStyle: (attrs: Record<string, string>) => ({ commands }: { commands: any }) => commands.setMark(this.name, attrs),
      unsetServiceTextStyle: (attrs: Record<string, string>) => ({ commands }: { commands: any }) => commands.updateAttributes(this.name, attrs),
    } as any;
  },
});

const ServiceSup = Mark.create({
  name: "serviceSuperscript",
  parseHTML() { return [{ tag: "sup" }]; },
  renderHTML() { return ["sup", 0]; },
  addCommands() {
    return { toggleServiceSuperscript: () => ({ commands }: { commands: any }) => commands.toggleMark(this.name) } as any;
  },
});

const ServiceSub = Mark.create({
  name: "serviceSubscript",
  parseHTML() { return [{ tag: "sub" }]; },
  renderHTML() { return ["sub", 0]; },
  addCommands() {
    return { toggleServiceSubscript: () => ({ commands }: { commands: any }) => commands.toggleMark(this.name) } as any;
  },
});

const ServiceParagraphStyle = Extension.create({
  name: "serviceParagraphStyle",
  addGlobalAttributes() {
    return [{ types: ["paragraph", "heading"], attributes: {
      textAlign: { default: "right", parseHTML: (el) => el.style.textAlign || "right", renderHTML: (attrs) => attrs.textAlign ? { style: `text-align: ${attrs.textAlign}` } : {} },
      textDirection: { default: "rtl", parseHTML: (el) => el.getAttribute("dir") || "rtl", renderHTML: (attrs) => attrs.textDirection ? { dir: attrs.textDirection } : {} },
      indent: { default: 0, parseHTML: (el) => Number(el.getAttribute("data-indent") || 0), renderHTML: (attrs) => attrs.indent ? { "data-indent": String(attrs.indent) } : {} },
    }}];
  },
});


function ServiceImageView({ node, updateAttributes, selected, getPos, editor }: NodeViewProps) {
  const [editing, setEditing] = useState(false);
  const width = Number(node.attrs.width || 100);

  const resize = (event: React.PointerEvent<HTMLDivElement>, direction: 1 | -1) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = width;
    const host = event.currentTarget.closest(".service-image-node")?.parentElement;
    const baseWidth = host?.getBoundingClientRect().width || 800;
    const onMove = (e: PointerEvent) => {
      const delta = ((e.clientX - startX) / baseWidth) * 100 * direction;
      updateAttributes({ width: Math.max(20, Math.min(100, Math.round(startWidth + delta))) });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const selectImage = () => {
    const pos = typeof getPos === "function" ? getPos() : null;
    if (typeof pos === "number") editor.commands.setNodeSelection(pos);
    setEditing(true);
  };

  const replaceImage = () => {
    const pos = typeof getPos === "function" ? getPos() : null;
    if (typeof pos === "number") editor.commands.setNodeSelection(pos);
    window.dispatchEvent(new CustomEvent("service-image-edit", { detail: { pos } }));
  };

  return (
    <NodeViewWrapper className="service-image-node-wrapper">
      <div className={`service-image-node ${selected ? "is-selected" : ""}`} style={{ width: `${width}%` }}>
        <img src={node.attrs.src} alt={node.attrs.alt || ""} title={node.attrs.title || ""} draggable={false} onClick={selectImage} />
        {selected && (
          <>
            <div className="service-image-actions">
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.stopPropagation(); replaceImage(); }}>ویرایش عکس</button>
              <span>{width}%</span>
            </div>
            <div className="service-image-resize-handle service-image-resize-left" onPointerDown={(e) => resize(e, -1)} title="تغییر اندازه" />
            <div className="service-image-resize-handle service-image-resize-right" onPointerDown={(e) => resize(e, 1)} title="تغییر اندازه" />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}

const ServiceImage = Node.create({
  name: "serviceImage",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      title: { default: "" },
      width: { default: 100, parseHTML: (el) => Number((el as HTMLElement).style.width?.replace("%", "") || el.getAttribute("width") || 100), renderHTML: (attrs) => ({ style: `width: ${attrs.width}%;` }) },
    };
  },
  parseHTML() { return [{ tag: "img[data-service-image]" }, { tag: "img" }]; },
  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes, { "data-service-image": "true", class: "service-editor-image" })];
  },
  addNodeView() { return ReactNodeViewRenderer(ServiceImageView); },
  addCommands() {
    return {
      setServiceImage: (attrs: { src: string; alt?: string; title?: string; width?: number }) => ({ commands }: { commands: any }) => commands.insertContent({ type: this.name, attrs }),
    } as any;
  },
});

const ServiceMore = Node.create({
  name: "serviceMore",
  group: "block",
  atom: true,
  selectable: true,
  parseHTML() { return [{ tag: 'div[data-service-more]' }]; },
  renderHTML() { return ["div", { "data-service-more": "true", class: "service-more-marker" }, "more"]; },
});

/* ─────────────────────────────────────────────
   SHARED UI
───────────────────────────────────────────── */

const buttonStyle = (active = false, extra = "") =>
  `flex h-8 w-[34px] shrink-0 items-center justify-center rounded-[7px] border text-xs font-bold transition-colors ${active ? "border-[rgba(21,101,192,0.44)] bg-[rgba(21,101,192,0.17)] text-[#1565C0]" : "border-transparent bg-transparent text-[#475569] hover:bg-[rgba(21,101,192,0.125)] hover:text-[#1565C0]"} cursor-pointer ${extra}`;

const menuStyle = "absolute right-0 top-[calc(100%+6px)] z-[50] min-w-[160px] rounded-[9px] border border-[rgba(30,58,138,0.142)] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]";

function SideCard({ title, icon, children, accentColor = "#1565C0" }: { title: string; icon: ReactNode; children: ReactNode; accentColor?: string }) {
  return <div className="overflow-hidden rounded-[14px] border border-[rgba(21,101,192,0.155)] bg-[#FFFFFF]">
    <div className="h-0.5" style={{ background: `linear-gradient(90deg,${accentColor}88,${accentColor}22,transparent)` }} />
    <div className="flex items-center gap-[7px] border-b border-[#1E3A8A]/[0.08] px-4 py-[13px]">
      <span className="flex opacity-70" style={{ color: accentColor }}>{icon}</span>
      <span className="text-[0.82rem] font-bold text-[#0F172A]">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>;
}

function F({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <div className="flex flex-col gap-[5px]">
    <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-600">{label}</label>
    {children}
    {hint && <span className="text-[0.62rem] font-medium text-slate-600">{hint}</span>}
  </div>;
}

const inputClass = "box-border w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] px-[10px] py-[8px] text-[0.8rem] text-slate-800 outline-none caret-[#1565C0] transition-all duration-150 focus:border-[#1565C0]/[0.6] focus:ring-[3px] focus:ring-[#1565C0]/[0.09]";


const FONT_SIZES = [
  { label: "12", value: "12px" }, { label: "14", value: "14px" },
  { label: "16", value: "16px" }, { label: "18", value: "18px" },
  { label: "20", value: "20px" }, { label: "24", value: "24px" },
  { label: "28", value: "28px" }, { label: "32", value: "32px" },
  { label: "36", value: "36px" },
];

/* ─────────────────────────────────────────────
   EDITOR TOOLBAR
───────────────────────────────────────────── */

function EditorToolbar({ editor, onOpenMediaLibrary, onOpenCodePanel }: { editor: Editor | null; onOpenMediaLibrary?: () => void; onOpenCodePanel?: () => void }) {
  const [showHeading, setShowHeading] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [textColor, setTextColor] = useState("#00E5FF");
  const [highlightColor, setHighlightColor] = useState("#FFF59D");
  const [, setSelectionVersion] = useState(0);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  useEffect(() => {
    const refresh = () => setSelectionVersion((v) => v + 1);
    editor?.on("selectionUpdate", refresh);
    return () => { editor?.off("selectionUpdate", refresh); };
  }, [editor]);

  if (!editor) return null;

  const parent = editor.state.selection.$from.parent;
  const headingLevel = editor.getAttributes("heading").level;
  const currentIndent = Number(parent.attrs.indent || 0);
  const run = (fn: () => boolean) => { fn(); editor.view.focus(); };
  const updateBlock = (attrs: Record<string, any>) => {
    const type = parent.type.name === "heading" ? "heading" : "paragraph";
    editor.chain().focus().updateAttributes(type, attrs).run();
  };
  const changeIndent = (delta: number) => updateBlock({ indent: Math.max(0, Math.min(8, currentIndent + delta)) });
  const openLinkEditor = () => {
    setLinkUrl(editor.getAttributes("link").href || "");
    setShowLink(true);
  };
  const applyLink = () => {
    const url = linkUrl.trim();
    if (!url) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setShowLink(false);
  };
  const setHeading = (level?: number) => {
    if (!level) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    setShowHeading(false);
  };
  const rememberSelection = () => {
    const { from, to } = editor.state.selection;
    selectionRef.current = { from, to };
  };
  const restoreSelection = () => {
    const saved = selectionRef.current;
    if (saved) editor.commands.setTextSelection(saved);
  };
  const setStyle = (attrs: Record<string, string>) => {
    if (!editor) return;
    restoreSelection();
    editor.chain().focus().setMark("serviceTextStyle", attrs).run();
    editor.view.focus();
  };
  const removeStyle = (key: string) => {
    restoreSelection();
    editor.chain().focus().unsetMark("serviceTextStyle").run();
  };
  const currentStyles = editor.getAttributes("serviceTextStyle");
  const currentFontSize = currentStyles.fontSize || "16px";
  const symbols = ["©","®","™","§","¶","†","‡","•","×","÷","±","≈","≠","≤","≥","∞","√","∑","π","µ","Ω","Δ","α","β","γ","→","←","↔","↑","↓","✓","★","☆","♥","♦","♣","♠","€","$","£","¥","٪","°","‰","…","—","–","·","№","@","#","&","/","\\","()","[]","{}","«","»","“","”","‘","’"];

  return <div className="service-rich-editor">
    <div className="service-rich-editor-toolbar">
      <div className="service-rich-editor-toolbar-row">
        <button type="button" title="بازگشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().undo().run())} className={buttonStyle()}><IconUndo /></button>
        <button type="button" title="جلو" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().redo().run())} className={buttonStyle()}><IconRedo /></button>
        <span className="service-rich-editor-divider">|</span>
        <div className="relative">
          <button type="button" title="تیتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowHeading((v) => !v)} className={buttonStyle(!!headingLevel, "w-[48px]")}><IconHeading /><span className="mr-0.5 text-[9px]">⌄</span></button>
          {showHeading && <div className={menuStyle}>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading()} className="flex w-full cursor-pointer justify-between rounded-md border-0 bg-transparent px-[9px] py-2 text-xs text-slate-700 hover:bg-[#1E3A8A]/[0.075]">متن <span className="text-slate-500">Aa</span></button>
            {[1,2,3,4,5,6].map((n) => <button key={n} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading(n)} className={`flex w-full cursor-pointer justify-between rounded-md border-0 px-[9px] py-2 text-xs ${headingLevel === n ? "bg-[#1565C0]/[0.114] text-[#1565C0]" : "bg-transparent text-slate-700 hover:bg-[#1E3A8A]/[0.075]"}`}>تیتر {n}<span className="text-slate-500">H{n}</span></button>)}
          </div>}
        </div>
        <div className="relative">
          <button type="button" aria-label="اندازه فونت" title="اندازه فونت" onMouseDown={(e) => { e.preventDefault(); rememberSelection(); }} onClick={() => setShowFontSize((v) => !v)} className="flex h-9 w-[82px] items-center justify-between rounded-[8px] border border-[#1565C0]/[0.18] bg-[#F6F9FD] px-2.5 text-[12px] font-bold text-slate-700 outline-none transition-all hover:border-[#1565C0]/[0.405] focus:border-[#1565C0]/[0.6]">
            <span>{currentFontSize.replace("px", "")}px</span><span className="text-[9px] text-slate-700">⌄</span>
          </button>
          {showFontSize && <div className={menuStyle + " w-[96px]"}>
            {FONT_SIZES.map((size) => (
              <button key={size.value} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setStyle({ fontSize: size.value }); setShowFontSize(false); }} className={`flex w-full items-center justify-between rounded-md border-0 px-[9px] py-2 text-xs ${currentFontSize === size.value ? "bg-[#1565C0]/[0.114] text-[#1565C0]" : "bg-transparent text-slate-700 hover:bg-[#1E3A8A]/[0.075]"}`}>
                <span>{size.label}px</span><span className="text-[12px] text-slate-500">A</span>
              </button>
            ))}
          </div>}
        </div>
        <span className="service-rich-editor-divider">|</span>
        <button type="button" title="درشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBold().run())} className={buttonStyle(editor.isActive("bold"))}><IconBold /></button>
        <button type="button" title="کج" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleItalic().run())} className={buttonStyle(editor.isActive("italic"))}><IconItalic /></button>
        <button type="button" title="زیرخط" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleUnderline().run())} className={buttonStyle(editor.isActive("underline"))}><IconUnderline /></button>
        <button type="button" title="خط خورده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleStrike().run())} className={buttonStyle(editor.isActive("strike"))}><IconStrike /></button>
        <span className="service-rich-editor-divider">|</span>
        <div className="flex items-center gap-0.5"><button type="button" title="رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ color: textColor })} className={buttonStyle(false)}><span className="font-black leading-[1.1]" style={{ borderBottom: `3px solid ${textColor}` }}>A</span></button><input aria-label="رنگ متن" type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setStyle({ color: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
        <div className="flex items-center gap-0.5"><button type="button" title="هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ backgroundColor: highlightColor })} className={buttonStyle(false)}><span className="rounded-[2px] px-[3px] py-px font-black text-[#020617]" style={{ background: highlightColor }}>H</span></button><input aria-label="رنگ هایلایت" type="color" value={highlightColor} onChange={(e) => { setHighlightColor(e.target.value); setStyle({ backgroundColor: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
      </div>

      <div className="service-rich-editor-toolbar-row">
        <button type="button" title="راست‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "right" })} className={buttonStyle(parent.attrs.textAlign === "right")}><IconAlignRight /></button>
        <button type="button" title="وسط‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "center" })} className={buttonStyle(parent.attrs.textAlign === "center")}><IconAlignCenter /></button>
        <button type="button" title="چپ‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "left" })} className={buttonStyle(parent.attrs.textAlign === "left")}><IconAlignLeft /></button>
        <button type="button" title="تمام‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "justify" })} className={buttonStyle(parent.attrs.textAlign === "justify")}><IconAlignJustify /></button>
        <span className="service-rich-editor-divider">|</span>
        <button type="button" title="RTL - راست به چپ" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "rtl", textAlign: "right" })} className={buttonStyle(parent.attrs.textDirection === "rtl")}><IconRtl /></button>
        <button type="button" title="LTR - چپ به راست" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "ltr", textAlign: "left" })} className={buttonStyle(parent.attrs.textDirection === "ltr")}><IconLtr /></button>
        <span className="service-rich-editor-divider">|</span>
        <button type="button" title="کاهش تورفتگی" disabled={currentIndent === 0} onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(-1)} className={buttonStyle(false, currentIndent === 0 ? "opacity-35" : "")}><IconIndentOut /></button>
        <button type="button" title="افزایش تورفتگی" onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(1)} className={buttonStyle()}><IconIndentIn /></button>
      </div>

      <div className="service-rich-editor-toolbar-row">
        <button type="button" title="لیست نقطه‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBulletList().run())} className={buttonStyle(editor.isActive("bulletList"))}><IconList /></button>
        <button type="button" title="لیست شماره‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())} className={buttonStyle(editor.isActive("orderedList"))}><IconListOrdered /></button>
        <span className="service-rich-editor-divider">|</span>
        <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><IconQuote /></button>
        <button type="button" title="کد درون متن" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCode().run())} className={buttonStyle(editor.isActive("code"))}><IconCode /></button>
        <button type="button" title="Code — پنل HTML و تگ‌ها" onMouseDown={(e) => e.preventDefault()} onClick={() => onOpenCodePanel?.()} className={buttonStyle()}><span className="font-mono text-[9px] font-black">Code</span></button>
        <button type="button" title="افزودن تصویر از کتابخانه رسانه" onMouseDown={(e) => e.preventDefault()} onClick={() => onOpenMediaLibrary?.()} className={buttonStyle()}><IconImage /></button>
        <button type="button" title="لینک" onMouseDown={(e) => e.preventDefault()} onClick={openLinkEditor} className={buttonStyle(editor.isActive("link"))}><IconLink /></button>
        <button type="button" title="پاک کردن قالب‌بندی" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().unsetAllMarks().clearNodes().run())} className={buttonStyle()}><IconClear /></button>
        <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><IconMinus /></button>
        <span className="service-rich-editor-divider">|</span>
        <button type="button" title="ابزارهای بیشتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowMore((v) => !v)} className={buttonStyle(showMore)}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
      </div>
    </div>

    {showMore && <div className="service-rich-editor-extra-toolbar">
      <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">تنظیمات متن</span><div className="service-rich-editor-extra-buttons">
        <button type="button" title="حذف رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("color")} className={buttonStyle()}><span className="font-black underline decoration-current underline-offset-[3px]">A</span></button>
        <button type="button" title="حذف هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("backgroundColor")} className={buttonStyle()}><IconClear /></button>
        <button type="button" title="بالانویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSuperscript())} className={buttonStyle(editor.isActive("serviceSuperscript"))}><IconSup /></button>
        <button type="button" title="زیرنویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSubscript())} className={buttonStyle(editor.isActive("serviceSubscript"))}><IconSub /></button>
      </div></div>
      <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">بلوک‌ها</span><div className="service-rich-editor-extra-buttons">
        <button type="button" title="بلوک کد" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCodeBlock().run())} className={buttonStyle(editor.isActive("codeBlock"))}><IconCode /></button>
        <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><IconQuote /></button>
        <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><IconMinus /></button>
        <button type="button" title="More" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().insertContent({ type: "serviceMore" }).run())} className={buttonStyle(false, "w-[52px]")}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
      </div></div>
      <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">نمادها</span><div className="service-rich-editor-extra-buttons">
        <div className="relative"><button type="button" title="نمادهای ویژه" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowSymbols((v) => !v)} className={buttonStyle(showSymbols)}><IconSymbols /></button>
          {showSymbols && <div className={`${menuStyle} right-0 grid min-w-[288px] grid-cols-8 gap-[3px]`}>
            {symbols.map((symbol) => <button key={symbol} type="button" title={`درج ${symbol}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { editor.chain().focus().insertContent(symbol).run(); setShowSymbols(false); }} className="h-[30px] cursor-pointer rounded-[5px] border-0 bg-transparent text-[13px] text-[#334155] hover:bg-[#1E3A8A]/[0.075] hover:text-[#1565C0]">{symbol}</button>)}
          </div>}
        </div>
      </div></div>
    </div>}

    {showLink && <div className="service-rich-link-editor">
      <input type="url" dir="ltr" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") setShowLink(false); }} placeholder="https://example.com" autoFocus />
      <button type="button" onClick={applyLink}>اعمال لینک</button>
      <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setShowLink(false); }} className="service-rich-link-remove">حذف لینک</button>
      <button type="button" onClick={() => setShowLink(false)} className="service-rich-link-cancel">انصراف</button>
    </div>}
  </div>;
}

/* ─────────────────────────────────────────────
   CODE PANEL
───────────────────────────────────────────── */

function CodePanel({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const [sourceCode, setSourceCode] = useState(() => editor.getHTML());
  const insertIntoSource = (code: string) => setSourceCode((prev) => `${prev}${prev.trim() ? "\n" : ""}${code}`);
  const insertTag = (open: string, close: string) => insertIntoSource(`${open}${close}`);
  const applyHtml = () => {
    editor.commands.setContent(sourceCode, { emitUpdate: false });
    editor.commands.focus("end");
    onClose();
  };
  return <div className="border-b border-[#1565C0]/[0.15] bg-[#F1F5FB] px-8 py-5">
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div><div className="flex items-center gap-2"><span className="text-[#1565C0]"><IconCode /></span><h3 className="text-sm font-bold text-slate-800">Code / HTML</h3></div><p className="mt-1 text-[12px] leading-5 text-slate-500">این بخش فقط برای کنترل ساختار HTML است؛ متن عادی را با ادیتور بنویس. تگ‌ها اینجا وارد می‌شوند و تا وقتی «اعمال HTML» نزنی وارد محتوای مقاله نمی‌شوند.</p></div>
        <button type="button" onClick={onClose} title="بستن پنل" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-slate-700 hover:border-[#1565C0]/[0.33] hover:bg-[#1565C0]/[0.088] hover:text-[#1565C0]"><IconClose /></button>
      </div>
      <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-[#1E3A8A]/[0.18] bg-[#EEF3FA] p-3">
        <span className="ml-1 self-center text-[9px] font-bold text-slate-400">تگ‌های سریع</span>
        {HTML_TAGS.map(([label, open, close]) => <button key={label} type="button" onClick={() => insertTag(open, close)} className="cursor-pointer rounded-md border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] px-2.5 py-1.5 font-mono text-[12px] text-slate-700 transition-all hover:border-[#1565C0]/[0.405] hover:bg-[#1565C0]/[0.088] hover:text-[#1565C0]">{label}</button>)}
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {COMMON_SNIPPETS.map((item) => <button key={item.name} type="button" onClick={() => insertIntoSource(item.code)} className="cursor-pointer rounded-md border border-[#1565C0]/[0.21] bg-[#1565C0]/[0.062] px-3 py-1.5 font-mono text-[12px] text-[#1565C0]/[1] hover:bg-[#1565C0]/[0.114] hover:text-[#0D47A1]">+ {item.name}</button>)}
      </div>
      <textarea value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} spellCheck={false} placeholder="HTML محتوای مقاله..." rows={10} className="mb-3 min-h-[220px] w-full resize-y rounded-xl border border-[#1E3A8A]/[0.16] bg-[#F8FAFD] px-4 py-3 font-mono text-[12px] leading-6 text-left text-[#0F172A] outline-none focus:border-[#1565C0]/[0.48] focus:ring-2 focus:ring-[#1565C0]/[0.105]" dir="ltr" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2"><button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-[#1E3A8A]/[0.16] bg-[#1E3A8A]/[0.054] px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-[#1E3A8A]/[0.075] hover:text-slate-700">انصراف</button><button type="button" onClick={applyHtml} className="cursor-pointer rounded-lg border border-[#1565C0]/[0.48] bg-[#1565C0] px-5 py-2 text-[12px] font-black text-[#FFFFFF] shadow-[0_8px_24px_rgba(21,101,192,0.2)] hover:bg-[#0D47A1]">اعمال HTML</button></div>
      </div>
    </div>
  </div>;
}

const ADMIN_AUTHORS = [
  { id: "admin-1", name: "محمدرضا یوسفی" },
  { id: "admin-2", name: "علیرضا طباطبایی هاشمی" },
] as const;

type PostFormValues = {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  authorId: string;
};


function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#F6F9FD] px-3 text-right text-[11px] font-bold outline-none transition-all ${
          open
            ? "border-[#1565C0]/[0.555] shadow-[0_0_16px_rgba(21,101,192,0.08)]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/[0.255]"
        }`}
      >
        <span className="truncate text-slate-700">{selectedOption.label}</span>
        <span
          className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-[#1E3A8A]/[0.1] bg-[#1E3A8A]/[0.04] text-slate-500 transition-all duration-200 ${
            open ? "border-[#1565C0]/[0.255] bg-[#1565C0]/[0.075] text-[#1565C0]" : ""
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${
                    selected
                      ? "bg-[#1565C0]/[0.114] text-[#1565C0]"
                      : "text-slate-700 hover:bg-[#1E3A8A]/[0.075] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && (
                    <span className="mr-2 shrink-0 text-[#1565C0]">
                      <IconCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGINATION
───────────────────────────────────────────── */

function IconChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function getPaginationRange(currentPage: number, totalPages: number): (number | "...")[] {
  // تا ۴ صفحه، همه‌شون رو کامل نشون بده — نقطه‌گذاری فقط از
  // ۵ صفحه به بالا شروع می‌شه (مطابق همون رفتاری که توی فیدبک داریم).
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | "...")[] = [];
  const siblingCount = 1;

  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(totalPages - 1, currentPage + siblingCount);

  range.push(1);

  if (start > 2) {
    range.push("...");
  }

  for (let page = start; page <= end; page++) {
    range.push(page);
  }

  if (end < totalPages - 1) {
    range.push("...");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}

function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = getPaginationRange(currentPage, totalPages).reverse();

  return (
    <div dir="ltr" className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-500 transition-all hover:border-[#1565C0]/[0.405] hover:text-[#1565C0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#1E3A8A]/[0.14] disabled:hover:text-slate-500"
      >
        <IconChevronLeft />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[12px] font-black text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border text-[12px] font-black transition-all ${
              page === currentPage
                ? "border-[#1565C0] bg-[#1565C0] text-[#FFFFFF] shadow-[0_0_16px_rgba(21,101,192,0.545)]"
                : "border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-600 hover:border-[#1565C0]/[0.405] hover:text-[#1565C0]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-500 transition-all hover:border-[#1565C0]/[0.405] hover:text-[#1565C0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#1E3A8A]/[0.14] disabled:hover:text-slate-500"
      >
        <IconChevronRight />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */

export default function PostsAdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(["#ردیابی_تتر", "#بلاکچین"]);
  const [tagInput, setTagInput] = useState("");
  const [slug, setSlug] = useState("ponzi-tracking-case-2025");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [postType, setPostType] = useState<"normal" | "special">("normal");
  const [authorId, setAuthorId] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [savedAt, setSavedAt] = useState("۱۴:۳۲");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [coverUploaded, setCoverUploaded] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const mediaSelectionRef = useRef<{ from: number; to: number } | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [featuredMediaId, setFeaturedMediaId] = useState<string | null>(null);
  const [featuredAlt, setFeaturedAlt] = useState("");
  const mediaFileRef = useRef<HTMLInputElement>(null);
  const [codePanelOpen, setCodePanelOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  type PostRecord = {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: "draft" | "published";
    postType: "normal" | "special";
    categoryId: string;
    tags: string[];
    updatedAt: string;
    createdAt: string;
    authorId: string;
    readingTime: number;
    metaTitle: string;
    metaDescription: string;
    featuredImage: string | null;
    featuredImageAlt: string | null;
  };

  const [view, setView] = useState<"list" | "editor">("list");
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [authorFilter, setAuthorFilter] = useState<"all" | "admin-1" | "admin-2">("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { register, setValue, handleSubmit, reset: resetForm, formState: { errors } } = useForm<PostFormValues>({
    defaultValues: { title: "", slug: "", content: "", metaTitle: "", metaDescription: "", authorId: "" },
    mode: "onSubmit",
  });
  const titleRegister = register("title", { required: "عنوان پست الزامی است." });


  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1,2,3,4,5,6] } }),
      Underline,
      ServiceTextStyle,
      ServiceSup,
      ServiceSub,
      ServiceImage,
      ServiceParagraphStyle,
      ServiceMore,
      Placeholder.configure({ placeholder: "متن گزارش یا پرونده را اینجا بنویسید..." }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true, HTMLAttributes: { class: "text-[#1565C0] underline underline-offset-4" } }),
    ],
    content: INITIAL_CONTENT,
    editorProps: { attributes: { dir: "rtl", class: "service-rich-editor-content" } },
    onUpdate: ({ editor: next }) => {
      const html = next.getHTML();
      setContent(html);
      setValue("content", html, { shouldValidate: false });
    },
  });

  useEffect(() => {
    if (!title && content === INITIAL_CONTENT) return;
    const t = setTimeout(() => setSavedAt(new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })), 1200);
    return () => clearTimeout(t);
  }, [title, content]);

  useEffect(() => {
    const onEditImage = (event: Event) => {
      const pos = (event as CustomEvent<{ pos: number | null }>).detail?.pos;
      if (editor && typeof pos === "number") mediaSelectionRef.current = { from: pos, to: pos };
      setMediaLibraryOpen(true);
    };
    window.addEventListener("service-image-edit", onEditImage);
    return () => window.removeEventListener("service-image-edit", onEditImage);
  }, [editor]);

  const toggleCat = (id: string) => setSelectedCats((c) => c.includes(id) ? [] : [id]);
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || !tagInput.trim()) return;
    e.preventDefault();
    const t = tagInput.trim().startsWith("#") ? tagInput.trim() : `#${tagInput.trim()}`;
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };
  const removeTag = (tag: string) => setTags((prev) => prev.filter((x) => x !== tag));
  const openMediaLibraryForEditor = () => {
    if (editor) mediaSelectionRef.current = { from: editor.state.selection.from, to: editor.state.selection.to };
    setMediaLibraryOpen(true);
  };
  const insertMediaIntoEditor = (id: string) => {
    const item = mediaItems.find((m) => m.id === id);
    if (!item || !editor) return;
    const selection = mediaSelectionRef.current;
    if (selection && selection.from === selection.to) {
      const nodeAt = editor.state.doc.nodeAt(selection.from);
      if (nodeAt?.type.name === "serviceImage") {
        editor.chain().focus().setNodeSelection(selection.from).updateAttributes("serviceImage", { src: item.url, alt: item.alt, title: item.name }).run();
        mediaSelectionRef.current = null;
        setMediaLibraryOpen(false);
        return;
      }
    }
    editor.chain().focus();
    if (selection) editor.commands.setTextSelection(selection);
    (editor.commands as any).setServiceImage({ src: item.url, alt: item.alt, title: item.name, width: 100 });
    mediaSelectionRef.current = null;
    setMediaLibraryOpen(false);
  };

  const loadMedia = async () => {
    setMediaLoading(true);
    try {
      const response = await fetch("/api/media", { cache: "no-store" });
      if (!response.ok) throw new Error("خطا در دریافت رسانه‌ها");
      const data = await response.json();
      setMediaItems(Array.isArray(data) ? data : Array.isArray(data?.media) ? data.media : []);
    } catch (error) {
      console.error("loadMedia error:", error);
    } finally {
      setMediaLoading(false);
    }
  };

  const addMediaFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;

    try {
      const uploaded: MediaItem[] = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("alt", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
        const response = await fetch("/api/media", { method: "POST", body: formData });
        if (!response.ok) throw new Error("آپلود تصویر انجام نشد");
        const data = await response.json();
        uploaded.push(data?.media ?? data);
      }
      if (!uploaded.length) return;
      setMediaItems((prev) => [...uploaded, ...prev]);
      if (!featuredMediaId) {
        setFeaturedMediaId(uploaded[0].id);
        setFeaturedAlt(uploaded[0].alt || "");
        setCoverUploaded(true);
      }
      setMediaLibraryOpen(true);
    } catch (error) {
      console.error("addMediaFiles error:", error);
      alert("آپلود تصویر انجام نشد.");
    } finally {
      if (mediaFileRef.current) mediaFileRef.current.value = "";
    }
  };
  const updateMediaAlt = async (id: string, alt: string) => {
    setMediaItems((prev) => prev.map((item) => item.id === id ? { ...item, alt } : item));
    if (featuredMediaId === id) setFeaturedAlt(alt);
    try {
      await fetch(`/api/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt }),
      });
    } catch (error) {
      console.error("updateMediaAlt error:", error);
    }
  };

  const removeMedia = async (id: string) => {
    const target = mediaItems.find((item) => item.id === id);
    try {
      const response = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("حذف تصویر انجام نشد");
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
      if (target?.url && target.url.startsWith("blob:")) URL.revokeObjectURL(target.url);
      if (featuredMediaId === id) {
        const next = mediaItems.find((item) => item.id !== id);
        setFeaturedMediaId(next?.id || null);
        setFeaturedAlt(next?.alt || "");
      }
    } catch (error) {
      console.error("removeMedia error:", error);
      alert("حذف تصویر انجام نشد.");
    }
  };
  const chooseFeatured = (id: string) => {
    const item = mediaItems.find((m) => m.id === id);
    setFeaturedMediaId(id);
    setFeaturedAlt(item?.alt || "");
    setCoverUploaded(true);
  };
  const normalizePost = (item: any): PostRecord => ({
    id: String(item?._id ?? item?.id ?? ""),
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    content: item?.content ?? "",
    status: item?.status === "published" ? "published" : "draft",
    postType: item?.postType === "special" ? "special" : "normal",
    categoryId: CATEGORY_ID_ALIASES[item?.categoryId] ?? item?.categoryId ?? "",
    tags: Array.isArray(item?.tags) ? item.tags : [],
    updatedAt: item?.updatedAt ? String(item.updatedAt) : "",
    createdAt: item?.createdAt ? String(item.createdAt) : "",
    authorId: ADMIN_AUTHORS.find((author) => author.name === item?.author)?.id ?? item?.authorId ?? "",
    readingTime: Number(item?.readingTime ?? 0),
    metaTitle: item?.metaTitle ?? "",
    metaDescription: item?.metaDescription ?? "",
    featuredImage: item?.featuredImage ?? null,
    featuredImageAlt: item?.featuredImageAlt ?? null,
  });

  const loadPosts = async () => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const response = await fetch("/api/posts", { cache: "no-store" });
      if (!response.ok) throw new Error("خطا در دریافت پست‌ها");
      const data = await response.json();
      const items = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
      setPosts(items.map(normalizePost));
    } catch (error) {
      console.error(error);
      setPostsError("دریافت لیست پست‌ها انجام نشد.");
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
    void loadMedia();
  }, []);


  useEffect(() => {
    if (!editingPostId || !mediaItems.length) return;
    const post = posts.find((item) => item.id === editingPostId);
    if (!post?.featuredImage) return;
    const matchingMedia = mediaItems.find((item) => item.url === post.featuredImage);
    if (matchingMedia) {
      setFeaturedMediaId(matchingMedia.id);
      setFeaturedAlt(post.featuredImageAlt ?? matchingMedia.alt ?? "");
      setCoverUploaded(true);
    }
  }, [editingPostId, mediaItems, posts]);
  const persistPost = async (record: PostRecord, isEdit: boolean) => {
    const payload = {
      ...((isEdit ? record : (({ id: _id, ...rest }) => rest)(record)) as Record<string, unknown>),
      author: ADMIN_AUTHORS.find((author) => author.id === record.authorId)?.name ?? record.authorId,
      postType: record.postType,
      categoryId: record.categoryId,
      wordCount,
      featuredImage: featuredMediaId
        ? mediaItems.find((item) => item.id === featuredMediaId)?.url ?? null
        : null,
      featuredImageAlt: featuredAlt.trim() || null,
    };

    delete (payload as Record<string, unknown>).authorId;

    const response = await fetch(isEdit ? `/api/posts/${record.id}` : "/api/posts", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
if (!response.ok) {
  const errorData = await response.json().catch(() => null);
  if (response.status === 409) {
    throw new Error("DUPLICATE_SLUG");
  }
  throw new Error(errorData?.message || "ذخیره پست انجام نشد");
}
    const data = await response.json();
    return normalizePost(data?.post ?? data);
  };

  const resetEditor = () => {
    setEditingPostId(null);
    setTitle("");
    setContent("");
    setSelectedCats([]);
    setTags([]);
    setTagInput("");
    setSlug("");
    setMetaTitle("");
    setMetaDesc("");
    setStatus("draft");
    setPostType("normal");
    setAuthorId("");
    setCreatedAt("");
    setUpdatedAt("");
    setPublished(false);
    setFeaturedMediaId(null);
    setFeaturedAlt("");
    setMediaItems([]);
    setCoverUploaded(false);
    if (editor) editor.commands.setContent("");
    resetForm({ title: "", slug: "", content: "", metaTitle: "", metaDescription: "", authorId: "" });
  };

  const openNewPost = () => {
    resetEditor();
    setView("editor");
  };

  const openEditPost = (post: PostRecord) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setSlug(post.slug);
    setTags(post.tags);
    setMetaTitle(post.metaTitle);
    setMetaDesc(post.metaDescription);
    setStatus(post.status);
    setPostType(post.postType);
    setSelectedCats(post.categoryId ? [post.categoryId] : []);
    setAuthorId(post.authorId);
    setSelectedCats(post.categoryId ? [post.categoryId] : ["forensic-reports"]);
    setCreatedAt(post.createdAt);
    setUpdatedAt(post.updatedAt);
    setPublished(post.status === "published");
    const matchingMedia = post.featuredImage ? mediaItems.find((item) => item.url === post.featuredImage) : undefined;
    setFeaturedMediaId(matchingMedia?.id ?? null);
    setFeaturedAlt(post.featuredImageAlt ?? matchingMedia?.alt ?? "");
    setCoverUploaded(Boolean(post.featuredImage));
    if (editor) editor.commands.setContent(post.content, { emitUpdate: false });
    resetForm({ title: post.title, slug: post.slug, content: post.content, metaTitle: post.metaTitle, metaDescription: post.metaDescription, authorId: post.authorId });
    setView("editor");
  };

  const savePostToList = async (values?: PostFormValues) => {
    const now = new Date().toLocaleString("fa-IR", { dateStyle: "short", timeStyle: "short" });
    const isEdit = Boolean(editingPostId);
    const record: PostRecord = {
      id: editingPostId ?? `post-${Date.now()}`,
      title: (values?.title ?? title).trim(),
      slug: values?.slug?.trim() || normalizedSlug || `post-${Date.now()}`,
      content: editor?.getHTML() ?? content,
      status,
      postType,
      categoryId: selectedCats[0] || "",
      tags,
      updatedAt: now,
      createdAt: createdAt || now,
      authorId: values?.authorId || authorId,
      readingTime: readMin,
      metaTitle: values?.metaTitle?.trim() || metaTitle.trim(),
      metaDescription: values?.metaDescription?.trim() || metaDesc.trim(),
      featuredImage: featuredMediaId ? mediaItems.find((item) => item.id === featuredMediaId)?.url ?? null : null,
      featuredImageAlt: featuredAlt.trim() || null,
    };

    try {
      setPostsError(null);
      const saved = await persistPost(record, isEdit);
      setPosts((items) => isEdit ? items.map((item) => item.id === saved.id ? saved : item) : [saved, ...items]);
      setSavedAt(now);
      setUpdatedAt(now);
      setPublished(status === "published");
      setView("list");
      setEditingPostId(null);
    } catch (error) {
  console.error(error);

  if (error instanceof Error && error.message === "DUPLICATE_SLUG") {
    alert("این اسلاگ برای پست دیگری انتخاب شده است.");
    return; // setPostsError صدا زده نمیشه، بنر بالای جدول نمیاد
  }

  const message = error instanceof Error ? error.message : "ذخیره پست انجام نشد. دوباره تلاش کنید.";
  alert(message);
  setPostsError(message);
}
  };

  const onSubmit: SubmitHandler<PostFormValues> = async (values) => {
    if (!editor?.getText().trim()) {
      setValue("content", "", { shouldValidate: true });
      alert("محتوای پست را وارد کنید.");
      return;
    }
    if (!values.authorId) {
      alert("نویسنده پست را انتخاب کنید.");
      return;
    }
    if (!selectedCats[0]) {
      alert("دسته‌بندی پست را انتخاب کنید.");
      return;
    }
    setPublishing(true);
    await savePostToList(values);
    setPublishing(false);
  };

  const confirmDeletePost = async () => {
    if (!deletePostId) return;
    const id = deletePostId;
    try {
      setPostsError(null);
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("حذف پست انجام نشد");
      setPosts((items) => items.filter((item) => item.id !== id));
      setDeletePostId(null);
    } catch (error) {
      console.error(error);
      setPostsError("حذف پست انجام نشد. دوباره تلاش کنید.");
    }
  };

  const normalizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const wordCount = editor?.getText().split(/\s+/).filter(Boolean).length || 0;
  const readMin = Math.max(1, Math.round(wordCount / 180));
  const selectedAuthor = ADMIN_AUTHORS.find((a) => a.id === authorId);
  const activeFilterKey = statusFilter !== "all" ? statusFilter : authorFilter !== "all" ? authorFilter : "all";
  const filteredPosts = posts.filter((post) => {
    const q = search.trim().toLocaleLowerCase();
    if (
      q &&
      !post.title.toLocaleLowerCase().includes(q) &&
      !post.slug.toLocaleLowerCase().includes(q) &&
      !post.id.toLocaleLowerCase().includes(q)
    ) return false;
    if (statusFilter !== "all" && post.status !== statusFilter) return false;
    if (authorFilter !== "all" && post.authorId !== authorFilter) return false;
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, authorFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  useEffect(() => {
    setValue("title", title, { shouldValidate: false });
    setValue("slug", normalizedSlug, { shouldValidate: false });
    setValue("content", content, { shouldValidate: false });
    setValue("metaTitle", metaTitle, { shouldValidate: false });
    setValue("metaDescription", metaDesc, { shouldValidate: false });
    setValue("authorId", authorId, { shouldValidate: false });
  }, [title, normalizedSlug, content, metaTitle, metaDesc, authorId, setValue]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  return <div className="min-h-screen w-full bg-[#EEF3FA] text-slate-800">
    {view === "list" ? (
      <div className="services-page-main min-h-screen w-full bg-[#EEF3FA] box-border px-6 py-6 md:px-7" dir="rtl">
        <div className="w-full">
          <div className="services-header mb-5 flex items-center justify-between gap-4">
            <div>
               <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 7,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius:
                    "50%",
                  background:
                    "#1565C0",
                  boxShadow:
                    "0 0 7px rgba(21,101,192,0.9)",
                    
                }}
              />

              <span
                style={{
                  fontFamily:
                    "monospace",
                  fontSize:
                    "0.6rem",
                  color:
                    "rgba(21,101,192,0.77)",
                  letterSpacing:
                    "0.18em",
                }}
              >
                POST MANAGEMENT
              </span>
            </div>
              <h1 className="text-xl font-black text-[#0F172A]">مدیریت پست‌ها</h1>
              <p className="mt-1 text-xs text-slate-500">ایجاد، ویرایش، انتشار و حذف پست‌های سایت</p>
            </div>
            <button
              type="button"
              onClick={openNewPost}
              className="posts-add-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                borderRadius: 10,
                cursor: "pointer",
                background: "#1565C0",
                border: "1px solid rgba(21,101,192,0.77)",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 700,
                fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
                boxShadow: "0 0 20px rgba(21,101,192,0.395)",
                whiteSpace: "nowrap",
              }}
            >
              <IconPlus />
              افزودن پست جدید
            </button>
          </div>

          {/* Filters */}
          <div className="mb-4 overflow-visible rounded-2xl border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
            <div className="border-b border-[#1565C0]/[0.12] px-5 py-3.5">
              <span className="text-sm font-bold text-[#0F172A]">جستجو و فیلتر پست‌ها</span>
            </div>
            <div className="flex flex-col gap-2.5 px-5 py-3.5 sm:flex-row sm:flex-wrap sm:items-center" dir="rtl">
              <div className="relative w-full sm:min-w-[220px] sm:flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جستجو در عنوان، نامک یا شناسه..."
                  className="box-border h-10 w-full rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] px-3 text-right text-[11px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-500 focus:border-[#1565C0]/[0.555] focus:ring-[3px] focus:ring-[#1565C0]/[0.09]"
                />
              </div>

              <div className="w-full sm:w-[180px]">
                <CustomSelect
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as "all" | "draft" | "published")}
                  options={[
                    { value: "all", label: "همه وضعیت‌ها" },
                    { value: "published", label: "منتشر شده" },
                    { value: "draft", label: "پیش‌نویس" },
                  ]}
                />
              </div>

              <div className="w-full sm:w-[180px]">
                <CustomSelect
                  value={authorFilter}
                  onChange={(value) => setAuthorFilter(value as "all" | "admin-1" | "admin-2")}
                  options={[
                    { value: "all", label: "همه نویسندگان" },
                    { value: "admin-1", label: "ادمین ۱" },
                    { value: "admin-2", label: "ادمین ۲" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Posts table */}
          <div className="overflow-hidden rounded-2xl border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
            <div className="flex items-center justify-between gap-2 border-b border-[#1565C0]/[0.12] px-5 py-3.5">
              <span className="flex-1 text-sm font-bold text-[#0F172A]">فهرست پست‌ها</span>
              <span className="font-mono text-[11px] text-slate-400">{filteredPosts.length} مورد</span>
            </div>
            {postsError && <div className="mx-5 mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3 text-[12px] font-bold text-red-700"><span>{postsError}</span><button type="button" onClick={() => void loadPosts()} className="cursor-pointer rounded-md border border-red-500/[0.255] bg-red-500/[0.075] px-2.5 py-1.5 text-[9px] text-red-700">تلاش دوباره</button></div>}
            <div className="services-table-scroll overflow-x-auto">
              <table className="services-table w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A]/[0.08]">
                    {['عنوان پست','نوع','نویسنده','مطالعه','وضعیت','عملیات'].map((h, i) => <th key={h} className="whitespace-nowrap px-5 py-2.5 text-right font-mono text-[11px] font-semibold text-slate-400" style={{width: i === 5 ? 130 : 'auto'}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {postsLoading ? <tr><td colSpan={6} className="px-5 py-14 text-center text-xs text-slate-400">در حال دریافت پست‌ها...</td></tr> : filteredPosts.length === 0 ? <tr><td colSpan={6} className="px-5 py-14 text-center text-xs text-slate-400">{posts.length === 0 ? "هنوز پستی ثبت نشده است." : "پستی با این فیلترها پیدا نشد."}</td></tr> : paginatedPosts.map((post) => <tr key={post.id} className="border-b border-[#1E3A8A]/[0.06] transition-colors hover:bg-[#1565C0]/[0.043]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1565C0]/[0.18] bg-[#1565C0]/[0.075] text-[#1565C0]"><IconHeading /></div>
                        <div className="min-w-0 max-w-[250px]"><div className="truncate text-[0.8rem] font-bold text-slate-800" title={post.title}>{post.title}</div><div className="mt-0.5 truncate font-mono text-[9px] text-slate-400" title={post.id}>{post.id}</div></div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-md border px-2 py-1 text-[9px] font-bold ${post.postType === "special" ? "border-purple-500/[0.33] bg-purple-500/[0.114] text-purple-700" : "border-[#64748B]/[0.29] bg-[#64748B]/[0.09] text-slate-600"}`}>{post.postType === "special" ? "ویژه" : "معمولی"}</span></td>
                    <td className="px-5 py-4 text-[0.7rem] font-bold text-slate-700">{ADMIN_AUTHORS.find((a) => a.id === post.authorId)?.name || "—"}</td><td className="px-5 py-4 font-mono text-[12px] text-slate-500">{post.readingTime} دقیقه</td><td className="px-5 py-4"><span className={`inline-flex rounded-md border px-2 py-1 text-[9px] font-bold ${post.status === 'published' ? 'border-emerald-500/[0.33] bg-emerald-500/[0.101] text-emerald-600' : 'border-amber-500/[0.33] bg-amber-500/[0.088] text-amber-700'}`}>{post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditPost(post)}
                          title="ویرایش"
                          className="service-edit-button flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[7px] border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.047] text-slate-500 transition-all"
                        >
                          <IconEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletePostId(post.id)}
                          title="حذف"
                          className="service-delete-button flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[7px] border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.047] text-slate-500 transition-all"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          )}
        </div>
        {deletePostId && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/[0.39] p-5 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-5 text-right shadow-2xl" dir="rtl"><h3 className="text-sm font-black text-[#0F172A]">حذف پست</h3><p className="mt-2 text-xs leading-6 text-slate-700">آیا مطمئن هستید که این پست حذف شود؟ این عملیات قابل بازگشت نیست.</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => setDeletePostId(null)} className="flex-1 cursor-pointer rounded-lg border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] py-2 text-[12px] font-bold text-slate-700">انصراف</button><button type="button" onClick={confirmDeletePost} className="flex-1 cursor-pointer rounded-lg border border-red-500/[0.33] bg-red-500/[0.114] py-2 text-[12px] font-bold text-red-700">حذف پست</button></div></div></div>}
      </div>
    ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-screen w-full flex-col">
      <input type="hidden" {...register("content", { required: "محتوای پست الزامی است." })} />
      <div className="flex min-h-screen w-full flex-1 overflow-hidden">
        <main className="flex min-h-screen min-w-0 flex-[0_0_70%] flex-col overflow-y-auto border-l border-[#1565C0]/[0.12]">
          {editor && <EditorToolbar editor={editor} onOpenMediaLibrary={openMediaLibraryForEditor} onOpenCodePanel={() => setCodePanelOpen((v) => !v)} />}
          {codePanelOpen && editor && <CodePanel editor={editor} onClose={() => setCodePanelOpen(false)} />}

          <div className="px-12 pt-9">
            <textarea {...titleRegister} ref={(element) => { titleRegister.ref(element); titleRef.current = element; }} value={title} onChange={(e) => { setTitle(e.target.value); setValue("title", e.target.value, { shouldValidate: false }); e.target.style.height = "auto"; e.target.style.height = `${e.target.scrollHeight}px`; }} placeholder="عنوان گزارش یا پرونده را اینجا بنویسید..." rows={1} className="w-full resize-none overflow-hidden border-0 border-b-2 border-[#1565C0]/[0.15] bg-transparent pb-4 text-[clamp(1.5rem,2.6vw,2.1rem)] font-black leading-[1.35] text-[#0F172A] outline-none placeholder:text-slate-400 caret-[#1565C0] focus:border-[#1565C0]/[0.48]" />
          </div>

          {errors.title && <p className="px-12 pt-2 text-[0.65rem] font-bold text-red-600">{errors.title.message}</p>}

          {(title || slug) && <div className="flex items-center gap-1.5 px-12 pt-2"><span className="font-mono text-[0.64rem] text-slate-400">parahoor.io/blog/</span><span className="font-mono text-[0.64rem] text-[#1565C0]/[0.65]">{normalizedSlug || "post-url-slug"}</span><button type="button" className="cursor-pointer border-0 bg-transparent font-mono text-[0.6rem] text-[#1565C0]/[0.65] hover:text-[#1565C0]">ویرایش</button></div>}

          <div className="flex flex-1 flex-col px-12 pb-16 pt-7">
            <EditorContent editor={editor} className="w-full" />
            <div className="mt-8 flex items-center justify-between border-t border-[#1E3A8A]/[0.08] pt-4"><div className="flex items-center gap-4"><span className="font-mono text-[12px] text-slate-400">{wordCount} کلمه</span><span className="font-mono text-[12px] text-slate-400">زمان مطالعه: {readMin} دقیقه</span></div><div className="flex items-center gap-3"><span className="font-mono text-[12px] text-slate-400">HTML / Tiptap</span>{errors.content && <span className="text-[0.62rem] font-bold text-red-600">{errors.content.message}</span>}</div></div>
          </div>
        </main>

        <aside className="flex min-h-screen flex-[0_0_30%] flex-col gap-3.5 overflow-y-auto bg-[#EEF3FA] p-4">
          <SideCard title="انتشار" icon={<IconEye />}>
            <div className="flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#1E3A8A]/[0.18] bg-[#F1F5FB] p-1">
                <button type="button" onClick={() => { setStatus("draft"); setPublished(false); }} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[0.76rem] font-bold transition-all ${status === "draft" ? "border-amber-500/[0.555] bg-amber-500/[0.14] text-amber-700" : "border-transparent bg-transparent text-slate-500 hover:text-slate-800"}`}>پیش‌نویس</button>
                <button type="button" onClick={() => setStatus("published")} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[0.76rem] font-bold transition-all ${status === "published" ? "border-emerald-500/[0.555] bg-emerald-500/[0.14] text-emerald-700" : "border-transparent bg-transparent text-slate-500 hover:text-slate-800"}`}>انتشار</button>
              </div>
                            <div className="rounded-xl border border-[#1E3A8A]/[0.18] bg-[#F1F5FB] p-2">
                <p className="mb-2 px-1 font-mono text-[0.62rem] tracking-widest text-slate-400">نویسنده پست</p>
                <div className="grid grid-cols-2 gap-2">
                  {ADMIN_AUTHORS.map((author) => <button key={author.id} type="button" onClick={() => { setAuthorId(author.id); setValue("authorId", author.id, { shouldValidate: true }); }} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${authorId === author.id ? "border-[#1565C0]/[0.555] bg-[#1565C0]/[0.14] text-[#1565C0]" : "border-transparent bg-transparent text-slate-500 hover:text-slate-800"}`}>{author.name}</button>)}
                </div>
              </div>
              <div className="rounded-xl border border-[#1E3A8A]/[0.18] bg-[#F1F5FB] p-2">
                <p className="mb-2 px-1 font-mono text-[0.62rem] tracking-widest text-slate-400">نوع پست</p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setPostType("normal")} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${postType === "normal" ? "border-[#64748B]/[0.47] bg-[#64748B]/[0.132] text-slate-800" : "border-transparent bg-transparent text-slate-500 hover:text-slate-800"}`}>معمولی</button>
                  <button type="button" onClick={() => setPostType("special")} className={`rounded-lg border px-3 py-2.5 text-[0.72rem] font-bold transition-all ${postType === "special" ? "border-purple-500/[0.555] bg-purple-500/[0.14] text-purple-700" : "border-transparent bg-transparent text-slate-500 hover:text-slate-800"}`}>ویژه</button>
                </div>
              </div>
              {!authorId && <p className="-mt-1 px-1 text-[0.6rem] font-bold text-red-600">انتخاب نویسنده الزامی است.</p>}
              <div className="grid grid-cols-2 gap-2 text-[0.62rem] font-medium text-slate-600">
                <div className="rounded-lg border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 px-2.5 py-2">ایجاد: {createdAt || "پس از ذخیره"}</div>
                <div className="rounded-lg border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 px-2.5 py-2">ویرایش: {updatedAt || "هنوز ذخیره نشده"}</div>
              </div>
              <div className="rounded-lg border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 px-2.5 py-2 text-[0.64rem] text-slate-400">نویسنده فعلی: <span className="font-bold text-slate-700">{selectedAuthor?.name || "انتخاب نشده"}</span> · زمان مطالعه: <span className="font-bold text-slate-700">{readMin} دقیقه</span></div>
<button type="submit" disabled={publishing} className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-[#1565C0]/[0.555] bg-[#1565C0]/[0.14] py-2.5 text-[0.82rem] font-bold text-[#1565C0] shadow-[0_0_18px_rgba(21,101,192,0.11)] transition-all hover:border-[#1565C0]/[0.6] hover:bg-[#1565C0]/[0.218] disabled:cursor-not-allowed disabled:opacity-50">{publishing ? "در حال ذخیره تغییرات..." : "تأیید و ذخیره تغییرات"}</button>
              <div className="flex items-center gap-1.5 rounded-lg border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 px-2.5 py-2"><span className={published ? "text-[0.62rem] text-emerald-600" : "text-[0.62rem] text-amber-700"}>●</span><span className="font-mono text-[0.66rem] text-slate-400">آخرین ذخیره: {savedAt}</span></div>
            </div>
          </SideCard>

          <SideCard title="دسته‌بندی و برچسب‌ها" icon={<IconTag />} accentColor="#7C3AED">
            <div className="flex flex-col gap-3.5"><div><p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-widest text-slate-600">CATEGORIES</p><div className="flex flex-col gap-1.5">{CATS.map(({ id, label }) => { const checked = selectedCats.includes(id); return <div key={id} className="flex items-center gap-2.5"><button type="button" onClick={() => toggleCat(id)} className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] ${checked ? "border-[1.5px] border-[#1565C0] bg-[#1565C0]/[0.166]" : "border-[1.5px] border-[#1E3A8A]/[0.3] bg-transparent"}`}>{checked && <IconCheck />}</button><button type="button" onClick={() => toggleCat(id)} className={`border-0 bg-transparent p-0 text-right text-[0.8rem] ${checked ? "text-slate-800" : "text-slate-500"}`}>{label}</button></div>; })}</div></div>
              <div><p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-widest text-slate-600">TAGS</p><div className="mb-2 flex flex-wrap gap-1.5">{tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-md border border-purple-500/[0.405] bg-purple-500/[0.14] px-2 py-[3px] font-mono text-[0.7rem] text-purple-600">{t}<button type="button" onClick={() => removeTag(t)} className="flex cursor-pointer border-0 bg-transparent p-0 text-purple-600/[0.7] hover:text-red-600"><IconX /></button></span>)}</div><input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="مثلاً #ردیابی_تتر — Enter برای افزودن" className={inputClass} /></div>
            </div>
          </SideCard>

          <SideCard title="پرونده‌های چندرسانه‌ای" icon={<IconImage />} accentColor="#0284C7">
            <input ref={mediaFileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addMediaFiles(e.target.files); e.currentTarget.value = ""; }} />
            <div className="flex flex-col gap-2.5">
              <button type="button" onClick={() => mediaFileRef.current?.click()} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#1565C0]/[0.33] bg-[#1565C0]/[0.075] px-3 py-2.5 text-[0.76rem] font-bold text-[#1565C0] transition-colors hover:bg-[#1565C0]/[0.14]"><IconUpload /> افزودن پرونده چندرسانه‌ای</button>
              <button type="button" onClick={openMediaLibraryForEditor} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#1E3A8A]/[0.18] bg-[#1E3A8A]/[0.054] px-3 py-2 text-[0.68rem] text-slate-700 hover:bg-[#1E3A8A]/[0.061] hover:text-slate-700"><span>کتابخانه رسانه</span><span className="font-mono text-[#1565C0]/[0.9]">{mediaItems.length} فایل</span></button>
              {mediaItems.length === 0 && <p className="text-center text-[0.62rem] leading-5 text-slate-400">تصاویرت را اینجا اضافه کن تا برای هر عکس متن جایگزین و تصویر شاخص را مدیریت کنی.</p>}
              {mediaItems.length > 0 && <div className="grid grid-cols-3 gap-1.5">{mediaItems.slice(0, 6).map((item) => <button key={item.id} type="button" onClick={() => chooseFeatured(item.id)} title={item.alt || item.name} className={`relative aspect-square overflow-hidden rounded-md border ${featuredMediaId === item.id ? "border-amber-500/[0.6]" : "border-[#1E3A8A]/[0.18]"}`}><img src={item.url} alt={item.alt} className="h-full w-full object-cover" />{featuredMediaId === item.id && <span className="absolute right-1 top-1 rounded bg-amber-400 px-1 py-0.5 text-[8px] font-black text-[#0F172A]">شاخص</span>}</button>)}</div>}
            </div>
          </SideCard>

          <SideCard title="تصویر شاخص" icon={<IconImage />} accentColor="#B45309">
            {featuredMediaId ? <div className="flex flex-col gap-2.5">
              {(() => { const item = mediaItems.find((m) => m.id === featuredMediaId); return item ? <><div className="relative overflow-hidden rounded-lg border border-amber-500/[0.33] bg-[#EEF3FA]"><img src={item.url} alt={featuredAlt} className="aspect-[16/9] w-full object-cover" /><span className="absolute right-2 top-2 rounded-md bg-[#FFFFFF]/85 px-2 py-1 text-[9px] font-bold text-amber-700">تصویر شاخص</span></div><F label="متن جایگزین تصویر شاخص" hint="برای دسترس‌پذیری و سئو"><input value={featuredAlt} onChange={(e) => updateMediaAlt(item.id, e.target.value)} placeholder="توضیح دقیق و کوتاه تصویر" className={inputClass} /></F><button type="button" onClick={openMediaLibraryForEditor} className="w-full cursor-pointer rounded-lg border border-[#1E3A8A]/[0.14] bg-transparent py-2 text-[0.68rem] text-slate-700 hover:bg-[#1E3A8A]/[0.047] hover:text-slate-700">تغییر تصویر شاخص</button></> : null; })()}
            </div> : <div className="flex flex-col gap-2.5">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { addMediaFiles(e.target.files); e.currentTarget.value = ""; }} />
              <button type="button" onClick={() => { if (mediaItems.length) setMediaLibraryOpen(true); else mediaFileRef.current?.click(); }} onMouseEnter={() => setUploadHover(true)} onMouseLeave={() => setUploadHover(false)} className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-[10px] border p-[22px_12px] transition-all ${uploadHover ? "border-[1.5px] border-dashed border-amber-500/[0.6] bg-amber-500/[0.062]" : "border-[1.5px] border-dashed border-amber-500/[0.33] bg-[#1E3A8A]/[0.019]"}`}><span className="text-amber-700/[0.7]"><IconUpload /></span><span className="text-center text-[0.76rem] text-amber-700/[0.75]">انتخاب از پرونده‌های چندرسانه‌ای</span><span className="text-center font-mono text-[0.62rem] font-medium text-slate-600">JPG/PNG/WEBP</span></button>
            </div>}
          </SideCard>

          <SideCard title="تنظیمات سئو" icon={<IconGlobe />} accentColor="#059669">
            <div className="flex flex-col gap-3">
              <F label="نامک (URL Slug)" hint="فقط حروف انگلیسی، اعداد و خط تیره"><input {...register("slug", { required: "نامک الزامی است." })} value={slug} maxLength={100} onChange={(e) => { const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"); setSlug(value); setValue("slug", value, { shouldValidate: false }); }} placeholder="post-url-slug" className={`${inputClass} font-mono text-[0.76rem]`} />{errors.slug && <p className="mt-1 text-[0.6rem] font-bold text-red-600">{errors.slug.message}</p>}</F>
              <F label="عنوان سئو (Meta Title)" hint={`${metaTitle.length}/60 — بهتر است زیر 60 کاراکتر باشد`}><input {...register("metaTitle", { required: "عنوان سئو الزامی است." })} value={metaTitle} maxLength={60} onChange={(e) => { setMetaTitle(e.target.value); setValue("metaTitle", e.target.value, { shouldValidate: false }); }} placeholder="عنوان صفحه برای موتورهای جستجو" className={inputClass} /><div className="h-1 w-full overflow-hidden rounded-full bg-[#1E3A8A]/[0.061]"><div className={`h-full transition-all ${metaTitle.length > 55 ? "bg-red-500" : metaTitle.length > 45 ? "bg-amber-400" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, metaTitle.length / 60 * 100)}%` }} /></div>{errors.metaTitle && <p className="mt-1 text-[0.6rem] font-bold text-red-600">{errors.metaTitle.message}</p>}</F>
              <F label="توضیحات متا (Meta Description)" hint={`${metaDesc.length}/160 — حدود 120 تا 160 کاراکتر مناسب است`}><textarea {...register("metaDescription", { required: "توضیحات متا الزامی است." })} value={metaDesc} maxLength={160} onChange={(e) => { setMetaDesc(e.target.value); setValue("metaDescription", e.target.value, { shouldValidate: false }); }} placeholder="توضیح کوتاه و جذاب برای نتایج جستجو..." rows={4} className={`${inputClass} resize-none leading-6`} />{errors.metaDescription && <p className="mt-1 text-[0.6rem] font-bold text-red-600">{errors.metaDescription.message}</p>}<div className="h-1 w-full overflow-hidden rounded-full bg-[#1E3A8A]/[0.061]"><div className={`h-full transition-all ${metaDesc.length > 150 ? "bg-red-500" : metaDesc.length > 110 ? "bg-emerald-500" : "bg-amber-400"}`} style={{ width: `${Math.min(100, metaDesc.length / 160 * 100)}%` }} /></div></F>
            </div>
          </SideCard>

          {mediaLibraryOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/[0.455] p-5 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setMediaLibraryOpen(false); }}>
            <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#1565C0]/[0.21] bg-[#F5F8FD] shadow-[0_30px_100px_rgba(15,23,42,0.26)]">
              <div className="flex items-center justify-between border-b border-[#1E3A8A]/[0.18] px-5 py-4"><div><h3 className="text-sm font-black text-[#0F172A]">پرونده‌های چندرسانه‌ای</h3><p className="mt-1 text-[0.65rem] text-slate-500">هر عکس متن جایگزین مستقل دارد و می‌توانی یکی را به‌عنوان تصویر شاخص انتخاب کنی.</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => mediaFileRef.current?.click()} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#1565C0]/[0.33] bg-[#1565C0]/[0.075] px-3 py-2 text-[0.68rem] font-bold text-[#1565C0] hover:bg-[#1565C0]/[0.14]"><IconUpload /> افزودن عکس</button><button type="button" onClick={() => setMediaLibraryOpen(false)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#1E3A8A]/[0.14] bg-transparent text-slate-700 hover:bg-[#1E3A8A]/[0.061] hover:text-slate-800"><IconClose /></button></div></div>
              <div className="overflow-y-auto p-5">
                {mediaItems.length === 0 ? <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#1E3A8A]/[0.16] bg-[#1E3A8A]/[0.019]"><span className="text-[#1565C0]/[0.7]"><IconImage /></span><p className="text-sm font-bold text-slate-700">هنوز عکسی در کتابخانه نیست</p><button type="button" onClick={() => mediaFileRef.current?.click()} className="cursor-pointer rounded-lg bg-[#1565C0] px-4 py-2 text-[0.7rem] font-black text-[#FFFFFF]">افزودن عکس</button></div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {mediaItems.map((item) => <div key={item.id} className={`overflow-hidden rounded-xl border bg-[#EEF3FA] ${featuredMediaId === item.id ? "border-amber-500/[0.6]" : "border-[#1E3A8A]/[0.14]"}`}>
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-200"><img src={item.url} alt={item.alt} className="h-full w-full object-cover" />{featuredMediaId === item.id && <span className="absolute right-2 top-2 rounded-md bg-amber-400 px-2 py-1 text-[9px] font-black text-[#0F172A]">تصویر شاخص</span>}</div>
                    <div className="flex flex-col gap-2.5 p-3"><div className="flex items-center justify-between gap-2"><span className="truncate font-mono text-[0.62rem] text-slate-500" title={item.name}>{item.name}</span><button type="button" onClick={() => removeMedia(item.id)} className="shrink-0 cursor-pointer border-0 bg-transparent text-[0.62rem] text-red-600/[0.8] hover:text-red-700">حذف</button></div><F label="متن جایگزین (Alt Text)" hint="برای هر عکس جداگانه تنظیم می‌شود"><input value={item.alt} onChange={(e) => updateMediaAlt(item.id, e.target.value)} placeholder="مثلاً تصویر نمودار تراکنش‌ها" className={inputClass} /></F><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => insertMediaIntoEditor(item.id)} className="cursor-pointer rounded-lg border border-[#1565C0]/[0.33] bg-[#1565C0]/[0.088] py-2 text-[0.68rem] font-bold text-[#1565C0] hover:bg-[#1565C0]/[0.153]">درج در متن</button><button type="button" onClick={() => chooseFeatured(item.id)} className={`cursor-pointer rounded-lg py-2 text-[0.68rem] font-bold ${featuredMediaId === item.id ? "border border-amber-500/[0.555] bg-amber-500/[0.114] text-amber-700" : "border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-slate-700 hover:bg-[#1E3A8A]/[0.061] hover:text-slate-700"}`}>{featuredMediaId === item.id ? "✓ تصویر شاخص" : "انتخاب به‌عنوان شاخص"}</button></div></div>
                  </div>)}
                </div>}
              </div>
            </div>
          </div>}
        </aside>
      </div>
    </form>
    )}

    <style jsx global>{`
      html, body { min-height: 100%; background: #EEF3FA; }
      body { margin: 0; }
      .service-rich-editor { width: 100%; border: 1px solid rgba(30,58,138,0.128); border-radius: 10px; overflow: visible; background: #F3F7FC; }
      .service-rich-editor-toolbar { display:flex; flex-direction:column; align-items:stretch; gap:5px; padding:7px 8px; background:rgba(30,58,138,0.065); border-bottom:1px solid rgba(30,58,138,0.114); position:sticky; top:0; z-index:30; backdrop-filter:blur(16px); }
      .service-rich-editor-toolbar-row { display:flex; align-items:center; gap:3px; min-height:32px; flex-wrap:wrap; }
      .service-rich-editor-divider { color:#74839B; font-size:16px; line-height:1; margin:0 7px; user-select:none; }
      .service-rich-editor-extra-toolbar { display:flex; flex-direction:column; align-items:stretch; gap:7px; padding:8px; background:rgba(21,101,192,0.047); border-bottom:1px solid rgba(30,58,138,0.114); }
      .service-rich-editor-extra-group { display:flex; align-items:center; gap:6px; padding:3px 6px; border:1px solid rgba(30,58,138,0.107); border-radius:8px; background:rgba(30,58,138,0.055); }
      .service-rich-editor-extra-label { color:#52627A; font-size:10px; font-weight:800; white-space:nowrap; }
      .service-rich-editor-extra-buttons { display:flex; align-items:center; gap:2px; }
      .service-rich-editor-content { min-height: calc(100vh - 190px); padding: 28px 4px 60px; outline:none; color:#0F172A; font-size:16px; line-height:2.15; direction:rtl; text-align:right; caret-color:#1565C0; }
      .service-rich-editor-content p { margin:0 0 1.25rem; color:#475569; }
      .service-rich-editor-content [style*="font-size"] { line-height: 1.8; }
      .service-rich-editor-content h1 { margin:2rem 0 1rem; color:#0F172A; font-size:2rem; line-height:1.5; font-weight:900; }
      .service-rich-editor-content h2 { margin:2rem 0 .8rem; color:#0F172A; font-size:1.35rem; line-height:1.6; font-weight:800; border-right:3px solid rgba(21,101,192,0.695); padding-right:12px; }
      .service-rich-editor-content .heading-with-accent { border-right:3px solid rgba(21,101,192,0.695); padding-right:12px; }
      .service-rich-editor-content h3 { margin:1.5rem 0 .7rem; color:#334155; font-size:1.1rem; font-weight:800; }
      .service-rich-editor-content h4 { margin:1.3rem 0 .6rem; color:#334155; font-size:1rem; font-weight:800; }
      .service-rich-editor-content h5 { margin:1.1rem 0 .5rem; color:#334155; font-size:.92rem; font-weight:800; }
      .service-rich-editor-content h6 { margin:1rem 0 .5rem; color:#475569; font-size:.84rem; font-weight:800; }
      .service-rich-editor-content strong { color:#0F172A; font-weight:800; }
      .service-rich-editor-content em { color:#4F46E5; }
      .service-rich-editor-content u { text-decoration-color:#1565C0; text-underline-offset:4px; }
      .service-rich-editor-content ul, .service-rich-editor-content ol { padding-right:2rem; padding-left:0; margin:1rem 0 1.5rem; direction:rtl; }
      .service-rich-editor-content ul { list-style-type:disc; }
      .service-rich-editor-content ol { list-style-type:decimal; }
      .service-rich-editor-content li { display:list-item; margin:.35rem 0; padding-right:.25rem; color:#334155; }
      .service-rich-editor-content li::marker { color:#1565C0; font-size:.95em; font-weight:800; }
      .service-rich-editor-content blockquote { border-right:3px solid rgba(21,101,192,0.545); border-left:0; margin:1.5rem 0; padding:.8rem 1rem; background:rgba(21,101,192,0.058); color:#475569; border-radius:.5rem; }
      .service-rich-editor-content pre { direction:ltr; text-align:left; margin:1.5rem 0; padding:1rem 1.1rem; overflow-x:auto; border-radius:.75rem; background:#F8FAFD; border:1px solid rgba(21,101,192,0.17); box-shadow:0 20px 50px rgba(15,23,42,0.1); }
      .service-rich-editor-content pre code { background:transparent; border:0; padding:0; color:#0D47A1; font-family:"JetBrains Mono","Fira Code",monospace; font-size:.78rem; line-height:1.8; }
      .service-rich-editor-content code { direction:ltr; color:#0D47A1; background:rgba(21,101,192,0.11); border:1px solid rgba(21,101,192,0.14); border-radius:5px; padding:2px 5px; font-family:monospace; font-size:.85em; }
      .service-rich-editor-content a { color:#1565C0; text-decoration:underline; text-underline-offset:4px; }
       .service-rich-editor-content .service-editor-image { display:block; max-width:100%; height:auto; margin:0; border-radius:.75rem; border:1px solid rgba(21,101,192,0.17); object-fit:contain; }
      .service-image-node-wrapper { display:flex; justify-content:center; width:100%; margin:1.5rem 0; }
      .service-image-node { position:relative; max-width:100%; margin:0 auto; line-height:0; }
      .service-image-node img { display:block; width:100%; max-width:100%; height:auto; border-radius:.75rem; border:1px solid rgba(21,101,192,0.17); object-fit:contain; cursor:pointer; user-select:none; }
      .service-image-node.is-selected img { border-color:rgba(21,101,192,0.9); box-shadow:0 0 0 2px rgba(21,101,192,0.17); }
      .service-image-actions { position:absolute; right:8px; top:8px; display:flex; align-items:center; gap:6px; padding:4px; border:1px solid rgba(21,101,192,0.29); border-radius:8px; background:rgba(255,255,255,0.92); backdrop-filter:blur(8px); z-index:5; }
      .service-image-actions button { border:1px solid rgba(21,101,192,0.29); border-radius:6px; background:rgba(21,101,192,0.125); color:#0D47A1; padding:5px 8px; font-size:10px; font-weight:800; cursor:pointer; }
      .service-image-actions button:hover { background:rgba(21,101,192,0.23); color:#0D47A1; }
      .service-image-actions span { color:#52627A; font:700 9px ui-monospace,monospace; padding:0 4px; }
      .service-image-resize-handle { position:absolute; top:50%; width:9px; height:48px; transform:translateY(-50%); border:1px solid rgba(21,101,192,0.845); border-radius:5px; background:#FFFFFF; box-shadow:0 0 0 2px rgba(21,101,192,0.14); cursor:ew-resize; z-index:6; }
      .service-image-resize-left { left:-5px; }
      .service-image-resize-right { right:-5px; }
      .service-rich-editor-content hr { margin:2rem 0; border:0; border-top:1px solid rgba(30,58,138,0.128); }
      .service-rich-editor-content [data-indent="1"] { margin-right:2em; }
      .service-rich-editor-content [data-indent="2"] { margin-right:4em; }
      .service-rich-editor-content [data-indent="3"] { margin-right:6em; }
      .service-rich-editor-content [data-indent="4"] { margin-right:8em; }
      .service-rich-editor-content [data-indent="5"] { margin-right:10em; }
      .service-rich-editor-content [data-indent="6"] { margin-right:12em; }
      .service-rich-editor-content [data-indent="7"] { margin-right:14em; }
      .service-rich-editor-content [data-indent="8"] { margin-right:16em; }
      .service-rich-editor-content [dir="ltr"] { direction:ltr; text-align:left; }
      .service-more-marker { display:flex; align-items:center; gap:10px; margin:18px 0; color:#52627A; font-size:10px; font-weight:800; text-align:center; }
      .service-more-marker::before, .service-more-marker::after { content:""; flex:1; height:1px; background:rgba(100,116,139,0.286); }
      .service-rich-link-editor { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:8px; background:rgba(21,101,192,0.073); border-bottom:1px solid rgba(30,58,138,0.114); }
      .service-rich-link-editor input { flex:1 1 260px; min-width:180px; height:32px; padding:0 10px; border-radius:7px; border:1px solid rgba(30,58,138,0.156); outline:none; background:#F6F9FD; color:#0F172A; font-size:12px; }
      .service-rich-link-editor button { height:32px; padding:0 10px; border-radius:7px; border:1px solid rgba(30,58,138,0.142); background:rgba(30,58,138,0.086); color:#334155; cursor:pointer; font-size:11px; font-weight:700; }
      .service-rich-link-editor button:hover { background:rgba(21,101,192,0.14); color:#1565C0; }
      .service-rich-link-editor .service-rich-link-remove { color:#DC2626; }
      .service-rich-link-editor .service-rich-link-cancel { color:#475569; }
      .service-rich-editor-content p.is-editor-empty:first-child::before { content:attr(data-placeholder); float:right; height:0; color:#9AA7BA; pointer-events:none; }
      .service-rich-editor-content sup { font-size:.72em; line-height:0; vertical-align:super; color:#0D47A1; }
      .service-rich-editor-content sub { font-size:.72em; line-height:0; vertical-align:sub; color:#4F46E5; }
      textarea::placeholder, input::placeholder { color:#9AA7BA; }

      /* Responsive layout — editor */
      @media (max-width: 1100px) {
        form > div {
          flex-direction: column !important;
          overflow: visible !important;
        }

        form > div > main,
        form > div > aside {
          flex: 0 0 auto !important;
          width: 100% !important;
          min-width: 0 !important;
        }

        form > div > main {
          min-height: auto !important;
          overflow: visible !important;
          border-left: 0 !important;
          border-bottom: 1px solid rgba(21,101,192,0.11);
        }

        form > div > aside {
          min-height: auto !important;
          overflow: visible !important;
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
        }

        form > div > aside > div:not(.fixed) {
          min-width: 0;
        }

        form > div > aside > div:not(.fixed):first-child {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 760px) {
        .services-page-main {
          padding: 20px 14px !important;
        }

        .services-header {
          flex-direction: column !important;
          gap: 16px !important;
        }

        .services-header > button {
          width: 100%;
          justify-content: center;
        }

        .post-filters {
          justify-content: flex-start !important;
        }

        .posts-add-button {
          width: 100% !important;
        }

        form > div > main {
          width: 100% !important;
        }

        form > div > aside {
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          padding: 12px !important;
        }

        form > div > aside > div:not(.fixed) {
          width: 100%;
        }

        .service-rich-editor-toolbar {
          position: sticky;
          top: 0;
          padding: 6px;
        }

        .service-rich-editor-toolbar-row {
          gap: 2px;
        }

        .service-rich-editor-divider {
          margin: 0 3px;
        }

        .service-rich-editor-extra-group {
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .service-rich-link-editor input {
          flex-basis: 100%;
          min-width: 0;
        }

        form > div > main > div:has(> textarea),
        form > div > main > div:has(.service-rich-editor-content),
        form > div > main > div:has(> span.font-mono) {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        .service-rich-editor-content {
          min-height: 320px;
          padding: 20px 2px 40px;
        }

        .service-rich-editor-content h1 {
          font-size: 1.55rem;
        }

        .service-rich-editor-content h2 {
          font-size: 1.2rem;
        }

        .service-image-actions {
          right: 5px;
          top: 5px;
          max-width: calc(100% - 10px);
        }

        .service-image-actions button {
          padding: 4px 6px;
        }

        .service-rich-link-editor {
          align-items: stretch;
        }

        .service-rich-link-editor button {
          flex: 1 1 auto;
        }

        form > div > aside .grid.grid-cols-2 {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .services-page-main {
          padding: 16px 10px !important;
        }

        .post-filters {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }

        .service-rich-editor-toolbar-row > button {
          width: 32px !important;
        }

        .service-rich-editor-toolbar-row > div > button {
          max-width: 72px;
        }

        .service-rich-editor-content {
          font-size: 15px;
          line-height: 2;
        }

        .service-rich-editor-content pre {
          margin-left: -2px;
          margin-right: -2px;
          padding: 0.8rem;
        }

        .service-rich-editor-content [data-indent="5"],
        .service-rich-editor-content [data-indent="6"],
        .service-rich-editor-content [data-indent="7"],
        .service-rich-editor-content [data-indent="8"] {
          margin-right: 1.5em;
        }

        form > div > main > div:has(> textarea),
        form > div > main > div:has(.service-rich-editor-content),
        form > div > main > div:has(> span.font-mono) {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        .services-table {
          min-width: 720px !important;
        }

        .services-table th,
        .services-table td {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
      }

      .service-edit-button:hover {
        background: rgba(124,58,237,0.08) !important;
        border-color: rgba(124,58,237,0.28) !important;
        color: #7C3AED !important;
        transform: translateY(-1px);
        box-shadow: 0 0 12px rgba(124,58,237,0.12);
      }

      .service-edit-button:active {
        transform: translateY(0);
      }

      .service-delete-button:hover {
        background: rgba(220,38,38,0.08) !important;
        border-color: rgba(220,38,38,0.28) !important;
        color: #DC2626 !important;
        transform: translateY(-1px);
        box-shadow: 0 0 12px rgba(220,38,38,0.12);
      }

      .service-delete-button:active {
        transform: translateY(0);
      }
    `}</style>
    {view !== "list" && <button type="button" onClick={() => setView("list")} className="fixed bottom-5 left-5 z-50 rounded-lg border border-[#1E3A8A]/[0.16] bg-[#F6F9FD]/95 px-3 py-2 font-mono text-[12px] text-slate-700 shadow-xl hover:border-[#1565C0]/[0.33] hover:text-[#1565C0]">بازگشت به فهرست پست‌ها</button>}
  </div>;
}
