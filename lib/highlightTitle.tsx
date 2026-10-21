// lib/highlightTitle.tsx
// تابع‌های خالص (بدون hook و بدون دیتابیس): هم توی کامپوننت‌های سروری و هم کلاینتی قابل استفاده‌اند.
//
// "هیچ مجرمی در دنیای دیجیتال {بی‌ردپا} نیست"
//   → کلمه‌ی داخل { } با استایل مخصوص، و (اختیاری) شکستن خط بر اساس تعداد کلمه

import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";

type HighlightProps = {
  className?: string;
  style?: CSSProperties;
  /** اگر true باشد، قبل از کلمه‌ی داخل { } یک خط جدید (<br />) می‌آید */
  breakBefore?: boolean;
  /**
   * حداکثر تعداد کلمه در هر خط (مثلاً 5). خطوط متعادل تقسیم می‌شوند:
   * 7 کلمه → 4 + 3 ، 9 کلمه → 5 + 4 ، 10 کلمه → 5 + 5
   */
  maxWordsPerLine?: number;
  /**
   * تعداد کلمه‌ی خط اول (مثلاً 6). بقیه‌ی کلمه‌ها در خط‌های بعدی می‌آیند:
   * اگر maxWordsPerLine هم داده شود متعادل پخش می‌شوند، وگرنه همه در یک خط می‌روند.
   */
  firstLineWords?: number;
  /**
   * کلاس <br />ها. پیش‌فرض: در موبایل (زیر 640px) شکست خط اجباری نیست
   * چون 4 کلمه با فونت بزرگ جا نمی‌شود. برای اجبار در همه‌ی اندازه‌ها "" بده.
   */
  lineBreakClassName?: string;
};

// هر گروه معتبر: یک { و یک } که داخلش آکولاد دیگری نیست
const GROUP = /(\{[^{}]+\})/g;

type Word = { text: string; highlighted: boolean };

/** متن را به کلمه تبدیل می‌کند و مشخص می‌کند کدام کلمه‌ها داخل { } بوده‌اند */
function tokenize(text: string): Word[] {
  const words: Word[] = [];

  text.split(GROUP).forEach((part, i) => {
    const highlighted = i % 2 === 1;
    const content = highlighted ? part.slice(1, -1) : part;

    content
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => words.push({ text: w, highlighted }));
  });

  return words;
}

/** تقسیم متعادل: ابتدا تعداد خطوط، بعد کلمه‌های اضافه از خط اول شروع به پخش می‌شوند */
function lineSizes(total: number, max: number): number[] {
  const lines = Math.max(1, Math.ceil(total / max));
  const base = Math.floor(total / lines);
  const extra = total % lines;

  return Array.from({ length: lines }, (_, k) => base + (k < extra ? 1 : 0));
}

/**
 * متن عنوان را به آرایه‌ای از متن ساده و <span> تبدیل می‌کند.
 * اگر آکولادی در متن نباشد و گزینه‌ای هم نداده باشی، خروجی دقیقاً خود متن است.
 * از dangerouslySetInnerHTML استفاده نشده، پس متن ادمین هیچ‌وقت به‌عنوان HTML اجرا نمی‌شود.
 *
 * نکته: آکولادها باید دور کلمه‌ی کامل باشند (نه وسط کلمه).
 */
export function renderHighlightedTitle(
  text?: string | null,
  {
    breakBefore = false,
    maxWordsPerLine,
    firstLineWords,
    lineBreakClassName = "hidden sm:inline",
    ...spanProps
  }: HighlightProps = {}
): ReactNode {
  if (!text) return null;

  const hasMax = !!maxWordsPerLine && maxWordsPerLine > 0;
  const hasFirst = !!firstLineWords && firstLineWords > 0;

  // حالت شکستن خط بر اساس تعداد کلمه
  if (hasMax || hasFirst) {
    const words = tokenize(text);
    const max = hasMax ? Math.max(1, Math.floor(maxWordsPerLine as number)) : Infinity;

    let sizes: number[];
    if (hasFirst) {
      const first = Math.max(1, Math.floor(firstLineWords as number));
      sizes =
        words.length > first
          ? [first, ...lineSizes(words.length - first, max)]
          : [words.length];
    } else {
      sizes = lineSizes(words.length, max);
    }

    // ایندکس کلمه‌هایی که قبلشان خط جدید می‌آید
    const breakAt = new Set<number>();
    let acc = 0;
    sizes.slice(0, -1).forEach((s) => {
      acc += s;
      breakAt.add(acc);
    });

    const nodes: ReactNode[] = [];

    words.forEach((w, idx) => {
      if (idx > 0) {
        nodes.push(" ");
        if (breakAt.has(idx)) {
          nodes.push(
            <br key={`br-${idx}`} className={lineBreakClassName || undefined} />
          );
        }
      }

      nodes.push(
        w.highlighted ? (
          <span key={`w-${idx}`} {...spanProps}>
            {w.text}
          </span>
        ) : (
          w.text
        )
      );
    });

    return nodes;
  }

  // حالت ساده: فقط استایل کلمه‌ی داخل { } (و اختیاری: خط جدید قبل از آن)
  const parts = text.split(GROUP);

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;

    // اگر کلمه‌ی داخل { } اولِ عنوان باشد، شکستن خط معنی ندارد
    const hasTextBefore = parts.slice(0, i).join("").trim() !== "";

    return (
      <Fragment key={i}>
        {breakBefore && hasTextBefore ? <br /> : null}
        <span {...spanProps}>{part.slice(1, -1)}</span>
      </Fragment>
    );
  });
}

/** حذف آکولادها؛ برای جاهایی که فقط متن ساده لازم است (aria-label، JSON-LD، title و ...) */
export function stripHighlightMarkers(text: string): string {
  return text.replace(/[{}]/g, "");
}

/** همه‌ی آکولادها باید جفت و بدون تو در تو باشند و داخل هر جفت چیزی نوشته شده باشد */
export function isValidHighlightTitle(text: string): boolean {
  return !/[{}]/.test(text.replace(/\{[^{}]+\}/g, ""));
}
