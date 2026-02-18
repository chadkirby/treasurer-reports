import React from 'react';

const TONE_CLASSES = {
  default: 'text-slate-900',
  blue: 'text-blue-700',
  teal: 'text-teal-700',
  muted: 'text-slate-700',
};

export function SummaryPanel({ title, children, className = '' }) {
  return (
    <section className={`bg-white p-8 border border-slate-200 ${className}`}>
      {title && <h4 className="font-bold mb-6 italic font-serif text-lg">{title}</h4>}
      {children}
    </section>
  );
}

export function SummaryGrid({ children, className = '' }) {
  return <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ${className}`}>{children}</div>;
}

export function SummaryMetric({
  label,
  value,
  tone = 'default',
  compact = false,
  className = '',
  labelClassName = '',
  valueClassName = '',
  labelTitle,
}) {
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.default;
  const sizeClass = compact
    ? 'text-[clamp(1.2rem,1.6vw,1.7rem)]'
    : 'text-[clamp(1.9rem,2.4vw,2.6rem)]';

  return (
    <article className={`bg-white border border-slate-200 p-4 ${className}`}>
      <div
        className={`text-[12px] uppercase tracking-[0.06em] font-sans font-bold text-slate-500 ${labelClassName}`}
        title={labelTitle}
      >
        {label}
      </div>
      <div className={`${sizeClass} ${toneClass} font-serif italic leading-none mt-2 ${valueClassName}`}>
        {value}
      </div>
    </article>
  );
}

export default SummaryPanel;
