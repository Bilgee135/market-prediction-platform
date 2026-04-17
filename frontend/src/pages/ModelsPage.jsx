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
    modelId: 'ann',
    category: 'Deep Learning',
    modelName: 'ANN',
    modelFullName: 'Artificial Neural Network',
    modelDescription: 'A feedforward network that learns non-linear relationships between features and price outputs through multiple hidden layers and backpropagation.',
    modelStrengths: 'Flexible, can model complex non-linear relationships',
    modelWeaknesses: 'Requires more data and careful regularisation to avoid overfitting',
    modelBestFor: 'Complex feature interactions across many technical indicators',
    modelComplexity: 3,
    sparklineColour: "#2563eb",
    sparklineData: [100, 104, 108, 112, 116, 118, 116, 120, 118, 122, 120, 126],
  },
  {
    modelId: 'cnn-lstm',
    category: 'Deep Learning',
    modelName: 'CNN-LSTM',
    modelFullName: 'Convolutional Neural Network + LSTM',
    modelDescription: 'Combines a CNN to extract local patterns from price sequences with an LSTM to capture long-range temporal dependencies. A hybrid approach for time-series forecasting.',
    modelStrengths: 'Captures both short-term patterns and long-term trends simultaneously',
    modelWeaknesses: 'More complex to train and tune than either architecture alone',
    modelBestFor: 'Weekly predictions where both recent and historical patterns matter',
    modelComplexity: 4,
    sparklineColour: "#7c3aed",
    sparklineData: [100, 105, 102, 110, 108, 115, 112, 120, 117, 125, 122, 130],
  },
  {
    modelId: 'cnn-lstm-det',
    category: 'Deep Learning',
    modelName: 'CNN-LSTM (Det.)',
    modelFullName: 'CNN-LSTM Deterministic',
    modelDescription: 'A deterministic variant of the CNN-LSTM model that produces consistent outputs on repeated runs by removing stochastic elements during inference.',
    modelStrengths: 'Reproducible predictions - same input always gives same output',
    modelWeaknesses: 'May underestimate uncertainty in volatile market conditions',
    modelBestFor: 'Scenarios where consistency across runs is required',
    modelComplexity: 4,
    sparklineColour: "#6d28d9",
    sparklineData: [100, 104, 101, 108, 106, 112, 110, 117, 114, 121, 118, 125],
  },
  {
    modelId: 'dtr',
    category: 'Tree-Based',
    modelName: 'DTR',
    modelFullName: 'Decision Tree Regression',
    modelDescription: 'Recursively splits the feature space into regions and predicts the mean value within each region. Fast and interpretable, with no assumptions about data distribution.',
    modelStrengths: 'Highly interpretable - you can trace exactly why a prediction was made',
    modelWeaknesses: 'Prone to overfitting and cannot extrapolate beyond training data range',
    modelBestFor: 'Baseline comparisons and understanding which features drive predictions',
    modelComplexity: 2,
    sparklineColour: "#c2410c",
    sparklineData: [100, 98, 103, 101, 107, 104, 109, 106, 112, 109, 115, 112],
  },
  {
    modelId: 'gru',
    category: 'Deep Learning',
    modelName: 'GRU',
    modelFullName: 'Gated Recurrent Unit',
    modelDescription: 'A streamlined recurrent network that uses update and reset gates to control information flow. Achieves similar performance to LSTM with fewer parameters.',
    modelStrengths: 'Faster to train than LSTM while retaining sequential memory',
    modelWeaknesses: 'May miss very long-range dependencies compared to full LSTM',
    modelBestFor: 'Sequential price prediction where training speed matters',
    modelComplexity: 3,
    sparklineColour: "#0891b2",
    sparklineData: [100, 106, 103, 112, 109, 118, 114, 123, 119, 128, 124, 133],
  },
  {
    modelId: 'knn',
    category: 'Instance-Based',
    modelName: 'KNN',
    modelFullName: 'K-Nearest Neighbours',
    modelDescription: 'Predicts by finding the K most similar historical weeks and averaging their outcomes. No training phase - the entire dataset is the model.',
    modelStrengths: 'Simple, no assumptions about data distribution, easy to interpret',
    modelWeaknesses: 'Slow at inference time and degrades with high-dimensional features',
    modelBestFor: 'Markets with recurring seasonal or cyclical patterns',
    modelComplexity: 1,
    sparklineColour: "#059669",
    sparklineData: [100, 102, 99, 105, 103, 108, 106, 111, 108, 114, 111, 117],
  },
  {
    modelId: 'knn-pm',
    category: 'Instance-Based',
    modelName: 'KNN-PM',
    modelFullName: 'KNN with Pattern Matching',
    modelDescription: 'Extends standard KNN by matching entire candlestick patterns rather than individual feature vectors, identifying historically similar market sequences.',
    modelStrengths: 'Leverages recurring chart patterns that technical analysts already use',
    modelWeaknesses: 'Pattern matches may be spurious in sufficiently different market regimes',
    modelBestFor: 'Markets with identifiable recurring chart patterns',
    modelComplexity: 2,
    sparklineColour: "#16a34a",
    sparklineData: [100, 103, 100, 107, 105, 111, 108, 114, 111, 118, 114, 120],
  },
  {
    modelId: 'knn-pm-prices',
    category: 'Instance-Based',
    modelName: 'KNN-PM Prices',
    modelFullName: 'KNN Pattern Matching (Price Prediction)',
    modelDescription: 'A variant of KNN with pattern matching that predicts absolute price levels rather than relative changes, allowing direct comparison against actual close values.',
    modelStrengths: 'Outputs directly comparable price values without post-processing',
    modelWeaknesses: 'Absolute price prediction is harder than directional prediction',
    modelBestFor: 'Direct price level forecasting with pattern-based similarity',
    modelComplexity: 2,
    sparklineColour: "#15803d",
    sparklineData: [100, 102, 104, 103, 107, 106, 110, 108, 113, 111, 116, 114],
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
            8 ML Models
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
