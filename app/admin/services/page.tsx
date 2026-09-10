"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

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
};

interface Service {
  id: string;

  slug: string;
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
}

type ServiceForm = {
  slug: string;
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
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.28)",
  },

  draft: {
    label: "پیش نویس",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.2)",
  },

  hidden: {
    label: "پنهان",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
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
    color: "#10B981",
  },

  specialized: {
    label: "تخصصی",
    color: "#00E5FF",
  },

  advanced: {
    label: "پیشرفته",
    color: "#A78BFA",
  },

  complex: {
    label: "پیچیده",
    color: "#F59E0B",
  },
};

/* ───────────────── STYLES ───────────────── */

const inputStyle = (
  hasError = false
): CSSProperties => ({
  background: "#060B19",

  border: hasError
    ? "1px solid rgba(239,68,68,0.55)"
    : "1px solid rgba(255,255,255,0.07)",

  borderRadius: 9,

  padding: "9px 12px",

  color: "#E2E8F0",

  fontSize: "0.82rem",

  fontFamily:
    "var(--font-vazirmatn), Vazirmatn, sans-serif",

  outline: "none",

  caretColor: "#00E5FF",

  width: "100%",

  boxSizing: "border-box",

  lineHeight: 1.7,

  transition:
    "border-color 0.15s, box-shadow 0.15s",
});

const errorStyle: CSSProperties = {
  color: "#EF4444",
  fontSize: "0.64rem",
  marginTop: 1,
};

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
            color: error ? "#EF4444" : "#94A3B8",
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
              color: "#334155",
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

