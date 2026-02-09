import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useData } from '../../hooks/useData';

export default function MarkdownBlock({ filename, className = '' }) {
  const { data, loading, error } = useData(filename);

  if (loading) return <div className="animate-pulse h-20 bg-slate-100 rounded"></div>;
  if (error) return <div className="text-red-500 text-sm">Error loading content: {error.message}</div>;

  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}
