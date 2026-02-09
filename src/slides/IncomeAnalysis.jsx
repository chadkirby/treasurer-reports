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
    const rows = data.filter(r => r.Year && r.Year !== 'Average');
    return {
      labels: rows.map(r => r.Year),
      datasets: [
        {
          label: 'HOA Dues',
          data: rows.map(r => parseCurrency(r['HOA Dues'])),
          backgroundColor: TUFTE_PALETTE[4], // Blue
        },
        {
          label: 'Interest',
          data: rows.map(r => parseCurrency(r['Interest'])),
          backgroundColor: TUFTE_PALETTE[6], // Green
        },
        {
          label: 'Late Fees',
          data: rows.map(r => parseCurrency(r['Late Fees'])),
          backgroundColor: TUFTE_PALETTE[5], // Orange
        },
         {
          label: 'Other',
          data: rows.map(r => parseCurrency(r['Miscellaneous']) + parseCurrency(r['Violation Fees'])),
          backgroundColor: TUFTE_PALETTE[2], // Lavender
        }
      ]
    };
  }, [data]);

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: { stacked: true },
          y: {
              stacked: true,
              ticks: { callback: (v) => formatCurrency(v) }
          }
      }
  };

  return (
    <Slide title="Income Analysis" subtitle="Breakdown of revenue sources.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
         <ChartContainer title="Revenue Composition">
             {chartData && <Chart type='bar' data={chartData} options={options} />}
         </ChartContainer>
         <div className="h-full overflow-y-auto bg-slate-50 p-6 rounded-lg border border-slate-100">
             <h3 className="text-xl font-bold mb-4">Commentary</h3>
             <MarkdownBlock filename="Cash Inflows.md" />
         </div>
      </div>
    </Slide>
  );
}
