const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

export const toLatinDigits = (s: string) =>
  s.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = FA.indexOf(d);
    return String(i >= 0 ? i : AR.indexOf(d));
  });