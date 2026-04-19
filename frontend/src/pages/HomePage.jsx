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
  {
    name: 'Linear Regression',
    type: 'Linear',
    note: 'statistical baseline all other models are benchmarked against',
  },
  {
    name: 'Random Forest',
    type: 'Ensemble',
    note: 'aggregates hundreds of decision trees to reduce prediction noise',
  },
  {
    name: 'SVR',
    type: 'Kernel Method',
    note: 'support vector regression on engineered technical features',
  },
  {
    name: 'LSTM',
    type: 'Deep Learning',
    note: 'learns long-term patterns in weekly price sequences',
  },
  {
    name: 'ANN',
    type: 'Deep Learning',
    note: 'feedforward neural network trained on technical indicators',
  },
  {
    name: 'CNN-LSTM',
    type: 'Deep Learning',
    note: 'hybrid architecture combining local pattern extraction with sequence memory',
  },
  {
    name: 'CNN-LSTM Deterministic',
    type: 'Deep Learning',
    note: 'reproducible CNN-LSTM variant with stochastic elements removed',
  },
  {
    name: 'DTR',
    type: 'Tree-Based',
    note: 'decision tree regression, fast and fully interpretable',
  },
  {
    name: 'GRU',
    type: 'Deep Learning',
    note: 'gated recurrent unit, faster alternative to LSTM',
  },
  {
    name: 'GRU All Value Predictors',
    type: 'Deep Learning',
    note: 'GRU variant predicting all four OHLC values simultaneously',
  },
  {
    name: 'KNN',
    type: 'Instance-Based',
    note: 'finds the most similar historical weeks to predict the next',
  },
  {
    name: 'KNN with Pattern Matching',
    type: 'Instance-Based',
    note: 'matches full candlestick sequences rather than individual feature vectors',
  },
  {
    name: 'KNN Pattern Matching Prices',
    type: 'Instance-Based',
    note: 'pattern matching variant predicting absolute price levels directly',
  },
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
    : 'N/A';
  const weekChange =
    latest && prev ? (((latest.close - prev.close) / prev.close) * 100).toFixed(2) : null;
  const changeUp = weekChange !== null ? parseFloat(weekChange) >= 0 : null;

  return (
    <div className="mx-auto px-4 py-10 md:px-6 md:py-16 max-w-[900px]">
      {/* ── Hero ── */}
      <div
        className="mb-8 pb-8 md:mb-12 md:pb-10 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
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
          This platform applies 13 machine learning models to three years of S&amp;P 500 weekly
          data, generating predictions from late 2022 to December 2025. It was built as an academic
          project and is not intended as financial advice.
        </p>
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-wrap items-center gap-4 mb-8 md:mb-12">
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
          className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-4 pt-3 pb-3 md:px-5 md:pt-4 border-b"
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
        <div className="px-3 pt-3 pb-2 md:px-5 md:pt-4 h-[180px] md:h-[220px]">
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
        <div
          className="px-4 py-2 md:px-5 md:py-2.5 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
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
      <div className="mb-10 md:mb-14">
        <p
          className="text-[0.72rem] font-medium tracking-[0.12em] uppercase mb-5"
          style={{ color: 'var(--color-muted)' }}
        >
          Thirteen models benchmarked
        </p>

        <div
          className="border rounded-xl overflow-hidden"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
        >
          {ML_MODELS.map((m, i) => (
            <div
              key={m.name}
              className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-4 py-3 md:px-5 md:py-4"
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
                className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full self-start sm:flex-shrink-0 sm:ml-4 sm:mt-0.5"
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
      <div
        className="grid grid-cols-2 gap-6 sm:flex sm:gap-12 pt-6 md:pt-8 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {[
          { val: '13', label: 'ML Models' },
          { val: '3yr', label: 'of S&P Data' },
          { val: '~150wk', label: 'Forecasted' },
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
