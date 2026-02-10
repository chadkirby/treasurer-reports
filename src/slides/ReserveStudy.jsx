import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ReserveStudy() {
  return (
    <Slide title="Reserve Study Analysis" subtitle="Review of 2025 Reserve Study findings.">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-50 p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-6 font-serif italic border-b border-slate-300 pb-2">Analysis of Reserve Health</h3>
              <MarkdownBlock filename="2021-2025/Reserve Study Analysis.md" className="prose-base font-serif" />

              <div className="mt-8 p-6 bg-white border border-slate-200 text-sm text-slate-600 font-serif">
                <p><strong>Note:</strong> The full 2025 Reserve Study (Report #46458-2) is a 40-page technical document. The summary above distills the most critical financial implications for the Association.</p>
              </div>
          </div>
      </div>
    </Slide>
  );
}
