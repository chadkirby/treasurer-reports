import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function Methodology() {
  return (
    <Slide title="Methodology & Data Sources" subtitle="How this analysis was built from monthly GL reports.">
      <div className="bg-white p-8 border border-slate-200 max-w-4xl mx-auto">
          <MarkdownBlock contentKey="main" className="max-w-3xl" />
      </div>
    </Slide>
  );
}
