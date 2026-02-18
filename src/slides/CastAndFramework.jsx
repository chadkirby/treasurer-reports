import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';
import { SummaryGrid, SummaryMetric, SummaryPanel } from '../components/ui/SummaryPanel';
import { publicUrl } from '../utils/publicUrl';

export default function CastAndFramework() {
  return (
    <Slide title="Cast and Characters" subtitle="Who is who, and how the HOA is governed.">
      <SummaryPanel title="Timeline">
        <SummaryGrid className="md:grid-cols-4 xl:grid-cols-4">
          <SummaryMetric
            label="2011"
            value="HOA incorporated."
            compact
            valueClassName="not-italic font-normal leading-snug text-lg text-slate-700 whitespace-normal"
          />
          <SummaryMetric
            label="2019"
            value="Declaration amended (CC&Rs)."
            compact
            valueClassName="not-italic font-normal leading-snug text-lg text-slate-700 whitespace-normal"
          />
          <SummaryMetric
            label="2020"
            value="VIS Group engaged."
            compact
            valueClassName="not-italic font-normal leading-snug text-lg text-slate-700 whitespace-normal"
          />
          <SummaryMetric
            label="2026"
            value="Homeowners take board control."
            compact
            valueClassName="not-italic font-normal leading-snug text-lg text-slate-700 whitespace-normal"
          />
        </SummaryGrid>
      </SummaryPanel>

      <div className="flex flex-col gap-8 mt-8">
        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Cast</h3>
          <ul className="list-disc pl-5 text-base text-slate-700 space-y-2">
            <li><strong>Deschutes Heights HOA</strong> - Nonprofit corporation (founded 2011) created to maintain common areas; powers and limits come from statute and the Declaration (CC&Rs).</li>
            <li><strong>The Board</strong> - Directors who control the HOA on behalf of the members.</li>
            <li><strong>Min Lai</strong> - Individual residing in NY whose family acquired the land.</li>
            <li><strong>SO UK Investments</strong> - NY investment entity (controlled by Min Lai) that originally owned the entire plat and now owns most of the vacant lots.</li>
            <li><strong>Lotus House</strong> - WA business entity (controlled by Min Lai) that contracts with builders to construct homes.</li>
            <li><strong>Declarant</strong> - SO UK Investments and Lotus House (together) as defined in the Declaration.</li>
            <li><strong>VIS Group</strong> - WA management company engaged in 2020 to administer the HOA.</li>
          </ul>
        </div>

        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2 print-keep-with-next">Relationship Map: Developer Control Period (2011-2025)</h3>
          <div className="bg-white border border-slate-200 p-4 print-keep-target">
            <img
              src={publicUrl('sources/drawings/relationships-developer-control.drawio.svg')}
              alt="Developer control period relationship map"
              className="w-full h-auto"
            />
          </div>
          <MarkdownSection
            className="mt-4"
            contentKey="developerRelationship"
            markdownClassName="prose-sm font-serif"
          />
        </div>

        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2 print-keep-with-next">Relationship Map: Homeowner Control Period (2026-)</h3>
          <div className="bg-white border border-slate-200 p-4 print-keep-target">
            <img
              src={publicUrl('sources/drawings/relationships-homeowner-control.drawio.svg')}
              alt="Homeowner control period relationship map"
              className="w-full h-auto"
            />
          </div>
          <MarkdownSection
            className="mt-4"
            contentKey="homeownerRelationship"
            markdownClassName="prose-sm font-serif"
          />
        </div>

      </div>
    </Slide>
  );
}
