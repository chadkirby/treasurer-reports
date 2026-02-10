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

export default function SpendingAnalysis() {
  const { data: categoryData, loading: catLoading, error: catError } = useData('2021-2025/Cash Outflows by Category.csv');
  const { data: payeeData, loading: payeeLoading, error: payeeError } = useData('2021-2025/Cash Outflows by Payee.csv');

  const years = ['2020*', '2021', '2022', '2023', '2024', '2025'];

  const getRowVal = (row, key) => {
    if (!row) return 0;
    let val = row[key];
    if (val !== undefined) return parseCurrency(val);
    const k = Object.keys(row).find(rk => rk.trim() === key);
    return k ? parseCurrency(row[k]) : 0;
  };

  const { catChartData, catTotals, grandTotal } = useMemo(() => {
    if (!categoryData) return { catChartData: null, catTotals: [], grandTotal: 0 };

    // Filter out total row and empty categories
    const rows = categoryData.filter(r => {
        const cat = r['Category'] || Object.values(r)[0];
        return cat && cat.trim() !== '' && !cat.includes('TOTAL');
    });

    const totals = rows.map(row => ({
        label: row['Category'] || Object.values(row)[0],
        total: getRowVal(row, 'Total')
    })).sort((a,b) => b.total - a.total);

    const gTotal = totals.reduce((sum, t) => sum + t.total, 0);

    return {
      grandTotal: gTotal,
      catTotals: totals,
      catChartData: {
        labels: years,
        datasets: rows.map((row, idx) => ({
          label: row['Category'] || Object.values(row)[0],
          data: years.map(y => getRowVal(row, y)),
          backgroundColor: TUFTE_PALETTE[idx % TUFTE_PALETTE.length],
        }))
      }
    };
  }, [categoryData]);

  const { payeeChartData, payeeTotals } = useMemo(() => {
    if (!payeeData) return { payeeChartData: null, payeeTotals: [] };

    // Filter out total row and empty payees
    const rows = payeeData.filter(r => {
        const p = r['Payee'] || Object.values(r)[0];
        return p && p.trim() !== '' && !p.includes('TOTAL');
    });

    // Sort by Total to get Top 10
    const sorted = [...rows].sort((a, b) => getRowVal(b, 'Total') - getRowVal(a, 'Total'));
    const top10 = sorted.slice(0, 10);

    return {
      payeeTotals: top10.map(r => ({
          label: r['Payee'] || Object.values(r)[0],
          total: getRowVal(r, 'Total')
      })),
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

  if (catLoading || payeeLoading) return <div>Loading...</div>;
  if (catError) return <div className="text-red-500">Error loading Category data: {catError.message}</div>;
  if (payeeError) return <div className="text-red-500">Error loading Payee data: {payeeError.message}</div>;

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
    <Slide title="Spending Analysis" subtitle="Where does the money go?">
      <div className="flex flex-col gap-12">
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {catTotals.slice(0, 5).map((ct, idx) => (
                  <SummaryCard key={ct.label} title={`Top: ${ct.label}`} value={ct.total} color={TUFTE_PALETTE[idx % TUFTE_PALETTE.length]} />
              ))}
          </div>

          {/* Section 1: Categories */}
          <div className="bg-slate-50 p-8 border border-slate-200">
            <div className="h-[450px]">
                <ChartContainer title="Cash Outflows by Category (Yearly Trends)">
                    {catChartData && <Chart type='bar' data={catChartData} options={stackedOptions} />}
                </ChartContainer>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-300">
                <h4 className="font-bold mb-4 italic font-serif text-lg">Top Category Aggregates (2020-2025)</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {catTotals.map((ct, idx) => (
                        <div key={ct.label} className="flex flex-col border-b border-slate-200 pb-2">
                            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">{ct.label}</span>
                            <span className="text-lg font-serif italic">{formatCurrency(ct.total)}</span>
                        </div>
                    ))}
                </div>
                <MarkdownBlock filename="2021-2025/Cash Outflows by Category.md" className="prose-sm max-w-3xl" />
            </div>
          </div>

          {/* Section 2: Payees */}
          <div className="bg-white p-8 border border-slate-200">
             <div className="h-[450px]">
                <ChartContainer title="Top 10 Payees (Yearly Trends)">
                    {payeeChartData && <Chart type='bar' data={payeeChartData} options={stackedOptions} />}
                </ChartContainer>
             </div>
             <div className="mt-8 pt-8 border-t border-slate-300">
                <h4 className="font-bold mb-4 italic font-serif text-lg">Top Vendor Aggregates (2020-2025)</h4>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {payeeTotals.map((pt, idx) => (
                        <div key={pt.label} className="flex flex-col border-b border-slate-200 pb-2">
                             <span className="text-[10px] uppercase text-slate-500 font-bold truncate tracking-tight" title={pt.label}>{pt.label}</span>
                             <span className="text-base font-serif italic">{formatCurrency(pt.total)}</span>
                        </div>
                    ))}
                </div>
                <MarkdownBlock filename="2021-2025/Cash Outflows by Payee.md" className="prose-sm max-w-3xl" />
             </div>
          </div>
      </div>
    </Slide>
  );
}
