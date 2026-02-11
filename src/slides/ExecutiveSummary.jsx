import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function ExecutiveSummary() {
  return (
    <Slide title="Executive Summary" subtitle="Key observations from the 2021-2025 financial period.">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-black mb-6 font-serif italic border-b border-slate-300 pb-2">
            Status Overview
          </h3>
          <MarkdownBlock filename="2021-2025/Observations.md" className="prose-base font-serif" />
        </div>

        <div className="bg-white p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-black mb-4 font-serif italic border-b border-slate-300 pb-2">
            Key Takeaways
          </h3>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Reserve funding appears below target, and stormwater obligations may not be fully reflected in the reserve study.</li>
            <li>Payments to the management company and its affiliated landscape vendor represent a large share of total outflows.</li>
            <li>$52.5k was paid to the Developer to repay ~$34k in informal loans with limited documentation and unclear authorization.</li>
            <li>Some repayments appear to have used funds that were legally obligated to the reserve fund, creating a potential compliance risk.</li>
          </ul>
        </div>

        <div className="bg-[#fffff8] p-8 border border-slate-200">
          <h4 className="font-bold text-black text-lg mb-4 font-serif uppercase tracking-widest text-sm">Key Focus Areas</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-slate-100 bg-white shadow-sm">
              <div className="font-bold mb-2">Reserves</div>
              <div className="text-sm text-slate-600">Funding levels vs. obligations, including stormwater exposure.</div>
            </div>
            <div className="p-4 border border-slate-100 bg-white shadow-sm">
              <div className="font-bold mb-2">Management</div>
              <div className="text-sm text-slate-600">Vendor concentration and performance concerns.</div>
            </div>
            <div className="p-4 border border-slate-100 bg-white shadow-sm">
              <div className="font-bold mb-2">Developer</div>
              <div className="text-sm text-slate-600">Loan repayments and reserve-fund compliance questions.</div>
            </div>
          </div>
        </div>

        <div className="text-slate-400 italic text-center py-4">
            Detailed analysis follows in subsequent slides.
        </div>
      </div>
    </Slide>
  );
}
