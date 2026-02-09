import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ReserveStudy() {
  return (
    <Slide title="Reserve Study Analysis" subtitle="Review of 2025 Reserve Study findings.">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 overflow-y-auto">
              <h3 className="font-bold text-lg mb-4">Summary Analysis</h3>
              <MarkdownBlock filename="2021-2025/Reserve Study Analysis.md" className="prose-sm" />
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-100 flex flex-col">
              <h3 className="font-bold text-lg mb-4 text-slate-400">Full Report Details</h3>
              <div className="flex-1 overflow-y-auto border border-slate-100 rounded bg-slate-50 p-4">
                 <MarkdownBlock filename="2021-2025/2025 Reserve Study.md" className="prose-xs" />
              </div>
          </div>
      </div>
    </Slide>
  );
}
