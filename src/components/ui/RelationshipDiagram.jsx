import React from 'react';

const COLORS = {
  person: { fill: '#4A90D9', stroke: '#2C5F8A', text: '#ffffff' },
  entity: { fill: '#F5A623', stroke: '#C47D0E', text: '#ffffff' },
  hoa: { fill: '#7B68EE', stroke: '#5A4CB5', text: '#ffffff' },
  vendor: { fill: '#50C878', stroke: '#2E8B57', text: '#ffffff' },
  mgmt: { fill: '#E74C3C', stroke: '#C0392B', text: '#ffffff' },
  law: { fill: '#D5E8D4', stroke: '#82B366', text: '#2D6A2E' },
  task: { fill: '#f0f0f0', stroke: '#999999', text: '#333333' },
  key: { fill: '#FFF3CD', stroke: '#FFD700', text: '#856404' },
};

function Box({ x, y, w, h, fill, stroke, textColor, lines }) {
  const lineHeight = 18;
  const startY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={stroke} strokeWidth={2} />
      <text x={x + w / 2} y={startY} textAnchor="middle" fill={textColor} fontFamily="Times New Roman, serif" fontSize={16}>
        {lines.map((line, idx) => (
          <tspan key={line} x={x + w / 2} dy={idx === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
    </defs>
  );
}

function Line({ x1, y1, x2, y2, dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#64748b"
      strokeWidth={1.6}
      markerEnd="url(#arrow)"
      strokeDasharray={dashed ? '4 4' : '0'}
      fill="none"
    />
  );
}

function Curve({ d, dashed = false }) {
  return (
    <path
      d={d}
      stroke="#64748b"
      strokeWidth={1.6}
      markerEnd="url(#arrow)"
      strokeDasharray={dashed ? '4 4' : '0'}
      fill="none"
    />
  );
}

function Label({ x, y, text, align = 'middle', size = 16 }) {
  const padX = 6;
  const padY = 4;
  const width = text.length * (size * 0.55) + padX * 2;
  const height = size + padY * 2;
  const rx = 4;
  const boxX = x - width / 2;
  const boxY = y - height + padY;
  return (
    <g>
      <rect x={boxX} y={boxY} width={width} height={height} rx={rx} fill="#ffffff" stroke="none" />
      <text x={x} y={y} textAnchor={align} fill="#0f172a" fontFamily="Times New Roman, serif" fontSize={size}>
        {text}
      </text>
    </g>
  );
}

function midPoint(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

function quadPoint(x1, y1, cx, cy, x2, y2, t = 0.5) {
  const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
  const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
  return { x, y };
}

export function DeveloperDiagram() {
  const w = 1200;
  const h = 680;
  const boxW = 220;
  const boxH = 64;
  const topY = 70;
  const row2Y = 190;
  const hoaY = 330;
  const visY = 470;
  const vendorY = 600;
  const centers = [220, 600, 980];

  const minX = 490;
  const minY = topY;

  const [soX, loX, boX] = centers.map(c => c - boxW / 2);
  const hoaX = 600 - boxW / 2;
  const visX = 600 - boxW / 2;
  const shrX = 360 - boxW / 2;
  const pgX = 840 - boxW / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <ArrowDefs />

      <Box x={minX} y={minY} w={boxW} h={boxH} {...COLORS.person} lines={['Min']} />

      <Box x={soX} y={row2Y} w={boxW} h={boxH} {...COLORS.entity} lines={['SO UK Investments']} />
      <Box x={loX} y={row2Y} w={boxW} h={boxH} {...COLORS.entity} lines={['Lotus House']} />
      <Box x={boX} y={row2Y} w={boxW} h={boxH} {...COLORS.entity} lines={['Board']} />

      <Box x={hoaX} y={hoaY} w={boxW} h={boxH + 6} {...COLORS.hoa} lines={['Deschutes Heights HOA']} />
      <Box x={visX} y={visY} w={boxW} h={boxH + 6} {...COLORS.mgmt} lines={['VIS Group']} />

      <Box x={shrX} y={vendorY} w={boxW} h={boxH} {...COLORS.vendor} lines={['Simply Home Realty']} />
      <Box x={pgX} y={vendorY} w={boxW} h={boxH} {...COLORS.vendor} lines={['Precision Groundworks']} />

      <Line x1={minX + boxW / 2} y1={minY + boxH} x2={soX + boxW / 2} y2={row2Y} />
      <Line x1={minX + boxW / 2} y1={minY + boxH} x2={loX + boxW / 2} y2={row2Y} />
      <Line x1={minX + boxW / 2} y1={minY + boxH} x2={boX + boxW / 2} y2={row2Y} />

      {(() => {
        const c1 = midPoint(minX + boxW / 2, minY + boxH, soX + boxW / 2, row2Y);
        const c2 = midPoint(minX + boxW / 2, minY + boxH, loX + boxW / 2, row2Y);
        const c3 = midPoint(minX + boxW / 2, minY + boxH, boX + boxW / 2, row2Y);
        return (
          <>
            <Label x={c1.x} y={c1.y - 6} text="controls" />
            <Label x={c2.x} y={c2.y - 6} text="controls" />
            <Label x={c3.x} y={c3.y - 6} text="controls" />
          </>
        );
      })()}

      <Line x1={soX + boxW / 2} y1={row2Y + boxH} x2={hoaX + boxW / 2 - 60} y2={hoaY} dashed />
      <Line x1={loX + boxW / 2} y1={row2Y + boxH} x2={hoaX + boxW / 2} y2={hoaY} dashed />
      <Curve d={`M ${boX + boxW / 2} ${row2Y + boxH} Q ${boX + boxW / 2 + 80} ${hoaY - 20}, ${hoaX + boxW / 2 + 60} ${hoaY}`} />

      {(() => {
        const l1 = midPoint(soX + boxW / 2, row2Y + boxH, hoaX + boxW / 2 - 60, hoaY);
        const l2 = midPoint(loX + boxW / 2, row2Y + boxH, hoaX + boxW / 2, hoaY);
        const g = quadPoint(boX + boxW / 2, row2Y + boxH, boX + boxW / 2 + 80, hoaY - 20, hoaX + boxW / 2 + 60, hoaY);
        return (
          <>
            <Label x={l1.x} y={l1.y - 6} text="landowner" />
            <Label x={l1.x} y={l1.y + 10} text="(no governance)" size={12} />
            <Label x={l2.x} y={l2.y - 6} text="landowner / builder" />
            <Label x={l2.x} y={l2.y + 10} text="(no governance)" size={12} />
            <Label x={g.x + 10} y={g.y - 6} text="governs" />
          </>
        );
      })()}

      <Line x1={hoaX + boxW / 2} y1={hoaY + boxH + 6} x2={visX + boxW / 2} y2={visY} />
      <Curve d={`M ${hoaX + 10} ${hoaY + boxH + 6} Q ${hoaX - 70} ${visY + 20}, ${shrX + boxW / 2} ${vendorY}`} />
      <Curve d={`M ${hoaX + boxW - 10} ${hoaY + boxH + 6} Q ${hoaX + boxW + 70} ${visY + 20}, ${pgX + boxW / 2} ${vendorY}`} />

      {(() => {
        const c = midPoint(hoaX + boxW / 2, hoaY + boxH + 6, visX + boxW / 2, visY);
        const lc = quadPoint(hoaX + 10, hoaY + boxH + 6, hoaX - 70, visY + 20, shrX + boxW / 2, vendorY);
        const rc = quadPoint(hoaX + boxW - 10, hoaY + boxH + 6, hoaX + boxW + 70, visY + 20, pgX + boxW / 2, vendorY);
        return (
          <>
            <Label x={c.x} y={c.y - 6} text="contracts" />
            <Label x={lc.x} y={lc.y - 6} text="contracts" />
            <Label x={rc.x} y={rc.y - 6} text="contracts" />
          </>
        );
      })()}

      <Line x1={visX + boxW / 2} y1={visY + boxH + 6} x2={shrX + boxW / 2} y2={vendorY} dashed />
      <Line x1={visX + boxW / 2} y1={visY + boxH + 6} x2={pgX + boxW / 2} y2={vendorY} dashed />
      {(() => {
        const s1 = midPoint(visX + boxW / 2, visY + boxH + 6, shrX + boxW / 2, vendorY);
        const s2 = midPoint(visX + boxW / 2, visY + boxH + 6, pgX + boxW / 2, vendorY);
        return (
          <>
            <Label x={s1.x} y={s1.y - 6} text="selects" />
            <Label x={s2.x} y={s2.y - 6} text="selects" />
          </>
        );
      })()}
    </svg>
  );
}

export function HomeownerDiagram() {
  const w = 1200;
  const h = 680;
  const boxW = 220;
  const boxH = 64;
  const topY = 60;
  const boardY = 160;
  const row2Y = 260;
  const hoaY = 360;
  const visY = 500;
  const vendorY = 610;

  const ownersX = 600 - boxW / 2;
  const boardX = 600 - boxW / 2;

  const centers = [220, 600, 980];
  const [minX, soX, loX] = centers.map(c => c - boxW / 2);

  const hoaX = 600 - boxW / 2;
  const visX = 600 - boxW / 2;
  const shrX = 360 - boxW / 2;
  const pgX = 840 - boxW / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <ArrowDefs />

      <Box x={ownersX} y={topY} w={boxW} h={boxH} {...COLORS.person} lines={['7 Homeowners']} />
      <Box x={boardX} y={boardY} w={boxW} h={boxH} {...COLORS.entity} lines={['Board']} />

      <Box x={minX} y={row2Y} w={boxW} h={boxH} {...COLORS.person} lines={['Min']} />
      <Box x={soX} y={row2Y} w={boxW} h={boxH} {...COLORS.entity} lines={['SO UK Investments']} />
      <Box x={loX} y={row2Y} w={boxW} h={boxH} {...COLORS.entity} lines={['Lotus House']} />

      <Box x={hoaX} y={hoaY} w={boxW} h={boxH + 6} {...COLORS.hoa} lines={['Deschutes Heights HOA']} />
      <Box x={visX} y={visY} w={boxW} h={boxH + 6} {...COLORS.mgmt} lines={['VIS Group']} />

      <Box x={shrX} y={vendorY} w={boxW} h={boxH} {...COLORS.vendor} lines={['Simply Home Realty']} />
      <Box x={pgX} y={vendorY} w={boxW} h={boxH} {...COLORS.vendor} lines={['Precision Groundworks']} />

      <Line x1={ownersX + boxW / 2} y1={topY + boxH} x2={boardX + boxW / 2} y2={boardY} />
      {(() => {
        const c = midPoint(ownersX + boxW / 2, topY + boxH, boardX + boxW / 2, boardY);
        return <Label x={c.x} y={c.y - 6} text="control" />;
      })()}

      <Line x1={boardX + boxW / 2} y1={boardY + boxH} x2={hoaX + boxW / 2} y2={hoaY} />
      {(() => {
        const g = midPoint(boardX + boxW / 2, boardY + boxH, hoaX + boxW / 2, hoaY);
        return <Label x={g.x + 8} y={g.y - 6} text="governs" />;
      })()}

      <Line x1={minX + boxW / 2} y1={row2Y + boxH} x2={soX + boxW / 2} y2={row2Y + boxH} />
      <Line x1={minX + boxW / 2} y1={row2Y} x2={soX + boxW / 2} y2={row2Y} />
      <Line x1={minX + boxW / 2} y1={row2Y + boxH / 2} x2={soX + boxW / 2} y2={row2Y + boxH / 2} />

      <Line x1={minX + boxW / 2} y1={row2Y + boxH} x2={loX + boxW / 2} y2={row2Y + boxH} />
      <Line x1={minX + boxW / 2} y1={row2Y} x2={loX + boxW / 2} y2={row2Y} />
      <Line x1={minX + boxW / 2} y1={row2Y + boxH / 2} x2={loX + boxW / 2} y2={row2Y + boxH / 2} />

      {(() => {
        const c1 = midPoint(minX + boxW / 2, row2Y + boxH / 2, soX + boxW / 2, row2Y + boxH / 2);
        const c2 = midPoint(minX + boxW / 2, row2Y + boxH / 2, loX + boxW / 2, row2Y + boxH / 2);
        return (
          <>
            <Label x={c1.x} y={row2Y - 8} text="controls" />
            <Label x={c2.x} y={row2Y - 8} text="controls" />
          </>
        );
      })()}

      <Line x1={soX + boxW / 2} y1={row2Y + boxH} x2={hoaX + boxW / 2 - 40} y2={hoaY} dashed />
      <Line x1={loX + boxW / 2} y1={row2Y + boxH} x2={hoaX + boxW / 2 + 40} y2={hoaY} dashed />
      {(() => {
        const l1 = midPoint(soX + boxW / 2, row2Y + boxH, hoaX + boxW / 2 - 40, hoaY);
        const l2 = midPoint(loX + boxW / 2, row2Y + boxH, hoaX + boxW / 2 + 40, hoaY);
        return (
          <>
            <Label x={l1.x} y={l1.y - 6} text="landowner" />
            <Label x={l2.x} y={l2.y - 6} text="landowner / builder" />
          </>
        );
      })()}

      <Line x1={hoaX + boxW / 2} y1={hoaY + boxH + 6} x2={visX + boxW / 2} y2={visY} />
      <Curve d={`M ${hoaX + 10} ${hoaY + boxH + 6} Q ${hoaX - 70} ${visY + 20}, ${shrX + boxW / 2} ${vendorY}`} />
      <Curve d={`M ${hoaX + boxW - 10} ${hoaY + boxH + 6} Q ${hoaX + boxW + 70} ${visY + 20}, ${pgX + boxW / 2} ${vendorY}`} />

      {(() => {
        const c = midPoint(hoaX + boxW / 2, hoaY + boxH + 6, visX + boxW / 2, visY);
        const lc = quadPoint(hoaX + 10, hoaY + boxH + 6, hoaX - 70, visY + 20, shrX + boxW / 2, vendorY);
        const rc = quadPoint(hoaX + boxW - 10, hoaY + boxH + 6, hoaX + boxW + 70, visY + 20, pgX + boxW / 2, vendorY);
        return (
          <>
            <Label x={c.x} y={c.y - 6} text="contracts" />
            <Label x={lc.x} y={lc.y - 6} text="contracts" />
            <Label x={rc.x} y={rc.y - 6} text="contracts" />
          </>
        );
      })()}

      <Line x1={visX + boxW / 2} y1={visY + boxH + 6} x2={shrX + boxW / 2} y2={vendorY} dashed />
      <Line x1={visX + boxW / 2} y1={visY + boxH + 6} x2={pgX + boxW / 2} y2={vendorY} dashed />
      {(() => {
        const s1 = midPoint(visX + boxW / 2, visY + boxH + 6, shrX + boxW / 2, vendorY);
        const s2 = midPoint(visX + boxW / 2, visY + boxH + 6, pgX + boxW / 2, vendorY);
        return (
          <>
            <Label x={s1.x} y={s1.y - 6} text="selects" />
            <Label x={s2.x} y={s2.y - 6} text="selects" />
          </>
        );
      })()}
    </svg>
  );
}

export function AuthorityDiagram() {
  const w = 900;
  const h = 620;
  const boxW = 360;
  const boxH = 64;
  const centerX = w / 2 - boxW / 2;

  const rcwY = 40;
  const declY = 130;
  const bylawsY = 220;
  const hoaY = 310;
  const visY = 400;
  const tasksY = 490;
  const keyY = 580;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <ArrowDefs />

      <Box x={centerX} y={rcwY} w={boxW} h={boxH} {...COLORS.law} lines={['Washington State Law']} />
      <Box x={centerX} y={declY} w={boxW} h={boxH} {...COLORS.law} lines={['Declaration (CC&Rs)']} />
      <Box x={centerX} y={bylawsY} w={boxW} h={boxH} {...COLORS.law} lines={['Bylaws']} />
      <Box x={centerX} y={hoaY} w={boxW} h={boxH + 6} {...COLORS.hoa} lines={['Deschutes Heights HOA']} />
      <Box x={centerX} y={visY} w={boxW} h={boxH + 6} {...COLORS.mgmt} lines={['VIS Group']} />
      <Box x={centerX} y={tasksY} w={boxW} h={boxH + 16} {...COLORS.task} lines={['Delegated tasks', 'Accounting & reporting', 'Records', 'Homeowner correspondence', 'Advising the Board', 'Other ministerial tasks']} />
      <Box x={centerX} y={keyY} w={boxW} h={boxH + 16} {...COLORS.key} lines={['Key principle', 'Authority flows down from law', 'through governing documents', 'into the HOA.', 'VIS receives only what is delegated.']} />

      <Line x1={w / 2} y1={rcwY + boxH} x2={w / 2} y2={declY} />
      <Line x1={w / 2} y1={declY + boxH} x2={w / 2} y2={bylawsY} />
      <Line x1={w / 2} y1={bylawsY + boxH} x2={w / 2} y2={hoaY} />
      <Line x1={w / 2} y1={hoaY + boxH + 6} x2={w / 2} y2={visY} />
      <Line x1={w / 2} y1={visY + boxH + 6} x2={w / 2} y2={tasksY} dashed />
      <Line x1={w / 2} y1={hoaY + boxH + 6} x2={w / 2} y2={keyY} />
    </svg>
  );
}

export default function RelationshipDiagram({ type }) {
  if (type === 'homeowner') return <HomeownerDiagram />;
  if (type === 'authority') return <AuthorityDiagram />;
  return <DeveloperDiagram />;
}
