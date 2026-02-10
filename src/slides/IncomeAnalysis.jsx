import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownBlock from '../components/ui/MarkdownBlock';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

export default function IncomeAnalysis() {
  const { data } = useData('2021-2025/Cash Inflows.csv');

  const chartData = useMemo(() => {
    if (!data) return null;

    // CSV structure: Revenue Source, 2020*, 2021, 2022, 2023, 2024, 2025
    // We want years 2021-2025
    const years = ['2021', '2022', '2023', '2024', '2025'];

    // Helper to find row by source name (loose match)
    const findRow = (source) => data.find(r => r['Revenue Source'] && r['Revenue Source'].includes(source));

    const hoaRow = findRow('HOA Dues');
    const conveyanceRow = findRow('Conveyance');
    const otherRow = findRow('Other'); // "Other (Fines/Late Fees)"

    if (!hoaRow) return null;

    // Helper to get value even if whitespace in keys
    const getValue = (row, year) => {
        if (!row) return 0;
        // Try direct access
        let val = row[year];
        if (val) return val;
        // Try trimmed keys
        const key = Object.keys(row).find(k => k.trim() === year);
        return key ? row[key] : 0;
    };

    return {
      labels: years,
      datasets: [
        {
          label: 'HOA Dues',
          data: years.map(y => parseCurrency(getValue(hoaRow, y))),
          backgroundColor: TUFTE_PALETTE[4], // Blue
        },
        {
          label: 'Conveyance Assessments',
          data: years.map(y => parseCurrency(getValue(conveyanceRow, y))),
          backgroundColor: TUFTE_PALETTE[0], // Teal
        },
        {
          label: 'Other (Fines/Late Fees)',
          data: years.map(y => parseCurrency(getValue(otherRow, y))),
          backgroundColor: TUFTE_PALETTE[3], // Salmon
        }
      ]
    };
  }, [data]);

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: { stacked: true, grid: { display: false } },
          y: {
              stacked: true,
              ticks: { callback: (v) => formatCurrency(v), font: { family: '"Consolas", monospace' } },
              grid: { display: true, drawBorder: false, color: '#e5e5e5' }
          }
      },
      plugins: {
        legend: { labels: { font: { family: '"Consolas", monospace' } } },
        tooltip: {
            callbacks: {
                label: (context) => {
                     return context.dataset.label + ': ' + formatCurrency(context.raw);
                }
            }
        }
      }
  };

  return (
    <Slide title="Income Analysis" subtitle="Breakdown of revenue sources.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
         <ChartContainer title="Revenue Composition">
             {chartData && <Chart type='bar' data={chartData} options={options} />}
         </ChartContainer>
         <div className="h-full overflow-y-auto pt-4 border-t border-slate-300">
             <h3 className="text-lg font-bold mb-4 font-serif italic">Commentary</h3>
             <MarkdownBlock filename="2021-2025/Cash Inflows.md" className="prose-sm font-serif" />
         </div>
      </div>
    </Slide>
  );
}
