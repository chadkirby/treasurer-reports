import React from 'react';
import Slide from '../components/ui/Slide';

export default function CastAndFramework() {
  return (
    <Slide title="Cast, Characters, and Legal Framework" subtitle="Who is who, and how the HOA is governed.">
      <div className="flex flex-col gap-8">
        <div className="bg-slate-50 p-6 border border-slate-200">
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
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Relationship Map: Developer Control Period</h3>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <svg viewBox="0 0 960 360" className="w-full h-auto text-slate-700">
              <defs>
                <style>{`
                  .box { fill: #fff; stroke: #cbd5e1; stroke-width: 1.5; }
                  .label { font: 12px "Times New Roman", serif; fill: #0f172a; }
                  .link { stroke: #64748b; stroke-width: 1.5; fill: none; }
                  .hint { font: 10px "Consolas", monospace; fill: #475569; }
                  .dot { stroke-dasharray: 3 3; }
                `}</style>
              </defs>

              <rect className="box" x="30" y="30" width="170" height="46" rx="4" />
              <text className="label" x="115" y="58" textAnchor="middle">Min</text>

              <rect className="box" x="230" y="10" width="190" height="46" rx="4" />
              <text className="label" x="325" y="38" textAnchor="middle">SO UK Investments</text>

              <rect className="box" x="230" y="70" width="190" height="46" rx="4" />
              <text className="label" x="325" y="98" textAnchor="middle">Lotus House</text>

              <rect className="box" x="470" y="40" width="170" height="46" rx="4" />
              <text className="label" x="555" y="68" textAnchor="middle">Deschutes HOA</text>

              <rect className="box" x="470" y="120" width="170" height="46" rx="4" />
              <text className="label" x="555" y="148" textAnchor="middle">Board</text>

              <rect className="box" x="700" y="20" width="150" height="46" rx="4" />
              <text className="label" x="775" y="48" textAnchor="middle">VIS Group</text>

              <rect className="box" x="700" y="90" width="150" height="46" rx="4" />
              <text className="label" x="775" y="118" textAnchor="middle">Simply Home</text>

              <rect className="box" x="700" y="160" width="150" height="46" rx="4" />
              <text className="label" x="775" y="188" textAnchor="middle">Precision Groundworks</text>

              <line className="link" x1="200" y1="53" x2="230" y2="33" />
              <line className="link" x1="200" y1="53" x2="230" y2="93" />
              <text className="hint" x="205" y="20">controls</text>

              <line className="link" x1="420" y1="33" x2="470" y2="63" />
              <text className="hint" x="430" y="28">owned land</text>

              <line className="link" x1="420" y1="93" x2="470" y2="63" />
              <text className="hint" x="425" y="102">developer</text>

              <line className="link" x1="555" y1="86" x2="555" y2="120" />
              <text className="hint" x="565" y="110">governs</text>

              <line className="link" x1="200" y1="53" x2="470" y2="143" />
              <text className="hint" x="260" y="118">controls</text>

              <line className="link" x1="640" y1="63" x2="700" y2="43" />
              <text className="hint" x="650" y="40">agent</text>

              <line className="link" x1="640" y1="63" x2="700" y2="113" />
              <line className="link" x1="640" y1="63" x2="700" y2="183" />
              <text className="hint" x="648" y="86">contracts</text>

              <line className="link dot" x1="775" y1="66" x2="775" y2="90" />
              <line className="link dot" x1="775" y1="136" x2="775" y2="160" />
              <text className="hint" x="785" y="82">selected</text>
            </svg>
          </div>

          <div className="mt-4">
            <div className="text-sm text-slate-600 font-serif italic">
              Solid lines show control or direct contractual relationships. Dotted lines show vendor selection influence.
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-slate-200">
          <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Relationship Map: Homeowner Control Period (Current)</h3>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <svg viewBox="0 0 960 360" className="w-full h-auto text-slate-700">
              <defs>
                <style>{`
                  .box { fill: #fff; stroke: #cbd5e1; stroke-width: 1.5; }
                  .label { font: 12px "Times New Roman", serif; fill: #0f172a; }
                  .link { stroke: #64748b; stroke-width: 1.5; fill: none; }
                  .hint { font: 10px "Consolas", monospace; fill: #475569; }
                  .dot { stroke-dasharray: 3 3; }
                `}</style>
              </defs>

              <rect className="box" x="30" y="30" width="190" height="46" rx="4" />
              <text className="label" x="125" y="58" textAnchor="middle">7 Homeowners</text>

              <rect className="box" x="30" y="120" width="170" height="46" rx="4" />
              <text className="label" x="115" y="148" textAnchor="middle">Min</text>

              <rect className="box" x="230" y="10" width="190" height="46" rx="4" />
              <text className="label" x="325" y="38" textAnchor="middle">SO UK Investments</text>

              <rect className="box" x="230" y="70" width="190" height="46" rx="4" />
              <text className="label" x="325" y="98" textAnchor="middle">Lotus House</text>

              <rect className="box" x="470" y="40" width="170" height="46" rx="4" />
              <text className="label" x="555" y="68" textAnchor="middle">Deschutes HOA</text>

              <rect className="box" x="470" y="120" width="170" height="46" rx="4" />
              <text className="label" x="555" y="148" textAnchor="middle">Board</text>

              <rect className="box" x="700" y="20" width="150" height="46" rx="4" />
              <text className="label" x="775" y="48" textAnchor="middle">VIS Group</text>

              <rect className="box" x="700" y="90" width="150" height="46" rx="4" />
              <text className="label" x="775" y="118" textAnchor="middle">Simply Home</text>

              <rect className="box" x="700" y="160" width="150" height="46" rx="4" />
              <text className="label" x="775" y="188" textAnchor="middle">Precision Groundworks</text>

              <line className="link" x1="220" y1="53" x2="470" y2="143" />
              <text className="hint" x="260" y="118">controls</text>

              <line className="link" x1="200" y1="143" x2="230" y2="33" />
              <line className="link" x1="200" y1="143" x2="230" y2="93" />
              <text className="hint" x="210" y="88">controls</text>

              <line className="link" x1="420" y1="33" x2="470" y2="63" />
              <text className="hint" x="430" y="28">landowner</text>

              <line className="link" x1="420" y1="93" x2="470" y2="63" />
              <text className="hint" x="425" y="102">landowner</text>

              <line className="link" x1="555" y1="86" x2="555" y2="120" />
              <text className="hint" x="565" y="110">governs</text>

              <line className="link" x1="640" y1="63" x2="700" y2="43" />
              <text className="hint" x="650" y="40">agent</text>

              <line className="link" x1="640" y1="63" x2="700" y2="113" />
              <line className="link" x1="640" y1="63" x2="700" y2="183" />
              <text className="hint" x="648" y="86">contracts</text>

              <line className="link dot" x1="775" y1="66" x2="775" y2="90" />
              <line className="link dot" x1="775" y1="136" x2="775" y2="160" />
              <text className="hint" x="785" y="82">selected</text>
            </svg>
          </div>
          <div className="mt-4 text-sm text-slate-600 font-serif italic">
            The HOA is governed by the Board. VIS is a contracted agent, not a governing body.
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-50 p-6 border border-slate-200">
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
    </Slide>
  );
}
