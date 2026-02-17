import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';

export default function ConveyanceAssessment() {
  return (
    <Slide title="Conveyance Assessments & Developer Loans" subtitle="Restricted funds and repayment flow.">
      <MarkdownSection
        className="bg-white p-8 border border-slate-200 max-w-4xl mx-auto"
        contentKey="main"
        markdownClassName="prose-base font-serif"
      />
    </Slide>
  );
}
