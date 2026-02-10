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

  if (catLoading || payeeLoading) return <div>Loading...</div>;
  if (catError) return <div className="text-red-500">Error loading Category data: {catError.message}</div>;
  if (payeeError) return <div className="text-red-500">Error loading Payee data: {payeeError.message}</div>;

  const payeeChartData = useMemo(() => {
    if (!payeeData) return null;

    const getVal = (row, key) => {
        if (!row) return undefined;
        let val = row[key];
        if (val !== undefined) return val;
        const k = Object.keys(row).find(rk => rk.trim() === key);
        return k ? row[k] : undefined;
    };

    // Rows have Payee, ..., Total
    const rows = payeeData.filter(r => {
        const p = getVal(r, 'Payee');
        return p && p !== 'TOTAL OUTFLOW';
    });

    const sorted = rows.map(r => ({
      label: getVal(r, 'Payee'),
      value: parseCurrency(getVal(r, 'Total'))
    })).sort((a, b) => b.value - a.value);

    // Limit to top 5
    const top = sorted.slice(0, 5);

    if (top.length === 0) return null;

    return {
      labels: top.map(d => d.label),
      datasets: [{
        label: 'Total Payments (2021-2025)',
        data: top.map(d => d.value),
        backgroundColor: TUFTE_PALETTE[4], // Blue
        borderRadius: 0, // No radius for Tufte
      }]
    };
  }, [payeeData]);

  // We actully want the "Average" row for distribution, or maybe summed up over years?
  // Let's take the "Average" row for a representative year breakdown if available,
  // or sum up all years.
  // The CSV usually has Year, Category1, Category2...

  const chartData = useMemo(() => {
    if (!categoryData) return null;

    // Helper for safe key access
    const getVal = (row, key) => {
        if (!row) return undefined;
        let val = row[key];
        if (val !== undefined) return val;
        const k = Object.keys(row).find(rk => rk.trim() === key);
        return k ? row[k] : undefined;
    };

    // Filter rows
    const rows = categoryData.filter(r => {
        const cat = getVal(r, 'Category');
        return cat && cat !== 'TOTAL OUTFLOW';
    });

    // Sort by Total
    const sorted = rows.map(r => ({
        label: getVal(r, 'Category'),
        value: parseCurrency(getVal(r, 'Total'))
    })).sort((a, b) => b.value - a.value);

    // If no processing happened (empty), return check
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

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
       legend: { display: false }
    },
    scales: {
        x: { ticks: { callback: (v) => formatCurrency(v) } }
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'right' }
    }
  };

  return (
    <Slide title="Spending Analysis" subtitle="Where does the money go?">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Left Col: Categories */}
          <div className="flex flex-col gap-4 h-1/2 md:h-full">
            <ChartContainer title="Expense Categories (Avg. Annual)">
                {chartData && <Chart type='doughnut' data={chartData} options={options} />}
            </ChartContainer>
            <div className="p-4 border-t border-slate-300 flex-1 overflow-y-auto font-serif text-sm">
                <MarkdownBlock filename="2021-2025/Cash Outflows by Category.md" className="prose-sm" />
            </div>
          </div>

          {/* Right Col: Payees */}
          <div className="flex flex-col gap-4 h-1/2 md:h-full">
             <ChartContainer title="Top Payees (5-Year Total)">
                  {payeeChartData && <Chart type='bar' data={payeeChartData} options={barOptions} />}
             </ChartContainer>
              <div className="p-4 border-t border-slate-300 flex-1 overflow-y-auto text-sm">
                  <h4 className="font-bold mb-2 uppercase tracking-widest text-xs">Vendor Details</h4>
                  <MarkdownBlock filename="2021-2025/Cash Outflows by Payee.md" className="prose-sm" />
              </div>
          </div>
      </div>
    </Slide>
  );
}
