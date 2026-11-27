"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import { Extension, Mark, Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { SERVICE_KEY_LABELS, SERVICE_KEYS } from "@/lib/serviceKeys";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowLeftRight,
  Code2,
  Highlighter,
  IndentDecrease,
  IndentIncrease,
  Link2,
  List,
  ListOrdered,
  Minus,
  MoreHorizontal,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Type,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";

/* ───────────────── ICONS ───────────────── */

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

const IconClose = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconEye = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconChevronRight = () => (
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

const IconChevronLeft = () => (
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

// تا ۴ صفحه، همه‌شون رو کامل نشون بده — نقطه‌گذاری فقط از ۵ صفحه
// به بالا شروع می‌شه (عیناً همون منطق پیجینیشن پنل‌های فیدبک/نظرات).
function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
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

/* ───────────────── TYPES ───────────────── */

type ServiceStatus = "active" | "draft" | "hidden";

type ServiceLevel =
  | "intermediate"
  | "specialized"
  | "advanced"
  | "complex";

type TiptapNode = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
  text?: string;
};

type TiptapContent = {
  type: "doc";
  content?: TiptapNode[];
};

type TrackingStep = {
  tag: string;
  title: string;
  description: string;
  icon: string;
};

interface Service {

  id: string;
canonical: string;

  slug: string;
    key: string;
  title: string;
  trackingTitle: string;
  shortDesc: string;
  icon: string;

  tags: string[];

  level: ServiceLevel;
  categoryLabel: string;

  status: ServiceStatus;

  urgencyContent: TiptapContent;

  trackingSteps: TrackingStep[];

  metaTitle: string;
  metaDescription: string;
    index: boolean;
  follow: boolean;
    faqs: { question: string; answer: string }[];
}

type ServiceForm = {
canonical: string;
  slug: string;
    key: string;
  title: string;
  trackingTitle: string;
  shortDesc: string;
  icon: string;
  tags: string;

  level: ServiceLevel;
  categoryLabel: string;

  status: ServiceStatus;

  urgencyContent: TiptapContent;

  trackingSteps: TrackingStep[];

  metaTitle: string;
  metaDescription: string;
    index: boolean;
  follow: boolean;
    faqs: { question: string; answer: string }[];
};

/* ───────────────── DATA ───────────────── */

const DEFAULT_SERVICE_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10L12 12.5L16 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ───────────────── MAPS ───────────────── */

const statusMap: Record<
  ServiceStatus,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
  }
> = {
  active: {
    label: "فعال",
    color: "#059669",
    bg: "rgba(5,150,105,0.1)",
    border: "rgba(5,150,105,0.28)",
  },

  draft: {
    label: "پیش نویس",
    color: "#475569",
    bg: "rgba(100,116,139,0.104)",
    border: "rgba(100,116,139,0.26)",
  },

  hidden: {
    label: "پنهان",
    color: "#B45309",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.22)",
  },
};

const levelMap: Record<
  ServiceLevel,
  {
    label: string;
    color: string;
  }
> = {
  intermediate: {
    label: "متوسط",
    color: "#059669",
  },

  specialized: {
    label: "تخصصی",
    color: "#1565C0",
  },

  advanced: {
    label: "پیشرفته",
    color: "#7C3AED",
  },

  complex: {
    label: "پیچیده",
    color: "#B45309",
  },
};

/* ───────────────── STYLES ───────────────── */

const inputStyle = (
  hasError = false
): CSSProperties => ({
  background: "#F3F7FC",

  border: hasError
    ? "1px solid rgba(220,38,38,0.55)"
    : "1px solid rgba(30,58,138,0.128)",

  borderRadius: 9,

  padding: "9px 12px",

  color: "#0F172A",

  fontSize: "0.82rem",

  fontFamily:
    "var(--font-vazirmatn), Vazirmatn, sans-serif",

  outline: "none",

  caretColor: "#1565C0",

  width: "100%",

  boxSizing: "border-box",

  lineHeight: 1.7,

  transition:
    "border-color 0.15s, box-shadow 0.15s",
});

const errorStyle: CSSProperties = {
  color: "#DC2626",
  fontSize: "0.64rem",
  marginTop: 1,
};




/* ───────────────── FAQ EDITOR ───────────────── */

function FaqEditor({
  value,
  onChange,
}: {
  value?: { question: string; answer: string }[];
  onChange: (value: { question: string; answer: string }[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];

  const update = (
    index: number,
    patch: Partial<{ question: string; answer: string }>
  ) =>
    onChange(
      items.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );

  const remove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  const add = () => onChange([...items, { question: "", answer: "" }]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(30,58,138,0.128)",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>
              سوال {index + 1}
            </span>

            <button
              type="button"
              onClick={() => remove(index)}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#B91C1C",
                background: "transparent",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 6,
                padding: "3px 10px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              حذف
            </button>
          </div>

          <input
            value={item.question}
            maxLength={300}
            onChange={(e) => update(index, { question: e.target.value })}
            placeholder="متن سوال"
            style={inputStyle()}
          />

          <textarea
            value={item.answer}
            maxLength={2000}
            rows={4}
            onChange={(e) => update(index, { answer: e.target.value })}
            placeholder="پاسخ"
            style={{ ...inputStyle(), minHeight: 90, resize: "vertical" }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        style={{
          alignSelf: "flex-start",
          fontSize: 12,
          fontWeight: 700,
          color: "#1565C0",
          background: "rgba(21,101,192,0.075)",
          border: "1px solid rgba(21,101,192,0.26)",
          borderRadius: 8,
          padding: "8px 16px",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        + افزودن سوال
      </button>
    </div>
  );
}

/* ───────────────── SEO TOGGLE ───────────────── */

function SeoToggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        width: "100%",
        textAlign: "right",
        cursor: "pointer",
        borderRadius: 9,
        padding: "10px 12px",
        fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
        border: checked
          ? "1px solid rgba(21,101,192,0.26)"
          : "1px solid rgba(30,58,138,0.14)",
        background: checked ? "rgba(21,101,192,0.075)" : "#F3F7FC",
        transition: "all 0.15s",
      }}
    >
      <span style={{ display: "block" }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            color: checked ? "#1565C0" : "#334155",
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          {description}
        </span>
      </span>

      <span
        style={{
          position: "relative",
          width: 36,
          height: 20,
          flexShrink: 0,
          borderRadius: 999,
          border: checked
            ? "1px solid rgba(21,101,192,0.4)"
            : "1px solid rgba(30,58,138,0.16)",
          background: checked
            ? "rgba(21,101,192,0.2)"
            : "rgba(30,58,138,0.054)",
          transition: "all 0.15s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            right: checked ? 3 : 18,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: checked ? "#1565C0" : "#94A3B8",
            boxShadow: checked ? "0 0 8px rgba(21,101,192,0.55)" : "none",
            transition: "all 0.15s",
          }}
        />
      </span>
    </button>
  );
}

/* ───────────────── FIELD ───────────────── */

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label
          style={{
            color: error ? "#DC2626" : "#475569",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </label>

        {hint && (
          <span
            style={{
              color: "#74839B",
              fontSize: "0.6rem",
              fontFamily: "monospace",
            }}
          >
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <span style={errorStyle}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ───────────────── RICH TEXT EDITOR ───────────────── */

const EMPTY_TIPTAP_CONTENT: TiptapContent = {
  type: "doc",
  content: [],
};

const getTiptapText = (node: any): string => {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.content)) {
    return node.content.map(getTiptapText).join(" ");
  }
  return "";
};

const InsertMark = Mark.create({
  name: "insert",

  parseHTML() {
    return [{ tag: "ins" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ins", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleInsert:
        () =>
        ({ commands }: { commands: any }) =>
          commands.toggleMark(this.name),
    } as any;
  },
});

const DeleteMark = Mark.create({
  name: "delete",

  parseHTML() {
    return [{ tag: "del" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["del", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleDelete:
        () =>
        ({ commands }: { commands: any }) =>
          commands.toggleMark(this.name),
    } as any;
  },
});

const ImageNode = Node.create({
  name: "serviceImage",
  inline: true,
  group: "inline",
  draggable: true,

  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      title: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },
});

const MoreNode = Node.create({
  name: "more",
  group: "block",
  atom: true,

  parseHTML() {
    return [{ tag: 'div[data-service-more="true"]' }];
  },

  renderHTML() {
    return [
      "div",
      {
        "data-service-more": "true",
        class: "service-more-marker",
      },
      "ادامه مطلب",
    ];
  },
});

const TextColorMark = Mark.create({
  name: "textColor",

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) =>
          attributes.color ? { style: `color: ${attributes.color}` } : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style*='color']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const HighlightMark = Mark.create({
  name: "textHighlight",

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) =>
          attributes.color
            ? { style: `background-color: ${attributes.color}` }
            : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "mark" }, { tag: "span[style*='background-color']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["mark", mergeAttributes(HTMLAttributes), 0];
  },
});

const FontSizeMark = Mark.create({
  name: "fontSize",

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) =>
          attributes.size ? { style: `font-size: ${attributes.size}` } : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style*='font-size']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const FontFamilyMark = Mark.create({
  name: "fontFamily",

  addAttributes() {
    return {
      family: {
        default: null,
        parseHTML: (element) => element.style.fontFamily || null,
        renderHTML: (attributes) =>
          attributes.family
            ? { style: `font-family: ${attributes.family}` }
            : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style*='font-family']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const SuperscriptMark = Mark.create({
  name: "superscript",

  parseHTML() {
    return [{ tag: "sup" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["sup", mergeAttributes(HTMLAttributes), 0];
  },
});

const SubscriptMark = Mark.create({
  name: "subscript",

  parseHTML() {
    return [{ tag: "sub" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["sub", mergeAttributes(HTMLAttributes), 0];
  },
});

const TextAlignExtension = Extension.create({
  name: "serviceTextAlign",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          textAlign: {
            default: "right",
            parseHTML: (element: HTMLElement) =>
              element.style.textAlign || "right",
            renderHTML: (attributes: { textAlign?: string }) => ({
              style: `text-align: ${attributes.textAlign || "right"}`,
            }),
          },
          textDirection: {
            default: "rtl",
            parseHTML: (element: HTMLElement) =>
              element.getAttribute("dir") || "rtl",
            renderHTML: (attributes: { textDirection?: string }) => ({
              dir: attributes.textDirection || "rtl",
            }),
          },
          indent: {
            default: 0,
            parseHTML: (element: HTMLElement) =>
              Number(element.getAttribute("data-indent") || 0),
            renderHTML: (attributes: { indent?: number }) => ({
              "data-indent": String(attributes.indent || 0),
              style: `text-indent: ${(attributes.indent || 0) * 2}em;`,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextDirection:
        (direction: "rtl" | "auto" | "ltr") =>
        ({ commands }: any) =>
          commands.updateAttributes("paragraph", { textDirection: direction }) ||
          commands.updateAttributes("heading", { textDirection: direction }),
      setTextIndent:
        (indent: number) =>
        ({ commands }: any) => {
          const value = Math.max(0, indent);
          return (
            commands.updateAttributes("paragraph", { indent: value }) ||
            commands.updateAttributes("heading", { indent: value })
          );
        },
    };
  },
});

const ServiceTextStyle = Mark.create({
  name: "serviceTextStyle",

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily || null,
        renderHTML: (attributes) =>
          attributes.fontFamily
            ? { style: `font-family: ${attributes.fontFamily}` }
            : {},
      },
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) =>
          attributes.fontSize
            ? { style: `font-size: ${attributes.fontSize}` }
            : {},
      },
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) =>
          attributes.color ? { style: `color: ${attributes.color}` } : {},
      },
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) =>
          attributes.backgroundColor
            ? { style: `background-color: ${attributes.backgroundColor}` }
            : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const ServiceRawInlineStyle = Mark.create({
  name: "serviceRawInlineStyle",
  addAttributes() {
    return {
      htmlStyle: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("style") || null,
        renderHTML: (attributes: { htmlStyle?: string | null }) =>
          attributes.htmlStyle ? { style: attributes.htmlStyle } : {},
      },
    };
  },
  parseHTML() {
    return [
      { tag: "span[style]" },
      { tag: "mark[style]" },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const ServiceSuper = Mark.create({
  name: "serviceSuperscript",
  parseHTML() { return [{ tag: "sup" }]; },
  renderHTML({ HTMLAttributes }) { return ["sup", mergeAttributes(HTMLAttributes), 0]; },
});

const ServiceSub = Mark.create({
  name: "serviceSubscript",
  parseHTML() { return [{ tag: "sub" }]; },
  renderHTML({ HTMLAttributes }) { return ["sub", mergeAttributes(HTMLAttributes), 0]; },
});

const ServiceMore = Node.create({
  name: "serviceMore",
  group: "block",
  atom: true,
  parseHTML() {
    return [{ tag: "div[data-service-more]" }];
  },
  renderHTML() {
    return ["div", { "data-service-more": "true" }, "ادامه مطلب"];
  },
});

const ServiceParagraphStyle = Extension.create({
  name: "serviceParagraphStyle",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          textAlign: {
            default: "right",
            parseHTML: (element) => element.style.textAlign || "right",
            renderHTML: (attributes) =>
              attributes.textAlign
                ? { style: `text-align: ${attributes.textAlign}` }
                : {},
          },
          textDirection: {
            default: "rtl",
            parseHTML: (element) => element.getAttribute("dir") || "rtl",
            renderHTML: (attributes) =>
              attributes.textDirection
                ? { dir: attributes.textDirection }
                : {},
          },
          indent: {
            default: 0,
            parseHTML: (element) => Number(element.getAttribute("data-indent") || 0),
            renderHTML: (attributes) =>
              attributes.indent
                ? {
                    "data-indent": String(attributes.indent),
                    style:
                      attributes.textDirection === "ltr"
                        ? `margin-left: ${attributes.indent * 28}px`
                        : `margin-right: ${attributes.indent * 28}px`,
                  }
                : {},
          },
          htmlStyle: {
            default: null,
            parseHTML: (element) => element.getAttribute("style") || null,
            renderHTML: (attributes) => {
              const styles = [
                attributes.htmlStyle,
                attributes.textAlign
                  ? `text-align: ${attributes.textAlign}`
                  : null,
                attributes.indent
                  ? attributes.textDirection === "ltr"
                    ? `margin-left: ${attributes.indent * 28}px`
                    : `margin-right: ${attributes.indent * 28}px`
                  : null,
              ].filter(Boolean);

              return styles.length
                ? { style: styles.join("; ") }
                : {};
            },
          },
        },
      },
    ];
  },
});

const cellAttrs = {
  backgroundColor: {
    default: null,
    parseHTML: (el: HTMLElement) => el.style.backgroundColor || null,
    renderHTML: (attrs: Record<string, any>) =>
      attrs.backgroundColor ? { style: `background-color: ${attrs.backgroundColor}` } : {},
  },
};

const ServiceTableCell = TableCell.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellAttrs };
  },
});

const ServiceTableHeader = TableHeader.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellAttrs };
  },
});

