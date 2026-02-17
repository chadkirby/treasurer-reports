import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

export default function FinancialPosition() {
  const { data, loading, error } = useData('2021-2025/Overall Financial Position.csv');

  const chartData = useMemo(() => {
    if (!data) return null;

    // Keep only true year rows (e.g., 2021-2025), excluding summary rows like "Average" or "Total (5 Yrs)".
    const rows = data.filter((row) => /^\d{4}$/.test(String(row.Year || '').trim()));

    return {
      labels: rows.map(r => r.Year),
      datasets: [
        {
          type: 'line',
          label: 'Net Cash Flow',
          data: rows.map(r => parseCurrency(r['Net Cash Flow'])),
          borderColor: TUFTE_PALETTE[4], // Blue
          backgroundColor: TUFTE_PALETTE[4],
          borderWidth: 2,
          yAxisID: 'y',
          tension: 0
        },
        {
          type: 'bar',
          label: 'Total Inflows',
          data: rows.map(r => parseCurrency(r['Total Cash Inflows'])),
          backgroundColor: TUFTE_PALETTE[0], // Teal
          yAxisID: 'y',
          order: 2
        },
        {
          type: 'bar',
          label: 'Total Outflows',
          data: rows.map(r => parseCurrency(r['Total Cash Outflows'])),
          backgroundColor: TUFTE_PALETTE[3], // Salmon
          yAxisID: 'y',
          order: 3
        }
      ]
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { display: true, drawBorder: false },
        ticks: {
            callback: (value) => formatCurrency(value),
            font: { family: '"Consolas", monospace' }
        }
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
        legend: {
            labels: { font: { family: '"Consolas", monospace' } }
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += formatCurrency(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Slide title="Overall Financial Position" subtitle="Year-over-year comparison of Inflows vs Outflows.">
      <div className="flex flex-col gap-12">
        <div className="bg-white p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
            <div className="p-4 bg-white border border-slate-200 text-center">
               <div className="uppercase tracking-widest text-xs font-semibold mb-2 text-slate-500">Avg. Annual Inflow</div>
               <div className="text-2xl">$75,387</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 text-center">
               <div className="uppercase tracking-widest text-xs font-semibold mb-2 text-slate-500">Avg. Annual Outflow</div>
               <div className="text-2xl">$70,101</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 text-center text-teal-700">
               <div className="uppercase tracking-widest text-xs font-semibold mb-2 text-slate-500">Avg. Net Flow</div>
               <div className="text-2xl">+$5,286</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-slate-200">
          <div className="h-[400px]">
            <ChartContainer title="Annual Cash Flow (2021-2025)">
                {chartData && <Chart type='bar' data={chartData} options={options} />}
            </ChartContainer>
          </div>
        </div>

        <MarkdownSection
          className="pt-8 border-t border-slate-300"
          title="Observations"
          titleTag="h3"
          titleClassName="text-lg font-bold mb-4 font-serif italic"
          contentKey="observations"
          markdownClassName="prose-sm font-serif max-w-3xl"
        />
      </div>
    </Slide>
  );
}
