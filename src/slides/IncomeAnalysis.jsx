import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

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
        const key = Object.keys(row).find(k => k.trim().startsWith(year));
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
          { label: 'Conveyance Assessments', total: convTotal, color: TUFTE_PALETTE[0] },
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
          <div className="bg-white p-6 border border-slate-200">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-end gap-x-3 text-slate-900">
              <div className="flex flex-col min-w-0">
                <span className="text-sm uppercase tracking-wide text-slate-700 font-sans font-bold whitespace-nowrap">5-Year Inflow</span>
                <span className="text-[clamp(2rem,2.5vw,2.8rem)] font-serif italic leading-none whitespace-nowrap mt-[6px]">{formatCurrency(grandTotal)}</span>
              </div>
              <span className="text-[clamp(1.8rem,2vw,2.5rem)] text-slate-500 leading-none pb-0.5">=</span>
              {totals.map((t, idx) => {
                const labelClass =
                  t.label === 'HOA Dues'
                    ? 'text-blue-700'
                    : t.label === 'Conveyance Assessments'
                      ? 'text-teal-700'
                      : 'text-slate-700';
                return (
                  <React.Fragment key={t.label}>
                    <div className="flex flex-col min-w-0">
                      {t.label === 'Conveyance Assessments' ? (
                        <span className={`text-sm uppercase tracking-wide font-sans font-bold leading-tight ${labelClass}`}>
                          <span className="block">Conveyance</span>
                          <span className="block">Assessments</span>
                        </span>
                      ) : (
                        <span className={`text-sm uppercase tracking-wide font-sans font-bold whitespace-nowrap ${labelClass}`}>{t.label}</span>
                      )}
                      <span className="text-[clamp(2rem,2.5vw,2.8rem)] font-serif italic leading-none whitespace-nowrap mt-[6px]">{formatCurrency(t.total)}</span>
                    </div>
                    {idx < totals.length - 1 && <span className="text-[clamp(1.8rem,2vw,2.5rem)] text-slate-500 leading-none pb-0.5">+</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-8 border border-slate-200">
             <div className="h-[450px]">
                <ChartContainer title="Revenue Composition (Yearly Trends)">
                    {chartData && <Chart type='bar' data={chartData} options={options} />}
                </ChartContainer>
             </div>
          </div>

          <MarkdownSection
            className="pt-8 border-t border-slate-300"
            title="Commentary"
            titleTag="h3"
            titleClassName="text-lg font-bold mb-4 font-serif italic"
            contentKey="commentary"
            markdownClassName="prose-sm font-serif max-w-3xl"
          />
      </div>
    </Slide>
  );
}
