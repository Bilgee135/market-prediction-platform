/*
 * components/evaluations/AccuracyTable.jsx
 *
 * What this is:
 *   The metrics comparison table on EvaluationsPage.
 *   Shows MAE, MAPE, RMSE, and directional accuracy for all six models.
 *
 * Props:
 *   models   array of model objects (from data/models.js, sorted by parent)
 */

export default function AccuracyTable({ models }) {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        <span
          className="text-[0.78rem] font-medium tracking-[0.02em]"
          style={{ color: 'var(--color-ink)' }}
        >
          Accuracy Metrics
        </span>
        <span className="text-[0.72rem] font-light" style={{ color: 'var(--color-muted)' }}>
          Test set · Weekly S&P 500
        </span>
      </div>

      {/* Table */}
      <table className="w-full border-collapse" style={{ background: 'var(--color-card-bg)' }}>
        <thead>
          <tr
            style={{
              background: 'var(--color-off-white)',
              borderBottom: `1px solid var(--color-border)`,
            }}
          >
            {['Model', 'MAE', 'R²', 'RMSE', 'Dir. Acc.'].map((h, i) => (
              <th
                key={h}
                className="px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.08em]"
                style={{
                  color: 'var(--color-muted)',
                  textAlign: i === 0 ? 'left' : 'right',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => {
            const rankColors = ['#EAF7EF', '#EDF2FF', '#FFF3BF', '#F3F4F6', '#F3F4F6', '#F3F4F6'];
            const rankText = [
              'var(--color-accent-green)',
              '#3B5BDB',
              '#E67700',
              'var(--color-muted)',
              'var(--color-muted)',
              'var(--color-muted)',
            ];

            const dirColor =
              m.dir === null
                ? 'var(--color-muted)'
                : m.dir > 50
                  ? 'var(--color-accent-green)'
                  : m.dir >= 45
                    ? '#E67700'
                    : 'var(--color-accent-red)';

            const maeColor =
              m.mae === null
                ? 'var(--color-muted)'
                : m.mae <= 38
                  ? 'var(--color-accent-green)'
                  : m.mae <= 47
                    ? '#E67700'
                    : 'var(--color-accent-red)';

            const r2Color =
              m.r2 === null
                ? 'var(--color-muted)'
                : m.r2 >= 0.95
                  ? 'var(--color-accent-green)'
                  : m.r2 >= 0.8
                    ? '#E67700'
                    : 'var(--color-accent-red)';

            const isLast = i === models.length - 1;

            return (
              <tr
                key={m.name}
                style={{
                  borderBottom: isLast ? 'none' : `1px solid var(--color-border)`,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-off-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Model name + rank badge */}
                <td className="px-4 py-2.5 text-[0.82rem]" style={{ color: 'var(--color-ink)' }}>
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.65rem] font-medium mr-2"
                    style={{ background: rankColors[i], color: rankText[i] }}
                  >
                    {i + 1}
                  </span>
                  {m.displayName}
                </td>
                <td
                  className="px-4 py-2.5 text-right text-[0.82rem] font-medium"
                  style={{ color: maeColor }}
                >
                  {m.mae}
                </td>
                <td
                  className="px-4 py-2.5 text-right text-[0.82rem] font-light"
                  style={{ color: r2Color }}
                >
                  {m.r2 !== null ? m.r2 : 'N/A'}
                </td>
                <td
                  className="px-4 py-2.5 text-right text-[0.82rem] font-light"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {m.rmse}
                </td>
                <td
                  className="px-4 py-2.5 text-right text-[0.82rem] font-medium"
                  style={{ color: dirColor }}
                >
                  {m.dir}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Metric explainers */}
      <div
        className="flex flex-col gap-1.5 px-5 py-3.5 border-t"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        {[
          { key: 'MAE', val: 'Average absolute error in index points. Lower is better.' },
          {
            key: 'R²',
            val: 'R² measures how much of the price variance the model explains. Closer to 1.0 is better. Negative values indicate the model performs worse than predicting the mean.',
          },
          { key: 'RMSE', val: 'Penalises large errors more heavily. Use alongside MAE.' },
          {
            key: 'Dir.',
            val: '% of weeks the model correctly called up or down. Above 50% beats a coin flip.',
          },
        ].map(({ key, val }) => (
          <div key={key} className="flex items-start gap-2 text-[0.72rem]">
            <span className="font-medium min-w-[36px]" style={{ color: 'var(--color-ink)' }}>
              {key}
            </span>
            <span className="font-light leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
