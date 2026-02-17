import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';

export default function ReserveStudy() {
  return (
    <Slide title="Reserve Study Analysis" subtitle="Review of 2025 Reserve Study findings.">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <MarkdownSection
          className="pt-8 border-t border-slate-300"
          title="Analysis of Reserve Health"
          titleTag="h3"
          titleClassName="text-lg font-bold mb-4 font-serif italic"
          contentKey="main"
          markdownClassName="prose-base font-serif max-w-4xl"
        />
      </div>
    </Slide>
  );
}
