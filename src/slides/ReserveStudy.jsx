import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';

export default function ReserveStudy() {
  return (
    <Slide title="Reserve Study Analysis" subtitle="Review of 2025 Reserve Study findings.">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <MarkdownSection
            className="bg-white p-8 border border-slate-200"
            title="Analysis of Reserve Health"
            titleTag="h3"
            titleClassName="text-xl font-bold mb-6 font-serif italic border-b border-slate-300 pb-2"
            contentKey="main"
            markdownClassName="prose-base font-serif"
          />
      </div>
    </Slide>
  );
}
