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
    modelId: 'linear-regression',
    category: 'Linear',
    modelName: 'Linear Regression',
    modelFullName: 'Linear Regression (Baseline)',
    modelDescription:
      'Fits a straight line through historical price features to predict future close prices. Serves as the baseline every other model must outperform to justify its complexity.',
    modelStrengths: 'Fully interpretable and extremely fast to train',
    modelWeaknesses: 'Cannot capture non-linear relationships in market data',
    modelBestFor: 'Establishing a performance baseline for comparing all other models',
    modelComplexity: 1,
    sparklineColour: '#64748b',
    sparklineData: [100, 102, 101, 103, 102, 104, 103, 105, 104, 107, 106, 110],
  },
  {
    modelId: 'random-forest',
    category: 'Ensemble',
    modelName: 'Random Forest',
    modelFullName: 'Random Forest Regression',
    modelDescription:
      'Builds hundreds of decision trees on random subsets of training data and averages their outputs. Reduces overfitting compared to a single tree and provides built-in feature importance scores.',
    modelStrengths: 'Robust against outliers with built-in feature importance',
    modelWeaknesses: 'Cannot extrapolate beyond the training data range',
    modelBestFor: 'Stable predictions with interpretable feature contributions',
    modelComplexity: 2,
    sparklineColour: '#c2410c',
    sparklineData: [100, 95, 90, 98, 105, 112, 108, 118, 114, 122, 118, 128],
  },
  {
    modelId: 'random-forest-forecast',
    category: 'Ensemble',
    modelName: 'RF Forecast',
    modelFullName: 'Random Forest: 2026-2027 Forecast',
    modelDescription:
      'Random Forest model generating weekly S&P 500 OHLC price forecasts from May 2026 through early 2027. Trained on the full dataset to produce genuine forward-looking predictions beyond the historical test period.',
    modelStrengths: 'Full OHLC forward predictions beyond the test set period',
    modelWeaknesses: 'No actual values to evaluate against until time catches up',
    modelBestFor: 'Visualising what the model expects the S&P 500 to do over the next year',
    modelComplexity: 2,
    sparklineColour: '#b45309',
    sparklineData: [100, 99, 98, 97, 96, 97, 98, 99, 100, 101, 102, 103],
  },
  {
    modelId: 'svr',
    category: 'Kernel Method',
    modelName: 'SVR',
    modelFullName: 'Support Vector Regression',
    modelDescription:
      'Maps input features into a higher-dimensional space using a kernel function where a linear relationship with the target becomes learnable. Robust to outliers and effective on smaller clean datasets.',
    modelStrengths: 'Strong generalisation on smaller datasets, robust to outliers',
    modelWeaknesses: 'Sensitive to feature scaling and slow on large datasets',
    modelBestFor: 'Situations where data is limited but clean and well-scaled',
    modelComplexity: 3,
    sparklineColour: '#6d28d9',
    sparklineData: [100, 112, 94, 118, 100, 124, 108, 130, 112, 136, 116, 142],
  },
  {
    modelId: 'svr-forecast',
    category: 'Kernel Method',
    modelName: 'SVR Forecast',
    modelFullName: 'SVR: 2026-2027 Forecast',
    modelDescription:
      'SVR model generating weekly S&P 500 OHLC price forecasts from May 2026 through early 2027. Trained on the full available dataset to produce forward-looking predictions beyond the test period.',
    modelStrengths: 'Full OHLC forward predictions beyond the test set period',
    modelWeaknesses: 'No actual values to evaluate against until time catches up',
    modelBestFor: 'Visualising what the SVR model expects the S&P 500 to do over the next year',
    modelComplexity: 3,
    sparklineColour: '#7c3aed',
    sparklineData: [100, 100, 101, 101, 102, 102, 103, 103, 104, 104, 105, 105],
  },
  {
    modelId: 'lstm',
    category: 'Deep Learning',
    modelName: 'LSTM',
    modelFullName: 'Long Short-Term Memory',
    modelDescription:
      'A recurrent neural network with a dedicated memory cell that learns what to remember and what to forget across long sequences of weekly price data. Uses input, forget, and output gates to capture multi-month market trends while filtering short-term noise.',
    modelStrengths: 'Captures long-range temporal dependencies in price history',
    modelWeaknesses: 'Slow to train and sensitive to hyperparameter choices',
    modelBestFor: 'Trend-following predictions where historical context spanning months matters',
    modelComplexity: 4,
    sparklineColour: '#7c3aed',
    sparklineData: [100, 106, 103, 111, 108, 116, 113, 121, 118, 126, 123, 131],
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
    sparklineColour: '#2563eb',
    sparklineData: [100, 104, 108, 112, 116, 118, 116, 120, 118, 122, 120, 126],
  },
  {
    modelId: 'cnn-lstm',
    category: 'Deep Learning',
    modelName: 'CNN-LSTM',
    modelFullName: 'Convolutional Neural Network + LSTM',
    modelDescription:
      'Combines a CNN to extract local patterns from price sequences with an LSTM to capture long-range temporal dependencies. A hybrid approach for time-series forecasting.',
    modelStrengths: 'Captures both short-term patterns and long-term trends simultaneously',
    modelWeaknesses: 'More complex to train and tune than either architecture alone',
    modelBestFor: 'Weekly predictions where both recent and historical patterns matter',
    modelComplexity: 4,
    sparklineColour: '#7c3aed',
    sparklineData: [100, 105, 102, 110, 108, 115, 112, 120, 117, 125, 122, 130],
  },
  {
    modelId: 'cnn-lstm-det',
    category: 'Deep Learning',
    modelName: 'CNN-LSTM (Det.)',
    modelFullName: 'CNN-LSTM Deterministic',
    modelDescription:
      'A deterministic variant of the CNN-LSTM model that produces consistent outputs on repeated runs by removing stochastic elements during inference.',
    modelStrengths: 'Reproducible predictions - same input always gives same output',
    modelWeaknesses: 'May underestimate uncertainty in volatile market conditions',
    modelBestFor: 'Scenarios where consistency across runs is required',
    modelComplexity: 4,
    sparklineColour: '#6d28d9',
    sparklineData: [100, 104, 101, 108, 106, 112, 110, 117, 114, 121, 118, 125],
  },
  {
    modelId: 'dtr',
    category: 'Tree-Based',
    modelName: 'DTR',
    modelFullName: 'Decision Tree Regression',
    modelDescription:
      'Recursively splits the feature space into regions and predicts the mean value within each region. Fast and interpretable, with no assumptions about data distribution.',
    modelStrengths: 'Highly interpretable - you can trace exactly why a prediction was made',
    modelWeaknesses: 'Prone to overfitting and cannot extrapolate beyond training data range',
    modelBestFor: 'Baseline comparisons and understanding which features drive predictions',
    modelComplexity: 2,
    sparklineColour: '#c2410c',
    sparklineData: [100, 98, 103, 101, 107, 104, 109, 106, 112, 109, 115, 112],
  },
  {
    modelId: 'gru',
    category: 'Deep Learning',
    modelName: 'GRU',
    modelFullName: 'Gated Recurrent Unit',
    modelDescription:
      'A streamlined recurrent network that uses update and reset gates to control information flow. Achieves similar performance to LSTM with fewer parameters.',
    modelStrengths: 'Faster to train than LSTM while retaining sequential memory',
    modelWeaknesses: 'May miss very long-range dependencies compared to full LSTM',
    modelBestFor: 'Sequential price prediction where training speed matters',
    modelComplexity: 3,
    sparklineColour: '#0891b2',
    sparklineData: [100, 106, 103, 112, 109, 118, 114, 123, 119, 128, 124, 133],
  },
  {
    modelId: 'gru-all',
    category: 'Deep Learning',
    modelName: 'GRU All Value Predictors',
    modelFullName: 'GRU (All Value Predictors)',
    modelDescription:
      'A GRU variant that outputs all four OHLC values simultaneously from a shared hidden state, rather than predicting close price alone. By learning the interdependencies between open, high, low, and close within a single model, this architecture captures the internal structure of weekly candlestick shapes.',
    modelStrengths:
      'Predicts full OHLC candlestick shapes, capturing all four price value interdependencies',
    modelWeaknesses: 'Joint OHLC prediction is harder to optimise than single-target regression',
    modelBestFor: 'Full candlestick forecasting where all four price values are needed',
    modelComplexity: 3,
    sparklineColour: '#0e7490',
    sparklineData: [100, 107, 104, 113, 110, 119, 115, 124, 120, 129, 125, 134],
  },
  {
    modelId: 'knn',
    category: 'Instance-Based',
    modelName: 'KNN',
    modelFullName: 'K-Nearest Neighbours',
    modelDescription:
      'Predicts by finding the K most similar historical weeks and averaging their outcomes. No training phase - the entire dataset is the model.',
    modelStrengths: 'Simple, no assumptions about data distribution, easy to interpret',
    modelWeaknesses: 'Slow at inference time and degrades with high-dimensional features',
    modelBestFor: 'Markets with recurring seasonal or cyclical patterns',
    modelComplexity: 1,
    sparklineColour: '#059669',
    sparklineData: [100, 102, 99, 105, 103, 108, 106, 111, 108, 114, 111, 117],
  },
  {
    modelId: 'knn-pm',
    category: 'Instance-Based',
    modelName: 'KNN-PM',
    modelFullName: 'KNN with Pattern Matching',
    modelDescription:
      'Extends standard KNN by matching entire candlestick patterns rather than individual feature vectors, identifying historically similar market sequences.',
    modelStrengths: 'Leverages recurring chart patterns that technical analysts already use',
    modelWeaknesses: 'Pattern matches may be spurious in sufficiently different market regimes',
    modelBestFor: 'Markets with identifiable recurring chart patterns',
    modelComplexity: 2,
    sparklineColour: '#16a34a',
    sparklineData: [100, 103, 100, 107, 105, 111, 108, 114, 111, 118, 114, 120],
  },
  {
    modelId: 'knn-pm-prices',
    category: 'Instance-Based',
    modelName: 'KNN-PM Prices',
    modelFullName: 'KNN Pattern Matching (Price Prediction)',
    modelDescription:
      'A variant of KNN with pattern matching that predicts absolute price levels rather than relative changes, allowing direct comparison against actual close values.',
    modelStrengths: 'Outputs directly comparable price values without post-processing',
    modelWeaknesses: 'Absolute price prediction is harder than directional prediction',
    modelBestFor: 'Direct price level forecasting with pattern-based similarity',
    modelComplexity: 2,
    sparklineColour: '#15803d',
    sparklineData: [100, 102, 104, 103, 107, 106, 110, 108, 113, 111, 116, 114],
  },
];

