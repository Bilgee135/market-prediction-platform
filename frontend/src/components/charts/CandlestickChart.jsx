/*
 * components/charts/CandlestickChart.jsx
 *
 * What this is:
 *   The main price chart on the model forecast page. Renders historical
 *   OHLCV candlesticks and overlays faded predicted candles with a dashed
 *   line beyond the "NOW" divider.
 *
 * Where it is used:
 *   ModelForecastPage.jsx inside the main chart panel.
 *
 * What it should contain:
 *   - SVG-based candlestick chart (or Plotly/Chart.js if preferred)
 *   - Historical candles rendered in full opacity
 *   - A vertical dashed "NOW" divider separating past from forecast
 *   - Predicted candles rendered at reduced opacity beyond the divider
 *   - A dashed polyline connecting the last actual candle to the forecast
 *   - Y-axis labels on the left
 *   - Responds to the chartType prop (Candlestick vs Line)
 *   - Responds to the timeframe prop (1M / 3M / 6M / 1Y) to slice data
 *
 * Props:
 *   historicalData  array of OHLCV objects from the API
 *   predictedData   array of predicted OHLCV objects from the API
 *   chartType       "candlestick" or "line"
 *   timeframe       "1M" | "3M" | "6M" | "1Y"
 *
 * Development order:
 *   Build after ControlBar. Start with hardcoded data to get the rendering
 *   right, then wire to real API data. This is the most complex component
 *   in the project — leave enough time for it.
 */

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, CandlestickController, CandlestickElement);

export default function CandlestickChart({ candles }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!candles || candles.length === 0) return;

    // Destroy any existing instance and clear the ref before creating a new one.
    // The null assignment is critical for React StrictMode, which mounts twice
    // in development. Without it, the second mount tries to destroy an already-dead
    // instance and Chart.js throws "Canvas is already in use".
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: 'S&P 500',
            data: candles.map((c) => ({
              x: new Date(c.date).getTime(),
              o: c.open,
              h: c.high,
              l: c.low,
              c: c.close,
            })),
            color: {
              up: '#1A7A4A',
              down: '#DC2626',
              unchanged: '#9CA3AF',
            },
            borderColor: {
              up: '#1A7A4A',
              down: '#DC2626',
              unchanged: '#9CA3AF',
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const d = ctx.raw;
                return `O: ${d.o}  H: ${d.h}  L: ${d.l}  C: ${d.c}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'time',
            time: { unit: 'week' },
            grid: { color: '#E5E7EB' },
            ticks: { color: '#9CA3AF', font: { size: 11 }, maxTicksLimit: 8, maxRotation: 0 },
          },
          y: {
            position: 'right',
            grid: { color: '#E5E7EB' },
            ticks: { color: '#9CA3AF', font: { size: 11 } },
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
  }, [candles]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
