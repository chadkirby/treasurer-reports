import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

export default function SpendingByCategory() {
  const { data: categoryData, loading, error } = useData('2021-2025/Cash Outflows by Category.csv');

  const years = ['2020*', '2021', '2022', '2023', '2024', '2025'];

  const getRowVal = (row, key) => {
    if (!row) return 0;
    let val = row[key];
    if (val !== undefined) return parseCurrency(val);
    const k = Object.keys(row).find(rk => rk.trim() === key);
    return k ? parseCurrency(row[k]) : 0;
  };

  const { catChartData, catTotals } = useMemo(() => {
    if (!categoryData) return { catChartData: null, catTotals: [] };

    // Filter out total row and empty categories
    const rows = categoryData.filter(r => {
      const cat = r['Category'] || Object.values(r)[0];
      return cat && cat.trim() !== '' && !cat.includes('TOTAL');
    });

    const totals = rows
      .map(row => ({
        label: row['Category'] || Object.values(row)[0],
        total: getRowVal(row, 'Total')
      }))
      .sort((a, b) => b.total - a.total);

    return {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error loading Category data: {error.message}</div>;

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
    <Slide title="Cash Outflows by Category" subtitle="Yearly trends and category totals.">
      <div className="flex flex-col gap-12">
        <div className="bg-white p-8 border border-slate-200">
          <h4 className="font-bold mb-4 italic font-serif text-lg">Top Category Aggregates (2020-2025)</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {catTotals.map((ct) => (
              <div key={ct.label} className="flex flex-col border-b border-slate-200 pb-2">
                <span className="text-[12px] uppercase text-slate-500 font-bold tracking-tight">{ct.label}</span>
                <span className="text-2xl font-serif italic">{formatCurrency(ct.total)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 border border-slate-200">
          <div className="h-[450px]">
            <ChartContainer title="Cash Outflows by Category (Yearly Trends)">
              {catChartData && <Chart type='bar' data={catChartData} options={stackedOptions} />}
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
