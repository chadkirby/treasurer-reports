import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ExecutiveSummary() {
  return (
    <Slide title="Executive Summary" subtitle="Key observations from the 2021-2025 financial period.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full overflow-y-auto">
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            Key Highlights
          </h3>
          {/* Note: In a real app we might want to split the MD file or parse specific sections.
              For now, we render the whole Observations.md which contains the summary points. */}
          <MarkdownBlock filename="2021-2025/Observations.md" className="prose-sm" />
        </div>
        <div className="flex flex-col gap-4">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-900 text-lg mb-2">Focus Areas</h4>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>Reserve Funding Levels vs Developer Payments</li>
                    <li>Management Company Costs</li>
                    <li>Sustainable Groundworks Volatility</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-100 flex-1 flex items-center justify-center text-slate-400 italic text-center">
                Detailed analysis follows in subsequent slides.
            </div>
        </div>
      </div>
    </Slide>
  );
}
