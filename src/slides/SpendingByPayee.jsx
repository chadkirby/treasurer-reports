import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { SummaryGrid, SummaryMetric, SummaryPanel } from '../components/ui/SummaryPanel';
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

  const { payeeChartData, payeeTotals } = useMemo(() => {
    if (!payeeData) return { payeeChartData: null, payeeTotals: [] };

    // Filter out total row and empty payees
    const rows = payeeData.filter(r => {
      const p = r['Payee'] || Object.values(r)[0];
      return (
        p &&
        p.trim() !== '' &&
        !p.includes('TOTAL') &&
        !/all others/i.test(p)
      );
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error loading Payee data: {error.message}</div>;

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
        <SummaryPanel title="Top Payee Aggregates (2020-2025)">
          <SummaryGrid className="md:grid-cols-3 xl:grid-cols-3">
            {payeeTotals.map((pt) => (
              <SummaryMetric
                key={pt.label}
                label={pt.label}
                labelTitle={pt.label}
                value={formatCurrency(pt.total)}
                compact
                labelClassName="whitespace-normal break-words"
              />
            ))}
          </SummaryGrid>
        </SummaryPanel>

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