const HTML_TAGS = [
  ["<div>", "<div>", "</div>"],
  ["<section>", "<section>", "</section>"],
  ["<article>", "<article>", "</article>"],
  ["<p>", "<p>", "</p>"],
  ["<h2>", "<h2>", "</h2>"],
  ["<h3>", "<h3>", "</h3>"],
  ["<span>", "<span>", "</span>"],
  ["<a>", '<a href="">', "</a>"],
  ["<strong>", "<strong>", "</strong>"],
  ["<em>", "<em>", "</em>"],
  ["<ul>", "<ul>", "</ul>"],
  ["<li>", "<li>", "</li>"],
  ["<blockquote>", "<blockquote>", "</blockquote>"],
  ["<pre>", "<pre><code>", "</code></pre>"],
];

const COMMON_SNIPPETS = [
  { name: "HTML", code: `<article>\n  <h2>عنوان</h2>\n  <p>متن مقاله</p>\n</article>` },
  { name: "Link", code: `<a href="https://example.com">متن لینک</a>` },
  { name: "List", code: `<ul>\n  <li>آیتم اول</li>\n  <li>آیتم دوم</li>\n</ul>` },
];

const FONT_SIZES = [
  { label: "12", value: "12px" }, { label: "14", value: "14px" },
  { label: "16", value: "16px" }, { label: "18", value: "18px" },
  { label: "20", value: "20px" }, { label: "24", value: "24px" },
  { label: "28", value: "28px" }, { label: "32", value: "32px" },
  { label: "36", value: "36px" },
];

