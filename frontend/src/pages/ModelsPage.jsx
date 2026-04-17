/*
 * pages/ModelsPage.jsx
 *
 * Centered single-column layout. Compact carousel cards.
 * DisclaimerModal fires on mount.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import DisclaimerModal from '../components/ui/DisclaimerModal';
import Sparkline from '../components/charts/Sparkline';


//So here are the models and we have listed the models with the name, category, description, strengths, weaknesses, what the model is best for, the complexity of the model and also a sparkline sorry sparkline is quite bad
const MODELS = [
  {
    modelId: 'lstm',
    category: 'Deep Learning',
    modelName: 'LSTM',
    modelFullName: 'Long Short-Term Memory',
    modelDescription:
      'A recurrent neural network designed to learn long-term dependencies in sequential data. Uses gating mechanisms to decide what to remember and what to forget across many time steps.',
    modelStrengths: 'Captures long-range temporal patterns in price history',
    modelWeaknesses: 'Slow to train and sensitive to hyperparameter choices',
    modelBestFor: 'Trend-following predictions over longer horizons',
    modelComplexity: 4,
    sparklineColour: "#2563eb",
    sparklineData: [100, 115, 95, 120, 105, 125, 108, 132, 115, 138, 120, 145],
  },

  {
    modelId: 'random-forest',
    category: 'Ensemble',
    modelName: 'Random Forest',
    modelFullName: 'Ensemble Decision Trees',
    modelDescription:
      'Builds hundreds of decision trees on random subsets of training data, then averages their outputs. Reduces overfitting and handles noisy financial data well.',
    modelStrengths: 'Robust against outliers with built-in feature importance',
    modelWeaknesses: 'Cannot extrapolate beyond the training range',
    modelBestFor: 'Stable medium-term predictions with interpretable outputs',
    modelComplexity: 2,
    sparklineColour: "#c2410c",
    sparklineData: [100, 95, 90, 98, 105, 112, 108, 118, 114, 122, 118, 128],

  },
  {
    modelId: 'xgboost',
    category: 'Ensemble',
    modelName: 'XGBoost',
    modelFullName: 'Extreme Gradient Boosting',
    modelDescription:
      'Builds trees sequentially, each correcting the errors of the previous one. Known for high accuracy on tabular data with relatively fast training.',
    modelStrengths: 'High accuracy, handles missing values natively',
    modelWeaknesses: 'More hyperparameters to tune than simpler models',
    modelBestFor: 'Short-term precision where feature engineering is strong',
    modelComplexity: 3,
    sparklineColour: "#c2410c",
    sparklineData: [100, 103, 101, 106, 105, 109, 108, 113, 112, 117, 116, 122],
  },
  {
    modelId: 'linear-regression',
    category: 'Linear',
    modelName: 'Linear Regression',
    modelFullName: 'Linear Regression (Baseline)',
    modelDescription:
      'Fits a straight line through historical price data to predict future values. Serves as the performance baseline that all other models must beat.',
    modelStrengths: 'Fully interpretable and very fast to train',
    modelWeaknesses: 'Cannot capture non-linear relationships in market data',
    modelBestFor: 'Establishing a baseline and understanding feature correlations',
    modelComplexity: 1,
    sparklineColour: "#1e293b",
    sparklineData: [100, 102, 101, 103, 102, 104, 103, 105, 104, 107, 106, 110],
  },
  {
    modelId: 'svr',
    category: 'Kernel Method',
    modelName: 'SVR',
    modelFullName: 'Support Vector Regression',
    modelDescription:
      'Uses a kernel function to map data into a higher-dimensional space where non-linear relationships become linear. Effective when the dataset is clean and well-scaled.',
    modelStrengths: 'Strong generalisation on smaller datasets',
    modelWeaknesses: 'Sensitive to feature scaling and slow on large datasets',
    modelBestFor: 'Situations where data is limited but clean',
    modelComplexity: 3,
    sparklineColour: "#6d28d9",
    sparklineData: [100, 112, 94, 118, 100, 124, 108, 130, 112, 136, 116, 142],

  },
  {
    modelId: 'ann',
    category: 'Deep Learning',
    modelName: 'ANN',
    modelFullName: 'Artificial Neural Network',
    modelDescription:
      'A feedforward network that learns non-linear relationships between features and price outputs through multiple hidden layers and backpropagation.',
    modelStrengths: 'Flexible, can model complex non-linear relationships',
    modelWeaknesses: 'Requires more data and careful regularisation to avoid overfitting',
    modelBestFor: 'Complex feature interactions across many technical indicators',
    modelComplexity: 3,
    sparklineColour: "#2563eb",
    sparklineData: [100, 104, 108, 112, 116, 118, 116, 120, 118, 122, 120, 126],

  },
];

export default function ModelsPage({ disclaimerConfirmed, setDisclaimerConfirmed }) {
  const [active, setActive] = useState(0);
  const model = MODELS[active];

  const prev = () => setActive((i) => (i === 0 ? MODELS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === MODELS.length - 1 ? 0 : i + 1));

  return (
    <div className="mx-auto px-8 py-14 pb-32" style={{ maxWidth: '900px' }}>
      {!disclaimerConfirmed && <DisclaimerModal onAgree={() => setDisclaimerConfirmed(true)} />}

      {/* The Page header which appears at the top of the page */}
      <div
        className="mb-10 pb-8 border-b flex items-end justify-between"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div>
          <p
            className="text-[0.78rem] font-medium tracking-[0.12em] uppercase mb-3"
            style={{ color: 'var(--color-muted)' }}
          >
            6 ML Models
          </p>
          <h1
            className="font-serif tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              color: 'var(--color-ink)',
            }}
          >
            Browse &amp; select a model
          </h1>
        </div>
        <Link
          to="/evaluations"
          className="text-[0.9rem] font-light"
          style={{ color: 'var(--color-muted)', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
        >

          {/* user is able to view all the evaluations */}
          View all evaluations →
        </Link>
      </div>

      {/* The Model card */}
      <div
        className="border rounded-xl overflow-hidden mb-6"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        {/* The Card header bar */}
        <div
          className="flex items-center justify-between px-7 py-4 border-b"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-off-white)' }}
        >
          <span
            className="text-[0.72rem] font-medium tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--color-muted)',
              borderColor: 'var(--color-border)',
              background: 'var(--color-card-bg)',
            }}
          >
            {model.category}
          </span>
          <span className="text-[0.82rem] font-light" style={{ color: 'var(--color-muted)' }}>
            {active + 1} / {MODELS.length}
          </span>
        </div>

        {/* The Card body */}
        <div className="px-7 py-8">
          <h2
            className="font-serif tracking-tight mb-1"
            style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}
          >
            {model.modelName}
          </h2>
          <p className="text-[0.88rem] font-light mb-5" style={{ color: 'var(--color-muted)' }}>
            {model.modelFullName}
          </p>

          <p
            className="text-[0.95rem] font-light leading-relaxed mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            {model.modelDescription}
          </p>

          {/* The sparkline chart */}
          <div className="mb-8">
            <Sparkline
                data={model.sparklineData}
                chartlineColour={model.sparklineColour}
                width={300}
                height={100}
            />
          </div>



          {/* Strength, Weakness and Best for */}
          <div className="flex flex-col gap-3.5 mb-8">
            {[
              {
                label: 'Strength',
                value: model.modelStrengths,
                color: 'var(--color-accent-green)',
              },
              { label: 'Weakness', value: model.modelWeaknesses, color: 'var(--color-accent-red)' },
              { label: 'Best for', value: model.modelBestFor, color: 'var(--color-ink)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-start gap-4">
                <span
                  className="text-[0.68rem] font-medium tracking-[0.08em] uppercase pt-0.5 shrink-0"
                  style={{ color: 'var(--color-muted)', width: '62px' }}
                >
                  {label}
                </span>
                <span className="text-[0.92rem] font-light" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Complexity and Select */}
          <div
            className="flex items-center justify-between pt-6 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div>
              <p
                className="text-[0.7rem] font-medium tracking-[0.1em] uppercase mb-2.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Complexity
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background:
                        dot <= model.modelComplexity ? 'var(--color-ink)' : 'var(--color-border)',
                    }}
                  />
                ))}
              </div>
            </div>

            <Link
              to={`/models/${model.modelId}`}
              className="px-7 py-3 rounded-lg text-[0.92rem] font-medium transition-opacity hover:opacity-75"
              style={{
                background: 'var(--color-ink)',
                color: 'var(--color-off-white)',
                textDecoration: 'none',
              }}
            >
              Select →
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full border flex items-center justify-center transition-opacity hover:opacity-60 cursor-pointer"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-ink)',
            fontFamily: 'inherit',
            fontSize: '1rem',
          }}
        >
          ←
        </button>

        <div className="flex gap-2.5">
          {MODELS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors"
              style={{
                background: i === active ? 'var(--color-ink)' : 'var(--color-border)',
                border: 'none',
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-11 h-11 rounded-full border flex items-center justify-center transition-opacity hover:opacity-60 cursor-pointer"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-ink)',
            fontFamily: 'inherit',
            fontSize: '1rem',
          }}
        >
          →
        </button>
      </div>

      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-10 py-5 border-t"
        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
      >
        <p className="text-[0.88rem] font-light" style={{ color: 'var(--color-muted)' }}>
          Want to compare all models at once?{' '}
          <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
            See accuracy metrics and more.
          </strong>
        </p>
        <Link
          to="/evaluations"
          className="px-6 py-3 rounded-lg text-[0.9rem] font-medium transition-opacity hover:opacity-75"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-off-white)',
            textDecoration: 'none',
          }}
        >
          {/* if the user wants to do to model evaluations */}
          Go to Model Evaluations →
        </Link>
      </div>
    </div>
  );
}
