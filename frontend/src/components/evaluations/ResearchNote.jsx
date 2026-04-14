/*
 * components/evaluations/ResearchNote.jsx
 *
 * A static note card referencing the academic basis for model selection.
 * No props, no interactivity.
 */

export default function ResearchNote() {
  return (
    <div
      className="w-full rounded-xl px-6 py-5 border"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-card-bg)',
      }}
    >
      <span
        className="block text-[0.68rem] font-medium tracking-[0.12em] uppercase mb-3"
        style={{ color: 'var(--color-muted)' }}
      >
        A note on the research
      </span>
      <p
        className="text-[0.83rem] font-light leading-relaxed"
        style={{ color: 'var(--color-muted)' }}
      >
        Literature consistently shows that{' '}
        <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
          ensemble methods outperform single estimators
        </strong>{' '}
        on financial time series when the feature set is well-engineered. XGBoost and Random Forest
        dominate on tabular data tasks, while LSTM models close the gap when longer temporal
        sequences are available. Linear Regression serves as a critical baseline — if any model
        cannot significantly beat it, the feature engineering likely needs revisiting.{' '}
        <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
          No model should be trusted in isolation.
        </strong>
      </p>
    </div>
  );
}
