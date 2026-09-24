/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // 👈 این خیلی مهمه
  ],
 theme: {
  extend: {
    fontFamily: {
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "var(--font-vazirmatn)", "monospace"],
    },
  },
},
  plugins: [],
};
