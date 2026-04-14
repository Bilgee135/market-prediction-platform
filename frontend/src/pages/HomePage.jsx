/*
 * pages/HomePage.jsx
 *
 * Centered single-column layout, max-width 900px.
 * Bold hero title, S&P 500 price card (no ML pills), models as info list.
 */

import { useNavigate } from 'react-router-dom';

const W = 432;
const H = 160;
const PAD = { top: 10, right: 12, bottom: 16, left: 0 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

// Synthetic weekly S&P 500 candles for the preview card.
// Replace with real API data when the backend is wired up.
const CANDLES = [
  [5320,5380,5290,5355], [5355,5410,5330,5370], [5370,5360,5280,5290],
  [5290,5310,5240,5260], [5260,5300,5220,5285], [5285,5350,5270,5340],
  [5340,5400,5320,5390], [5390,5440,5360,5420], [5420,5410,5350,5365],
  [5365,5380,5290,5300], [5300,5360,5280,5350], [5350,5480,5340,5460],
  [5460,5520,5430,5510], [5510,5560,5490,5540], [5540,5600,5510,5590],
  [5590,5650,5560,5642],
];

function CandlestickChart({ candles }) {
  const allVals = candles.flat();
  const minVal = Math.min(...allVals) - 40;
  const maxVal = Math.max(...allVals) + 40;
  const range = maxVal - minVal;
  const toY = (v) => PAD.top + CHART_H - ((v - minVal) / range) * CHART_H;
  const gap = CHART_W / candles.length;
  const candleW = gap * 0.55;
  const xOf = (i) => PAD.left + gap * i + gap / 2;

  const gridLines = [0, 1, 2, 3].map((i) => (
    <line
      key={i}
      x1={PAD.left} y1={PAD.top + (CHART_H / 3) * i}
      x2={W - PAD.right} y2={PAD.top + (CHART_H / 3) * i}
      stroke="var(--color-border)" strokeWidth="1"
    />
  ));

  const candleEls = candles.map(([open, high, low, close], i) => {
    const up = close >= open;
    const color = up ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
    const x = xOf(i);
    const bodyTop = toY(Math.max(open, close));
    const bodyH = Math.max(toY(Math.min(open, close)) - bodyTop, 1);
    return (
      <g key={i}>
        <line x1={x} y1={toY(high)} x2={x} y2={toY(low)} stroke={color} strokeWidth="1.2" opacity="0.6" />
        <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={color} rx="1" />
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '160px' }}>
      {gridLines}
      {candleEls}
    </svg>
  );
}

const ML_MODELS = [
  { name: 'LSTM',              type: 'Deep Learning', note: 'learns long-term patterns in price sequences'   },
  { name: 'Random Forest',     type: 'Ensemble',      note: 'aggregates many decision trees to reduce noise' },
  { name: 'XGBoost',           type: 'Ensemble',      note: 'gradient boosting, best overall accuracy'       },
  { name: 'SVR',               type: 'Kernel',        note: 'support vector regression on engineered features'},
  { name: 'ANN',               type: 'Deep Learning', note: 'feedforward neural network baseline'            },
  { name: 'Linear Regression', type: 'Linear',        note: 'statistical baseline all other models beat'     },
];

export default function HomePage() {
  const navigate = useNavigate();

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
          Weekly S&amp;P 500 price<br />
          predictions, powered by<br />
          <em style={{ color: 'var(--color-muted)' }}>machine learning.</em>
        </h1>

        <p
          className="text-[1rem] font-light leading-relaxed mb-2"
          style={{ color: 'var(--color-muted)', maxWidth: '600px' }}
        >
          The S&amp;P 500 is a stock market index tracking the 500 largest
          publicly traded companies in the United States. It is the most widely
          used benchmark for the overall health of the US stock market.
        </p>
        <p
          className="text-[1rem] font-light leading-relaxed"
          style={{ color: 'var(--color-muted)', maxWidth: '600px' }}
        >
          This platform applies six machine learning models to historical S&amp;P
          500 data to generate weekly price forecasts. It was built as an academic
          project and is not intended as financial advice.
        </p>
      </div>

      {/* ── CTAs ── */}
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={() => navigate('/models')}
          className="px-6 py-2.5 rounded-lg text-[0.88rem] font-medium cursor-pointer transition-opacity hover:opacity-75"
          style={{ background: 'var(--color-ink)', color: 'var(--color-off-white)', border: 'none' }}
        >
          Browse Models →
        </button>
        <button
          onClick={() => navigate('/evaluations')}
          className="text-[0.88rem] font-light cursor-pointer"
          style={{ background: 'none', border: 'none', color: 'var(--color-muted)', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
        >
          View model evaluations ↗
        </button>
      </div>

      {/* ── S&P 500 price card ── */}
      <div
        className="w-full border rounded-xl overflow-hidden mb-4"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        <div
          className="flex items-start justify-between px-5 pt-4 pb-3 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div
              className="text-[0.7rem] font-light tracking-widest uppercase mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
              S&amp;P 500 Index · Weekly preview
            </div>
            <div
              className="font-serif text-[1.8rem] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' }}
            >
              5,642.30
            </div>
          </div>
          <span
            className="text-[0.72rem] font-medium px-2.5 py-1 rounded-full mt-1"
            style={{ background: '#EDFAF3', color: 'var(--color-accent-green)' }}
          >
            +1.2% this week
          </span>
        </div>

        <div className="px-5 pt-4 pb-2">
          <CandlestickChart candles={CANDLES} />
        </div>

        <div
          className="px-5 py-2.5 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-[0.7rem] font-light" style={{ color: 'var(--color-muted)' }}>
            Showing 16 weeks of synthetic S&P 500 data. Live data loads from the backend when available.
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
        <span style={{ color: 'var(--color-disclaimer-icon)', fontSize: '0.8rem', lineHeight: 1.2 }}>⚠</span>
        <p className="text-[0.72rem] font-light leading-relaxed" style={{ color: 'var(--color-disclaimer-text)' }}>
          Predictions are for{' '}
          <strong style={{ color: 'var(--color-disclaimer-strong)', fontWeight: 500 }}>
            academic purposes only
          </strong>{' '}
          and do not constitute financial advice. Past performance does not guarantee future results.
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
                <span
                  className="text-[0.8rem] font-light"
                  style={{ color: 'var(--color-muted)' }}
                >
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
      <div
        className="flex gap-12 pt-8 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {[
          { val: '6',     label: 'ML Models'   },
          { val: '100yr', label: 'of S&P Data'  },
          { val: '52wk',  label: 'Forecasted'   },
          { val: '7',     label: 'Team Members' },
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