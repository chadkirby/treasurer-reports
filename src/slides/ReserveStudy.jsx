import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ReserveStudy() {
  return (
    <Slide title="Reserve Study Analysis" subtitle="Review of 2025 Reserve Study findings.">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Key Findings</h3>
             <MarkdownBlock filename="2021-2025/Reserve Study Analysis.md" className="prose-sm" />

             <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
                <p><strong>Note:</strong> The full 2025 Reserve Study (Report #46458-2) is available as a separate document.</p>
             </div>
         </div>
      </div>
    </Slide>
  );
}
