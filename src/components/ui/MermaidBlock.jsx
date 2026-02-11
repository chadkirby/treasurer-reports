import React, { useEffect, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import { useData } from '../../hooks/useData';

let mermaidInitialized = false;

export default function MermaidBlock({ filename, className = '' }) {
  const { data, loading, error } = useData(filename);
  const [svg, setSvg] = useState('');

  const diagramText = useMemo(() => (typeof data === 'string' ? data : ''), [data]);

  useEffect(() => {
    if (!diagramText) return;

    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        flowchart: { curve: 'basis' },
        themeVariables: {
          fontFamily: '"Times New Roman", serif',
          fontSize: '20px',
          primaryColor: '#ffffff',
          primaryTextColor: '#0f172a',
          lineColor: '#64748b',
        },
      });
      mermaidInitialized = true;
    }

    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;

    mermaid
      .render(id, diagramText)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) setSvg(renderedSvg);
      })
      .catch(() => {
        if (!cancelled) setSvg('');
      });

    return () => {
      cancelled = true;
    };
  }, [diagramText]);

  if (loading) return <div className="animate-pulse h-24 bg-slate-100 rounded" />;
  if (error) return <div className="text-red-500 text-sm">Error loading diagram: {error.message}</div>;

  return (
    <div className={`w-full ${className}`}>
      {svg ? (
        <div className="w-full overflow-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="text-sm text-slate-500">Diagram failed to render.</div>
      )}
    </div>
  );
}
