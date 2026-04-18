/*
 * pages/HomePage.jsx
 *
 * Centered single-column layout, max-width 900px.
 * Bold hero title, S&P 500 price card with live Chart.js candlestick chart.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandlestickChart from '../components/charts/CandlestickChart';
import { getHistorical } from '../services/api';

const ML_MODELS = [
  { name: 'LSTM', type: 'Deep Learning', note: 'learns long-term patterns in price sequences' },
  {
    name: 'Random Forest',
    type: 'Ensemble',
    note: 'aggregates many decision trees to reduce noise',
  },
  { name: 'XGBoost', type: 'Ensemble', note: 'gradient boosting, best overall accuracy' },
  { name: 'SVR', type: 'Kernel', note: 'support vector regression on engineered features' },
  { name: 'ANN', type: 'Deep Learning', note: 'feedforward neural network baseline' },
  { name: 'Linear Regression', type: 'Linear', note: 'statistical baseline all other models beat' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHistorical(26)
      .then((data) => {
        setCandles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load chart data.');
        setLoading(false);
      });
  }, []);

  const latest = candles[candles.length - 1] ?? null;
  const prev = candles[candles.length - 2] ?? null;
  const latestClose = latest
    ? latest.close.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—';
  const weekChange =
    latest && prev ? (((latest.close - prev.close) / prev.close) * 100).toFixed(2) : null;
  const changeUp = weekChange !== null ? parseFloat(weekChange) >= 0 : null;

  return (
    <div className="mx-auto px-6 py-16" style={{ maxWidth: '900px' }}>
      {/* ── Hero ── */}
      <div className="mb-12 pb-10 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <p
          className="text-[0.72rem] font-medium tracking-[0.14em] uppercase mb-5"
          style={{ color: 'var(--color-muted)' }}
        >
          COMP208 · Team 45 · University of Liverpool
        </p>

        <h1
          className="font-serif tracking-tight mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4rem)',
            lineHeight: 1.05,
            color: 'var(--color-ink)',
            fontWeight: 700,
          }}
        >
          Weekly S&amp;P 500 price
          <br />
          predictions, powered by
          <br />
          <em style={{ color: 'var(--color-muted)' }}>machine learning.</em>
        </h1>

        <p
          className="text-[1rem] font-light leading-relaxed mb-2"
          style={{ color: 'var(--color-muted)', maxWidth: '600px' }}
        >
          The S&amp;P 500 is a stock market index tracking the 500 largest publicly traded companies
          in the United States. It is the most widely used benchmark for the overall health of the
          US stock market.
        </p>
        <p
          className="text-[1rem] font-light leading-relaxed"
          style={{ color: 'var(--color-muted)', maxWidth: '600px' }}
        >
          This platform applies six machine learning models to historical S&amp;P 500 data to
          generate weekly price forecasts. It was built as an academic project and is not intended
          as financial advice.
        </p>
      </div>

      {/* ── CTAs ── */}
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={() => navigate('/models')}
          className="px-6 py-2.5 rounded-lg text-[0.88rem] font-medium cursor-pointer transition-opacity hover:opacity-75"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-off-white)',
            border: 'none',
          }}
        >
          Browse Models
        </button>
        <button
          onClick={() => navigate('/evaluations')}
          className="text-[0.88rem] font-light cursor-pointer"
          style={{ background: 'none', border: 'none', color: 'var(--color-muted)', padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
        >
          View model evaluations
        </button>
      </div>

      {/* ── S&P 500 price card ── */}
      <div
        className="w-full border rounded-xl overflow-hidden mb-4"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        {/* Card header */}
        <div
          className="flex items-start justify-between px-5 pt-4 pb-3 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div
              className="text-[0.7rem] font-light tracking-widest uppercase mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
              S&amp;P 500 Index · 26-week view
            </div>
            <div
              className="font-serif text-[1.8rem] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' }}
            >
              {latestClose}
            </div>
          </div>

          {weekChange !== null && (
            <span
              className="text-[0.72rem] font-medium px-2.5 py-1 rounded-full mt-1"
              style={{
                background: changeUp ? '#EDFAF3' : '#FEF2F2',
                color: changeUp ? 'var(--color-accent-green)' : 'var(--color-accent-red)',
              }}
            >
              {changeUp ? '+' : ''}
              {weekChange}% this week
            </span>
          )}
        </div>

        {/* Chart area */}
        <div className="px-5 pt-4 pb-2" style={{ height: '220px' }}>
          {loading && (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-muted)',
                fontSize: '0.82rem',
                fontWeight: 300,
              }}
            >
              Loading chart data...
            </div>
          )}
          {error && (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-red)',
                fontSize: '0.82rem',
                fontWeight: 300,
              }}
            >
              {error}
            </div>
          )}
          {!loading && !error && <CandlestickChart candles={candles} />}
        </div>

        {/* Card footer */}
        <div className="px-5 py-2.5 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-[0.7rem] font-light" style={{ color: 'var(--color-muted)' }}>
            {candles.length > 0
              ? `Showing ${candles.length} weeks of live S&P 500 data via Yahoo Finance.`
              : 'Live data loads from the backend when available.'}
          </p>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div
        className="flex items-start gap-2.5 px-4 py-3 rounded-lg border mb-14"
        style={{
          borderColor: 'var(--color-disclaimer-border)',
          background: 'var(--color-disclaimer-bg)',
        }}
      >
        <span
          style={{ color: 'var(--color-disclaimer-icon)', fontSize: '0.8rem', lineHeight: 1.2 }}
        >
          ⚠
        </span>
        <p
          className="text-[0.72rem] font-light leading-relaxed"
          style={{ color: 'var(--color-disclaimer-text)' }}
        >
          Predictions are for{' '}
          <strong style={{ color: 'var(--color-disclaimer-strong)', fontWeight: 500 }}>
            academic purposes only
          </strong>{' '}
          and do not constitute financial advice. Past performance does not guarantee future
          results.
        </p>
      </div>

      {/* ── ML models list ── */}
      <div className="mb-14">
        <p
          className="text-[0.72rem] font-medium tracking-[0.12em] uppercase mb-5"
          style={{ color: 'var(--color-muted)' }}
        >
          Six models benchmarked
        </p>

        <div
          className="border rounded-xl overflow-hidden"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
        >
          {ML_MODELS.map((m, i) => (
            <div
              key={m.name}
              className="flex items-start justify-between px-5 py-4"
              style={{
                borderBottom: i < ML_MODELS.length - 1 ? `1px solid var(--color-border)` : 'none',
              }}
            >
              <div>
                <span
                  className="text-[0.9rem] font-medium block mb-0.5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {m.name}
                </span>
                <span className="text-[0.8rem] font-light" style={{ color: 'var(--color-muted)' }}>
                  {m.note}
                </span>
              </div>
              <span
                className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full flex-shrink-0 ml-4 mt-0.5"
                style={{
                  background: 'var(--color-off-white)',
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {m.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div className="flex gap-12 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
        {[
          { val: '6', label: 'ML Models' },
          { val: '100yr', label: 'of S&P Data' },
          { val: '52wk', label: 'Forecasted' },
          { val: '7', label: 'Team Members' },
        ].map(({ val, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <span
              className="font-serif text-[1.6rem] tracking-tight"
              style={{ color: 'var(--color-ink)' }}
            >
              {val}
            </span>
            <span
              className="text-[0.72rem] font-light uppercase tracking-[0.08em]"
              style={{ color: 'var(--color-muted)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
