import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import { useData } from '../hooks/useData';
import { parseCurrency, formatCurrency } from '../utils/format';

export default function FinancialPosition() {
  const { data, loading, error } = useData('2021-2025/Overall Financial Position.csv');

  const chartData = useMemo(() => {
    if (!data) return null;

    // Filter out "Average" row if present
    const rows = data.filter(row => row.Year && row.Year !== 'Average');

    return {
      labels: rows.map(r => r.Year),
      datasets: [
        {
          type: 'line',
          label: 'Net Cash Flow',
          data: rows.map(r => parseCurrency(r['Net Cash Flow'])),
          borderColor: '#2563eb', // Blue 600
          backgroundColor: '#2563eb',
          borderWidth: 2,
          yAxisID: 'y',
          tension: 0.3
        },
        {
          type: 'bar',
          label: 'Total Inflows',
          data: rows.map(r => parseCurrency(r['Total Cash Inflows'])),
          backgroundColor: '#10b981', // Emerald 500
          yAxisID: 'y',
          order: 2
        },
        {
          type: 'bar',
          label: 'Total Outflows',
          data: rows.map(r => parseCurrency(r['Total Cash Outflows'])),
          backgroundColor: '#ef4444', // Red 500
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
        ticks: {
            callback: (value) => formatCurrency(value)
        }
      }
    },
    plugins: {
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
      <ChartContainer title="Annual Cash Flow (2021-2025)">
          {chartData && <Chart type='bar' data={chartData} options={options} />}
      </ChartContainer>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
             <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Avg. Annual Inflow</div>
             <div className="text-2xl font-bold text-emerald-600">$75,387</div>
          </div>
          <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
             <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Avg. Annual Outflow</div>
             <div className="text-2xl font-bold text-red-500">$70,101</div>
          </div>
          <div className="bg-white p-4 rounded border border-slate-100 shadow-sm text-center">
             <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Avg. Net Flow</div>
             <div className="text-2xl font-bold text-blue-600">+$5,286</div>
          </div>
      </div>
    </Slide>
  );
}
