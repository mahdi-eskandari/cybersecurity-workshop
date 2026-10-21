"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

const BLUE = "#1565C0";
const CYAN = "#00E5FF";

export default function ServiceFaq({
  faqs,
  darkMode,
}: {
  faqs?: ServiceFaqItem[] | null;
  darkMode: boolean;
}) {
  const baseId = useId();
const [openFaq, setOpenFaq] = useState<number | null>(null);
  const items = (Array.isArray(faqs) ? faqs : []).filter(
    (item) => item?.question?.trim() && item?.answer?.trim()
  );

  if (items.length === 0) return null;

  const accent = darkMode ? CYAN : BLUE;

  const t = darkMode
    ? {
        sectionBg: "#060b199d",
        sectionBorder: "1px solid rgba(0,229,255,0.07)",
        tag: "rgba(0,229,255,0.45)",
        title: "#FFFFFF",
        text: "#64748B",
        helpBg: "rgba(0,229,255,0.04)",
        helpBorder: "1px solid rgba(0,229,255,0.12)",
        helpTitle: "#E2E8F0",
        helpText: "#475569",
        cardBg: "rgba(255,255,255,0.025)",
        cardBgOpen: "rgba(0,229,255,0.055)",
        cardBorder: "1px solid rgba(0,229,255,0.1)",
        cardBorderOpen: "1px solid rgba(0,229,255,0.28)",
        question: "#CBD5E1",
        questionOpen: "#FFFFFF",
        chevronBg: "rgba(0,229,255,0.07)",
        answer: "#64748B",
        dotGlow: "0 0 8px rgba(0,229,255,0.7)",
      }
    : {
        sectionBg: "#F8FAFC",
sectionBorder: "1px solid rgba(21,101,192,0.14)",
        tag: BLUE,
        title: "#0F172A",
        text: "#475569",
        helpBg: "rgba(21,101,192,0.04)",
        helpBorder: "1px solid rgba(21,101,192,0.18)",
        helpTitle: "#0F172A",
        helpText: "#475569",
        cardBg: "#FFFFFF",
        cardBgOpen: "rgba(21,101,192,0.055)",
        cardBorder: "1px solid rgba(21,101,192,0.14)",
        cardBorderOpen: "1px solid rgba(21,101,192,0.4)",
        question: "#334155",
        questionOpen: "#0F172A",
        chevronBg: "rgba(21,101,192,0.08)",
        answer: "#475569",
        dotGlow: "none",
      };

  return (
    <motion.section
  id="faq"
  className="scroll-mt-24 px-6 py-20 md:px-12"
  style={{
    background: t.sectionBg,
    borderTop: t.sectionBorder,
    borderBottom: t.sectionBorder,
  }}
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
        {/* ───── متن ثابت ───── */}
        <div>
          <span
            className="block mb-3 font-bold"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.7rem",
              color: t.tag,
              letterSpacing: "0.18em",
            }}
          >
            پاسخ‌های شفاف و کوتاه
          </span>

          <h2
            className="font-bold mb-4"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.1rem)",
              color: t.title,
              lineHeight: 1.5,
            }}
          >
            پرسش‌های متداول
          </h2>

          <p style={{ color: t.text, fontSize: "0.9rem", lineHeight: 1.9 }}>
            پاسخ پرسش‌های رایج درباره ردیابی دارایی دیجیتال، روند بررسی و شیوه
            حفاظت از اطلاعات پرونده.
          </p>

          <div
            className="mt-7 p-4 rounded-xl"
            style={{ background: t.helpBg, border: t.helpBorder }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: t.dotGlow,
                  flexShrink: 0,
                }}
              />
              <span
                className="font-semibold text-sm"
                style={{ color: t.helpTitle }}
              >
                پاسخ پرسش شما اینجا نیست؟
              </span>
            </div>

            <p
              style={{
                color: t.helpText,
                fontSize: "0.78rem",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              جزئیات پرونده را محرمانه ارسال کنید تا کارشناس پاراهور امکان
              پیگیری را بررسی کند.
            </p>
          </div>
        </div>

        {/* ───── لیست سوالات ───── */}
        <div className="space-y-3">
          {items.map((faq, index) => {
            const isOpen = openFaq === index;
            const answerId = `${baseId}-answer-${index}`;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl"
                style={{
                  background: isOpen ? t.cardBgOpen : t.cardBg,
                  border: isOpen ? t.cardBorderOpen : t.cardBorder,
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease",
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 p-4 text-right"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{
                      color: isOpen ? t.questionOpen : t.question,
                      fontSize: "0.85rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: t.chevronBg, color: accent }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-hidden={!isOpen}
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <p
                      className="px-5 pb-5"
                      style={{
                        color: t.answer,
                        fontSize: "0.78rem",
                        lineHeight: 1.95,
                        margin: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}