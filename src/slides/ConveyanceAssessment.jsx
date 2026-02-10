import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ConveyanceAssessment() {
  return (
    <Slide title="Conveyance Assessments & Developer Loans" subtitle="Restricted funds and repayment flow.">
      <div className="bg-slate-50 p-8 border border-slate-200 max-w-4xl mx-auto">
        <MarkdownBlock filename="2021-2025/Conveyance Assessment Summary.md" className="prose-base font-serif" />
      </div>
    </Slide>
  );
}
