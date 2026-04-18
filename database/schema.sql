-- DRAFT SCHEMA: Subject to change based on feature engineering decisions
-- Last updated: 5 March 2026
-- Discuss with the team before finalising column definitions

CREATE TABLE IF NOT EXISTS historical_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    open DECIMAL(10, 2),
    high DECIMAL(10, 2),
    low DECIMAL(10, 2),
    close DECIMAL(10, 2),
    volume BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS processed_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    rsi DECIMAL(10, 4),
    macd DECIMAL(10, 4),
    macd_signal DECIMAL(10, 4),
    sma_20 DECIMAL(10, 2),
    ema_20 DECIMAL(10, 2),
    bollinger_upper DECIMAL(10, 2),
    bollinger_lower DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(50) NOT NULL,
    prediction_date DATE NOT NULL,
    predicted_close DECIMAL(10, 2),
    actual_close DECIMAL(10, 2),
    rmse DECIMAL(10, 4),
    mae DECIMAL(10, 4),
    directional_accuracy DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);