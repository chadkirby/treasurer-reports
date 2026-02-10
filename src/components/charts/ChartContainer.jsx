import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  PieController
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  PieController
);

ChartJS.defaults.font.family = '"Consolas", "Monaco", "Andale Mono", monospace';
ChartJS.defaults.color = '#111';
ChartJS.defaults.scale.grid.color = '#e5e5e5';

export default function ChartContainer({ children, title }) {
  return (
    <div className="bg-transparent h-full flex flex-col">
       {title && <h3 className="text-lg font-normal text-black mb-4 border-b border-black/10 pb-2">{title}</h3>}
       <div className="flex-1 relative min-h-[300px]">
         {children}
       </div>
    </div>
  );
}
