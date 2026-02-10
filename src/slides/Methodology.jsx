import React from 'react';
import Slide from '../components/ui/Slide';
import MarkdownBlock from '../components/ui/MarkdownBlock';

export default function Methodology() {
  return (
    <Slide title={null} subtitle={null}>
      <div className="">
          <MarkdownBlock filename="METHODOLOGY.md" className="max-w-4xl" />
      </div>
    </Slide>
  );
}
