import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPredictions, getHistorical } from '../services/api';
import CandlestickChart from '../components/charts/CandlestickChart';
import PredictionLineChart from '../components/charts/PredictionLineChart';

// Hardcoded rates as of 17 April 2026
const CURRENCY = {
  USD: { rate: 1, symbol: '$' },
  GBP: { rate: 0.7399, symbol: '£' },
  EUR: { rate: 0.8482, symbol: '€' },
};

const MODEL_META = {
  'linear-regression': {
    fullName: 'Linear Regression',
    category: 'Linear',
    complexity: 1,
    description:
      'Fits a straight line through historical S&P 500 features to predict future close prices. Each feature is assigned a weight representing its contribution to the prediction. Fully interpretable and extremely fast to train. Serves as the baseline model that all other models must outperform to justify their added complexity.',
  },
  'random-forest': {
    fullName: 'Random Forest',
    category: 'Ensemble',
    complexity: 2,
    description:
      'Builds hundreds of decision trees on random subsets of training data and features, then averages their outputs. The randomness reduces overfitting compared to a single decision tree. Built-in feature importance scores show which technical indicators contributed most to each prediction. Cannot extrapolate beyond the range of values seen during training.',
  },
  svr: {
    fullName: 'Support Vector Regression',
    category: 'Kernel Method',
    complexity: 3,
    description:
      'Uses a kernel function to map input features into a higher-dimensional space where a linear relationship with the target becomes learnable. Focuses on minimising prediction error only for points outside a defined margin, making it robust to outliers. Sensitive to feature scaling and requires careful hyperparameter tuning for optimal performance.',
  },
  lstm: {
    fullName: 'Long Short-Term Memory',
    category: 'Deep Learning',
    complexity: 4,
    description:
      'A recurrent neural network with a dedicated memory cell that can retain information across hundreds of time steps. Three gates (input, forget, and output) control what information enters, persists, or leaves the cell at each step. This makes LSTM well suited to weekly S&P 500 prediction where market regimes can persist for months and short-term noise must be filtered from longer-range trend signals.',
  },
  ann: {
    fullName: 'Artificial Neural Network',
    category: 'Deep Learning',
    complexity: 3,
    description:
      'A feedforward network trained on historical S&P 500 features including OHLCV, RSI, MACD, and Bollinger Bands. Data flows forward through multiple hidden layers, each learning increasingly abstract patterns. Backpropagation then adjusts weights by working backwards through the network to minimise prediction error. Dropout regularisation is applied during training to prevent the model memorising training data rather than learning generalisable patterns.',
  },
  'cnn-lstm': {
    fullName: 'CNN + LSTM',
    category: 'Deep Learning',
    complexity: 4,
    description:
      'A hybrid architecture where convolutional layers first scan across the input sequence to extract local price patterns, similar to how image CNNs detect edges. These extracted features are then passed to an LSTM layer which maintains a rolling memory across time steps, deciding what to keep and what to forget via gating mechanisms. This two-stage design handles both short-range signal extraction and long-range trend memory within a single model.',
  },
  'cnn-lstm-det': {
    fullName: 'CNN-LSTM Deterministic',
    category: 'Deep Learning',
    complexity: 4,
    description:
      'Functionally identical to the CNN-LSTM model but with all stochastic elements removed at inference time. Standard dropout is disabled during prediction, so the same input always produces the same output. This makes the model fully reproducible across runs, which is important when comparing outputs across experiments or when the platform needs to serve consistent predictions to multiple users.',
  },
  dtr: {
    fullName: 'Decision Tree Regression',
    category: 'Tree-Based',
    complexity: 2,
    description:
      'Builds a binary tree of if-then rules by repeatedly splitting the feature space at thresholds that minimise prediction error. Trained on engineered features like moving averages and RSI. Each leaf node outputs the mean close price of training samples that fell into that region. Highly interpretable: you can trace the exact sequence of conditions that produced any prediction. Prone to overfitting and cannot predict values outside the training range.',
  },
  gru: {
    fullName: 'Gated Recurrent Unit',
    category: 'Deep Learning',
    complexity: 3,
    description:
      'A recurrent architecture that processes weekly price sequences while maintaining a hidden state across time. Two gates, update and reset, control how much of the previous state is carried forward versus overwritten. GRU achieves similar performance to LSTM with fewer parameters and faster training, making it well suited for weekly prediction tasks where the relevant lookback window is moderate rather than spanning many years.',
  },
  'gru-all': {
    fullName: 'GRU (All Value Predictors)',
    category: 'Deep Learning',
    complexity: 3,
    description:
      'A GRU variant that outputs all four OHLC values simultaneously from a shared hidden state, rather than predicting close price alone. By learning the interdependencies between open, high, low, and close within a single model, this architecture captures the internal structure of weekly candlestick shapes. Useful when you need full OHLC forecasts rather than a single price point.',
  },
  knn: {
    fullName: 'K-Nearest Neighbours',
    category: 'Instance-Based',
    complexity: 1,
    description:
      'A non-parametric model with no training phase. At prediction time, it searches the entire historical dataset for the K weeks most similar to the current feature vector, using Euclidean distance across technical indicators, and predicts the average of their following close prices. Simple and interpretable, but computationally expensive at inference and sensitive to the choice of K and feature scaling.',
  },
  'knn-pm': {
    fullName: 'KNN with Pattern Matching',
    category: 'Instance-Based',
    complexity: 2,
    description:
      'Extends standard KNN by matching entire multi-week candlestick sequences rather than single-week feature vectors. The model searches for historical periods where the shape of the recent price sequence most closely resembles the current one, then predicts based on what happened after those similar sequences. This connects to the technical analysis tradition of pattern recognition and is designed to improve directional accuracy.',
  },
  'knn-pm-prices': {
    fullName: 'KNN Pattern Matching (Prices)',
    category: 'Instance-Based',
    complexity: 2,
    description:
      'A variant of KNN with pattern matching that predicts absolute price levels directly rather than relative changes or directional signals. This allows its output to be compared directly against actual close values without post-processing. Absolute price prediction is a harder task than directional prediction since cumulative errors compound across time, making this a useful stress test for the pattern matching approach.',
  },
};

