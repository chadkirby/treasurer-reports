import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function Methodology() {
  return (
    <Slide title="Methodology & Data Sources" subtitle="How this report was generated.">
      <div className="h-full overflow-y-auto bg-slate-50 p-8 rounded-lg border border-slate-100 prose prose-slate max-w-none">
          <MarkdownBlock filename="METHODOLOGY.md" />
      </div>
    </Slide>
  );
}
