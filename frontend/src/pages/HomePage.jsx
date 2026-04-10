/*
 * pages/HomePage.jsx
 *
 * What this is:
 *   The landing page of the application. The first thing a user sees.
 *
 * Where it is used:
 *   App.jsx at route /
 *
 * What it contains:
 *   - Two-column hero layout
 *   - Left:  eyebrow label, headline, subtext, two CTA buttons, StatStrip
 *   - Right: ChartCard, SVG candlestick chart, model pill selectors, forecast footer
 *
 * Data dependencies:
 *   All chart data is hardcoded for now.
 *   Wire LEFT column to GET /api/ticker for the live S&P price when ready.
 *   Wire chart to GET /api/historical for real candle data later.
 *
 * Development order:
 *   Third, after Navbar and App.jsx routing are working.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Candlestick chart data
// Each entry is [open, high, low, close].
// This matches the synthetic data from the static hero-section.html exactly.
const CANDLES = [
  [5320,5380,5290,5355], [5355,5410,5330,5370], [5370,5360,5280,5290],
  [5290,5310,5240,5260], [5260,5300,5220,5285], [5285,5350,5270,5340],
  [5340,5400,5320,5390], [5390,5440,5360,5420], [5420,5410,5350,5365],
  [5365,5380,5290,5300], [5300,5360,5280,5350], [5350,5480,5340,5460],
  [5460,5520,5430,5510], [5510,5560,5490,5540], [5540,5600,5510,5590],
  [5590,5650,5560,5642],
];

const PREDICTED = [
  [5642, 5720, 5610, 5711],
  [5711, 5780, 5690, 5760],
];

const MODELS = ['LSTM', 'Random Forest', 'XGBoost', 'Linear Reg.', 'SVR'];

// Chart constants
// These mirror the SVG viewBox from the static version.
const W = 432;
const H = 180;
const PAD = { top: 12, right: 12, bottom: 20, left: 0 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

// CandlestickChart
// A self-contained SVG component. It receives the candle data as props and
// returns pure SVG markup, no DOM manipulation, no innerHTML, just JSX.
//
// How the coordinate math works:
//   The SVG has a fixed viewBox (0 0 432 180). We need to map price values
//   (roughly 5200–5800) onto pixel Y positions (0–180). That's what toY() does.
//   Higher prices should sit higher on screen, so we flip the axis:
//     y = padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight
//   X positions divide the chart width evenly by the number of candles.
function CandlestickChart({ candles, predicted }) {
  const allVals = candles.flat();
  const minVal = Math.min(...allVals) - 40;
  const maxVal = Math.max(...allVals) + 40;
  const range = maxVal - minVal;

  const toY = (v) => PAD.top + CHART_H - ((v - minVal) / range) * CHART_H;

  const gap = CHART_W / candles.length;
  const candleW = gap * 0.55;
  const xOf = (i) => PAD.left + gap * i + gap / 2;

  // Grid lines: 4 evenly spaced horizontal rules
  const gridLines = [0, 1, 2, 3].map((i) => {
    const y = PAD.top + (CHART_H / 3) * i;
    return (
      <line
        key={i}
        x1={PAD.left} y1={y}
        x2={W - PAD.right} y2={y}
        stroke="var(--color-border)"
        strokeWidth="1"
      />
    );
  });

  // Historical candles
  const candleEls = candles.map(([open, high, low, close], i) => {
    const up = close >= open;
    const color = up ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
    const x = xOf(i);
    const bodyTop = toY(Math.max(open, close));
    const bodyH = Math.max(toY(Math.min(open, close)) - bodyTop, 1);

    return (
      <g key={i}>
        {/* Wick */}
        <line
          x1={x} y1={toY(high)}
          x2={x} y2={toY(low)}
          stroke={color} strokeWidth="1.2" opacity="0.6"
        />
        {/* Body */}
        <rect
          x={x - candleW / 2} y={bodyTop}
          width={candleW} height={bodyH}
          fill={color} rx="1"
        />
      </g>
    );
  });

  // Dashed forecast line connecting the last 2 historical closes to the predicted closes
  const linePoints = [
    ...candles.slice(-2),
    ...predicted,
  ].map(([,,,close], i) => {
    const baseI = candles.length - 2 + i;
    return `${xOf(baseI)},${toY(close)}`;
  }).join(' ');

  // Faded predicted candles
  const predictedEls = predicted.map(([open, high, low, close], i) => {
    const up = close >= open;
    const color = up ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
    const x = xOf(candles.length + i);
    const bodyTop = toY(Math.max(open, close));
    const bodyH = Math.max(toY(Math.min(open, close)) - bodyTop, 1);

    return (
      <g key={i} opacity="0.4">
        <line
          x1={x} y1={toY(high)}
          x2={x} y2={toY(low)}
          stroke={color} strokeWidth="1.2"
        />
        <rect
          x={x - candleW / 2} y={bodyTop}
          width={candleW} height={bodyH}
          fill={color} rx="1"
        />
      </g>
    );
  });

  // Vertical "now" divider and FORECAST label
  const nowX = PAD.left + gap * (candles.length - 0.5);
  const forecastLabelX = xOf(candles.length);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: '180px' }}
    >
      {gridLines}
      {candleEls}
      <polyline
        points={linePoints}
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.7"
      />
      {predictedEls}
      <line
        x1={nowX} y1={PAD.top}
        x2={nowX} y2={H - PAD.bottom}
        stroke="var(--color-border)"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <text
        x={forecastLabelX}
        y={H - 4}
        fontFamily="DM Sans, sans-serif"
        fontSize="8"
        fill="var(--color-muted)"
        textAnchor="middle"
        letterSpacing="0.06em"
      >
        FORECAST
      </text>
    </svg>
  );
}

