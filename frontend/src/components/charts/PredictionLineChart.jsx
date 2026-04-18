import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const TIMEFRAME_WEEKS = { '1M': 4, '3M': 13, '6M': 26, '1Y': 52, ALL: null };

// Hardcoded rates as of 17 April 2026
const CURRENCY = {
  USD: { rate: 1, symbol: '$' },
  GBP: { rate: 0.7399, symbol: '£' },
  EUR: { rate: 0.8482, symbol: '€' },
};

export default function PredictionLineChart({
  predictions,
  historical,
  timeframe,
  currency = 'USD',
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!predictions || predictions.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const rate = CURRENCY[currency].rate;
    const symbol = CURRENCY[currency].symbol;

    const weeks = TIMEFRAME_WEEKS[timeframe];
    const filtered = weeks ? predictions.slice(-weeks) : predictions;

    const actualMap = {};
    if (historical) {
      historical.forEach((h) => {
        const key = new Date(h.date).toISOString().split('T')[0];
        actualMap[key] = h.close;
      });
    }

    const predictedDataset = filtered.map((p) => ({
      x: new Date(p.prediction_date).getTime(),
      y: parseFloat(p.predicted_close) * rate,
    }));

    const actualDataset = filtered
      .map((p) => {
        const key = new Date(p.prediction_date).toISOString().split('T')[0];
        const actual = actualMap[key];
        return actual !== undefined
          ? { x: new Date(p.prediction_date).getTime(), y: actual * rate }
          : null;
      })
      .filter(Boolean);

    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Predicted Close',
            data: predictedDataset,
            borderColor: '#1A7A4A',
            backgroundColor: 'rgba(26, 122, 74, 0.06)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.3,
            fill: true,
          },
          ...(actualDataset.length > 0
            ? [
                {
                  label: 'Actual Close',
                  data: actualDataset,
                  borderColor: '#2563eb',
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 4,
                  tension: 0.3,
                  fill: false,
                  borderDash: [5, 4],
                },
              ]
            : []),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#9CA3AF',
              font: { size: 11, family: 'DM Sans, sans-serif' },
              boxWidth: 12,
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            titleColor: '#111827',
            bodyColor: '#6B7280',
            padding: 10,
            titleFont: { size: 11, family: 'DM Sans, sans-serif', weight: '500' },
            bodyFont: { size: 11, family: 'DM Sans, sans-serif' },
            callbacks: {
              title: (items) => new Date(items[0].parsed.x).toLocaleDateString('en-GB'),
              label: (item) =>
                `${item.dataset.label}: ${symbol}${item.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            },
          },
        },
        scales: {
          x: {
            type: 'time',
            time: { unit: timeframe === '1M' ? 'week' : 'month' },
            grid: { color: '#F3F4F6' },
            ticks: { color: '#9CA3AF', font: { size: 11 }, maxTicksLimit: 8 },
          },
          y: {
            position: 'right',
            grid: { color: '#F3F4F6' },
            ticks: {
              color: '#9CA3AF',
              font: { size: 11 },
              callback: (val) => `${symbol}${val.toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [predictions, historical, timeframe, currency]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
