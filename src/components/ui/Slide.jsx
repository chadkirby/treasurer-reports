export default function Slide({ title, subtitle, children }) {
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