const I = (paths: string | string[], w = 14, sw = 2) => (
  <svg
    width={w}
    height={w}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {(Array.isArray(paths) ? paths : [paths]).map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

const EditorIcon = ({ name }: { name: string }) => {
  const icons: Record<string, ReactNode> = {
    undo: I(["M9 14L4 9l5-5", "M4 9h10a6 6 0 010 12h-1"]),
    redo: I(["M15 14l5-5-5-5", "M20 9H10a6 6 0 000 12h1"]),
    bold: I(["M6 4h8a4 4 0 010 8H6z", "M6 12h9a4 4 0 010 8H6z"]),
    italic: I(["M19 4h-9", "M14 20H5", "M15 4l-6 16"]),
    underline: I(["M6 3v7a6 6 0 0012 0V3", "M4 21h16"]),
    strike: I(["M4 12h16", "M7 7c.8-2 2.8-3 5.5-3 3 0 5 1.3 5.5 3", "M17 17c-.9 1.9-2.8 3-5.5 3-3.1 0-5.1-1.3-5.6-3"]),
    link: I(["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"]),
    list: I(["M9 6h11", "M9 12h11", "M9 18h11", "M4 6h.01", "M4 12h.01", "M4 18h.01"]),
    ordered: I(["M10 6h11", "M10 12h11", "M10 18h11", "M4 5v2", "M3 7h2", "M3 11h2", "M4 10v3", "M3 18c.4-.8 1.1-1.2 2-1.2 1 0 1.6.5 1.6 1.2 0 .6-.4 1-1.2 1.5L3 21h4"]),
    quote: I(["M7 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4", "M18 17h-2a2 2 0 01-2-2v-2a2 2 0 012-2h3v6zm0 0c0 3-1.5 4-3 4"]),
    code: I(["M8 6l-6 6 6 6", "M16 6l6 6-6 6", "M14 4l-4 16"]),
    minus: I("M4 12h16"),
    clear: I(["M4 7h16", "M7 7v11a2 2 0 002 2h6a2 2 0 002-2V7", "M9 4h6", "M10 11v5", "M14 11v5"]),
    more: I(["M4 6h16v12H4z", "M8 12h.01", "M12 12h.01", "M16 12h.01"]),
    symbols: I(["M6 4v16", "M18 4v16", "M3 8h18", "M3 16h18"]),
    superscript: I(["M4 18l7-12", "M11 18L4 6", "M15 9h5l-4 5h4"]),
    subscript: I(["M4 6l7 12", "M11 6L4 18", "M15 15h5l-4 5h4"]),
    left: I(["M4 6h16", "M4 12h11", "M4 18h16"]),
    center: I(["M4 6h16", "M7 12h10", "M4 18h16"]),
    right: I(["M4 6h16", "M9 12h11", "M4 18h16"]),
    justify: I(["M4 6h16", "M4 12h16", "M4 18h16"]),
    rtl: I(["M5 5h9", "M5 9h7", "M5 13h9", "M19 5v14", "M15 15l4 4 4-4", "M4 19h10"]),
    ltr: I(["M10 5h9", "M12 9h7", "M10 13h9", "M5 5v14", "M1 9l4-4 4 4", "M5 19h10"]),
    heading: I(["M5 5v14", "M19 5v14", "M5 12h14"]),
    indentIn: I(["M9 6h11", "M9 12h11", "M9 18h11", "M5 8l-3 4 3 4"]),
    indentOut: I(["M4 6h16", "M4 12h16", "M4 18h16", "M2 8l3 4-3 4"]),
    table: I(["M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M3 10h18", "M3 15h18", "M9 3v18", "M15 3v18"]),
    rowAbove: I(["M4 13h16v7H4z", "M12 3v6", "M9 6h6"]),
    rowBelow: I(["M4 4h16v7H4z", "M12 15v6", "M9 18h6"]),
    colLeft: I(["M13 4h7v16h-7z", "M3 12h6", "M6 9v6"]),
    colRight: I(["M4 4h7v16H4z", "M15 12h6", "M18 9v6"]),
    delRow: I(["M4 8h16v8H4z", "M9 12h6"]),
    delCol: I(["M8 4h8v16H8z", "M12 9v6"]),
    merge: I(["M4 4h16v16H4z", "M4 12h5", "M20 12h-5", "M9 9l3 3-3 3", "M15 9l-3 3 3 3"]),
    split: I(["M4 4h16v16H4z", "M12 4v16", "M8 9l-3 3 3 3", "M16 9l3 3-3 3"]),
    headerRow: I(["M3 4h18v16H3z", "M3 10h18", "M3 7h18"]),
    trashTable: I(["M3 6h18", "M8 6V4h8v2", "M6 6l1 14h10l1-14", "M10 11v5", "M14 11v5"]),
    xmark: I(["M18 6L6 18", "M6 6l12 12"], 11, 2.5),
  };

  return icons[name] ?? icons.more;
};

function RichTextEditor({
  value,
  onChange,
}: {
  value: TiptapContent;
  onChange: (value: TiptapContent) => void;
}) {
  const [showMore, setShowMore] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [codePanelOpen, setCodePanelOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [textColor, setTextColor] = useState("#00E5FF");
  const [highlightColor, setHighlightColor] = useState("#FFF59D");
  const [, setSelectionVersion] = useState(0);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [hoverCell, setHoverCell] = useState({ r: 0, c: 0 });
  const [tableMenuLeft, setTableMenuLeft] = useState(0);
const tableWrapRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      ServiceTextStyle,
      ServiceRawInlineStyle,
      ServiceSuper,
      ServiceSub,
      ServiceMore,
      ServiceParagraphStyle,
      Table.configure({ resizable: true, HTMLAttributes: { class: "service-table" } }),
      TableRow,
      ServiceTableHeader,
      ServiceTableCell,
      Underline,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
    ],
    content: (value?.type === "doc" ? value : EMPTY_TIPTAP_CONTENT) as any,
    immediatelyRender: false,
    editorProps: {
      attributes: { dir: "rtl", class: "service-rich-editor-content" },
    },
    onUpdate: ({ editor: next }) => onChange(next.getJSON() as TiptapContent),
  });

useEffect(() => {
  if (!editor) return;

  const refresh = () => {
    setSelectionVersion((v) => v + 1);
  };

  editor.on("selectionUpdate", refresh);

  return () => {
    editor.off("selectionUpdate", refresh);
  };
}, [editor]);

  useEffect(() => {
    if (!editor) return;
    const current = JSON.stringify(editor.getJSON());
    const nextValue = value?.type === "doc" ? value : EMPTY_TIPTAP_CONTENT;
    if (current !== JSON.stringify(nextValue)) editor.commands.setContent(nextValue as any);
  }, [editor, value]);

  if (!editor) return null;

  const buttonStyle = (active = false, extra = "") =>
    `flex h-8 w-[34px] shrink-0 items-center justify-center rounded-[7px] border text-xs font-bold transition-colors ${
      active
        ? "border-[rgba(21,101,192,0.44)] bg-[rgba(21,101,192,0.17)] text-[#1565C0]"
        : "border-transparent bg-transparent text-[#475569] hover:bg-[rgba(21,101,192,0.125)] hover:text-[#1565C0]"
    } cursor-pointer ${extra}`;

  const menuStyle =
    "absolute right-0 top-[calc(100%+6px)] z-[50] min-w-[160px] rounded-[9px] border border-[rgba(30,58,138,0.142)] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]";

  const parent = editor.state.selection.$from.parent;
  const headingLevel = editor.getAttributes("heading").level;
  const currentIndent = Number(parent.attrs.indent || 0);
  const currentStyles = editor.getAttributes("serviceTextStyle");
  const currentFontSize = currentStyles.fontSize || "16px";
  const inTable = editor.isActive("table");

  const toggleTableMenu = () => {
  if (!showTable && tableWrapRef.current) {
    const wrap = tableWrapRef.current.getBoundingClientRect();
    const box = (tableWrapRef.current.closest(".service-rich-editor") as HTMLElement | null)?.getBoundingClientRect();
    if (box) {
      const MENU_W = 210;
      const desired = wrap.right - MENU_W;
      const min = box.left + 6;
      const max = box.right - MENU_W - 6;
      const abs = Math.max(min, Math.min(desired, max));
      setTableMenuLeft(abs - wrap.left);
    }
  }
  setShowTable((v) => !v);
};

  const run = (fn: () => boolean) => {
    fn();
    editor.view.focus();
  };

  const updateBlock = (attrs: Record<string, any>) => {
    const type = parent.type.name === "heading" ? "heading" : "paragraph";
    editor.chain().focus().updateAttributes(type, attrs).run();
  };

  const changeIndent = (delta: number) =>
    updateBlock({ indent: Math.max(0, Math.min(8, currentIndent + delta)) });

  const rememberSelection = () => {
    const { from, to } = editor.state.selection;
    selectionRef.current = { from, to };
  };

  const restoreSelection = () => {
    const saved = selectionRef.current;
    if (saved) editor.commands.setTextSelection(saved);
  };

  const setStyle = (attrs: Record<string, string>) => {
    restoreSelection();
    editor.chain().focus().setMark("serviceTextStyle", attrs).run();
    editor.view.focus();
  };

  const removeStyle = (key: string) => {
    restoreSelection();
    editor.chain().focus().setMark("serviceTextStyle", { [key]: null }).run();
    editor.view.focus();
  };

  const setHeading = (level?: number) => {
    if (!level) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    setShowHeading(false);
  };

  const openLinkEditor = () => {
    rememberSelection();
    setLinkUrl(editor.getAttributes("link").href || "");
    setShowLinkEditor(true);
  };

  const applyLink = () => {
    restoreSelection();
    const url = linkUrl.trim();
    if (!url) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setShowLinkEditor(false);
    editor.view.focus();
  };

  const symbols = ["©","®","™","§","¶","†","‡","•","×","÷","±","≈","≠","≤","≥","∞","√","∑","π","µ","Ω","Δ","α","β","γ","→","←","↔","↑","↓","✓","★","☆","♥","♦","♣","♠","€","$","£","¥","٪","°","‰","…","—","–","·","№","@","#","&","/","\\","()","[]","{}","«","»","“","”","‘","’"];

  return (
    <div className="service-rich-editor">
      <div className="service-rich-editor-toolbar">
        <div className="service-rich-editor-toolbar-row">
          <button type="button" title="بازگشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().undo().run())} className={buttonStyle()}><EditorIcon name="undo" /></button>
          <button type="button" title="جلو" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().redo().run())} className={buttonStyle()}><EditorIcon name="redo" /></button>
          <span className="service-rich-editor-divider">|</span>
          <div className="relative">
            <button type="button" title="تیتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowHeading((v) => !v)} className={buttonStyle(!!headingLevel, "w-[48px]")}><EditorIcon name="heading" /><span className="mr-0.5 text-[9px]">⌄</span></button>
            {showHeading && <div className={menuStyle}>
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading()} className="flex w-full cursor-pointer justify-between rounded-md border-0 bg-transparent px-[9px] py-2 text-xs text-slate-700 hover:bg-[#1565C0]/[0.07]">متن <span className="text-slate-500">Aa</span></button>
              {[1,2,3,4,5,6].map((n) => <button key={n} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading(n)} className={`flex w-full cursor-pointer justify-between rounded-md border-0 px-[9px] py-2 text-xs ${headingLevel === n ? "bg-[#1565C0]/[0.1] text-[#1565C0]" : "bg-transparent text-slate-700 hover:bg-[#1565C0]/[0.07]"}`}>تیتر {n}<span className="text-slate-500">H{n}</span></button>)}
            </div>}
          </div>
          <div className="relative">
            <button type="button" title="اندازه فونت" onMouseDown={(e) => { e.preventDefault(); rememberSelection(); }} onClick={() => setShowFontSize((v) => !v)} className="flex h-8 w-[72px] shrink-0 cursor-pointer items-center justify-between rounded-[7px] border border-[#1565C0]/[0.16] bg-[#F6F9FD] px-2 text-[11px] font-bold text-slate-700 hover:border-[#1565C0]/40"><span>{currentFontSize.replace("px", "")}px</span><span>⌄</span></button>
            {showFontSize && <div className={menuStyle + " w-[96px] min-w-[96px]"}>{FONT_SIZES.map((size) => <button key={size.value} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setStyle({ fontSize: size.value }); setShowFontSize(false); }} className={`flex w-full items-center justify-between rounded-md border-0 px-[9px] py-2 text-xs ${currentFontSize === size.value ? "bg-[#1565C0]/[0.1] text-[#1565C0]" : "bg-transparent text-slate-700 hover:bg-[#1565C0]/[0.07]"}`}><span>{size.label}px</span><span className="text-slate-500">A</span></button>)}</div>}
          </div>
          <span className="service-rich-editor-divider">|</span>
          <button type="button" title="درشت" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBold().run())} className={buttonStyle(editor.isActive("bold"))}><EditorIcon name="bold" /></button>
          <button type="button" title="کج" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleItalic().run())} className={buttonStyle(editor.isActive("italic"))}><EditorIcon name="italic" /></button>
          <button type="button" title="زیرخط" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleUnderline().run())} className={buttonStyle(editor.isActive("underline"))}><EditorIcon name="underline" /></button>
          <button type="button" title="خط خورده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleStrike().run())} className={buttonStyle(editor.isActive("strike"))}><EditorIcon name="strike" /></button>
          <div className="flex items-center gap-0.5"><button type="button" title="رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ color: textColor })} className={buttonStyle()}><span className="font-black leading-[1.1]" style={{ borderBottom: `3px solid ${textColor}` }}>A</span></button><input aria-label="رنگ متن" type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setStyle({ color: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
          <div className="flex items-center gap-0.5"><button type="button" title="هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => setStyle({ backgroundColor: highlightColor })} className={buttonStyle()}><span className="rounded-[2px] px-[3px] py-px font-black text-[#020617]" style={{ background: highlightColor }}>H</span></button><input aria-label="رنگ هایلایت" type="color" value={highlightColor} onChange={(e) => { setHighlightColor(e.target.value); setStyle({ backgroundColor: e.target.value }); }} className="h-3 w-3 cursor-pointer border-0 bg-transparent p-0" /></div>
        </div>

        <div className="service-rich-editor-toolbar-row">
          <button type="button" title="راست‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "right" })} className={buttonStyle(parent.attrs.textAlign === "right")}><EditorIcon name="right" /></button>
          <button type="button" title="وسط‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "center" })} className={buttonStyle(parent.attrs.textAlign === "center")}><EditorIcon name="center" /></button>
          <button type="button" title="چپ‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "left" })} className={buttonStyle(parent.attrs.textAlign === "left")}><EditorIcon name="left" /></button>
          <button type="button" title="تمام‌چین" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textAlign: "justify" })} className={buttonStyle(parent.attrs.textAlign === "justify")}><EditorIcon name="justify" /></button>
          <span className="service-rich-editor-divider">|</span>
          <button type="button" title="RTL - راست به چپ" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "rtl", textAlign: "right" })} className={buttonStyle(parent.attrs.textDirection === "rtl")}><EditorIcon name="rtl" /></button>
          <button type="button" title="LTR - چپ به راست" onMouseDown={(e) => e.preventDefault()} onClick={() => updateBlock({ textDirection: "ltr", textAlign: "left" })} className={buttonStyle(parent.attrs.textDirection === "ltr")}><EditorIcon name="ltr" /></button>
          <span className="service-rich-editor-divider">|</span>
          <button type="button" title="کاهش تورفتگی" disabled={currentIndent === 0} onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(-1)} className={buttonStyle(false, currentIndent === 0 ? "opacity-35" : "")}><EditorIcon name="indentOut" /></button>
          <button type="button" title="افزایش تورفتگی" onMouseDown={(e) => e.preventDefault()} onClick={() => changeIndent(1)} className={buttonStyle()}><EditorIcon name="indentIn" /></button>
        </div>

        <div className="service-rich-editor-toolbar-row">
          <button type="button" title="لیست نقطه‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBulletList().run())} className={buttonStyle(editor.isActive("bulletList"))}><EditorIcon name="list" /></button>
          <button type="button" title="لیست شماره‌ای" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())} className={buttonStyle(editor.isActive("orderedList"))}><EditorIcon name="ordered" /></button>
          <span className="service-rich-editor-divider">|</span>
          <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><EditorIcon name="quote" /></button>
          <button type="button" title="کد درون متن" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCode().run())} className={buttonStyle(editor.isActive("code"))}><EditorIcon name="code" /></button>
          <button type="button" title="Code — پنل HTML و تگ‌ها" onMouseDown={(e) => e.preventDefault()} onClick={() => setCodePanelOpen((v) => !v)} className={buttonStyle(codePanelOpen)}><span className="font-mono text-[9px] font-black">Code</span></button>
          <button type="button" title="لینک" onMouseDown={(e) => e.preventDefault()} onClick={openLinkEditor} className={buttonStyle(editor.isActive("link"))}><EditorIcon name="link" /></button>
          <div className="relative">
            <button type="button" title="درج جدول" onMouseDown={(e) => e.preventDefault()}   onClick={toggleTableMenu} className={buttonStyle(showTable || inTable)}><EditorIcon name="table" /></button>
            {showTable && (
              <>
<div aria-hidden="true" onMouseDown={(e) => e.preventDefault()} onClick={() => { setShowTable(false); setHoverCell({ r: 0, c: 0 }); }} className="fixed inset-0 z-40 cursor-default" />
                <div className={`${menuStyle} w-[210px] p-3`} style={{ left: tableMenuLeft, right: "auto" }} onMouseLeave={() => setHoverCell({ r: 0, c: 0 })}>
                  <div className="mb-2 text-center font-mono text-[11px] font-bold text-slate-600">
                    {hoverCell.r > 0 ? `${hoverCell.r} × ${hoverCell.c}` : "اندازه جدول را انتخاب کنید"}
                  </div>
                  <div dir="ltr" className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
                    {Array.from({ length: 48 }).map((_, i) => {
                      const r = Math.floor(i / 8) + 1;
                      const c = (i % 8) + 1;
                      const active = r <= hoverCell.r && c <= hoverCell.c;
                      return (
<div
  key={i}
  role="button"
  onMouseDown={(e) => e.preventDefault()}
  onMouseEnter={() => setHoverCell({ r, c })}
  onClick={() => {
    editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: true }).run();
    setShowTable(false);
    setHoverCell({ r: 0, c: 0 });
  }}
  className={`h-4 w-4 cursor-pointer rounded-[3px] border transition-colors ${active ? "border-[#1565C0] bg-[#1565C0]/30" : "border-[#1E3A8A]/20 bg-white"}`}
/>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
          <button type="button" title="پاک کردن قالب‌بندی" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => {
            const chain = editor.chain().focus().unsetAllMarks();
            if (!editor.isActive("table")) chain.clearNodes();
            return chain.run();
          })} className={buttonStyle()}><EditorIcon name="clear" /></button>
          <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><EditorIcon name="minus" /></button>
          <span className="service-rich-editor-divider">|</span>
          <button type="button" title="ابزارهای بیشتر" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowMore((v) => !v)} className={buttonStyle(showMore)}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
        </div>
      </div>

      {showMore && <div className="service-rich-editor-extra-toolbar">
        <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">تنظیمات متن</span><div className="service-rich-editor-extra-buttons">
          <button type="button" title="حذف رنگ متن" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("color")} className={buttonStyle()}><span className="font-black underline decoration-current underline-offset-[3px]">A</span></button>
          <button type="button" title="حذف هایلایت" onMouseDown={(e) => e.preventDefault()} onClick={() => removeStyle("backgroundColor")} className={buttonStyle()}><EditorIcon name="clear" /></button>
          <button type="button" title="بالانویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSuperscript())} className={buttonStyle(editor.isActive("serviceSuperscript"))}><EditorIcon name="superscript" /></button>
          <button type="button" title="زیرنویس" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => (editor.commands as any).toggleServiceSubscript())} className={buttonStyle(editor.isActive("serviceSubscript"))}><EditorIcon name="subscript" /></button>
        </div></div>
        <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">بلوک‌ها</span><div className="service-rich-editor-extra-buttons">
          <button type="button" title="بلوک کد" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleCodeBlock().run())} className={buttonStyle(editor.isActive("codeBlock"))}><EditorIcon name="code" /></button>
          <button type="button" title="نقل قول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())} className={buttonStyle(editor.isActive("blockquote"))}><EditorIcon name="quote" /></button>
          <button type="button" title="خط جداکننده" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())} className={buttonStyle()}><EditorIcon name="minus" /></button>
          <button type="button" title="More" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().insertContent({ type: "serviceMore" }).run())} className={buttonStyle(false, "w-[52px]")}><span className="text-xs font-extrabold tracking-[0.2px]">more</span></button>
        </div></div>
        <div className="service-rich-editor-extra-group"><span className="service-rich-editor-extra-label">نمادها</span><div className="service-rich-editor-extra-buttons">  <div className="relative" ref={tableWrapRef}>
          <button type="button" title="نمادهای ویژه" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowSymbols((v) => !v)} className={buttonStyle(showSymbols)}><EditorIcon name="symbols" /></button>
          {showSymbols && <div className={`${menuStyle} right-0 grid min-w-[288px] grid-cols-8 gap-[3px]`}>{symbols.map((symbol) => <button key={symbol} type="button" title={`درج ${symbol}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { editor.chain().focus().insertContent(symbol).run(); setShowSymbols(false); }} className="h-[30px] cursor-pointer rounded-[5px] border-0 bg-transparent text-[13px] text-[#334155] hover:bg-[#1565C0]/[0.07] hover:text-[#1565C0]">{symbol}</button>)}</div>}
        </div></div></div>
      </div>}

      {codePanelOpen && <CodePanel editor={editor} onClose={() => setCodePanelOpen(false)} onChange={onChange} />}

      {showLinkEditor && <div className="service-rich-link-editor">
        <input type="url" dir="ltr" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") { e.preventDefault(); setShowLinkEditor(false); } }} placeholder="https://example.com" autoFocus />
        <button type="button" onClick={applyLink}>اعمال لینک</button>
        <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setShowLinkEditor(false); }} className="service-rich-link-remove">حذف لینک</button>
        <button type="button" onClick={() => setShowLinkEditor(false)} className="service-rich-link-cancel">انصراف</button>
      </div>}

      {inTable && (
        <div className="service-rich-editor-extra-toolbar" style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <div className="service-rich-editor-extra-group">
            <span className="service-rich-editor-extra-label">سطر</span>
            <div className="service-rich-editor-extra-buttons">
              <button type="button" title="افزودن سطر بالا" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().addRowBefore().run())} className={buttonStyle()}><EditorIcon name="rowAbove" /></button>
              <button type="button" title="افزودن سطر پایین" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().addRowAfter().run())} className={buttonStyle()}><EditorIcon name="rowBelow" /></button>
              <button type="button" title="حذف سطر" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().deleteRow().run())} className={buttonStyle()}><EditorIcon name="delRow" /></button>
            </div>
          </div>
          <div className="service-rich-editor-extra-group">
            <span className="service-rich-editor-extra-label">ستون</span>
            <div className="service-rich-editor-extra-buttons">
              <button type="button" title="افزودن ستون سمت راست" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().addColumnBefore().run())} className={buttonStyle()}><EditorIcon name="colRight" /></button>
              <button type="button" title="افزودن ستون سمت چپ" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().addColumnAfter().run())} className={buttonStyle()}><EditorIcon name="colLeft" /></button>
              <button type="button" title="حذف ستون" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().deleteColumn().run())} className={buttonStyle()}><EditorIcon name="delCol" /></button>
            </div>
          </div>
          <div className="service-rich-editor-extra-group">
            <span className="service-rich-editor-extra-label">سلول</span>
            <div className="service-rich-editor-extra-buttons">
              <button type="button" title="ادغام سلول‌ها" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().mergeCells().run())} className={buttonStyle()}><EditorIcon name="merge" /></button>
              <button type="button" title="جداسازی سلول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().splitCell().run())} className={buttonStyle()}><EditorIcon name="split" /></button>
              <button type="button" title="سطر سرتیتر" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleHeaderRow().run())} className={buttonStyle()}><EditorIcon name="headerRow" /></button>
              <button type="button" title="ستون اول به‌عنوان سرتیتر" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().toggleHeaderColumn().run())} className={buttonStyle(false, "w-[54px]")}><span className="text-[10px] font-extrabold">ستون ۱</span></button>
            </div>
          </div>
          <div className="service-rich-editor-extra-group">
            <span className="service-rich-editor-extra-label">رنگ سلول</span>
            <div className="service-rich-editor-extra-buttons">
              {["#EAF2FF", "#E8F5E9", "#FFF8E1", "#FDECEA", "#F3E8FF"].map((c) => (
                <button key={c} type="button" title="رنگ پس‌زمینه سلول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setCellAttribute("backgroundColor", c).run())} className="h-5 w-5 cursor-pointer rounded-full border border-slate-300" style={{ background: c }} />
              ))}
              <button type="button" title="حذف رنگ سلول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().setCellAttribute("backgroundColor", null).run())} className={buttonStyle()}><EditorIcon name="xmark" /></button>
            </div>
          </div>
          <div className="service-rich-editor-extra-group">
            <button type="button" title="حذف کامل جدول" onMouseDown={(e) => e.preventDefault()} onClick={() => run(() => editor.chain().focus().deleteTable().run())} className={buttonStyle(false, "text-red-600 hover:text-red-700")}><EditorIcon name="trashTable" /></button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}

function CodePanel({
  editor,
  onClose,
  onChange,
}: {
  editor: any;
  onClose: () => void;
  onChange: (value: TiptapContent) => void;
}) {
  const [sourceCode, setSourceCode] = useState(() => editor.getHTML());

  const insertIntoSource = (code: string) =>
    setSourceCode((prev: string) => `${prev}${prev.trim() ? "\n" : ""}${code}`);

  const insertTag = (open: string, close: string) =>
    insertIntoSource(`${open}${close}`);

  const applyHtml = () => {
    editor.commands.setContent(sourceCode, { emitUpdate: false });
    onChange(editor.getJSON() as TiptapContent);
    editor.commands.focus("end");
    onClose();
  };

  return (
    <div className="border-b border-[#1565C0]/[0.14] bg-[#F1F5FB] px-4 py-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#1565C0]"><EditorIcon name="code" /></span>
              <h3 className="text-sm font-bold text-slate-800">Code / HTML</h3>
            </div>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">
              این بخش فقط برای کنترل ساختار HTML است؛ متن عادی را با ادیتور بنویس. تگ‌ها اینجا وارد می‌شوند و تا وقتی «اعمال HTML» نزنی وارد محتوای خدمت نمی‌شوند.
            </p>
          </div>
          <button type="button" onClick={onClose} title="بستن پنل" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.05] text-slate-700 hover:border-[#1565C0]/35 hover:bg-[#1565C0]/[0.08] hover:text-[#1565C0]">
            ×
          </button>
        </div>

        <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-[#1E3A8A]/[0.17] bg-[#EEF3FA] p-3">
          <span className="ml-1 self-center text-[9px] font-bold text-slate-400">تگ‌های سریع</span>
          {HTML_TAGS.map(([label, open, close]) => (
            <button key={label} type="button" onClick={() => insertTag(open, close)} className="cursor-pointer rounded-md border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.05] px-2.5 py-1.5 font-mono text-[12px] text-slate-700 transition-all hover:border-[#1565C0]/40 hover:bg-[#1565C0]/[0.08] hover:text-[#1565C0]">
              {label}
            </button>
          ))}
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {COMMON_SNIPPETS.map((item) => (
            <button key={item.name} type="button" onClick={() => insertIntoSource(item.code)} className="cursor-pointer rounded-md border border-[#1565C0]/[0.18] bg-[#1565C0]/[0.06] px-3 py-1.5 font-mono text-[12px] text-[#1565C0]/80 hover:bg-[#1565C0]/[0.1] hover:text-[#0D47A1]">
              + {item.name}
            </button>
          ))}
        </div>

        <textarea value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} spellCheck={false} placeholder="HTML محتوای خدمت..." rows={10} className="mb-3 min-h-[220px] w-full resize-y rounded-xl border border-[#1E3A8A]/[0.16] bg-[#F8FAFD] px-4 py-3 font-mono text-[12px] leading-6 text-left text-[#0F172A] outline-none focus:border-[#1565C0]/60 focus:ring-2 focus:ring-[#1565C0]/[0.1]" dir="ltr" />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-[#1E3A8A]/[0.16] bg-[#1E3A8A]/[0.05] px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-[#1565C0]/[0.07]">انصراف</button>
            <button type="button" onClick={applyHtml} className="cursor-pointer rounded-lg border border-[#1565C0]/50 bg-[#1565C0] px-5 py-2 text-[12px] font-black text-[#FFFFFF] shadow-[0_8px_24px_rgba(21,101,192,0.2)] hover:bg-[#0D47A1]">اعمال HTML</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── SVG PREVIEW ───────────────── */

const sanitizeSvg = (svg: string) =>
  svg
    .replace(
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(
      /\son\w+\s*=\s*(['"]).*?\1/gi,
      ""
    )
    .replace(
      /\s(?:href|xlink:href)\s*=\s*(['"])\s*javascript:[^'"]*\1/gi,
      ""
    );

/* ───────────────── RICH TEXT PREVIEW ───────────────── */

function RichTextPreview({
  content,
}: {
  content: TiptapContent;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      ServiceTextStyle,
      ServiceRawInlineStyle,
      ServiceSuper,
      ServiceSub,
      ServiceMore,
      ServiceParagraphStyle,
      Table.configure({ resizable: false, HTMLAttributes: { class: "service-table" } }),
      TableRow,
      ServiceTableHeader,
      ServiceTableCell,
      Underline,
      InsertMark,
      DeleteMark,
      MoreNode,
      Link.configure({ openOnClick: true }),
    ],
    content: content as any,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}

/* ───────────────── NORMALIZE API DATA ───────────────── */

const normalizeService = (
  item: any
): Service => ({

  id: String(
    item?._id ?? item?.id ?? ""
  ),

  slug: item?.slug ?? "",

  key: item?.key ?? "",

  title: item?.title ?? "",

  trackingTitle: item?.trackingTitle ?? "",

  shortDesc:
    item?.shortDesc ?? "",

  icon: item?.icon ?? "",

  tags: Array.isArray(item?.tags)
    ? item.tags
    : [],

  level:
    item?.level ?? "intermediate",

  categoryLabel:
    item?.categoryLabel ?? "",

  status:
    item?.status ?? "draft",

  urgencyContent:
    item?.urgencyContent &&
    typeof item.urgencyContent === "object"
      ? item.urgencyContent
      : {
          type: "doc",
          content: [],
        },

  trackingSteps:
    Array.isArray(item?.trackingSteps)
      ? [0, 1, 2].map((index) => ({
          tag: item.trackingSteps?.[index]?.tag ?? "",
          title: item.trackingSteps?.[index]?.title ?? "",
          description: item.trackingSteps?.[index]?.description ?? "",
          icon: item.trackingSteps?.[index]?.icon ?? "",
        }))
      : [
          { tag: "", title: "", description: "", icon: "" },
          { tag: "", title: "", description: "", icon: "" },
          { tag: "", title: "", description: "", icon: "" },
        ],

  metaTitle:
    item?.metaTitle ?? "",

  metaDescription:
    item?.metaDescription ?? "",

      index: item?.index ?? true,
  follow: item?.follow ?? true,
      faqs: Array.isArray(item?.faqs) ? item.faqs : [],

  canonical: item?.canonical ?? ""
});



















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

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#F6F9FD] px-3 text-right text-[11px] font-bold outline-none transition-all ${
          open
            ? "border-[#1565C0]/50 shadow-[0_0_16px_rgba(21,101,192,0.08)]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/30"
        }`}
      >
        <span className="truncate text-slate-700">
          {selectedOption.label}
        </span>
        <span
          className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-[#1E3A8A]/[0.1] bg-[#1E3A8A]/[0.04] text-slate-500 transition-all duration-200 ${
            open
              ? "border-[#1565C0]/30 bg-[#1565C0]/[0.07] text-[#1565C0]"
              : ""
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
                      ? "bg-[#1565C0]/[0.1] text-[#1565C0]"
                      : "text-slate-700 hover:bg-[#1565C0]/[0.07] hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && (
                    <span className="mr-2 shrink-0 text-[#1565C0]">
                      ✓
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

/* ───────────────── PAGE ───────────────── */

export default function ServicesPage() {
  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [editTarget, setEditTarget] =
    useState<Service | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Service | null>(null);

    const [previewTarget, setPreviewTarget] = useState<Service | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | ServiceStatus>("all");
  const [levelFilter, setLevelFilter] =
    useState<"all" | ServiceLevel>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPageSize = 10;

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceForm>({
    mode: "onBlur",

  defaultValues: {
  slug: "",
  key: "",
  title: "",
  trackingTitle: "",
  shortDesc: "",
    icon: DEFAULT_SERVICE_ICON,

  tags: "",

  level: "intermediate",
  categoryLabel: "",

  status: "draft",

  urgencyContent: {
    type: "doc",
    content: [],
  },

  trackingSteps: [
    { tag: "", title: "", description: "", icon: "" },
    { tag: "", title: "", description: "", icon: "" },
    { tag: "", title: "", description: "", icon: "" },
  ],

  metaTitle: "",
  metaDescription: "",
    index: true,
  follow: true,
   faqs: [],
   canonical: "",
},
  });

  const currentStatus =
    watch("status");

  const currentLevel =
    watch("level");

  const currentIcon =
    watch("icon");

  const filteredServices = services.filter((service) => {
    const query = search.trim().toLocaleLowerCase();

    if (
      query &&
      ![
        service.title,
        service.slug,
        service.shortDesc,
        service.categoryLabel,
        service.id,
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query)
    ) {
      return false;
    }

    if (
      statusFilter !== "all" &&
      service.status !== statusFilter
    ) {
      return false;
    }

    if (
      levelFilter !== "all" &&
      service.level !== levelFilter
    ) {
      return false;
    }

    return true;
  });

  const servicesTotalPages = Math.max(
    1,
    Math.ceil(filteredServices.length / servicesPageSize)
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, servicesTotalPages));
  }, [servicesTotalPages]);

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * servicesPageSize,
    currentPage * servicesPageSize
  );

  /* ───────────────── GET SERVICES ───────────────── */

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/services",
            {
              method: "GET",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "خطا در دریافت خدمات"
          );
        }

        const result =
          await response.json();

        const items =
          Array.isArray(
            result?.data
          )
            ? result.data
            : Array.isArray(result)
            ? result
            : [];

        setServices(
          items.map(
            normalizeService
          )
        );
      } catch (error) {
        console.error(
          "GET /api/services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  /* ───────────────── OPEN FORM ───────────────── */

  const openEdit = (
    service: Service | null
  ) => {
    setEditTarget(service);
    setSaved(false);

    if (service) {
      reset({
        slug: service.slug,
                key: service.key ?? "",

        title: service.title,
        trackingTitle: service.trackingTitle ?? "",
        shortDesc:
          service.shortDesc,

        icon:
          service.icon ||
          DEFAULT_SERVICE_ICON,

        tags:
          service.tags.join(", "),

        level: service.level,

        categoryLabel:
          service.categoryLabel,

        status: service.status,

urgencyContent:
  service.urgencyContent ?? {
    type: "doc",
    content: [],
  },

        trackingSteps: [0, 1, 2].map((index) => ({
          tag: service.trackingSteps?.[index]?.tag ?? "",
          title: service.trackingSteps?.[index]?.title ?? "",
          description: service.trackingSteps?.[index]?.description ?? "",
          icon: service.trackingSteps?.[index]?.icon ?? "",
        })),

        metaTitle:
          service.metaTitle,

        metaDescription:
          service.metaDescription,

        index: service.index,
        follow: service.follow,
        faqs: service.faqs ?? [],

        canonical: service.canonical ?? "",
      });
    } else {
      reset({

        slug: "",
        key: "",
        title: "",
        trackingTitle: "",
        shortDesc: "",

        icon:
          DEFAULT_SERVICE_ICON,

        tags: "",

        level: "intermediate",

        categoryLabel: "",

        status: "draft",

urgencyContent: {
  type: "doc",
  content: [],
},

        trackingSteps: [
          { tag: "", title: "", description: "", icon: "" },
          { tag: "", title: "", description: "", icon: "" },
          { tag: "", title: "", description: "", icon: "" },
        ],

        metaTitle: "",
        metaDescription: "",
        index: true,
        follow: true,
        faqs: [],
        canonical: "",
      });
    }

    setDrawerOpen(true);
  };

  /* ───────────────── CLOSE ───────────────── */

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditTarget(null);
    setSaved(false);
  };

  /* ───────────────── SAVE ───────────────── */

  const handleSave = async (
    data: ServiceForm
  ) => {
    const tags = data.tags
      .split(",")
      .map((tag) =>
        tag.trim()
      )
      .filter(Boolean);

const normalizedData = {
  slug:
    data.slug
      .trim()
      .toLowerCase(),

   key: data.key,

  title:
    data.title.trim(),

  trackingTitle:
    data.trackingTitle.trim(),

  shortDesc:
    data.shortDesc.trim(),

  icon:
    data.icon.trim() ||
    DEFAULT_SERVICE_ICON,

  tags,

  level: data.level,

  categoryLabel:
    data.categoryLabel.trim() ||
    null,

  status: data.status,

  urgencyContent:
    data.urgencyContent ?? {
      type: "doc",
      content: [],
    },

  trackingSteps: [0, 1, 2].map((index) => ({
    tag: data.trackingSteps?.[index]?.tag?.trim() ?? "",
    title: data.trackingSteps?.[index]?.title?.trim() ?? "",
    description: data.trackingSteps?.[index]?.description?.trim() ?? "",
    icon: data.trackingSteps?.[index]?.icon?.trim() ?? "",
  })),

  metaTitle:
    data.metaTitle.trim(),

  metaDescription:
    data.metaDescription.trim(),

    index: data.index,
  follow: data.follow,
  faqs: data.faqs ?? [],
  canonical: (data.canonical ?? "").trim(),
};

    try {
      if (editTarget) {
        /* ───────── EDIT ───────── */

        const response =
          await fetch(
            `/api/services/${editTarget.id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                normalizedData
              ),
            }
          );

        if (!response.ok) {
          const result =
            await response
              .json()
              .catch(() => null);

          throw new Error(
            result?.message ||
              "خطا در ویرایش خدمت"
          );
        }

        const result =
          await response.json();

        const updatedService =
          normalizeService(
            result?.data ??
              result
          );

        setServices(
          (items) =>
            items.map(
              (item) =>
                item.id ===
                editTarget.id
                  ? updatedService
                  : item
            )
        );
      } else {
        /* ───────── CREATE ───────── */

        const response =
          await fetch(
            "/api/services",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                normalizedData
              ),
            }
          );

        if (!response.ok) {
          const result =
            await response
              .json()
              .catch(() => null);

          throw new Error(
            result?.message ||
              "خطا در ایجاد خدمت"
          );
        }

        const result =
          await response.json();

        const newService =
          normalizeService(
            result?.data ??
              result
          );

        setServices(
          (items) => [
            newService,
            ...items,
          ]
        );
      }

      setSaved(true);

      setTimeout(() => {
        closeDrawer();
      }, 800);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "ذخیره خدمت انجام نشد."
      );
    }
  };

  /* ───────────────── DELETE ───────────────── */

  const handleDelete = (
    service: Service
  ) => {
    setDeleteTarget(service);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);

      const response =
        await fetch(
          `/api/services/${deleteTarget.id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        const result =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          result?.message ||
            "حذف خدمت انجام نشد"
        );
      }

      setServices(
        (items) =>
          items.filter(
            (item) =>
              item.id !==
              deleteTarget.id
          )
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "حذف خدمت انجام نشد."
      );
    } finally {
      setDeleting(false);
    }
  };







  {previewTarget && (
  <div
    onClick={() => setPreviewTarget(null)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(15,23,42,0.413)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 720,
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#FFFFFF",
        border: "1px solid #CBD5E1",
        borderRadius: 20,
        boxShadow: "0 25px 80px rgba(15,23,42,0.18)",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 22px",
          borderBottom: "1px solid #DDE5F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: 5,
            }}
          >
            مشاهده خدمت
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#52627A",
            }}
          >
            پیش‌نمایش اطلاعات ثبت‌شده خدمت
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPreviewTarget(null)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid #CBD5E1",
            background: "#F1F5FB",
            color: "#475569",
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: 22 }}>
        {/* Title + Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#F1F5FB",
              border: "1px solid #CBD5E1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {previewTarget.icon || "🛠️"}
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 5,
              }}
            >
              {previewTarget.title}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#52627A",
                direction: "ltr",
                textAlign: "right",
              }}
            >
              /{previewTarget.slug}
            </div>
          </div>
        </div>

        {/* Status / Level / Category */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
          className="preview-info-grid"
        >
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#F1F5FB",
              border: "1px solid #DDE5F0",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              وضعیت
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color:
                  previewTarget.status === "active"
                    ? "#059669"
                    : previewTarget.status === "hidden"
                    ? "#B45309"
                    : "#475569",
              }}
            >
              {previewTarget.status === "active"
                ? "فعال"
                : previewTarget.status === "hidden"
                ? "پنهان"
                : "پیش نویس"}
            </div>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#F1F5FB",
              border: "1px solid #DDE5F0",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              سطح
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              {previewTarget.level === "intermediate"
                ? "متوسط"
                : previewTarget.level === "specialized"
                ? "تخصصی"
                : previewTarget.level === "advanced"
                ? "پیشرفته"
                : "پیچیده"}
            </div>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#F1F5FB",
              border: "1px solid #DDE5F0",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              دسته‌بندی
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              {previewTarget.categoryLabel || "بدون دسته‌بندی"}
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div
          style={{
            padding: 16,
            borderRadius: 14,
            background: "#F1F5FB",
            border: "1px solid #DDE5F0",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            توضیح کوتاه
          </div>

          <div
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: "#0F172A",
            }}
          >
            {previewTarget.shortDesc || "توضیحی ثبت نشده است."}
          </div>
        </div>

        {/* Tags */}
        {previewTarget.tags?.length > 0 && (
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: "#F1F5FB",
              border: "1px solid #DDE5F0",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#475569",
                marginBottom: 10,
              }}
            >
              تگ‌ها
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {previewTarget.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    color: "#334155",
                    fontSize: 12,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}



        {/* SEO */}
        {(previewTarget.metaTitle ||
          previewTarget.metaDescription) && (
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: "#F1F5FB",
              border: "1px solid #DDE5F0",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#475569",
                marginBottom: 12,
              }}
            >
              اطلاعات SEO
            </div>

            {previewTarget.metaTitle && (
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#52627A",
                    marginBottom: 5,
                  }}
                >
                  Meta Title
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#0F172A",
                  }}
                >
                  {previewTarget.metaTitle}
                </div>
              </div>
            )}

            {previewTarget.metaDescription && (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#52627A",
                    marginBottom: 5,
                  }}
                >
                  Meta Description
                </div>

                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#334155",
                  }}
                >
                  {previewTarget.metaDescription}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 22px",
          borderTop: "1px solid #DDE5F0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => setPreviewTarget(null)}
          style={{
            height: 42,
            padding: "0 20px",
            borderRadius: 10,
            border: "1px solid #CBD5E1",
            background: "#E8EEF6",
            color: "#0F172A",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          بستن
        </button>
      </div>
    </div>
  </div>
)}






  /* ───────────────── RENDER ───────────────── */

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{
        background: "#EEF3FA",
        color: "#0F172A",
        fontFamily:
          "var(--font-vazirmatn), Vazirmatn, sans-serif",
      }}
    >
      <main
