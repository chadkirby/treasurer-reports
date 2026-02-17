import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

export default function SpendingByPayee() {
  const { data: payeeData, loading, error } = useData('2021-2025/Cash Outflows by Payee.csv');

  const years = ['2020*', '2021', '2022', '2023', '2024', '2025'];

  const getRowVal = (row, key) => {
    if (!row) return 0;
    let val = row[key];
    if (val !== undefined) return parseCurrency(val);
    const k = Object.keys(row).find(rk => rk.trim() === key);
    return k ? parseCurrency(row[k]) : 0;
  };

  const { payeeChartData, payeeTotals, top3Share, topPayee } = useMemo(() => {
    if (!payeeData) return { payeeChartData: null, payeeTotals: [], top3Share: 0, topPayee: null };

    // Filter out total row and empty payees
    const rows = payeeData.filter(r => {
      const p = r['Payee'] || Object.values(r)[0];
      return p && p.trim() !== '' && !p.includes('TOTAL');
    });

    // Sort by Total to get Top 10
    const sorted = [...rows].sort((a, b) => getRowVal(b, 'Total') - getRowVal(a, 'Total'));
    const top10 = sorted.slice(0, 10);
    const totalAll = rows.reduce((sum, r) => sum + getRowVal(r, 'Total'), 0);
    const top3Sum = sorted.slice(0, 3).reduce((sum, r) => sum + getRowVal(r, 'Total'), 0);
    const topPayeeRow = sorted[0];

    return {
      payeeTotals: top10.map(r => ({
        label: r['Payee'] || Object.values(r)[0],
        total: getRowVal(r, 'Total')
      })),
      top3Share: totalAll > 0 ? top3Sum / totalAll : 0,
      topPayee: topPayeeRow ? { label: topPayeeRow['Payee'] || Object.values(topPayeeRow)[0], total: getRowVal(topPayeeRow, 'Total') } : null,
      payeeChartData: {
        labels: years,
        datasets: top10.map((row, idx) => ({
          label: row['Payee'] || Object.values(row)[0],
          data: years.map(y => getRowVal(row, y)),
          backgroundColor: TUFTE_PALETTE[idx % TUFTE_PALETTE.length],
        }))
      }
    };
  }, [payeeData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error loading Payee data: {error.message}</div>;

  const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;

  const stackedOptions = {
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
        ticks: {
          callback: (v) => formatCurrency(v),
          font: { family: '"Consolas", monospace' }
        },
        grid: { display: true, color: '#e5e5e5' }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { family: '"Consolas", monospace', size: 10 },
          boxWidth: 12
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
        }
      }
    }
  };

  return (
    <Slide title="Cash Outflows by Payee" subtitle="Top payees and yearly trends.">
      <div className="flex flex-col gap-12">
        <div className="bg-white p-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200">
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">Top 3 Share of Total Outflows</div>
              <div className="text-2xl font-serif italic text-slate-900">{formatPercent(top3Share)}</div>
              <div className="text-xs text-slate-500">Based on 2020–2025 payee totals</div>
            </div>
            <div className="p-4 bg-white border border-slate-200">
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">Largest Payee</div>
              <div className="text-lg font-serif italic text-slate-900">{topPayee ? topPayee.label : '—'}</div>
              <div className="text-sm text-slate-600">{topPayee ? formatCurrency(topPayee.total) : '—'}</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-300">
            <h4 className="font-bold mb-4 italic font-serif text-lg">Top Payee Aggregates (2020-2025)</h4>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {payeeTotals.map((pt) => (
                <div key={pt.label} className="flex flex-col border-b border-slate-200 pb-2">
                  <span className="text-[10px] uppercase text-slate-500 font-bold truncate tracking-tight" title={pt.label}>{pt.label}</span>
                  <span className="text-base font-serif italic">{formatCurrency(pt.total)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-slate-200">
          <div className="h-[450px]">
            <ChartContainer title="Cash Outflows by Payee (Yearly Trends)">
              {payeeChartData && <Chart type='bar' data={payeeChartData} options={stackedOptions} />}
            </ChartContainer>
          </div>
        </div>

        <MarkdownSection
          className="pt-8 border-t border-slate-300"
          contentKey="commentary"
          markdownClassName="prose-sm max-w-3xl"
        />
      </div>
    </Slide>
  );
}
