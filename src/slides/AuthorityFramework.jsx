import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';
import { publicUrl } from '../utils/publicUrl';

export default function AuthorityFramework() {
  return (
    <Slide title="Authority Framework" subtitle="Delegation and control relationships in HOA operations.">
      <div className="bg-white p-6 border border-slate-200">
        <h3 className="text-xl font-bold mb-4 font-serif italic border-b border-slate-300 pb-2">Authority</h3>
        <div className="bg-white border border-slate-200 p-4">
          <img
            src={publicUrl('sources/drawings/authorities.drawio.svg')}
            alt="Authority and delegation diagram"
            className="w-full h-auto"
          />
        </div>
        <MarkdownSection
          className="mt-4"
          contentKey="main"
          markdownClassName="prose-sm font-serif"
        />
      </div>
    </Slide>
  );
}
