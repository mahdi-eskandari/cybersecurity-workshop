export default function AuthLayout({ children }) {
 return (
<div className="relative flex items-center justify-center overflow-hidden bg-slate-950">

      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-600/30 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-[450px] w-[450px] rounded-full bg-indigo-600/25 blur-[150px]" />

{children}
    </div>
  );
}