// ChartCard
// The white card on the right side of the hero. Contains the chart,
// model pill selector, and next-week forecast footer.
function ChartCard() {
  const [activeModel, setActiveModel] = useState('LSTM');

  return (
    <div
      className="w-full max-w-[480px] bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 40px rgba(17,17,16,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[var(--color-border)]">
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[0.75rem] font-light tracking-widest uppercase"
            style={{ color: 'var(--color-muted)' }}
          >
            S&amp;P 500 Index
          </span>
          <span
            className="font-serif text-[1.8rem] leading-tight tracking-tight"
            style={{ color: 'var(--color-ink)' }}
          >
            5,642.30
          </span>
        </div>
        <span
          className="text-[0.75rem] font-medium px-2.5 py-1 rounded-full"
          style={{ background: '#EAF7EF', color: 'var(--color-accent-green)' }}
        >
          +1.2% this week
        </span>
      </div>

      {/* Chart */}
      <div className="px-6 pt-4 pb-2">
        <CandlestickChart candles={CANDLES} predicted={PREDICTED} />
      </div>

      {/* Model pill selector */}
      <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-[var(--color-border)]">
        {MODELS.map((model) => (
          <button
            key={model}
            onClick={() => setActiveModel(model)}
            className="text-[0.72rem] font-medium px-3 py-1 rounded-full border transition-all duration-150 cursor-pointer"
            style={
              activeModel === model
                ? {
                    background: 'var(--color-ink)',
                    color: 'var(--color-off-white)',
                    borderColor: 'var(--color-ink)',
                  }
                : {
                    background: 'transparent',
                    color: 'var(--color-muted)',
                    borderColor: 'var(--color-border)',
                  }
            }
          >
            {model}
          </button>
        ))}
      </div>

      {/* Forecast footer */}
      <div
        className="flex items-center justify-between px-6 py-3 border-t border-[var(--color-border)]"
      >
        <span className="text-[0.72rem] font-light" style={{ color: 'var(--color-muted)' }}>
          Next week prediction
        </span>
        <span
          className="text-[0.82rem] font-medium"
          style={{ color: 'var(--color-accent-green)' }}
        >
          ▲ 5,711 (+1.22%)
        </span>
      </div>
    </div>
  );
}

