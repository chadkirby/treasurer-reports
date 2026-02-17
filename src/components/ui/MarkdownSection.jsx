import React from 'react';
import { MarkdownContent, useMarkdownSource } from './MarkdownBlock';

export default function MarkdownSection({
  filename,
  contentKey = 'main',
  className = '',
  title,
  titleClassName = '',
  titleTag = 'h3',
  markdownClassName = '',
  stripLeadingH1 = false,
}) {
  const { resolvedFilename, data, loading, error, isEmpty } = useMarkdownSource({ filename, contentKey });

  if (!resolvedFilename || isEmpty) return null;
  if (loading) return <div className="animate-pulse h-20 bg-[#f3efe3] rounded"></div>;
  if (error) return <div className="text-red-500 text-sm">Error loading content: {error.message}</div>;

  const HeadingTag = titleTag;

  return (
    <div className={className}>
      {title && <HeadingTag className={titleClassName}>{title}</HeadingTag>}
      <MarkdownContent
        data={typeof data === 'string' ? data : ''}
        className={markdownClassName}
        stripLeadingH1={stripLeadingH1}
      />
    </div>
  );
}
