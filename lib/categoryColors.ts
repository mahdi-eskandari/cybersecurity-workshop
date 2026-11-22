export type CategoryBadgeColors = {
  color: string;
  background: string;
  border: string;
};

type CategoryPalette = {
  dark: CategoryBadgeColors;
  light: CategoryBadgeColors;
};

const normalize = (value: string) => value.replace(/[\u200c\u200d\s]/g, "").trim();

// دسته‌های پیش‌فرض: رنگشان در خود دو فایل تعریف شده و اینجا دست نمی‌خورند
const RESERVED_LABELS = new Set(
  [
    "گزارش‌های جرم‌شناسی",
    "اخبار حقوقی",
    "پرونده‌های حل‌شده",
    "هشدارهای امنیتی",
    "آموزش امنیت و تهدیدات سایبری",
    "تهدیدات سایبری",
    "بدون دسته‌بندی",
  ].map(normalize)
);

const PALETTES: CategoryPalette[] = [
  // سرخابی (مجنتا)
  {
    dark: { color: "#F0ABFC", background: "#33123A", border: "#5E2468" },
    light: { color: "#A21CAF", background: "#FDF4FF", border: "#F5D0FE" },
  },

  {
    dark: { color: "#a8ebf9", background: "#12353afe", border: "#26606b" },
    light: { color: "#2fa0b2", background: "#f2fcfd", border: "#cfeffb" },
  },
  // صورتی
  {
    dark: { color: "#F9A8D4", background: "#3A1228", border: "#6B2650" },
    light: { color: "#BE185D", background: "#FDF2F8", border: "#FBCFE8" },
  },
];

// ترتیب دسته‌های غیرپیش‌فرض (برای اینکه رنگ‌ها بر اساس ترتیب پخش بشن)
let customOrder: string[] = [];

export function setCategoryOrder(labels: string[]) {
  const seen: string[] = [];
  for (const l of labels) {
    const k = normalize(l || "");
    if (k && !RESERVED_LABELS.has(k) && !seen.includes(k)) seen.push(k);
  }
  customOrder = seen;
}

// برای دسته‌های پیش‌فرض null برمی‌گردد (یعنی همان استایل قبلی خودشان)
export function getNewCategoryColors(
  label: string | undefined,
  darkMode: boolean
): CategoryBadgeColors | null {
  const key = normalize(label || "");

  if (!key || RESERVED_LABELS.has(key)) return null;

  let index = customOrder.indexOf(key);

  if (index === -1) {
    // اگه دسته توی لیست ثبت‌شده نبود، همون هش قبلی به‌عنوان جایگزین
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    index = hash;
  }

  const palette = PALETTES[index % PALETTES.length];
  return darkMode ? palette.dark : palette.light;
}