// HomePage 
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section
      className="grid min-h-[calc(100vh-104px)] border-b border-[var(--color-border)]"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* Left column */}
      <div
        className="flex flex-col justify-center px-12 py-20 border-r border-[var(--color-border)]"
        style={{
          paddingLeft: '48px',
          paddingRight: '64px',
          opacity: 0,
          animation: 'fadeUp 0.6s ease 0.1s forwards',
        }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-2 mb-7 text-[0.75rem] font-medium tracking-[0.12em] uppercase"
          style={{ color: 'var(--color-muted)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--color-accent-green)',
              animation: 'pulse 2s ease infinite',
            }}
          />
          Weekly S&amp;P 500 Predictions · POWERED BY ML MODELS
        </div>

        {/* Headline */}
        <h1
          className="font-serif leading-[1.08] tracking-tight mb-6 font-extrabold"
          style={{
            fontSize: 'clamp(2.6rem, 4vw, 3.8rem)',
            color: 'var(--color-ink)',
            opacity: 0,
            animation: 'fadeUp 0.7s ease 0.2s forwards',
          }}
        >
          Where data<br />
          meets <em style={{ color: 'var(--color-muted)' }}>the market</em>
        </h1>

        {/* Subtext */}
        <p
          className="text-base leading-relaxed font-light max-w-[420px] mb-11"
          style={{
            color: 'var(--color-muted)',
            opacity: 0,
            animation: 'fadeUp 0.7s ease 0.35s forwards',
          }}
        >
          Explore machine learning models trained on decades of market history.
          Compare forecasts, inspect accuracy, and understand the reasoning
          behind each prediction.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-4"
          style={{
            opacity: 0,
            animation: 'fadeUp 0.7s ease 0.5s forwards',
          }}
        >
          <button
            onClick={() => navigate('/models')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-[0.9rem] font-medium transition-all duration-200 group"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-off-white)',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(17,17,16,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Browse Models
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </button>

          <button
            onClick={() => navigate('/forecast')}
            className="flex items-center gap-1.5 text-[0.875rem] pb-0.5 border-b border-transparent transition-all duration-200"
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid transparent',
              color: 'var(--color-muted)',
              cursor: 'pointer',
              padding: '4px 0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-ink)';
              e.currentTarget.style.borderBottomColor = 'var(--color-ink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted)';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
          >
            View live forecast ↗
          </button>
        </div>

        {/* Stat strip */}
        <div
          className="flex gap-8 mt-16 pt-8 border-t border-[var(--color-border)]"
          style={{
            opacity: 0,
            animation: 'fadeUp 0.7s ease 0.65s forwards',
          }}
        >
          {[
            { val: '6',    label: 'ML Models'   },
            { val: '100yr', label: 'of Data'     },
            { val: '52wk',  label: 'Forecasted'  },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span
                className="font-serif text-[1.6rem] tracking-tight font-extrabold"
                style={{ color: 'var(--color-ink)' }}
              >
                {val}
              </span>
              <span
                className="text-[0.75rem] font-light uppercase tracking-[0.08em]"
                style={{ color: 'var(--color-muted)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div
        className="flex flex-col items-center justify-center p-12"
        style={{
          background: '#FAFAF7',
          opacity: 0,
          animation: 'fadeUp 0.9s ease 0.4s forwards',
        }}
      >
        <ChartCard />

        {/* Disclaimer notice */}
        <div
            className="w-full max-w-[480px] flex items-start gap-2.5 px-4 py-3 rounded-xl border mt-6"
            style={{
                borderColor: 'var(--color-disclaimer-border)',
                background: 'var(--color-disclaimer-bg)',
            }}
            >
            <span style={{ color: 'var(--color-disclaimer-icon)', fontSize: '0.85rem', lineHeight: 1 }}>⚠</span>
            <p
                className="text-[0.72rem] leading-relaxed font-light"
                style={{ color: 'var(--color-disclaimer-text)' }}
            >
                Predictions are generated by ML models for{' '}
                <strong style={{ color: 'var(--color-disclaimer-strong)', fontWeight: 500 }}>academic purposes only</strong>{' '}
                and do not constitute financial advice. Past performance does not guarantee future results.
            </p>
        </div>
      </div>
    </section>
  );
}