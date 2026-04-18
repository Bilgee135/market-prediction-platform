# Weekly S&P 500 Price Prediction Platform

A full-stack machine learning web application that benchmarks nine ML models against weekly S&P 500 price data. Built by Team 45 as part of COMP208 at the University of Liverpool.

**Live application:** https://student.csc.liv.ac.uk/~sgbtuvsh/team45/

## Overview

The platform fetches live S&P 500 data via Yahoo Finance, serves it through a Node.js/Express API, and visualises both historical prices and ML model predictions in an interactive React dashboard. Nine models are benchmarked: LSTM, ANN, CNN-LSTM, CNN-LSTM Deterministic, Decision Tree Regression, GRU, GRU All Value Predictors, KNN, and two KNN with Pattern Matching variants.

## Architecture

```
React Frontend (Apache, University of Liverpool)
        |
        | HTTPS
        v
Node.js / Express API (Render)
        |
        |-- MySQL queries --> Aiven Cloud MySQL (predictions)
        |-- Python spawn  --> yfinance (live S&P 500 data)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router DOM |
| Backend | Node.js, Express 5, CORS, mysql2 |
| Database | MySQL via Aiven Cloud (production), local MySQL (development) |
| Data pipeline | Python 3, yfinance, pandas, SQLAlchemy, PyMySQL |
| Deployment | Apache (University of Liverpool), Render (backend), Aiven (database) |

## Project Structure

```
market-prediction-platform/
├── frontend/
│   ├── public/
│   │   └── .htaccess              # Apache rewrite rules for React Router
│   └── src/
│       ├── pages/                 # One component per route
│       ├── components/
│       │   ├── layout/            # Navbar, TickerTape
│       │   ├── charts/            # CandlestickChart, PredictionLineChart, Sparkline
│       │   └── ui/                # DisclaimerModal and shared UI elements
│       └── services/
│           └── api.js             # All fetch() calls centralised here
│
├── backend/
│   ├── db/
│   │   └── connection.js          # MySQL connection pool
│   ├── routes/                    # Express route definitions
│   └── controllers/               # SQL query logic
│
├── data-pipeline/
│   ├── fetch/
│   │   ├── ticker.py              # Live ticker data via yfinance
│   │   └── historical.py          # Historical OHLCV data via yfinance
│   ├── load_predictions.py        # Loads ML output CSVs into the database
│   └── requirements.txt
│
└── database/
    └── schema.sql                 # Table definitions
```

## Local Development Setup

### Prerequisites

- Node.js 18+ (nvm recommended)
- Python 3.9+
- MySQL 8.0+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Bilgee135/market-prediction-platform.git
cd market-prediction-platform
git checkout web
```

### 2. Set up the database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS team45;
CREATE USER 'team45user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON team45.* TO 'team45user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Load the schema:

```bash
mysql -u team45user -p team45 < database/schema.sql
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
DB_HOST=localhost
DB_USER=team45user
DB_PASSWORD=your_password
DB_NAME=team45
PORT=5000
PYTHON_PATH=python3
```

Start the backend:

```bash
npm run dev
```

Verify at `http://localhost:5000/api/health`.

### 4. Set up the Python environment

```bash
cd data-pipeline
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 5. Set up the frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### 6. Load prediction data

Place ML output CSV files in `database/` and run:

```bash
cd data-pipeline
source venv/bin/activate
python load_predictions.py
```

## Running Both Servers

Use two separate terminal tabs during development:

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, deployed version |
| `develop` | Integration branch, target for all pull requests |
| `web` | Frontend and backend development |
| `ml` | Data pipeline and ML models |

Never push directly to `main` or `develop`. Work on `web` or `ml` and open a pull request to `develop` when your changes are ready.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server status check |
| GET | `/api/historical?weeks=N` | Weekly OHLCV data from Yahoo Finance |
| GET | `/api/ticker` | Live prices for the ticker tape |
| GET | `/api/predictions/:model` | Predicted close prices for a given model |

Supported model slugs: `lstm`, `ann`, `cnn-lstm`, `cnn-lstm-det`, `dtr`, `gru`, `gru-all`, `knn`, `knn-pm`, `knn-pm-prices`

## Production Deployment

### Frontend

Build and upload to the university Apache server:

```bash
cd frontend
npm run build
scp -r dist/* sgbtuvsh@lxfarm02.csc.liv.ac.uk:~/public_html/team45/
scp frontend/public/.htaccess sgbtuvsh@lxfarm02.csc.liv.ac.uk:~/public_html/team45/.htaccess
```

### Backend

The backend is deployed on Render at `https://team45-backend-1zda.onrender.com`. Pushes to `main` trigger automatic redeployment.

The free tier sleeps after 15 minutes of inactivity. Wake it before demos:

```bash
curl https://team45-backend-1zda.onrender.com/api/health
```

### Database

Predictions are stored in Aiven Cloud MySQL. To reload prediction data, update `backend/.env` with the Aiven credentials and run `load_predictions.py`.

## Environment Variables

**`backend/.env`**
```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=5000
PYTHON_PATH=python3
```

**`frontend/.env`**
```
VITE_API_URL=http://localhost:5000
```

**`frontend/.env.production`**
```
VITE_API_URL=https://team45-backend-1zda.onrender.com
```

Neither `.env` file is committed to the repository.

## License

Academic project. Not intended for commercial use or as financial advice.