className="mx-auto grid w-full gap-4 px-6 py-6 md:px-7"
      >
        {/* PAGE HEADER */}

        <div
          className="services-header"
          style={{
            display: "flex",
            alignItems:
              "flex-start",
            justifyContent:
              "space-between",
            marginBottom: 22,
          }}
        >
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
                SERVICES // CMS
              </span>
            </div>

            <h2
              style={{
                color: "#0F172A",
                fontWeight: 900,
                fontSize:
                  "1.3rem",
                margin: 0,
              }}
            >
              مدیریت حوزه‌های تخصصی
              فارنزیک
            </h2>

            <p
              style={{
                color:
                  "#74839B",
                fontSize:
                  "0.76rem",
                marginTop: 4,
              }}
            >
              {services.length} خدمت
              ثبت‌شده —{" "}
              {
                services.filter(
                  (s) =>
                    s.status ===
                    "active"
                ).length
              }{" "}
              فعال
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              openEdit(null)
            }
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 7,
              padding:
                "9px 18px",
              borderRadius: 10,
              cursor:
                "pointer",
              background:
                "#1565C0",
              border:
                "1px solid rgba(21,101,192,0.77)",
              color:
                "#FFFFFF",
              fontSize:
                "0.82rem",
              fontWeight: 700,
              fontFamily:
                "var(--font-vazirmatn), Vazirmatn, sans-serif",
              boxShadow:
                "0 0 20px rgba(21,101,192,0.395)",
              whiteSpace:
                "nowrap",
            }}
          >
            <IconPlus />
            افزودن خدمت جدید
          </button>
        </div>

        {/* STATS */}

        <div
          className="services-stats"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 22,
          }}
        >
          {[
            {
              label: "فعال",
              val: services.filter(
                (s) =>
                  s.status ===
                  "active"
              ).length,
              color:
                "#059669",
            },

            {
              label: "پیش نویس",
              val: services.filter(
                (s) =>
                  s.status ===
                  "draft"
              ).length,
              color:
                "#475569",
            },

            {
              label: "پنهان",
              val: services.filter(
                (s) =>
                  s.status ===
                  "hidden"
              ).length,
              color:
                "#B45309",
            },
          ].map(
            ({
              label,
              val,
              color,
            }) => (
              <div
                key={label}
                style={{
                  background:
                    "#FFFFFF",
                  border:
                    "1px solid rgba(30,58,138,0.1)",
                  borderRadius: 12,
                  padding:
                    "14px 16px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                }}
              >
                <span
                  style={{
                    color:
                      "#74839B",
                    fontSize:
                      "0.78rem",
                  }}
                >
                  {label}
                </span>

                <span
                  style={{
                    color,
                    fontWeight: 800,
                    fontSize:
                      "1.4rem",
                    fontFamily:
                      "monospace",
                  }}
                >
                  {val}
                </span>
              </div>
            )
          )}
        </div>

        {/* FILTERS */}

        <div
          className="mb-4 overflow-visible rounded-2xl border border-[#1565C0]/[0.14] bg-[#FFFFFF]"
        >
          <div
            className="border-b border-[#1565C0]/[0.12] px-5 py-3.5"
          >
            <span className="text-sm font-bold text-[#0F172A]">
              جستجو و فیلتر خدمات
            </span>
          </div>

          <div
            className="flex flex-col gap-2.5 px-5 py-3.5 sm:flex-row sm:flex-wrap sm:items-center"
            dir="rtl"
          >
            <div className="relative w-full sm:min-w-[220px] sm:flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در عنوان، نامک، توضیح یا شناسه..."
                className="box-border h-10 w-full rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] px-3 text-right text-[11px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#1565C0]/60 focus:ring-[3px] focus:ring-[#1565C0]/[0.08]"
              />
            </div>

            <div className="w-full sm:w-[180px]">
              <CustomSelect
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(value as "all" | ServiceStatus)
                }
                options={[
                  { value: "all", label: "همه وضعیت‌ها" },
                  { value: "active", label: "فعال" },
                  { value: "draft", label: "پیش نویس" },
                  { value: "hidden", label: "پنهان" },
                ]}
              />
            </div>

            <div className="w-full sm:w-[180px]">
              <CustomSelect
                value={levelFilter}
                onChange={(value) =>
                  setLevelFilter(value as "all" | ServiceLevel)
                }
                options={[
                  { value: "all", label: "همه سطوح" },
                  { value: "intermediate", label: "متوسط" },
                  { value: "specialized", label: "تخصصی" },
                  { value: "advanced", label: "پیشرفته" },
                  { value: "complex", label: "پیچیده" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div
          style={{
            background:
              "#FFFFFF",
            border:
              "1px solid rgba(21,101,192,0.14)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding:
                "14px 20px",
              borderBottom:
                "1px solid rgba(21,101,192,0.11)",
              display: "flex",
              alignItems:
                "center",
              gap: 8,
            }}
          >
            <span
              style={{
                color: "#0F172A",
                fontWeight: 700,
                fontSize:
                  "0.88rem",
                flex: 1,
              }}
            >
              فهرست خدمات
            </span>

            <span
              style={{
                color:
                  "#74839B",
                fontSize:
                  "0.68rem",
                fontFamily:
                  "monospace",
              }}
            >
              {filteredServices.length} مورد
            </span>
          </div>


          <div
            className="services-table-scroll"
            style={{
              overflowX:
                "auto",
            }}
          >
            <table
              className="services-table"
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom:
                      "1px solid rgba(30,58,138,0.086)",
                  }}
                >
                  {[
                    "عنوان خدمت",
                    "توضیح کوتاه",
                    "سطح",
                    "وضعیت",
                    "عملیات",
                  ].map(
                    (
                      column,
                      index
                    ) => (
                      <th
                        key={column}
                        style={{
                          padding:
                            "10px 20px",
                          textAlign:
                            "right",
                          color:
                            "#74839B",
                          fontSize:
                            "0.68rem",
                          fontWeight: 600,
                          fontFamily:
                            "monospace",
                          whiteSpace:
                            "nowrap",
                          width:
                            index ===
                            4
                              ? 130
                              : "auto",
                        }}
                      >
                        {column}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding:
                          "35px 20px",
                        textAlign:
                          "center",
                        color:
                          "#74839B",
                        fontSize:
                          "0.78rem",
                      }}
                    >
                      در حال دریافت
                      خدمات...
                    </td>
                  </tr>
                ) : filteredServices.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding:
                          "35px 20px",
                        textAlign:
                          "center",
                        color:
                          "#74839B",
                        fontSize:
                          "0.78rem",
                      }}
                    >
                      موردی با این فیلترها پیدا نشد.
                    </td>
                  </tr>
                ) : (
                  paginatedServices.map(
                    (service) => {
                      const status =
                        statusMap[
                          service
                            .status
                        ];

                      const level =
                        levelMap[
                          service
                            .level
                        ];

                      return (
                        <tr
                          key={
                            service.id
                          }
                          style={{
                            borderBottom:
                              "1px solid rgba(30,58,138,0.072)",
                          }}
                          onMouseEnter={(
                            e
                          ) => {
                            e.currentTarget.style.background =
                              "rgba(21,101,192,0.062)";
                          }}
                          onMouseLeave={(
                            e
                          ) => {
                            e.currentTarget.style.background =
                              "transparent";
                          }}
                        >
                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 8,
                              }}
                            >
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius:
                                    8,
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  background:
                                    "rgba(21,101,192,0.11)",
                                  border:
                                    "1px solid rgba(21,101,192,0.2)",
                                  color:
                                    "#1565C0",
                                  fontSize:
                                    "0.9rem",
                                  overflow:
                                    "hidden",
                                }}
                              >
                                {service.icon
                                  ?.trim()
                                  .startsWith(
                                    "<svg"
                                  ) ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        sanitizeSvg(
                                          service.icon
                                        ),
                                    }}
                                  />
                                ) : (
                                  service.icon ||
                                  "◈"
                                )}
                              </div>

                              <div>
                                <span
                                  style={{
                                    display:
                                      "block",
                                    color:
                                      "#0F172A",
                                    fontWeight:
                                      600,
                                    fontSize:
                                      "0.85rem",
                                  }}
                                >
                                  {
                                    service.title
                                  }
                                </span>

                                <span
                                  style={{
                                    color:
                                      "#74839B",
                                    fontSize:
                                      "0.58rem",
                                    fontFamily:
                                      "monospace",
                                  }}
                                >
                                  /
                                  {
                                    service.slug
                                  }
                                </span>
                              </div>
                            </div>
                          </td>

                          <td
                            style={{
                              padding:
                                "13px 20px",
                            }}
                          >
                            <span
                              style={{
                                color:
                                  "#74839B",
                                fontSize:
                                  "0.78rem",
                              }}
                            >
                              {
                                service.shortDesc.length > 60 ? service.shortDesc.slice(0,60) + "..." : service.shortDesc
                              }
                            </span>
                          </td>

                          <td
                            style={{
                              padding:
                                "13px 20px",
                            }}
                          >
                            <span
                              style={{
                                color:
                                  level.color,
                                fontSize:
                                  "0.7rem",
                                fontWeight:
                                  600,
                              }}
                            >
                              {
                                level.label
                              }
                            </span>
                          </td>

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: 5,
                                padding:
                                  "3px 10px",
                                borderRadius:
                                  99,
                                fontSize:
                                  "0.7rem",
                                fontWeight:
                                  600,
                                background:
                                  status.bg,
                                border: `1px solid ${status.border}`,
                                color:
                                  status.color,
                              }}
                            >
                              <span
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius:
                                    "50%",
                                  background:
                                    status.color,
                                }}
                              />

                              {
                                status.label
                              }
                            </span>
                          </td>

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 6,
                              }}
                            >
