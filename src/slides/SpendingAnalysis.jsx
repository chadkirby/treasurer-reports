import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownBlock from '../components/ui/MarkdownBlock';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';


export default function SpendingAnalysis() {
  const { data: categoryData, loading: catLoading, error: catError } = useData('2021-2025/Cash Outflows by Category.csv');
  const { data: payeeData, loading: payeeLoading, error: payeeError } = useData('2021-2025/Cash Outflows by Payee.csv');

  const payeeChartData = useMemo(() => {
    if (!payeeData) return null;

    const getVal = (row, key) => {
        if (!row) return undefined;
        let val = row[key];
        if (val !== undefined) return val;
        const k = Object.keys(row).find(rk => rk.trim() === key);
        return k ? row[k] : undefined;
    };

    const rows = payeeData.filter(r => {
        const p = getVal(r, 'Payee');
        return p && p !== 'TOTAL OUTFLOW';
    });

    const sorted = rows.map(r => ({
      label: getVal(r, 'Payee'),
      value: parseCurrency(getVal(r, 'Total'))
    })).sort((a, b) => b.value - a.value);

    const top = sorted.slice(0, 10); // Increased to 10 for more info
    if (top.length === 0) return null;

    return {
      labels: top.map(d => d.label),
      datasets: [{
        label: 'Total Payments (2021-2025)',
        data: top.map(d => d.value),
        backgroundColor: TUFTE_PALETTE[4],
        borderRadius: 0,
      }]
    };
  }, [payeeData]);

  const chartData = useMemo(() => {
    if (!categoryData) return null;

    const getVal = (row, key) => {
        if (!row) return undefined;
        let val = row[key];
        if (val !== undefined) return val;
        const k = Object.keys(row).find(rk => rk.trim() === key);
        return k ? row[k] : undefined;
    };

    const rows = categoryData.filter(r => {
        const cat = getVal(r, 'Category');
        return cat && cat !== 'TOTAL OUTFLOW';
    });

    const sorted = rows.map(r => ({
        label: getVal(r, 'Category'),
        value: parseCurrency(getVal(r, 'Total'))
    })).sort((a, b) => b.value - a.value);

    if (sorted.length === 0) return null;

    return {
      labels: sorted.map(d => d.label),
      datasets: [{
        data: sorted.map(d => d.value),
        backgroundColor: TUFTE_PALETTE,
        borderWidth: 0
      }]
    };
  }, [categoryData]);

  if (catLoading || payeeLoading) return <div>Loading...</div>;
  if (catError) return <div className="text-red-500">Error loading Category data: {catError.message}</div>;
  if (payeeError) return <div className="text-red-500">Error loading Payee data: {payeeError.message}</div>;

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { callback: (v) => formatCurrency(v) }, grid: { display: true, color: '#e5e5e5' } } }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  return (
    <Slide title="Spending Analysis" subtitle="Where does the money go?">
      <div className="flex flex-col gap-12">
          {/* Section 1: Categories */}
          <div className="bg-slate-50 p-8 border border-slate-200">
            <div className="h-[400px]">
                <ChartContainer title="Expense Categories (5-Year Total Sum)">
                    {chartData && <Chart type='doughnut' data={chartData} options={options} />}
                </ChartContainer>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-300">
                <h4 className="font-bold mb-4 italic font-serif">Analysis by Category</h4>
                <MarkdownBlock filename="2021-2025/Cash Outflows by Category.md" className="prose-sm max-w-3xl" />
            </div>
          </div>

          {/* Section 2: Payees */}
          <div className="bg-white p-8 border border-slate-200">
             <div className="h-[500px]">
                <ChartContainer title="Top 10 Payees (5-Year Total Sum)">
                    {payeeChartData && <Chart type='bar' data={payeeChartData} options={barOptions} />}
                </ChartContainer>
             </div>
             <div className="mt-8 pt-8 border-t border-slate-300">
                <h4 className="font-bold mb-4 italic font-serif">Vendor Details</h4>
                <MarkdownBlock filename="2021-2025/Cash Outflows by Payee.md" className="prose-sm max-w-3xl" />
             </div>
          </div>
      </div>
    </Slide>
  );
}
