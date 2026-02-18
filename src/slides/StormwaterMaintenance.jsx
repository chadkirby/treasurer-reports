import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import Slide from '../components/ui/Slide';
import ChartContainer from '../components/charts/ChartContainer';
import MarkdownSection from '../components/ui/MarkdownSection';
import { SummaryGrid, SummaryMetric, SummaryPanel } from '../components/ui/SummaryPanel';
import { useData } from '../hooks/useData';
import { formatCurrency } from '../utils/format';
import { TUFTE_PALETTE } from '../utils/theme';

export default function StormwaterMaintenance() {
  const { data, loading, error } = useData('2021-2025/Stormwater Maintenance.csv');

  const {
    totalStormwater,
    averageStormwater,
    peakYear,
    chartData,
  } = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        totalStormwater: 0,
        averageStormwater: 0,
        peakYear: null,
        chartData: null,
      };
    }

    const rows = data
      .filter((row) => String(row.Year || '').trim())
      .map((row) => ({
        year: String(row.Year).trim(),
        stormwater: Number(row['Stormwater Maintenance'] || 0),
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));

    const labels = rows.map((row) => row.year);
    const values = rows.map((row) => row.stormwater);
    const total = values.reduce((sum, value) => sum + value, 0);
    const average = values.length > 0 ? total / values.length : 0;
    const peak = rows.reduce(
      (best, row) => (best && best.stormwater >= row.stormwater ? best : row),
      null
    );

    return {
      totalStormwater: total,
      averageStormwater: average,
      peakYear: peak,
      chartData: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Stormwater Maintenance',
            data: values,
            backgroundColor: TUFTE_PALETTE[0],
            borderColor: TUFTE_PALETTE[0],
          },
        ],
      },
    };
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error loading Stormwater data: {error.message}</div>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: '"Consolas", monospace' } },
      },
      y: {
        ticks: {
          callback: (value) => formatCurrency(value),
          font: { family: '"Consolas", monospace' },
        },
        grid: { display: true, color: '#e5e5e5' },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { family: '"Consolas", monospace' } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}`,
        },
      },
    },
  };

  return (
    <Slide title="Stormwater Maintenance" subtitle="Year-by-year stormwater maintenance payments.">
      <div className="flex flex-col gap-12">
        <SummaryPanel>
          <SummaryGrid className="md:grid-cols-3 xl:grid-cols-3">
            <SummaryMetric label="Total Stormwater Paid" value={formatCurrency(totalStormwater)} />
            <SummaryMetric label="Avg. Annual Stormwater" value={formatCurrency(averageStormwater)} />
            <SummaryMetric
              label={peakYear ? `Peak Year (${peakYear.year})` : 'Peak Year'}
              value={peakYear ? formatCurrency(peakYear.stormwater) : '—'}
            />
          </SummaryGrid>
        </SummaryPanel>

        <div className="bg-white p-8 border border-slate-200">
          <div className="h-[450px]">
            <ChartContainer title="Stormwater Maintenance Payments by Year">
              {chartData && <Chart type="bar" data={chartData} options={options} />}
            </ChartContainer>
          </div>
        </div>

        <MarkdownSection
          className="pt-8 border-t border-slate-300"
          title="Commentary"
          titleTag="h3"
          titleClassName="text-lg font-bold mb-4 font-serif italic"
          contentKey="main"
          markdownClassName="prose-sm font-serif max-w-3xl"
        />
      </div>
    </Slide>
  );
}
