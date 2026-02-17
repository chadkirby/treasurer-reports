import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useData } from '../../hooks/useData';
import { publicUrl } from '../../utils/publicUrl';
import { useDeckContext } from '../../context/DeckContext';
import { getMarkdownFilenameForSlide } from '../../slides/registry';

export default function MarkdownBlock({ filename, contentKey = 'main', className = '' }) {
  const { activeDeck, currentSlide } = useDeckContext();
  const resolvedFilename = filename || getMarkdownFilenameForSlide(currentSlide, activeDeck, contentKey);
  const { data, loading, error } = useData(resolvedFilename);
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

  if (!resolvedFilename) {
    return (
      <div className="text-red-500 text-sm">
        Missing markdown source for key "{contentKey}" on this slide.
      </div>
    );
  }

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