<button
  className="service-eye-button"
  onClick={() => setPreviewTarget(service)}
  type="button"
  title="مشاهده"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 7,
    cursor: "pointer",
    background: "rgba(30,58,138,0.072)",
    border: "1px solid rgba(30,58,138,0.128)",
    color: "#74839B",
    transition:
      "all 0.18s ease",
  }}
>
  <IconEye />
</button>

<button
  className="service-edit-button"
  onClick={() => openEdit(service)}
  type="button"
  title="ویرایش"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 7,
    cursor: "pointer",
    background: "rgba(30,58,138,0.072)",
    border: "1px solid rgba(30,58,138,0.128)",
    color: "#74839B",
    transition: "all 0.18s ease",
  }}
>
  <IconEdit />
</button>

                             <button
  className="service-delete-button"
  onClick={() => handleDelete(service)}
  type="button"
  title="حذف"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 7,
    cursor: "pointer",
    background: "rgba(30,58,138,0.072)",
    border: "1px solid rgba(30,58,138,0.128)",
    color: "#74839B",
    transition: "all 0.18s ease",
  }}
>
  <IconTrash />
</button>


                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>

          {!loading && servicesTotalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="قبلی"
                disabled={currentPage <= 1}
                onClick={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-600 transition-all disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronRight />
              </button>

              {getPaginationRange(currentPage, servicesTotalPages).map(
                (p, index) =>
                  p === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex h-9 w-9 items-center justify-center text-[11px] font-black text-slate-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPage(p)}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] border px-2 text-[11px] font-black transition-all ${
                        p === currentPage
                          ? "border-[#1565C0]/60 bg-[#1565C0] text-[#FFFFFF]"
                          : "border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-600 hover:border-[#1565C0]/25 hover:text-[#1565C0]"
                      }`}
                    >
                      {p}
                    </button>
                  )
              )}

              <button
                type="button"
                aria-label="بعدی"
                disabled={currentPage >= servicesTotalPages}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(servicesTotalPages, prev + 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-600 transition-all disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronLeft />
              </button>
            </div>
          )}
        </div>
      </main>






{/* -_-_-_-_-_-_-_-_- MODAL -_-_-_-_-_-_-_-_- */}
{previewTarget && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1200,
      background: "rgba(15,23,42,0.429)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        setPreviewTarget(null);
      }
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 760,
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#FFFFFF",
        border: "1px solid rgba(21,101,192,0.2)",
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(15,23,42,0.18)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          borderBottom: "1px solid rgba(30,58,138,0.114)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#1565C0",
              letterSpacing: "0.08em",
              marginBottom: 5,
            }}
          >
            VIEW SERVICE
          </div>

          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            مشاهده خدمت
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPreviewTarget(null)}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "rgba(30,58,138,0.072)",
            border: "1px solid rgba(30,58,138,0.128)",
            color: "#52627A",
          }}
        >
          <IconClose />
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 22 }}>

        {/* TITLE + ICON */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              flexShrink: 0,
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(21,101,192,0.11)",
              border: "1px solid rgba(21,101,192,0.2)",
            }}
            dangerouslySetInnerHTML={{
              __html: sanitizeSvg(
                previewTarget.icon || DEFAULT_SERVICE_ICON
              ),
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 5,
                wordBreak: "break-word",
              }}
            >
              {previewTarget.title}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#52627A",
                direction: "ltr",
                textAlign: "right",
                wordBreak: "break-all",
              }}
            >
              /{previewTarget.slug}
            </div>
          </div>
        </div>

        {/* INFO GRID */}
        <div
          className="preview-info-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {/* STATUS */}
          <div
            style={{
              padding: 13,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              وضعیت
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: statusMap[previewTarget.status].color,
              }}
            >
              {statusMap[previewTarget.status].label}
            </div>
          </div>

          {/* LEVEL */}
          <div
            style={{
              padding: 13,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              سطح خدمت
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: levelMap[previewTarget.level].color,
              }}
            >
              {levelMap[previewTarget.level].label}
            </div>
          </div>

          {/* CATEGORY */}
          <div
            style={{
              padding: 13,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#52627A",
                marginBottom: 7,
              }}
            >
              دسته‌بندی
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {previewTarget.categoryLabel || "—"}
            </div>
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            توضیح کوتاه
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
              color: "#334155",
              fontSize: 13,
              lineHeight: 1.9,
              whiteSpace: "pre-wrap",
            }}
          >
            {previewTarget.shortDesc || "—"}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            محتوای اصلی خدمت
          </div>

          <div
            className="service-rich-preview"
            style={{
              padding: 16,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
              color: "#334155",
              fontSize: 13,
              lineHeight: 2,
              minHeight: 70,
            }}
          >
            {previewTarget.urgencyContent?.content?.length ? (
              <RichTextPreview content={previewTarget.urgencyContent} />
            ) : (
              "محتوایی برای این خدمت ثبت نشده است."
            )}
          </div>
        </div>

        {/* TAGS */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            تگ‌ها
          </div>

          {previewTarget.tags.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
              }}
            >
              {previewTarget.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    borderRadius: 7,
                    background: "rgba(21,101,192,0.095)",
                    border: "1px solid rgba(21,101,192,0.17)",
                    color: "#475569",
                    fontSize: 11,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div
              style={{
                color: "#74839B",
                fontSize: 12,
              }}
            >
              تگی ثبت نشده است.
            </div>
          )}
        </div>


{/* TRACKING TITLE */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            عنوان بخش شناسایی و ردیابی
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(30,58,138,0.065)",
              border: "1px solid rgba(30,58,138,0.114)",
              color: "#334155",
              fontSize: 13,
              lineHeight: 1.9,
            }}
          >
            {previewTarget.trackingTitle || "—"}
          </div>
        </div>

        {/* TRACKING STEPS */}
<div style={{ marginBottom: 20 }}>
  <div
    style={{
      fontSize: 12,
      fontWeight: 700,
      color: "#475569",
      marginBottom: 9,
    }}
  >
    سه مرحله شناسایی
  </div>

  {Array.isArray(previewTarget.trackingSteps) &&
  previewTarget.trackingSteps.length > 0 ? (
    <div
      style={{
        display: "grid",
        gap: 10,
      }}
    >
      {previewTarget.trackingSteps.slice(0, 3).map((step, index) => (
        <div
          key={`${step.tag}-${index}`}
          style={{
            padding: 14,
            borderRadius: 10,
            background: "rgba(30,58,138,0.065)",
            border: "1px solid rgba(30,58,138,0.114)",
          }}
        >
          {/* شماره + تگ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 9,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(21,101,192,0.14)",
                border: "1px solid rgba(21,101,192,0.23)",
                color: "#1565C0",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {index + 1}
            </div>

            {step.tag && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 8px",
                  borderRadius: 6,
                  background: "rgba(21,101,192,0.095)",
                  border: "1px solid rgba(21,101,192,0.17)",
                  color: "#1565C0",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {step.tag}
              </span>
            )}
          </div>

          {/* عنوان */}
          <div
            style={{
              color: "#0F172A",
              fontSize: 14,
              fontWeight: 800,
              marginBottom: 6,
              wordBreak: "break-word",
            }}
          >
            {step.title || "—"}
          </div>

          {/* توضیحات */}
          <div
            style={{
              color: "#475569",
              fontSize: 12,
              lineHeight: 1.9,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {step.description || "—"}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div
      style={{
        padding: 14,
        borderRadius: 10,
        background: "rgba(30,58,138,0.065)",
        border: "1px solid rgba(30,58,138,0.114)",
        color: "#74839B",
        fontSize: 12,
      }}
    >
      مراحل شناسایی برای این خدمت ثبت نشده است.
    </div>
  )}
</div>


        {/* SEO */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              marginBottom: 9,
            }}
          >
            اطلاعات SEO
          </div>

          <div
            style={{
              display: "grid",
              gap: 10,
            }}
          >
            {/* META TITLE */}
            <div
              style={{
                padding: 13,
                borderRadius: 10,
                background: "rgba(30,58,138,0.065)",
                border: "1px solid rgba(30,58,138,0.114)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#52627A",
                  marginBottom: 7,
                }}
              >
                Meta Title
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: 13,
                  lineHeight: 1.7,
                  wordBreak: "break-word",
                }}
              >
                {previewTarget.metaTitle || "—"}
              </div>
            </div>

            {/* META DESCRIPTION */}
            <div
              style={{
                padding: 13,
                borderRadius: 10,
                background: "rgba(30,58,138,0.065)",
                border: "1px solid rgba(30,58,138,0.114)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#52627A",
                  marginBottom: 7,
                }}
              >
                Meta Description
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: 13,
                  lineHeight: 1.8,
                  wordBreak: "break-word",
                }}
              >
                {previewTarget.metaDescription || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "15px 22px",
          borderTop: "1px solid rgba(30,58,138,0.114)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => setPreviewTarget(null)}
          style={{
            minWidth: 90,
            height: 38,
            borderRadius: 8,
            border: "1px solid rgba(30,58,138,0.142)",
            background: "rgba(30,58,138,0.086)",
            color: "#334155",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          بستن
        </button>
      </div>
    </div>
  </div>
)}



















      {/* ───────────────── DRAWER ───────────────── */}

      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
          }}
        >
          <div
            onClick={closeDrawer}
            style={{
              position:
                "absolute",
              inset: 0,
              background:
                "rgba(15,23,42,0.396)",
              backdropFilter:
                "blur(3px)",
            }}
          />

          <div
            className="services-drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              position:
                "absolute",
              top: 0,
              left: 0,
              bottom: 0,

              width:
                "min(500px, 100vw)",

              background: "#FFFFFF",

              borderRight:
                "1px solid rgba(21,101,192,0.2)",

              boxShadow:
                "-24px 0 80px rgba(15,23,42,0.32)",

              display: "flex",
              flexDirection:
                "column",

              animation:
                "drawer-in 0.26s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div
              style={{
                position:
                  "absolute",
                top: 0,
                right: 0,
                width: 2,
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(21,101,192,0.77), rgba(21,101,192,0.17), transparent)",
              }}
            />

            <div
              style={{
                padding:
                  "18px 20px 16px",

                borderBottom:
                  "1px solid rgba(21,101,192,0.125)",

                display: "flex",
                alignItems:
                  "center",
                gap: 10,

                flexShrink: 0,
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <span
                  style={{
                    color:
                      "rgba(21,101,192,0.695)",
                    fontSize:
                      "0.58rem",
                    fontFamily:
                      "monospace",
                    letterSpacing:
                      "0.15em",
                  }}
                >
                  {editTarget
                    ? "EDIT SERVICE"
                    : "NEW SERVICE"}
                </span>

                <h3
                  style={{
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize:
                      "0.92rem",
                    margin:
                      "3px 0 0",
                  }}
                >
                  {editTarget
                    ? "ویرایش خدمت"
                    : "افزودن خدمت جدید"}
                </h3>
              </div>

              <button
                type="button"
                onClick={
                  closeDrawer
                }
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",

                  width: 32,
                  height: 32,

                  borderRadius: 8,
                  cursor:
                    "pointer",

                  background:
                    "rgba(30,58,138,0.086)",

                  border:
                    "1px solid rgba(30,58,138,0.128)",

                  color:
                    "#74839B",
                }}
              >
                <IconClose />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(
                handleSave
              )}
              style={{
                display: "flex",
                flexDirection:
                  "column",
                flex: 1,
                minHeight: 0,
              }}
            >
              <div
                style={{
                  flex: 1,
                  overflowY:
                    "auto",

                  padding: 20,

                  display: "flex",

                  flexDirection:
                    "column",

                  gap: 18,
                }}
              >
                {/* TITLE + SLUG */}

                <div
                  className="service-title-grid"
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1.4fr 1fr",
                    gap: 10,
                  }}
                >
                  <Field
                    label="عنوان خدمت"
                    hint="H1"
                    error={
                      errors.title
                        ?.message
                    }
                  >
                    <input
                      {...register(
                        "title",
                        {
                          required:
                            "عنوان خدمت الزامی است",

                          minLength: {
                            value: 3,
                            message:
                              "عنوان باید حداقل ۳ کاراکتر باشد",
                          },
                        }
                      )}
                      placeholder="ردیابی رمزارز و تراکنش‌ها"
                      style={inputStyle(
                        !!errors.title
                      )}
                    />
                  </Field>

                  <Field
                    label="Slug"
                    hint="URL"
                    error={
                      errors.slug
                        ?.message
                    }
                  >
                    <input
                      {...register(
                        "slug",
                        {
                          required:
                            "Slug الزامی است",

                          pattern: {
                            value:
                              /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

                            message:
                              "فقط حروف کوچک انگلیسی، عدد و خط تیره مجاز است",
                          },
                        }
                      )}
                      dir="ltr"
                      placeholder="crypto-trace"
                      style={{
                        ...inputStyle(
                          !!errors.slug
                        ),
                        fontFamily:
                          "monospace",
                        textAlign:
                          "left",
                      }}
                    />
                  </Field>
                </div>

                {/* TRACKING TITLE */}

                <Field
                  label="عنوان بخش شناسایی و ردیابی"
                  hint="عنوان مستقل Tracking"
                  error={errors.trackingTitle?.message}
                >
                  <input
                    {...register("trackingTitle", {
                      required: "عنوان بخش شناسایی و ردیابی الزامی است",
                    })}
                    placeholder="مراحل شناسایی و ردیابی"
                    style={inputStyle(!!errors.trackingTitle)}
                  />
                </Field>

                {/* SHORT DESCRIPTION */}

                <Field
                  label="توضیح کوتاه"
                  hint="حداکثر ۲۰۰ کاراکتر"
                  error={
                    errors.shortDesc
                      ?.message
                  }
                >
                  <textarea
                    {...register(
                      "shortDesc",
                      {
                        required:
                          "توضیح کوتاه الزامی است",

                        maxLength: {
                          value: 200,
                          message:
                            "توضیح کوتاه نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد",
                        },
                      }
                    )}
                    rows={3}
                    placeholder="یک توضیح کوتاه و واضح درباره خدمت..."
                    style={{
                      ...inputStyle(
                        !!errors.shortDesc
                      ),
                      resize:
                        "none",
                    }}
                  />
                </Field>

                {/* ICON + CATEGORY */}

                <div
                  className="service-icon-grid"
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <Field
                    label="آیکون"
                    hint="SVG"
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        gap: 8,
                        alignItems:
                          "center",
                      }}
                    >
                      <input
                        {...register(
                          "icon"
                        )}
                        placeholder="<svg>...</svg>"
                        dir="ltr"
                        style={{
                          ...inputStyle(),
                          flex: 1,
                          fontFamily:
                            "monospace",
                          textAlign:
                            "left",
                        }}
                      />

                      <div
                        style={{
                          width: 40,
                          height: 40,
                          flexShrink: 0,
                          borderRadius: 9,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          background:
                            "rgba(21,101,192,0.11)",
                          border:
                            "1px solid rgba(21,101,192,0.23)",
                          color:
                            "#1565C0",
                          fontSize:
                            "1.05rem",
                          overflow:
                            "hidden",
                        }}
                      >
                        {currentIcon?.trim().startsWith(
                          "<svg"
                        ) ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                sanitizeSvg(
                                  currentIcon
                                ),
                            }}
                          />
                        ) : (
                          currentIcon ||
                          "◈"
                        )}
                      </div>
                    </div>
                  </Field>

                  <Field label="دسته‌بندی">
                    <input
                      {...register(
                        "categoryLabel"
                      )}
                      placeholder="فارنزیک دیجیتال"
                      style={inputStyle()}
                    />
                  </Field>

                                    <Field
                    label="نوع خدمت (انیمیشن و دپارتمان)"
                    hint="با تغییر عنوان تغییر نمی‌کند"
                  >
<CustomSelect
  value={watch("key") ?? ""}
  onChange={(value) =>
    setValue("key", value, { shouldDirty: true })
  }
  options={[
    { value: "", label: "— بدون انتخاب (انیمیشن پیش‌فرض) —" },
    ...SERVICE_KEYS.map((k) => ({
      value: k,
      label: SERVICE_KEY_LABELS[k],
    })),
  ]}
/>
                  </Field>
                </div>

                {/* TAGS */}

                <Field
                  label="تگ‌ها"
                  hint="با کاما جدا کنید"
                >
                  <input
                    {...register(
                      "tags"
                    )}
                    placeholder="OSINT, Identity, Social Media"
                    style={inputStyle()}
                  />
                </Field>

                {/* LEVEL */}

                <Field label="سطح خدمت">
                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(4,1fr)",
                      gap: 6,
                    }}
                  >
                    {(
                      Object.keys(
                        levelMap
                      ) as ServiceLevel[]
                    ).map(
                      (key) => {
                        const level =
                          levelMap[
                            key
                          ];

                        const selected =
                          currentLevel ===
                          key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setValue(
                                "level",
                                key,
                                {
                                  shouldDirty:
                                    true,
                                  shouldValidate:
                                    true,
                                }
                              )
                            }
                            style={{
                              padding:
                                "9px 4px",

                              borderRadius:
                                8,

                              cursor:
                                "pointer",

                              background:
                                selected
                                  ? `${level.color}12`
                                  : "rgba(30,58,138,0.058)",

                              border:
                                selected
                                  ? `1px solid ${level.color}55`
                                  : "1px solid rgba(15,23,42,0.06)",

                              color:
                                selected
                                  ? level.color
                                  : "#74839B",

                              fontSize:
                                "0.67rem",

                              fontFamily:
                                "var(--font-vazirmatn), Vazirmatn, sans-serif",
                            }}
                          >
                            {
                              level.label
                            }
                          </button>
                        );
                      }
                    )}
                  </div>
                </Field>

                {/* STATUS */}

                <Field label="وضعیت انتشار">
                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(3,1fr)",
                      gap: 7,
                    }}
                  >
                    {(
                      Object.keys(
                        statusMap
                      ) as ServiceStatus[]
                    ).map(
                      (key) => {
                        const status =
                          statusMap[
                            key
                          ];

                        const selected =
                          currentStatus ===
                          key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setValue(
                                "status",
                                key,
                                {
                                  shouldDirty:
                                    true,
                                  shouldValidate:
                                    true,
                                }
                              )
                            }
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              gap: 6,

                              padding:
                                "9px 5px",

                              borderRadius:
                                9,

                              cursor:
                                "pointer",

                              background:
                                selected
                                  ? status.bg
                                  : "rgba(30,58,138,0.058)",

                              border:
                                selected
                                  ? `1px solid ${status.border}`
                                  : "1px solid rgba(15,23,42,0.06)",

                              color:
                                selected
                                  ? status.color
                                  : "#74839B",

                              fontSize:
                                "0.7rem",

                              fontWeight:
                                selected
                                  ? 600
                                  : 400,

                              fontFamily:
                                "var(--font-vazirmatn), Vazirmatn, sans-serif",
                            }}
                          >
                            <span
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius:
                                  "50%",
                                background:
                                  selected
                                    ? status.color
                                    : "#74839B",
                              }}
                            />

                            {
                              status.label
                            }
                          </button>
                        );
                      }
                    )}
                  </div>
                </Field>



                {/* RICH TEXT CONTENT */}

                <Controller
                  name="urgencyContent"
                  control={control}
                  rules={{
                    validate: (value) => {
                      const hasText = getTiptapText(value).trim().length > 0;
                      return hasText || "محتوای اصلی خدمت الزامی است";
                    },
                  }}
                  render={({ field }) => (
                    <Field
                      label="محتوای اصلی خدمت"
                      hint="ویرایشگر متنی"
                      error={errors.urgencyContent?.message}
                    >
                      <RichTextEditor
                        value={field.value ?? EMPTY_TIPTAP_CONTENT}
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                />

                {/* TRACKING STEPS */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    مراحل شناسایی
                  </div>

                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#52627A",
                      lineHeight: 1.8,
                    }}
                  >
                    اطلاعات سه کارت بخش شناسایی را برای این خدمت وارد کنید.
                  </div>

                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid rgba(30,58,138,0.114)",
                        background: "rgba(30,58,138,0.051)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: "#475569",
                        }}
                      >
                        مرحله {index + 1}
                      </div>

                      <Field
                        label="تگ"
                        hint="برچسب کوتاه"
                        error={errors.trackingSteps?.[index]?.tag?.message}
                      >
                        <input
                          {...register(`trackingSteps.${index}.tag`, {
                            required: "تگ مرحله الزامی است",
                          })}
                          placeholder={
                            index === 0
                              ? "On-chain"
                              : index === 1
                              ? "Off-ramp"
                              : "Report"
                          }
                          style={inputStyle(
                            !!errors.trackingSteps?.[index]?.tag
                          )}
                        />
                      </Field>

                      <Field
                        label="عنوان مرحله"
                        error={errors.trackingSteps?.[index]?.title?.message}
                      >
                        <input
                          {...register(`trackingSteps.${index}.title`, {
                            required: "عنوان مرحله الزامی است",
                          })}
                          placeholder="عنوان مرحله"
                          style={inputStyle(
                            !!errors.trackingSteps?.[index]?.title
                          )}
                        />
                      </Field>

                      <Field
                        label="توضیحات"
                        error={
                          errors.trackingSteps?.[index]?.description?.message
                        }
                      >
                        <textarea
                          {...register(
                            `trackingSteps.${index}.description`,
                            {
                              required: "توضیحات مرحله الزامی است",
                            }
                          )}
                          rows={3}
                          placeholder="توضیحات مربوط به این مرحله..."
                          style={{
                            ...inputStyle(
                              !!errors.trackingSteps?.[index]?.description
                            ),
                            resize: "none",
                          }}
                        />
                      </Field>

                      <Field
                        label="آیکون مرحله"
                        hint="SVG یا کد آیکون"
                        error={errors.trackingSteps?.[index]?.icon?.message}
                      >
                        <input
                          {...register(`trackingSteps.${index}.icon`)}
                          placeholder="<svg ...></svg>"
                          style={inputStyle(
                            !!errors.trackingSteps?.[index]?.icon
                          )}
                          dir="ltr"
                        />
                      </Field>
                    </div>
                  ))}
                </div>




                {/* FAQ */}

                <div
                  style={{
                    background: "rgba(15,23,42,0.05)",
                    border: "1px solid rgba(21,101,192,0.17)",
                    borderRadius: 12,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      color: "#1565C0",
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                    }}
                  >
                    FAQ
                  </span>

                  <FaqEditor
                    value={watch("faqs")}
                    onChange={(value) =>
                      setValue("faqs", value, { shouldDirty: true })
                    }
                  />
                </div>


                {/* SEO */}

                <div
                  style={{
                    background:
                      "rgba(15,23,42,0.05)",

                    border:
                      "1px solid rgba(21,101,192,0.17)",

                    borderRadius: 12,

                    padding: 16,

                    display:
                      "flex",

                    flexDirection:
                      "column",

                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 7,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius:
                          "50%",
                        background:
                          "#1565C0",
                        boxShadow:
                          "0 0 7px rgba(21,101,192,0.77)",
                      }}
                    />

                    <span
                      style={{
                        color:
                          "#1565C0",
                        fontSize:
                          "0.65rem",
                        fontFamily:
                          "monospace",
                        letterSpacing:
                          "0.12em",
                      }}
                    >
                      SEO & META
                    </span>
                  </div>

                  <Field
                    label="عنوان سئو"
                    hint="حداکثر ۶۰ کاراکتر"
                    error={
                      errors.metaTitle
                        ?.message
                    }
                  >
                    <input
                      {...register(
                        "metaTitle",
                        {
                          maxLength: {
                            value: 60,
                            message:
                              "عنوان سئو نباید بیشتر از ۶۰ کاراکتر باشد",
                          },
                        }
                      )}
                      placeholder="ردیابی رمزارز و تراکنش‌ها | پاراهور"
                      style={inputStyle(
                        !!errors.metaTitle
                      )}
                    />
                  </Field>

                  <Field
                    label="توضیحات سئو"
                    hint="حداکثر ۱۶۰ کاراکتر"
                    error={
                      errors.metaDescription
                        ?.message
                    }
                  >
                    <textarea
                      {...register(
                        "metaDescription",
                        {
                          maxLength: {
                            value: 160,
                            message:
                              "توضیحات سئو نباید بیشتر از ۱۶۰ کاراکتر باشد",
                          },
                        }
                      )}
                      rows={5}
                      placeholder="توضیح کوتاه برای موتورهای جستجو..."
                      style={{
                        ...inputStyle(
                          !!errors.metaDescription
                        ),
                        resize:
                          "none",
                      }}
                    />
                  </Field>

                                    <Field
                    label="Canonical"
                    hint="اختیاری — خالی = آدرس خود خدمت"
                    error={errors.canonical?.message}
                  >
                    <input
                      {...register("canonical")}
                      dir="ltr"
                      maxLength={500}
                      placeholder="https://... یا /path (خالی = خودکار)"
                      style={{ ...inputStyle(!!errors.canonical), fontFamily: "monospace", textAlign: "left" }}
                    />
                  </Field>

<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  <SeoToggle
    checked={watch("index")}
    onChange={(value) => setValue("index", value, { shouldDirty: true })}
    title="Index"
    description="اجازه نمایش صفحه در نتایج جستجو"
  />

  <SeoToggle
    checked={watch("follow")}
    onChange={(value) => setValue("follow", value, { shouldDirty: true })}
    title="Follow"
    description="اجازه دنبال کردن لینک‌های صفحه"
  />
</div>

                </div>
              </div>

              {/* FOOTER */}

              <div
                className="services-drawer-footer"
                style={{
                  padding:
                    "14px 20px",

                  borderTop:
                    "1px solid rgba(21,101,192,0.125)",

                  display: "flex",

                  alignItems:
                    "center",

                  gap: 10,

                  flexShrink: 0,

                  background:
                    "#FFFFFF",
                }}
              >
                <button
                  type="button"
                  onClick={handleSubmit((data) => handleSave({ ...data, status: "draft" }))}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: "rgba(100,116,139,0.104)",
                    border: "1px solid rgba(100,116,139,0.234)",
                    color: "#334155",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
                  }}
                >
                  ذخیره در پیش‌نویس
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1,

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    gap: 7,

                    padding: 10,

                    borderRadius: 10,

                    cursor:
                      "pointer",

                    background:
                      saved
                        ? "rgba(5,150,105,0.15)"
                        : "#1565C0",

                    border:
                      saved
                        ? "1px solid rgba(5,150,105,0.4)"
                        : "1px solid rgba(21,101,192,0.77)",

                    color:
                      saved
                        ? "#059669"
                        : "#FFFFFF",

                    fontSize:
                      "0.84rem",

                    fontWeight: 700,

                    fontFamily:
                      "var(--font-vazirmatn), Vazirmatn, sans-serif",
                  }}
                >
                  {saved
                    ? "✓ ذخیره شد"
                    : editTarget
                    ? "ذخیره تغییرات"
                    : "ذخیره خدمت"}
                </button>

                <button
                  type="button"
                  onClick={
                    closeDrawer
                  }
                  style={{
                    padding:
                      "10px 18px",

                    borderRadius: 10,

                    cursor:
                      "pointer",

                    background:
                      "transparent",

                    border:
                      "1px solid rgba(30,58,138,0.142)",

                    color:
                      "#74839B",

                    fontSize:
                      "0.82rem",

                    fontFamily:
                      "var(--font-vazirmatn), Vazirmatn, sans-serif",
                  }}
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────── DELETE MODAL ───────────────── */}

      {deleteTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: 20,
          }}
        >
          <div
            onClick={() =>
              !deleting &&
              setDeleteTarget(null)
            }
            style={{
              position:
                "absolute",
              inset: 0,
              background:
                "rgba(15,23,42,0.429)",
              backdropFilter:
                "blur(4px)",
            }}
          />

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              position:
                "relative",
              width:
                "min(420px, 100%)",
              background:
                "#FFFFFF",
              border:
                "1px solid rgba(220,38,38,0.18)",
              borderRadius: 14,
              padding: 20,
              boxShadow:
                "0 24px 80px rgba(15,23,42,0.26)",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "rgba(220,38,38,0.08)",
                  border:
                    "1px solid rgba(220,38,38,0.18)",
                  color:
                    "#DC2626",
                }}
              >
                <IconTrash />
              </div>

              <div>
                <div
                  style={{
                    color: "#0F172A",
                    fontSize:
                      "0.88rem",
                    fontWeight: 700,
                  }}
                >
                  حذف خدمت
                </div>

                <div
                  style={{
                    color:
                      "#74839B",
                    fontSize:
                      "0.68rem",
                    marginTop: 3,
                  }}
                >
                  این عملیات قابل بازگشت
                  نیست
                </div>
              </div>
            </div>

            <p
              style={{
                color:
                  "#475569",
                fontSize:
                  "0.78rem",
                lineHeight: 1.9,
                margin:
                  "0 0 18px",
              }}
            >
              آیا مطمئن هستید که
              می‌خواهید خدمت{" "}
              <span
                style={{
                  color:
                    "#0F172A",
                  fontWeight: 700,
                }}
              >
                «
                {
                  deleteTarget.title
                }
                »
              </span>{" "}
              را حذف کنید؟
            </p>

            <div
              style={{
                display:
                  "flex",
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={
                  confirmDelete
                }
                disabled={deleting}
                style={{
                  flex: 1,
                  padding:
                    "10px 14px",
                  borderRadius: 9,
                  cursor:
                    deleting
                      ? "default"
                      : "pointer",
                  background:
                    "rgba(220,38,38,0.1)",
                  border:
                    "1px solid rgba(220,38,38,0.25)",
                  color:
                    "#DC2626",
                  fontSize:
                    "0.78rem",
                  fontWeight: 700,
                  fontFamily:
                    "var(--font-vazirmatn), Vazirmatn, sans-serif",
                  opacity:
                    deleting
                      ? 0.6
                      : 1,
                }}
              >
                {deleting
                  ? "در حال حذف..."
                  : "بله، حذف شود"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                disabled={deleting}
                style={{
                  flex: 1,
                  padding:
                    "10px 14px",
                  borderRadius: 9,
                  cursor:
                    deleting
                      ? "default"
                      : "pointer",
                  background:
                    "rgba(30,58,138,0.072)",
                  border:
                    "1px solid rgba(30,58,138,0.128)",
                  color:
                    "#52627A",
                  fontSize:
                    "0.78rem",
                  fontFamily:
                    "var(--font-vazirmatn), Vazirmatn, sans-serif",
                }}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER ANIMATION + RESPONSIVE */}

      <style suppressHydrationWarning>{`
        @keyframes drawer-in {
          from {
            transform: translateX(-100%);
            opacity: 0.5;
          }

          to {
            transform: translateX(0);
            opacity: 1;
          }
        }


        .service-rich-editor {
          width: 100%;
          border: 1px solid rgba(30,58,138,0.128);
          border-radius: 10px;
          overflow: hidden;
          background: #F3F7FC;
        }

        .service-rich-editor-toolbar {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 5px;
          padding: 7px 8px;
          background: rgba(30,58,138,0.065);
          border-bottom: 1px solid rgba(30,58,138,0.114);
        }

        .service-rich-editor-toolbar-row {
          display: flex;
          align-items: center;
          gap: 3px;
          min-height: 32px;
          flex-wrap: wrap;
          overflow: visible;
        }

        .service-rich-editor-divider {
          color: #74839B;
          font-size: 16px;
          line-height: 1;
          margin: 0 7px;
          user-select: none;
        }

        .service-rich-editor-toolbar button:hover,
        .service-rich-editor-extra-toolbar button:hover {
          color: #1565C0 !important;
          background: rgba(21,101,192,0.125) !important;
        }

        .service-rich-editor-toolbar { overflow:visible; }
        @media (max-width: 640px) {
          .service-rich-editor-toolbar { gap:4px; padding:6px; }
          .service-rich-editor-toolbar-row { gap:2px; overflow:visible; flex-wrap:wrap; padding-bottom:2px; }
          .service-rich-editor-toolbar-row .service-rich-editor-divider { margin:0 3px; }
          .service-rich-editor-extra-toolbar { gap:5px; }
          .service-rich-editor-extra-group { flex-wrap:wrap; }
          .service-rich-editor-content { min-height:320px; padding:20px 2px 45px; font-size:15px; line-height:2; }
          .service-rich-link-editor { flex-wrap:wrap; }
          .service-rich-link-editor input { min-width:0; flex:1 1 100%; }
        }
        .service-rich-editor-extra-toolbar {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          padding: 8px;
          background: rgba(21,101,192,0.047);
          border-bottom: 1px solid rgba(30,58,138,0.114);
        }

        .service-rich-editor-extra-toolbar .service-rich-editor-extra-group {
          width: 100%;
          box-sizing: border-box;
        }

        .service-rich-editor-extra-group {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 6px;
          border: 1px solid rgba(30,58,138,0.107);
          border-radius: 8px;
          background: rgba(30,58,138,0.055);
        }

        .service-rich-editor-extra-label {
          color: #52627A;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }

        .service-rich-editor-extra-buttons {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .service-rich-editor .ProseMirror [data-indent] {
          transition: margin 0.15s ease;
        }

        .service-rich-editor .ProseMirror h4,
        .service-rich-editor .ProseMirror h5,
        .service-rich-editor .ProseMirror h6 {
          margin: 14px 0 8px;
          color: #0F172A;
          line-height: 1.6;
        }

        .service-rich-editor .ProseMirror h4 { font-size: 0.95rem; }
        .service-rich-editor .ProseMirror h5 { font-size: 0.88rem; }
        .service-rich-editor .ProseMirror h6 { font-size: 0.82rem; }

        .service-rich-editor-toolbar button:hover {
          color: #1565C0 !important;
          background: rgba(21,101,192,0.125) !important;
        }

        .service-list-icon {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          font-size: 8px;
          line-height: 8px;
          width: 15px;
          direction: ltr;
        }

        .service-list-icon span {
          display: block;
          height: 8px;
        }

        .service-number-list-icon {
          font-size: 7px;
          line-height: 8px;
          font-weight: 800;
        }


        .service-rich-editor .ProseMirror [data-indent="1"] { text-indent: 2em; }
        .service-rich-editor .ProseMirror [data-indent="2"] { text-indent: 4em; }
        .service-rich-editor .ProseMirror [data-indent="3"] { text-indent: 6em; }
        .service-rich-editor .ProseMirror [data-indent="4"] { text-indent: 8em; }

        .service-rich-editor .ProseMirror code {
          background: rgba(21,101,192,0.14);
          border: 1px solid rgba(21,101,192,0.2);
          border-radius: 5px;
          padding: 2px 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .service-rich-editor .ProseMirror pre {
          direction: ltr;
          text-align: left;
          white-space: pre-wrap;
          background: #F8FAFD;
          border: 1px solid rgba(30,58,138,0.142);
          border-radius: 10px;
          padding: 14px;
        }

        .service-rich-editor .ProseMirror p[dir="ltr"],
        .service-rich-editor .ProseMirror h1[dir="ltr"],
        .service-rich-editor .ProseMirror h2[dir="ltr"],
        .service-rich-editor .ProseMirror h3[dir="ltr"],
        .service-rich-editor .ProseMirror h4[dir="ltr"],
        .service-rich-editor .ProseMirror h5[dir="ltr"],
        .service-rich-editor .ProseMirror h6[dir="ltr"] {
          direction: ltr;
          text-align: left;
        }
        .service-rich-editor .ProseMirror ins {
          text-decoration: underline;
          text-decoration-color: rgba(5,150,105,0.75);
          text-decoration-thickness: 2px;
        }

        .service-rich-editor .ProseMirror del {
          text-decoration: line-through;
          text-decoration-color: #DC2626;
        }

        .service-rich-editor .ProseMirror img {
          display: inline-block;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 6px 0;
        }

        .service-more-marker {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 16px 0;
          color: #52627A;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
        }

        .service-more-marker::before,
        .service-more-marker::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(100,116,139,0.286);
        }

        .service-rich-link-editor {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          padding: 8px;
          background: rgba(21,101,192,0.073);
          border-bottom: 1px solid rgba(30,58,138,0.114);
        }

        .service-rich-link-editor input {
          flex: 1 1 260px;
          min-width: 180px;
          height: 32px;
          padding: 0 10px;
          border-radius: 7px;
          border: 1px solid rgba(30,58,138,0.156);
          outline: none;
          background: #F6F9FD;
          color: #0F172A;
          font-size: 12px;
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
        }

        .service-rich-link-editor input:focus {
          border-color: rgba(21,101,192,0.545);
          box-shadow: 0 0 0 3px rgba(21,101,192,0.11);
        }

        .service-rich-link-editor button {
          height: 32px;
          padding: 0 10px;
          border-radius: 7px;
          border: 1px solid rgba(30,58,138,0.142);
          background: rgba(30,58,138,0.086);
          color: #334155;
          cursor: pointer;
          font-size: 11px;
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
          font-weight: 700;
        }

        .service-rich-link-editor button:hover {
          background: rgba(21,101,192,0.14);
          color: #1565C0;
        }

        .service-rich-link-editor .service-rich-link-remove {
          color: #DC2626;
        }

        .service-rich-link-editor .service-rich-link-cancel {
          color: #475569;
        }

        .service-color-tool {
          position: relative;
          width: 34px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          cursor: pointer;
          color: #334155;
          overflow: hidden;
          border: 1px solid transparent;
        }

        .service-color-tool:hover {
          background: rgba(21,101,192,0.125);
          border-color: rgba(21,101,192,0.2);
        }

        .service-color-tool input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .service-color-icon {
          font-size: 15px;
          font-weight: 900;
          border-bottom: 3px solid #00E5FF;
          line-height: 20px;
        }

        .service-highlight-icon {
          font-size: 15px;
          font-weight: 900;
          background: linear-gradient(transparent 58%, #FFF59D 58%);
          line-height: 20px;
        }

        .service-mark-ins {
          text-decoration: underline;
          text-decoration-color: #059669;
          text-decoration-thickness: 2px;
          font-size: 9px;
        }

        .service-mark-del {
          text-decoration: line-through;
          text-decoration-color: #DC2626;
          font-size: 9px;
        }

        .service-rich-editor-divider {
          width: 1px;
          height: 20px;
          background: rgba(30,58,138,0.128);
          margin: 0 4px;
        }

        .service-rich-editor .ProseMirror {
          min-height: 240px;
          padding: 14px;
          outline: none;
          color: #0F172A;
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
          font-size: 0.82rem;
          line-height: 2;
          direction: rtl;
          text-align: right;
        }

        .service-rich-editor .ProseMirror p {
          margin: 0 0 10px;
        }

        .service-rich-editor .ProseMirror p:last-child {
          margin-bottom: 0;
        }

        .service-rich-editor .ProseMirror u,
        .service-rich-editor .ProseMirror span[style*="text-decoration"] {
          text-decoration-line: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 0.34em;
          text-decoration-skip-ink: none;
          -webkit-text-decoration-skip: none;
          text-decoration-color: currentColor;
        }

        .service-rich-editor .ProseMirror h1 {
          margin: 20px 0 12px;
          color: #0F172A;
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.55;
        }

        .service-rich-editor .ProseMirror h2 {
          margin: 18px 0 10px;
          color: #0F172A;
          font-size: 1.15rem;
          line-height: 1.6;
        }

        .service-rich-editor .ProseMirror h3 {
          margin: 16px 0 9px;
          color: #0F172A;
          font-size: 1rem;
          line-height: 1.6;
        }

        .service-rich-editor .ProseMirror ul,
        .service-rich-editor .ProseMirror ol {
          padding-right: 30px;
          padding-left: 0;
          margin: 10px 0 14px;
        }

        .service-rich-editor .ProseMirror ul {
          list-style-type: disc;
        }

        .service-rich-editor .ProseMirror ol {
          list-style-type: decimal;
        }

        .service-rich-editor .ProseMirror li {
          display: list-item;
          padding-right: 4px;
          margin: 4px 0;
        }

        .service-rich-editor .ProseMirror li::marker {
          color: #475569;
          font-weight: 700;
        }


        .service-rich-editor .ProseMirror [data-service-more] {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 18px 0;
          color: #52627A;
          font-size: 10px;
          font-weight: 700;
          user-select: none;
        }

        .service-rich-editor .ProseMirror [data-service-more]::before,
        .service-rich-editor .ProseMirror [data-service-more]::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(100,116,139,0.234);
        }

        .service-rich-editor .ProseMirror hr {
          border: 0;
          border-top: 1px solid rgba(100,116,139,0.325);
          margin: 18px 0;
        }

        .service-rich-editor .ProseMirror code {
          background: rgba(100,116,139,0.156);
          border-radius: 4px;
          padding: 2px 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.9em;
        }

        .service-rich-editor .ProseMirror blockquote {
          border-right: 3px solid rgba(21,101,192,0.62);
          border-left: 0;
          margin: 12px 0;
          padding: 4px 12px;
          color: #475569;
        }

        .service-rich-editor .ProseMirror a,
        .service-rich-preview a {
          color: #1565C0;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .service-rich-preview .ProseMirror {
          outline: none;
          color: #334155;
          direction: rtl;
          text-align: right;
        }

        .service-rich-preview .ProseMirror p {
          margin: 0 0 10px;
        }

        .service-rich-preview .ProseMirror h1,
        .service-rich-preview .ProseMirror h2,
        .service-rich-preview .ProseMirror h3 {
          color: #0F172A;
          line-height: 1.7;
          margin: 16px 0 9px;
        }

        .service-rich-preview .ProseMirror ul,
        .service-rich-preview .ProseMirror ol {
          padding-right: 22px;
        }

        .service-rich-preview .ProseMirror blockquote {
          border-right: 3px solid rgba(21,101,192,0.545);
          padding-right: 12px;
          color: #475569;
        }

        /* ───────── TABLE ───────── */

        
        .service-rich-editor .ProseMirror table,
        .service-rich-editor .ProseMirror table *,
        .service-rich-preview .ProseMirror table,
        .service-rich-preview .ProseMirror table * {
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
        }


        .service-rich-editor .ProseMirror .tableWrapper,
        .service-rich-preview .ProseMirror .tableWrapper {
          overflow-x: auto;
          margin: 1.2rem 0;
          border-radius: .75rem;
          border: 1px solid rgba(21,101,192,0.17);
        }

        .service-rich-editor .ProseMirror table,
        .service-rich-preview .ProseMirror table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          min-width: 420px;
          table-layout: fixed;
          direction: rtl;
          margin: 0;
          overflow: hidden;
        }

        .service-rich-editor .ProseMirror table td,
        .service-rich-editor .ProseMirror table th,
        .service-rich-preview .ProseMirror table td,
        .service-rich-preview .ProseMirror table th {
          position: relative;
          min-width: 80px;
          padding: 10px 14px;
          vertical-align: top;
          border-bottom: 1px solid rgba(30,58,138,0.12);
          border-left: 1px solid rgba(30,58,138,0.12);
          text-align: right;
          box-sizing: border-box;
          line-height: 1.9;
        }

        .service-rich-editor .ProseMirror table td:last-child,
        .service-rich-editor .ProseMirror table th:last-child,
        .service-rich-preview .ProseMirror table td:last-child,
        .service-rich-preview .ProseMirror table th:last-child {
          border-left: 0;
        }

        .service-rich-editor .ProseMirror table tr:last-child td,
        .service-rich-editor .ProseMirror table tr:last-child th,
        .service-rich-preview .ProseMirror table tr:last-child td,
        .service-rich-preview .ProseMirror table tr:last-child th {
          border-bottom: 0;
        }

        .service-rich-editor .ProseMirror table th,
        .service-rich-preview .ProseMirror table th {
          background: rgba(21,101,192,0.09);
          color: #0F172A;
          font-weight: 800;
          font-size: .92rem;
        }

        .service-rich-editor .ProseMirror table tbody tr:nth-child(even) td:not([style*="background"]),
        .service-rich-preview .ProseMirror table tbody tr:nth-child(even) td:not([style*="background"]) {
          background: rgba(30,58,138,0.025);
        }

        .service-rich-editor .ProseMirror table td p,
        .service-rich-editor .ProseMirror table th p,
        .service-rich-preview .ProseMirror table td p,
        .service-rich-preview .ProseMirror table th p {
          margin: 0;
          color: inherit;
        }

        .service-rich-editor .ProseMirror table .selectedCell::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(21,101,192,0.16);
          pointer-events: none;
          z-index: 2;
        }

        .service-rich-editor .ProseMirror table .column-resize-handle {
          position: absolute;
          left: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #1565C0;
          pointer-events: none;
          z-index: 3;
        }

        .service-rich-editor .ProseMirror.resize-cursor {
          cursor: col-resize;
        }

        /* ───────── RESPONSIVE ───────── */

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

          .services-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .service-title-grid,
          .service-icon-grid {
            grid-template-columns: 1fr !important;
          }

          .services-table {
            min-width: 760px;
          }

          .services-drawer {
            width: 100vw !important;
          }
        }

        @media (max-width: 480px) {
          .services-page-main {
            padding: 16px 10px !important;
          }

          .services-stats {
            grid-template-columns: 1fr !important;
          }

          .services-drawer-footer {
            flex-direction: column !important;
          }

          .services-drawer-footer > button {
            width: 100%;
          }
        }

        .service-eye-button:hover {
  background: rgba(21,101,192,0.14) !important;
  border-color: rgba(21,101,192,0.44) !important;
  color: #1565C0 !important;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(21,101,192,0.2);
}

.service-eye-button:active {
  transform: translateY(0);
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
    </div>
  );
}





