import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';

export default function Methodology() {
  return (
    <Slide title="Methodology & Data Sources" subtitle="How this analysis was built from monthly GL reports.">
      <MarkdownSection
        className="bg-white p-8 border border-slate-200 max-w-4xl mx-auto"
        contentKey="main"
        markdownClassName="max-w-3xl"
      />
    </Slide>
  );
}
