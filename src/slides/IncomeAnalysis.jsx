import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownBlock from '../components/ui/MarkdownBlock';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

function SummaryCard({ title, value, color }) {
  return (
    <div className="flex flex-col border-l-4 p-4 bg-white shadow-sm" style={{ borderColor: color }}>
      <span className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">{title}</span>
      <span className="text-2xl font-serif italic text-slate-900">{formatCurrency(value)}</span>
    </div>
  );
}

export default function IncomeAnalysis() {
  const { data, loading, error } = useData('2021-2025/Cash Inflows.csv');

  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

  const { chartData, totals, grandTotal } = useMemo(() => {
    if (!data) return { chartData: null, totals: [], grandTotal: 0 };

    const findRow = (source) => data.find(r => r['Revenue Source'] && r['Revenue Source'].includes(source));

    const hoaRow = findRow('HOA Dues');
    const conveyanceRow = findRow('Conveyance');
    const otherRow = findRow('Other');

    const getValue = (row, year) => {
        if (!row) return 0;
        let val = row[year];
        if (val) return parseCurrency(val);
        const key = Object.keys(row).find(k => k.trim() === year);
        return key ? parseCurrency(row[key]) : 0;
    };

    const getRowTotal = (row) => {
        return years.reduce((sum, y) => sum + getValue(row, y), 0);
    };

    const hoaTotal = getRowTotal(hoaRow);
    const convTotal = getRowTotal(conveyanceRow);
    const otherTotal = getRowTotal(otherRow);
    const gTotal = hoaTotal + convTotal + otherTotal;

    return {
      grandTotal: gTotal,
      totals: [
          { label: 'HOA Dues', total: hoaTotal, color: TUFTE_PALETTE[4] },
          { label: 'Conveyance', total: convTotal, color: TUFTE_PALETTE[0] },
          { label: 'Other', total: otherTotal, color: TUFTE_PALETTE[1] }
      ],
      chartData: {
        labels: years,
        datasets: [
          {
            label: 'HOA Dues',
            data: years.map(y => getValue(hoaRow, y)),
            backgroundColor: TUFTE_PALETTE[4],
          },
          {
            label: 'Conveyance Assessments',
            data: years.map(y => getValue(conveyanceRow, y)),
            backgroundColor: TUFTE_PALETTE[0],
          },
          {
            label: 'Other (Fines/Late Fees)',
            data: years.map(y => getValue(otherRow, y)),
            backgroundColor: TUFTE_PALETTE[1],
          }
        ]
      }
    };
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { family: '"Consolas", monospace' } }
          },
          y: {
              stacked: true,
              ticks: { callback: (v) => formatCurrency(v), font: { family: '"Consolas", monospace' } },
              grid: { display: true, drawBorder: false, color: '#e5e5e5' }
          }
      },
      plugins: {
        legend: {
            position: 'top',
            labels: { font: { family: '"Consolas", monospace' } }
        },
        tooltip: {
            callbacks: {
                label: (context) => context.dataset.label + ': ' + formatCurrency(context.raw)
            }
        }
      }
  };

  return (
    <Slide title="Income Analysis" subtitle="Breakdown of revenue sources.">
      <div className="flex flex-col gap-12">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SummaryCard title="5-Year Inflow" value={grandTotal} color="#334155" />
              {totals.map((t) => (
                  <SummaryCard key={t.label} title={t.label} value={t.total} color={t.color} />
              ))}
          </div>

          <div className="bg-slate-50 p-8 border border-slate-200">
             <div className="h-[450px]">
                <ChartContainer title="Revenue Composition (Yearly Trends)">
                    {chartData && <Chart type='bar' data={chartData} options={options} />}
                </ChartContainer>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-300">
             <h3 className="text-lg font-bold mb-4 font-serif italic">Commentary</h3>
             <MarkdownBlock filename="2021-2025/Cash Inflows.md" className="prose-sm font-serif max-w-3xl" />
          </div>
      </div>
    </Slide>
  );
}
