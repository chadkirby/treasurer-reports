import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';
import { publicUrl } from '../utils/publicUrl';

export default function CastAndFramework() {
  return (
    <Slide title="Cast, Characters, and Legal Framework" subtitle="Who is who, and how the HOA is governed.">
      <div className="bg-white p-6 border border-slate-200">
        <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-700">
          <div className="p-4 bg-white border border-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">2011</div>
            <div className="mt-1">HOA incorporated.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">2019</div>
            <div className="mt-1">Declaration amended (CC&Rs).</div>
          </div>
          <div className="p-4 bg-white border border-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">2020</div>
            <div className="mt-1">VIS Group engaged.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">2026</div>
            <div className="mt-1">Homeowners take board control.</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Cast</h3>
          <ul className="list-disc pl-5 text-base text-slate-700 space-y-2">
            <li><strong>Deschutes Heights HOA</strong> - Nonprofit corporation (founded 2011) created to maintain common areas; powers and limits come from statute and the Declaration (CC&Rs).</li>
            <li><strong>The Board</strong> - Directors who control the HOA on behalf of the members.</li>
            <li><strong>Min</strong> - Individual residing in NY; family acquired the land; not a full-time developer.</li>
            <li><strong>SO UK Investments</strong> - NY investment entity controlled by Min; owned the land.</li>
            <li><strong>Lotus House</strong> - WA business entity controlled by Min; developer entity that contracted with builders.</li>
            <li><strong>VIS Group</strong> - WA management company engaged in 2020 to administer the HOA.</li>
            <li><strong>Simply Home Realty</strong> - WA company affiliated with VIS Group (relationship disclosed).</li>
            <li><strong>Precision Groundworks</strong> - WA vendor for stormwater maintenance.</li>
          </ul>
        </div>

        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Relationship Map: Developer Control Period (2011-2025)</h3>
          <div className="bg-white border border-slate-200 p-4">
            <img
              src={publicUrl('sources/drawings/relationships-developer-control.drawio.svg')}
              alt="Developer control period relationship map"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4">
            <MarkdownBlock contentKey="developerRelationship" className="prose-sm font-serif" />
          </div>
        </div>

        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Relationship Map: Homeowner Control Period (2026-)</h3>
          <div className="bg-white border border-slate-200 p-4">
            <img
              src={publicUrl('sources/drawings/relationships-homeowner-control.drawio.svg')}
              alt="Homeowner control period relationship map"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4">
            <MarkdownBlock contentKey="homeownerRelationship" className="prose-sm font-serif" />
          </div>
        </div>

      </div>
    </Slide>
  );
}
