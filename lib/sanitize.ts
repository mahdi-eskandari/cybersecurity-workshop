import DOMPurify from "isomorphic-dompurify";

export const cleanSvg = (v: unknown) =>
  typeof v === "string" && v.trim()
    ? DOMPurify.sanitize(v.trim(), { USE_PROFILES: { svg: true, svgFilters: true } })
    : "";

export const cleanHtml = (v: unknown) =>
  typeof v === "string" ? DOMPurify.sanitize(v) : "";