const TIMEFRAMES = ['1M', '3M', '6M', '1Y', 'ALL'];

export default function ModelForecastPage() {
  const { modelName } = useParams();

  const [predictions, setPredictions] = useState([]);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [timeframe, setTimeframe] = useState('1Y');
  const [currency, setCurrency] = useState('USD');

  const meta = MODEL_META[modelName] ?? {
    fullName: modelName.toUpperCase(),
    category: 'Model',
    complexity: 0,
    description: '',
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([getPredictions(modelName), getHistorical()])
      .then(([predData, histData]) => {
        setPredictions(predData);
        setCandles(histData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [modelName]);

  if (loading)
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: '60vh', color: 'var(--color-muted)', fontSize: '0.88rem' }}
      >
        Loading...
      </div>
    );

  if (error)
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: '60vh', color: 'var(--color-accent-red)', fontSize: '0.88rem' }}
      >
        {error}
      </div>
    );

  const latest = predictions[predictions.length - 1];
  const { rate, symbol } = CURRENCY[currency];
  const convertedClose = latest
    ? (parseFloat(latest.predicted_close) * rate).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : null;

  return (
    <div className="mx-auto px-4 py-8 md:px-8 md:py-12 max-w-[1100px]">
      <Link
        to="/models"
        className="text-[0.82rem] font-light mb-8 inline-block"
        style={{ color: 'var(--color-muted)', textDecoration: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
      >
        Back to Models
      </Link>

      <div className="mb-8">
        <span
          className="text-[0.72rem] font-medium tracking-[0.14em] uppercase mb-3 inline-block"
          style={{ color: 'var(--color-muted)' }}
        >
          {meta.category}
        </span>
        <h1
          className="font-serif tracking-tight"
          style={{
            fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
            color: 'var(--color-ink)',
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          {meta.fullName}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* LEFT: Chart */}
        <div className="flex-1 min-w-0 w-full">
          {/* Controls bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* Left group: timeframes + currency */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Timeframe buttons */}
              <div className="flex gap-1">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className="px-3 py-1.5 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-colors"
                    style={{
                      background: timeframe === tf ? 'var(--color-ink)' : 'transparent',
                      color: timeframe === tf ? 'var(--color-off-white)' : 'var(--color-muted)',
                      border: timeframe === tf ? 'none' : '1px solid var(--color-border)',
                      fontFamily: 'inherit',
                      opacity: chartType === 'candlestick' ? 0.3 : 1,
                      pointerEvents: chartType === 'candlestick' ? 'none' : 'auto',
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-[var(--color-border)]" />

              {/* Currency buttons */}
              <div className="flex gap-1">
                {Object.keys(CURRENCY).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className="px-3 py-1.5 rounded-lg text-[0.75rem] font-medium cursor-pointer"
                    style={{
                      background: currency === c ? 'var(--color-ink)' : 'transparent',
                      color: currency === c ? 'var(--color-off-white)' : 'var(--color-muted)',
                      border: currency === c ? 'none' : '1px solid var(--color-border)',
                      fontFamily: 'inherit',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart type toggle */}
            <div
              className="flex rounded-lg overflow-hidden border"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {['line', 'candlestick'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className="px-4 py-1.5 text-[0.75rem] font-medium capitalize cursor-pointer"
                  style={{
                    background: chartType === type ? 'var(--color-ink)' : 'var(--color-card-bg)',
                    color: chartType === type ? 'var(--color-off-white)' : 'var(--color-muted)',
                    border: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Chart card */}
          <div
            className="border rounded-xl overflow-hidden"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <div className="h-[320px] p-3 md:h-[480px] md:p-5">
              {chartType === 'line' ? (
                <PredictionLineChart
                  predictions={predictions}
                  historical={candles}
                  timeframe={timeframe}
                  currency={currency}
                  modelName={modelName}
                />
              ) : (
                <CandlestickChart candles={candles} />
              )}
            </div>
          </div>

          {/* Latest prediction card */}
          {latest && (
            <div
              className="border rounded-xl px-4 py-4 md:px-6 md:py-5 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <div>
                <p
                  className="text-[0.68rem] font-medium tracking-[0.1em] uppercase mb-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Latest predicted close
                </p>
                <p
                  className="font-serif tracking-tight"
                  style={{
                    fontSize: '2rem',
                    color: 'var(--color-ink)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {symbol}
                  {convertedClose}
                </p>
              </div>
              <div className="sm:text-right">
                <p
                  className="text-[0.68rem] font-medium tracking-[0.1em] uppercase mb-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Week of
                </p>
                <p className="text-[1.1rem] font-medium" style={{ color: 'var(--color-ink)' }}>
                  {new Date(latest.prediction_date).toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Info cards */}
        <div className="flex flex-col gap-5 w-full md:w-[300px] md:flex-shrink-0">
          <div
            className="border rounded-xl p-4 md:p-6"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <p
              className="text-[0.68rem] font-medium tracking-[0.1em] uppercase mb-3"
              style={{ color: 'var(--color-muted)' }}
            >
              How it works
            </p>
            <p
              className="text-[0.85rem] font-light leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              {meta.description}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 md:p-6"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <p
              className="text-[0.68rem] font-medium tracking-[0.1em] uppercase mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              Details
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Predictions', value: `${predictions.length} weeks` },
                {
                  label: 'From',
                  value: predictions[0]
                    ? new Date(predictions[0].prediction_date).toLocaleDateString('en-GB')
                    : 'N/A',
                },
                {
                  label: 'To',
                  value: latest
                    ? new Date(latest.prediction_date).toLocaleDateString('en-GB')
                    : 'N/A',
                },
                {
                  label: 'Complexity',
                  value: '● '.repeat(meta.complexity) + '○ '.repeat(4 - meta.complexity),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span
                    className="text-[0.78rem] font-light"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[0.82rem] font-medium"
                    style={{
                      color: 'var(--color-ink)',
                      fontFamily: label === 'Complexity' ? 'monospace' : 'inherit',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-start gap-2.5 px-4 py-3 rounded-lg border"
            style={{
              borderColor: 'var(--color-disclaimer-border)',
              background: 'var(--color-disclaimer-bg)',
            }}
          >
            <span
              style={{ color: 'var(--color-disclaimer-icon)', fontSize: '0.8rem', lineHeight: 1.4 }}
            >
              ⚠
            </span>
            <p
              className="text-[0.7rem] font-light leading-relaxed"
              style={{ color: 'var(--color-disclaimer-text)' }}
            >
              Predictions are for{' '}
              <strong style={{ color: 'var(--color-disclaimer-strong)', fontWeight: 500 }}>
                academic purposes only
              </strong>{' '}
              and do not constitute financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
