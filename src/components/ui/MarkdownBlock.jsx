import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useData } from '../../hooks/useData';
import { publicUrl } from '../../utils/publicUrl';

export default function MarkdownBlock({ filename, className = '' }) {
  const { data, loading, error } = useData(filename);
  const urlTransform = (url) => {
    if (!url) return url;
    if (/^[a-z]+:\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
      return url;
    }
    if (url.startsWith('/')) {
      return publicUrl(url);
    }
    if (url.startsWith('sources/') || url.startsWith('assets/')) {
      return publicUrl(url);
    }
    return url;
  };

  if (loading) return <div className="animate-pulse h-20 bg-[#f3efe3] rounded"></div>;
  if (error) return <div className="text-red-500 text-sm">Error loading content: {error.message}</div>;

  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown
        children={typeof data === 'string' ? data : ''}
        urlTransform={urlTransform}
      />
    </div>
  );
}