function RichTextEditor({
  value,
  onChange,
}: {
  value: TiptapContent;
  onChange: (value: TiptapContent) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: (value?.type === "doc" ? value : EMPTY_TIPTAP_CONTENT) as any,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        dir: "rtl",
        class: "service-rich-editor-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as TiptapContent);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(value?.type === "doc" ? value : EMPTY_TIPTAP_CONTENT);

    if (current !== next) {
      editor.commands.setContent(
        (value?.type === "doc" ? value : EMPTY_TIPTAP_CONTENT) as any
      );
    }
  }, [editor, value]);

  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkEditor, setShowLinkEditor] = useState(false);

  if (!editor) return null;

  const run = (command: () => boolean) => {
    command();
  };

  const openLinkEditor = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setShowLinkEditor(true);
  };

  const applyLink = () => {
    const url = linkUrl.trim();

    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }

    setShowLinkEditor(false);
    editor.commands.focus();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkUrl("");
    setShowLinkEditor(false);
  };

  const buttonStyle = (active = false): CSSProperties => ({
    width: 32,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    border: active
      ? "1px solid rgba(0,229,255,0.28)"
      : "1px solid transparent",
    background: active
      ? "rgba(0,229,255,0.10)"
      : "transparent",
    color: active ? "#00E5FF" : "#64748B",
    cursor: "pointer",
    fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
    fontSize: 12,
    fontWeight: 700,
  });

  return (
    <div className="service-rich-editor">
      <div className="service-rich-editor-toolbar">
        <button
          type="button"
          title="عنوان اصلی"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run(() => editor.chain().focus().toggleHeading({ level: 1 }).run())
          }
          style={buttonStyle(editor.isActive("heading", { level: 1 }))}
        >
          H1
        </button>

        <button
          type="button"
          title="عنوان ۲"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run(() => editor.chain().focus().toggleHeading({ level: 2 }).run())
          }
          style={buttonStyle(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>

        <button
          type="button"
          title="عنوان ۳"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run(() => editor.chain().focus().toggleHeading({ level: 3 }).run())
          }
          style={buttonStyle(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>

        <span className="service-rich-editor-divider" />

        <button
          type="button"
          title="Bold"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleBold().run())}
          style={buttonStyle(editor.isActive("bold"))}
        >
          B
        </button>

        <button
          type="button"
          title="Italic"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleItalic().run())}
          style={{ ...buttonStyle(editor.isActive("italic")), fontStyle: "italic" }}
        >
          I
        </button>

        <button
          type="button"
          title="خط خورده"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleStrike().run())}
          style={buttonStyle(editor.isActive("strike"))}
        >
          S
        </button>

        <button
          type="button"
          title="زیرخط"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleUnderline().run())}
          style={{ ...buttonStyle(editor.isActive("underline")), textDecoration: "underline" }}
        >
          U
        </button>

        <span className="service-rich-editor-divider" />

        <button
          type="button"
          title="لیست نقطه‌ای"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}
          style={buttonStyle(editor.isActive("bulletList"))}
        >
          <span className="service-list-icon">
            <span>•</span><span>•</span><span>•</span>
          </span>
        </button>

        <button
          type="button"
          title="لیست شماره‌ای"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}
          style={buttonStyle(editor.isActive("orderedList"))}
        >
          <span className="service-list-icon service-number-list-icon">
            <span>1.</span><span>2.</span><span>3.</span>
          </span>
        </button>

        <button
          type="button"
          title="نقل قول"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())}
          style={buttonStyle(editor.isActive("blockquote"))}
        >
          ❝
        </button>

        <button
          type="button"
          title="خط جداکننده"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().setHorizontalRule().run())}
          style={buttonStyle()}
        >
          —
        </button>

        <span className="service-rich-editor-divider" />

        <button
          type="button"
          title="لینک"
          onMouseDown={(e) => e.preventDefault()}
          onClick={openLinkEditor}
          style={buttonStyle(editor.isActive("link"))}
        >
          ↗
        </button>

        <button
          type="button"
          title="حذف فرمت"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(() => editor.chain().focus().clearNodes().unsetAllMarks().run())}
          style={buttonStyle()}
        >
          Tx
        </button>
      </div>

      {showLinkEditor && (
        <div className="service-rich-link-editor">
          <input
            type="url"
            dir="ltr"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                setShowLinkEditor(false);
              }
            }}
            placeholder="https://example.com"
            autoFocus
          />
          <button type="button" onClick={applyLink}>اعمال لینک</button>
          <button type="button" onClick={removeLink} className="service-rich-link-remove">حذف لینک</button>
          <button type="button" onClick={() => setShowLinkEditor(false)} className="service-rich-link-cancel">انصراف</button>
        </div>
      )}

      <EditorContent editor={editor} />
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
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
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
        }))
      : [
          { tag: "", title: "", description: "" },
          { tag: "", title: "", description: "" },
          { tag: "", title: "", description: "" },
        ],

  metaTitle:
    item?.metaTitle ?? "",

  metaDescription:
    item?.metaDescription ?? "",
});


















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
    { tag: "", title: "", description: "" },
    { tag: "", title: "", description: "" },
    { tag: "", title: "", description: "" },
  ],

  metaTitle: "",
  metaDescription: "",
},
  });

  const currentStatus =
    watch("status");

  const currentLevel =
    watch("level");

  const currentIcon =
    watch("icon");

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
        })),

        metaTitle:
          service.metaTitle,

        metaDescription:
          service.metaDescription,
      });
    } else {
      reset({
        slug: "",
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
          { tag: "", title: "", description: "" },
          { tag: "", title: "", description: "" },
          { tag: "", title: "", description: "" },
        ],

        metaTitle: "",
        metaDescription: "",
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
  })),

  metaTitle:
    data.metaTitle.trim(),

  metaDescription:
    data.metaDescription.trim(),
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
      background: "rgba(2, 6, 23, 0.75)",
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
        background: "#0F172A",
        border: "1px solid #334155",
        borderRadius: 20,
        boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 22px",
          borderBottom: "1px solid #1E293B",
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
              color: "#F8FAFC",
              marginBottom: 5,
            }}
          >
            مشاهده خدمت
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#64748B",
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
            border: "1px solid #334155",
            background: "#111827",
            color: "#94A3B8",
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
              background: "#111827",
              border: "1px solid #334155",
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
                color: "#F8FAFC",
                marginBottom: 5,
              }}
            >
              {previewTarget.title}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#64748B",
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
              background: "#111827",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
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
                    ? "#10B981"
                    : previewTarget.status === "hidden"
                    ? "#F59E0B"
                    : "#94A3B8",
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
              background: "#111827",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                marginBottom: 7,
              }}
            >
              سطح
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#E2E8F0",
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
              background: "#111827",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                marginBottom: 7,
              }}
            >
              دسته‌بندی
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#E2E8F0",
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
            background: "#111827",
            border: "1px solid #1E293B",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#94A3B8",
              marginBottom: 9,
            }}
          >
            توضیح کوتاه
          </div>

          <div
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: "#E2E8F0",
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
              background: "#111827",
              border: "1px solid #1E293B",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#94A3B8",
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
                    background: "#0F172A",
                    border: "1px solid #334155",
                    color: "#CBD5E1",
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
              background: "#111827",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#94A3B8",
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
                    color: "#64748B",
                    marginBottom: 5,
                  }}
                >
                  Meta Title
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#E2E8F0",
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
                    color: "#64748B",
                    marginBottom: 5,
                  }}
                >
                  Meta Description
                </div>

                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#CBD5E1",
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
          borderTop: "1px solid #1E293B",
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
            border: "1px solid #334155",
            background: "#1E293B",
            color: "#E2E8F0",
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
        background: "#050814",
        color: "#E2E8F0",
        fontFamily:
          "var(--font-vazirmatn), Vazirmatn, sans-serif",
      }}
    >
      <main
        className="services-page-main"
        style={{
          padding: "26px 22px",
          overflowY: "auto",
        }}
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
                    "#00E5FF",
                  boxShadow:
                    "0 0 7px rgba(0,229,255,0.9)",
                }}
              />

              <span
                style={{
                  fontFamily:
                    "monospace",
                  fontSize:
                    "0.6rem",
                  color:
                    "rgba(0,229,255,0.5)",
                  letterSpacing:
                    "0.18em",
                }}
              >
                SERVICES // CMS
              </span>
            </div>

            <h2
              style={{
                color: "#fff",
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
                  "#334155",
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
                "#00E5FF",
              border:
                "1px solid rgba(0,229,255,0.5)",
              color:
                "#050814",
              fontSize:
                "0.82rem",
              fontWeight: 700,
              fontFamily:
                "var(--font-vazirmatn), Vazirmatn, sans-serif",
              boxShadow:
                "0 0 20px rgba(0,229,255,0.25)",
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
                "#10B981",
            },

            {
              label: "پیش نویس",
              val: services.filter(
                (s) =>
                  s.status ===
                  "draft"
              ).length,
              color:
                "#94A3B8",
            },

            {
              label: "پنهان",
              val: services.filter(
                (s) =>
                  s.status ===
                  "hidden"
              ).length,
              color:
                "#F59E0B",
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
                    "#0A1128",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
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
                      "#475569",
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

        {/* TABLE */}

        <div
          style={{
            background:
              "#0A1128",
            border:
              "1px solid rgba(0,229,255,0.08)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding:
                "14px 20px",
              borderBottom:
                "1px solid rgba(0,229,255,0.06)",
              display: "flex",
              alignItems:
                "center",
              gap: 8,
            }}
          >
            <span
              style={{
                color: "#fff",
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
                  "#334155",
                fontSize:
                  "0.68rem",
                fontFamily:
                  "monospace",
              }}
            >
              {services.length} مورد
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
                      "1px solid rgba(255,255,255,0.04)",
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
                            "#334155",
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
                          "#475569",
                        fontSize:
                          "0.78rem",
                      }}
                    >
                      در حال دریافت
                      خدمات...
                    </td>
                  </tr>
                ) : services.length ===
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
                          "#475569",
                        fontSize:
                          "0.78rem",
                      }}
                    >
                      هنوز خدمتی
                      ثبت نشده است.
                    </td>
                  </tr>
                ) : (
                  services.map(
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
                              "1px solid rgba(255,255,255,0.03)",
                          }}
                          onMouseEnter={(
                            e
                          ) => {
                            e.currentTarget.style.background =
                              "rgba(0,229,255,0.028)";
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
                                    "rgba(0,229,255,0.06)",
                                  border:
                                    "1px solid rgba(0,229,255,0.12)",
                                  color:
                                    "#00E5FF",
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
                                      "#E2E8F0",
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
                                      "#334155",
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
                                  "#475569",
                                fontSize:
                                  "0.78rem",
                              }}
                            >
                              {
                                service.shortDesc
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
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "#475569",
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
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "#475569",
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
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "#475569",
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
        </div>
      </main>






{/* -_-_-_-_-_-_-_-_- MODAL -_-_-_-_-_-_-_-_- */}
{previewTarget && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1200,
      background: "rgba(5,8,20,0.78)",
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
        background: "#0A1128",
        border: "1px solid rgba(0,229,255,0.12)",
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#00E5FF",
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
              color: "#F8FAFC",
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
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#64748B",
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
              background: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.12)",
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
                color: "#F8FAFC",
                marginBottom: 5,
                wordBreak: "break-word",
              }}
            >
              {previewTarget.title}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#64748B",
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
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
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
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
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
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                marginBottom: 7,
              }}
            >
              دسته‌بندی
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#CBD5E1",
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
              color: "#94A3B8",
              marginBottom: 9,
            }}
          >
            توضیح کوتاه
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#CBD5E1",
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
              color: "#94A3B8",
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
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#CBD5E1",
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
              color: "#94A3B8",
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
                    background: "rgba(0,229,255,0.05)",
                    border: "1px solid rgba(0,229,255,0.10)",
                    color: "#94A3B8",
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
                color: "#475569",
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
              color: "#94A3B8",
              marginBottom: 9,
            }}
          >
            عنوان بخش شناسایی و ردیابی
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#CBD5E1",
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
      color: "#94A3B8",
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
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
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
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.14)",
                color: "#00E5FF",
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
                  background: "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.10)",
                  color: "#00E5FF",
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
              color: "#F8FAFC",
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
              color: "#94A3B8",
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
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "#475569",
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
              color: "#94A3B8",
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
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  marginBottom: 7,
                }}
              >
                Meta Title
              </div>

              <div
                style={{
                  color: "#CBD5E1",
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
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  marginBottom: 7,
                }}
              >
                Meta Description
              </div>

              <div
                style={{
                  color: "#CBD5E1",
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
          borderTop: "1px solid rgba(255,255,255,0.06)",
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
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#CBD5E1",
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
                "rgba(5,8,20,0.72)",
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

              background: "#0A1128",

              borderRight:
                "1px solid rgba(0,229,255,0.12)",

              boxShadow:
                "-24px 0 80px rgba(0,0,0,0.8)",

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
                  "linear-gradient(to bottom, rgba(0,229,255,0.5), rgba(0,229,255,0.1), transparent)",
              }}
            />

            <div
              style={{
                padding:
                  "18px 20px 16px",

                borderBottom:
                  "1px solid rgba(0,229,255,0.07)",

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
                      "rgba(0,229,255,0.45)",
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
                    color: "#fff",
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
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.07)",

                  color:
                    "#475569",
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
                            "rgba(0,229,255,0.06)",
                          border:
                            "1px solid rgba(0,229,255,0.14)",
                          color:
                            "#00E5FF",
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
                                  : "rgba(255,255,255,0.02)",

                              border:
                                selected
                                  ? `1px solid ${level.color}55`
                                  : "1px solid rgba(255,255,255,0.06)",

                              color:
                                selected
                                  ? level.color
                                  : "#475569",

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
                                  : "rgba(255,255,255,0.02)",

                              border:
                                selected
                                  ? `1px solid ${status.border}`
                                  : "1px solid rgba(255,255,255,0.06)",

                              color:
                                selected
                                  ? status.color
                                  : "#334155",

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
                                    : "#334155",
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
                      color: "#cbd5e1",
                    }}
                  >
                    مراحل شناسایی
                  </div>

                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#64748b",
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
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.015)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: "#94a3b8",
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
                    </div>
                  ))}
                </div>






                {/* SEO */}

                <div
                  style={{
                    background:
                      "rgba(5,8,20,0.6)",

                    border:
                      "1px solid rgba(0,229,255,0.1)",

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
                          "#00E5FF",
                        boxShadow:
                          "0 0 7px rgba(0,229,255,.5)",
                      }}
                    />

                    <span
                      style={{
                        color:
                          "#00E5FF",
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
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="services-drawer-footer"
                style={{
                  padding:
                    "14px 20px",

                  borderTop:
                    "1px solid rgba(0,229,255,0.07)",

                  display: "flex",

                  alignItems:
                    "center",

                  gap: 10,

                  flexShrink: 0,

                  background:
                    "#0A1128",
                }}
              >
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
                        ? "rgba(16,185,129,0.15)"
                        : "#00E5FF",

                    border:
                      saved
                        ? "1px solid rgba(16,185,129,0.4)"
                        : "1px solid rgba(0,229,255,0.5)",

                    color:
                      saved
                        ? "#10B981"
                        : "#050814",

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
                      "1px solid rgba(255,255,255,0.08)",

                    color:
                      "#475569",

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
                "rgba(5,8,20,0.78)",
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
                "#0A1128",
              border:
                "1px solid rgba(239,68,68,0.18)",
              borderRadius: 14,
              padding: 20,
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.65)",
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
                    "rgba(239,68,68,0.08)",
                  border:
                    "1px solid rgba(239,68,68,0.18)",
                  color:
                    "#EF4444",
                }}
              >
                <IconTrash />
              </div>

              <div>
                <div
                  style={{
                    color: "#fff",
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
                      "#475569",
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
                  "#94A3B8",
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
                    "#E2E8F0",
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
                    "rgba(239,68,68,0.1)",
                  border:
                    "1px solid rgba(239,68,68,0.25)",
                  color:
                    "#EF4444",
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
                    "rgba(255,255,255,0.03)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                  color:
                    "#64748B",
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
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          overflow: hidden;
          background: #060B19;
        }

        .service-rich-editor-toolbar {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-wrap: wrap;
          padding: 6px 8px;
          background: rgba(255,255,255,0.025);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .service-rich-editor-toolbar button:hover {
          color: #00E5FF !important;
          background: rgba(0,229,255,0.07) !important;
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

        .service-rich-link-editor {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          padding: 8px;
          background: rgba(0,229,255,0.035);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .service-rich-link-editor input {
          flex: 1 1 260px;
          min-width: 180px;
          height: 32px;
          padding: 0 10px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.09);
          outline: none;
          background: #0B1224;
          color: #E2E8F0;
          font-size: 12px;
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
        }

        .service-rich-link-editor input:focus {
          border-color: rgba(0,229,255,0.35);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.06);
        }

        .service-rich-link-editor button {
          height: 32px;
          padding: 0 10px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #CBD5E1;
          cursor: pointer;
          font-size: 11px;
          font-family: var(--font-vazirmatn), Vazirmatn, sans-serif;
          font-weight: 700;
        }

        .service-rich-link-editor button:hover {
          background: rgba(0,229,255,0.08);
          color: #00E5FF;
        }

        .service-rich-link-editor .service-rich-link-remove {
          color: #F87171;
        }

        .service-rich-link-editor .service-rich-link-cancel {
          color: #94A3B8;
        }

        .service-rich-editor-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.07);
          margin: 0 4px;
        }

        .service-rich-editor .ProseMirror {
          min-height: 240px;
          padding: 14px;
          outline: none;
          color: #E2E8F0;
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

        .service-rich-editor .ProseMirror h1 {
          margin: 20px 0 12px;
          color: #F8FAFC;
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.55;
        }

        .service-rich-editor .ProseMirror h2 {
          margin: 18px 0 10px;
          color: #F8FAFC;
          font-size: 1.15rem;
          line-height: 1.6;
        }

        .service-rich-editor .ProseMirror h3 {
          margin: 16px 0 9px;
          color: #F8FAFC;
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
          color: #94A3B8;
          font-weight: 700;
        }

        .service-rich-editor .ProseMirror hr {
          border: 0;
          border-top: 1px solid rgba(148,163,184,0.25);
          margin: 18px 0;
        }

        .service-rich-editor .ProseMirror code {
          background: rgba(148,163,184,0.12);
          border-radius: 4px;
          padding: 2px 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.9em;
        }

        .service-rich-editor .ProseMirror blockquote {
          border-right: 3px solid rgba(0,229,255,0.4);
          border-left: 0;
          margin: 12px 0;
          padding: 4px 12px;
          color: #94A3B8;
        }

        .service-rich-editor .ProseMirror a,
        .service-rich-preview a {
          color: #00E5FF;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .service-rich-preview .ProseMirror {
          outline: none;
          color: #CBD5E1;
          direction: rtl;
          text-align: right;
        }

        .service-rich-preview .ProseMirror p {
          margin: 0 0 10px;
        }

        .service-rich-preview .ProseMirror h1,
        .service-rich-preview .ProseMirror h2,
        .service-rich-preview .ProseMirror h3 {
          color: #F8FAFC;
          line-height: 1.7;
          margin: 16px 0 9px;
        }

        .service-rich-preview .ProseMirror ul,
        .service-rich-preview .ProseMirror ol {
          padding-right: 22px;
        }

        .service-rich-preview .ProseMirror blockquote {
          border-right: 3px solid rgba(0,229,255,0.35);
          padding-right: 12px;
          color: #94A3B8;
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
  background: rgba(0, 229, 255, 0.08) !important;
  border-color: rgba(0, 229, 255, 0.28) !important;
  color: #00E5FF !important;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.12);
}

.service-eye-button:active {
  transform: translateY(0);
}


.service-edit-button:hover {
  background: rgba(167, 139, 250, 0.08) !important;
  border-color: rgba(167, 139, 250, 0.28) !important;
  color: #A78BFA !important;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(167, 139, 250, 0.12);
}

.service-edit-button:active {
  transform: translateY(0);
}

.service-delete-button:hover {
  background: rgba(239, 68, 68, 0.08) !important;
  border-color: rgba(239, 68, 68, 0.28) !important;
  color: #EF4444 !important;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.12);
}

.service-delete-button:active {
  transform: translateY(0);
}


      `}</style>
    </div>
  );
}



