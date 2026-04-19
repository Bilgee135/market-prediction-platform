import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial'
import 'chartjs-adapter-date-fns'

Chart.register(...registerables, CandlestickController, CandlestickElement)

const TIMEFRAME_WEEKS_WEEKLY = { '1M': 4,   '3M': 13,  '6M': 26,  '1Y': 52,  ALL: null }
const TIMEFRAME_WEEKS_DAILY  = { '1M': 21,  '3M': 63,  '6M': 126, '1Y': 252, ALL: null }
const WEEKLY_MODELS = ['lstm']

export default function PredictionCandlestickChart({ predictions, historical, timeframe, modelName = '' }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    const tfMap   = WEEKLY_MODELS.includes(modelName) ? TIMEFRAME_WEEKS_WEEKLY : TIMEFRAME_WEEKS_DAILY
    const weeks   = tfMap[timeframe]

    // Predicted candles
    const allPred = predictions.filter(p => p.predicted_open && p.predicted_high && p.predicted_low && p.predicted_close)
    const filteredPred = weeks ? allPred.slice(-weeks) : allPred

    // Historical candles - slice to same date range
    const filteredHist = weeks ? (historical || []).slice(-weeks) : (historical || [])

    const predDataset = filteredPred.map(p => ({
      x: new Date(p.prediction_date).getTime(),
      o: parseFloat(p.predicted_open),
      h: parseFloat(p.predicted_high),
      l: parseFloat(p.predicted_low),
      c: parseFloat(p.predicted_close),
    }))

    const histDataset = filteredHist.map(h => ({
      x: new Date(h.date).getTime(),
      o: h.open,
      h: h.high,
      l: h.low,
      c: h.close,
    }))

    const datasets = []

    if (histDataset.length > 0) {
      datasets.push({
        label: 'Actual',
        data: histDataset,
        color: { up: '#1A7A4A', down: '#DC2626', unchanged: '#9CA3AF' },
        borderColor: { up: '#1A7A4A', down: '#DC2626', unchanged: '#9CA3AF' },
      })
    }

    if (predDataset.length > 0) {
      datasets.push({
        label: 'Predicted',
        data: predDataset,
        color: { up: 'rgba(37,99,235,0.7)', down: 'rgba(220,38,38,0.5)', unchanged: '#9CA3AF' },
        borderColor: { up: 'rgba(37,99,235,0.7)', down: 'rgba(220,38,38,0.5)', unchanged: '#9CA3AF' },
      })
    }

    if (datasets.length === 0) return

    const ctx = canvasRef.current.getContext('2d')

    chartRef.current = new Chart(ctx, {
      type: 'candlestick',
      data: { datasets },
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
            },
          },
          tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            titleColor: '#111827',
            bodyColor: '#6B7280',
            padding: 10,
            callbacks: {
              title: items => new Date(items[0].parsed.x).toLocaleDateString('en-GB'),
              label: item => {
                const d = item.raw
                return `${item.dataset.label}  O:${d.o?.toFixed(2)}  H:${d.h?.toFixed(2)}  L:${d.l?.toFixed(2)}  C:${d.c?.toFixed(2)}`
              },
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
            ticks: { color: '#9CA3AF', font: { size: 11 }, callback: val => `$${val.toLocaleString()}` },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [predictions, historical, timeframe, modelName])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}