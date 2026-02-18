import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownSection from '../components/ui/MarkdownSection';

export default function ExecutiveSummary() {
  return (
    <Slide
      title="Why Does the HOA Exist? (And What Do We Have to Pay For?)"
      subtitle="Executive summary of core legal obligations and funding responsibilities."
    >
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <MarkdownSection
          className="pt-2"
          contentKey="main"
          markdownClassName="prose-base font-serif max-w-5xl [&>h2:first-child]:mt-0"
          stripLeadingH1
        />
      </div>
    </Slide>
  );
}
