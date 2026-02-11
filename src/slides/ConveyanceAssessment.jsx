import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ConveyanceAssessment() {
  return (
    <Slide title="Conveyance Assessments & Developer Loans" subtitle="Restricted funds and repayment flow.">
      <div className="bg-white p-8 border border-slate-200 max-w-4xl mx-auto">
        <MarkdownBlock filename="2021-2025/Conveyance Assessment Summary.md" className="prose-base font-serif" />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 border border-slate-200">
          <MarkdownBlock filename="2021-2025/Conveyance Assessment Analysis Summary.md" className="prose-sm font-serif" />
        </div>
        <div className="bg-white p-6 border border-slate-200">
          <MarkdownBlock filename="2021-2025/Conveyance Assessment Accounting Summary.md" className="prose-sm font-serif" />
        </div>
      </div>
    </Slide>
  );
}
