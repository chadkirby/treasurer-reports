export default function Slide({ title, subtitle, children }) {
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {(title || subtitle) && (
        <div className="mb-8 pb-4 border-b border-slate-100">
          {title && <h1 className="text-4xl font-normal text-black font-serif italic mb-2">{title}</h1>}
          {subtitle && <p className="text-slate-600 text-lg font-serif">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
