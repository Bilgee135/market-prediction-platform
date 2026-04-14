/*
 * components/evaluations/BestOverallCard.jsx
 *
 * The dark card highlighting the best performing model overall.
 *
 * Props:
 *   model   a single model object from data/models.js
 */

export default function BestOverallCard({ model }) {
  return (
    <div
      className="w-full rounded-xl px-7 py-6 flex items-start justify-between gap-6"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="flex flex-col gap-1.5">
        <span
          className="text-[0.68rem] font-medium tracking-[0.12em] uppercase"
          style={{ color: 'rgba(247,246,242,0.5)' }}
        >
          Best overall
        </span>
        <span
          className="font-serif text-[1.5rem] tracking-tight"
          style={{ color: 'var(--color-off-white)' }}
        >
          {model.displayName}
        </span>
        <p
          className="text-[0.82rem] font-light leading-relaxed max-w-sm"
          style={{ color: 'rgba(247,246,242,0.72)' }}
        >
          Strongest combination of directional accuracy ({model.dir}%) and error rate across the
          test set. Trains significantly faster than LSTM while matching its predictive capability
          on weekly S&P 500 data.
        </p>
      </div>

      <div className="flex gap-6 flex-shrink-0">
        {[
          { val: `${model.dir}%`, key: 'Dir. Acc.' },
          { val: model.mae, key: 'MAE' },
          { val: model.rmse, key: 'RMSE' },
        ].map(({ val, key }) => (
          <div key={key} className="flex flex-col gap-1">
            <span
              className="font-serif text-[1.4rem] tracking-tight"
              style={{ color: 'var(--color-off-white)' }}
            >
              {val}
            </span>
            <span
              className="text-[0.68rem] uppercase tracking-[0.08em] font-light"
              style={{ color: 'rgba(247,246,242,0.5)' }}
            >
              {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
