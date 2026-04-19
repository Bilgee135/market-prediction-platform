/*
 * pages/EvaluationsPage.jsx
 *
 * Simple centered layout. Single column, max-width 860px, generous whitespace.
 * No complexity table. Everything breathes.
 *
 * Sections (top to bottom):
 *   1. Page header: eyebrow, title, description, back link
 *   2. Sort control: segment buttons
 *   3. Accuracy table: all thirteen models
 *   4. Best overall card
 *   5. Research note
 *   6. Bottom CTA
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODELS, BEST_MODEL } from '../data/models';
import AccuracyTable from '../components/evaluations/AccuracyTable';
import BestOverallCard from '../components/evaluations/BestOverallCard';
import ResearchNote from '../components/evaluations/ResearchNote';

// Wraps a comparator so entries with null for `key` always sort to the bottom.
const nullLast = (key, compareFn) => (a, b) => {
  if (a[key] === null && b[key] === null) return 0;
  if (a[key] === null) return 1;
  if (b[key] === null) return -1;
  return compareFn(a, b);
};

// Sort functions keyed by the segment control value
const SORT_FNS = {
  dir: nullLast('dir', (a, b) => b.dir - a.dir),
  mae: nullLast('mae', (a, b) => a.mae - b.mae),
  rmse: nullLast('rmse', (a, b) => a.rmse - b.rmse),
  r2: nullLast('r2', (a, b) => b.r2 - a.r2),
};

const SORT_OPTIONS = [
  { key: 'dir', label: 'Directional Accuracy' },
  { key: 'mae', label: 'MAE' },
  { key: 'rmse', label: 'RMSE' },
  { key: 'r2', label: 'R²' },
];

export default function EvaluationsPage() {
  const [sortBy, setSortBy] = useState('dir');

  const sorted = [...MODELS].sort(SORT_FNS[sortBy]);

  return (
    <div className="min-h-screen pb-24">
      {/* Centered content column */}
      <div className="mx-auto px-6" style={{ maxWidth: '860px' }}>
        {/* ── Page header ── */}
        <div
          className="pt-10 pb-8 flex items-start justify-between gap-8 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <p
              className="text-[0.72rem] font-medium tracking-[0.12em] uppercase mb-2"
              style={{ color: 'var(--color-muted)' }}
            >
              All models · Side by side
            </p>
            <h1
              className="font-serif text-[2rem] tracking-tight mb-2"
              style={{ color: 'var(--color-ink)' }}
            >
              Model Evaluations
            </h1>
            <p
              className="text-[0.88rem] font-light leading-relaxed max-w-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              Compare accuracy metrics and directional performance across all 13 models. Lower MAE
              and RMSE is better. Higher directional accuracy means the model correctly called up or
              down more often.
            </p>
          </div>

          <Link
            to="/models"
            className="flex-shrink-0 flex items-center gap-1.5 text-[0.83rem] px-4 py-2 rounded-lg border transition-colors duration-200"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-ink)';
              e.currentTarget.style.color = 'var(--color-ink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-muted)';
            }}
          >
            Back to models
          </Link>
        </div>

        {/* ── Sort control ── */}
        <div className="flex items-center gap-3 pt-6 pb-6">
          <span className="text-[0.78rem] font-light" style={{ color: 'var(--color-muted)' }}>
            Sort by
          </span>
          <div
            className="flex overflow-hidden rounded-lg border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            {SORT_OPTIONS.map((opt, i) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className="px-4 py-1.5 text-[0.78rem] transition-colors duration-150 cursor-pointer"
                style={{
                  background: sortBy === opt.key ? 'var(--color-ink)' : 'transparent',
                  color: sortBy === opt.key ? 'var(--color-off-white)' : 'var(--color-muted)',
                  fontWeight: sortBy === opt.key ? 500 : 400,
                  border: 'none',
                  borderRight:
                    i < SORT_OPTIONS.length - 1 ? `1px solid var(--color-border)` : 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sections ── */}
        <div className="flex flex-col gap-5">
          {/* Accuracy table */}
          <AccuracyTable models={sorted} />

          {/* Best overall */}
          <BestOverallCard model={BEST_MODEL} />

          {/* Research note */}
          <ResearchNote />
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="flex items-center justify-between pt-10 mt-10 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-[0.83rem] font-light" style={{ color: 'var(--color-muted)' }}>
            Select a model to explore its{' '}
            <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
              full weekly forecasts and interactive chart
            </strong>
            .
          </p>
          <Link
            to="/models"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-[0.88rem] font-medium transition-all duration-200"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-off-white)',
              textDecoration: 'none',
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
            Browse models
          </Link>
        </div>
      </div>
    </div>
  );
}