export default function ModelsPage({ disclaimerConfirmed, setDisclaimerConfirmed }) {
  const [active, setActive] = useState(0);
  const model = MODELS[active];

  const prev = () => setActive((i) => (i === 0 ? MODELS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === MODELS.length - 1 ? 0 : i + 1));

  return (
    <div className="mx-auto px-4 py-10 pb-40 md:px-8 md:py-14 md:pb-32 max-w-[900px]">
      {!disclaimerConfirmed && <DisclaimerModal onAgree={() => setDisclaimerConfirmed(true)} />}

      {/* The Page header which appears at the top of the page */}
      <div
        className="mb-8 pb-6 md:mb-10 md:pb-8 border-b flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div>
          <p
            className="text-[0.78rem] font-medium tracking-[0.12em] uppercase mb-3"
            style={{ color: 'var(--color-muted)' }}
          >
            13 ML Models
          </p>
          <h1
            className="font-serif tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              color: 'var(--color-ink)',
            }}
          >
            Browse &amp; Select a Model
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
          View all evaluations
        </Link>
      </div>

      {/* The Model card */}
      <div
        className="border rounded-xl overflow-hidden mb-6"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        {/* The Card header bar */}
        <div
          className="flex items-center justify-between px-4 py-3 md:px-7 md:py-4 border-b"
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
        <div className="px-4 py-6 md:px-7 md:py-8">
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
              Select
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
        className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-4 md:px-10 md:py-5 border-t"
        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
      >
        <p
          className="text-[0.82rem] md:text-[0.88rem] font-light"
          style={{ color: 'var(--color-muted)' }}
        >
          Want to compare all models at once?{' '}
          <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
            See accuracy metrics and more.
          </strong>
        </p>
        <Link
          to="/evaluations"
          className="px-5 py-2.5 md:px-6 md:py-3 rounded-lg text-[0.85rem] md:text-[0.9rem] font-medium transition-opacity hover:opacity-75 text-center sm:flex-shrink-0"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-off-white)',
            textDecoration: 'none',
          }}
        >
          {/* if the user wants to do to model evaluations */}
          Go to Model Evaluations
        </Link>
      </div>
    </div>
  );
}
