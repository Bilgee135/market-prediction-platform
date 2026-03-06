# Team 45 S&P 500 Weekly Prediction Platform

A machine learning web application that predicts weekly S&P 500 price movements.
Built with Python, MySQL, Node.js, and React.

## Live Demo

[Static UI demo](https://student.csc.liv.ac.uk/~sgbtuvsh/stock/) (for reference only & uses mock data):
`https://student.csc.liv.ac.uk/~sgbtuvsh/stock/`

[Full application deployment](https://student.csc.liv.ac.uk/~sgbtuvsh/team45/):
`https://student.csc.liv.ac.uk/~sgbtuvsh/team45/`

## Project Structure
```
team45/
├── frontend/
│   └── src/
│       ├── pages/             # Full page components (one per route)
│       ├── components/
│       │   ├── layout/        # Navbar, TickerTape
│       │   ├── ui/            # SegmentControl, DisclaimerModal, StatStrip
│       │   ├── charts/        # CandlestickChart, Sparkline
│       │   ├── models/        # ModelCarousel, ModelCard, MiniModelCard
│       │   ├── forecast/      # ControlsBar, PredictionPanel, RecentDataTable
│       │   └── evaluations/   # AccuracyTable, ComplexityTable, BestOverallCard
│       ├── data/              # Static model metadata (non-API content)
│       └── services/          # api.js for all fetch() calls live here
│
├── backend/
│   ├── db/                    # MySQL connection pool
│   ├── routes/                # URL definitions
│   └── controllers/           # SQL queries and response logic
│
├── database/                  # schema.sql
├── data-pipeline/             # Machine Learning pipeline
└── README.md
```

## Branching Strategy

| Branch    | Purpose                                      |
|-----------|----------------------------------------------|
| `main`    | Stable, deployed version                     |
| `develop` | Integration branch for merging               |
| `web`     | Frontend & backend development               |
| `ml`      | Data pipeline & ML models                    |

Never push directly to `main`. Work on your branch and open a pull request
to `develop` when your changes are ready for review.

## Prerequisites

- [NVM](https://github.com/nvm-sh/nvm) -> Node Version Manager
- Node.js (LTS): `nvm install --lts`
- Python 3.9+
- MySQL or MariaDB

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Bilgee135/team45.git
cd team45
```

### 2. Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=team45
PORT=5000
```

Start the backend:
```bash
npm run dev
```

Runs at `http://localhost:5000`. Test with `GET /api/health`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

### 4. Database
```bash
mysql -u your_username -p team45 < database/schema.sql
```

### 5. Data Pipeline
```bash
cd data-pipeline
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

> `requirements.txt` will be added once dependencies are finalised.

## API Endpoints

| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/api/health`               | Server status check                      |
| GET    | `/api/historical?weeks=26`  | OHLCV rows for the chart                 |
| GET    | `/api/predictions/:model`   | Predicted close + trend for a given model|
| GET    | `/api/models`               | All model evaluation metrics             |

## Deployment
```bash
cd frontend
npm run build
scp -r dist/* sgbtuvsh@lxfarm01.csc.liv.ac.uk:~/public_html/team45/
```

Then on the server:
```bash
chgrp -R apache ~/public_html/team45/
chmod -R 755 ~/public_html/team45/
```

## Tech Stack

| Layer         | Technology                                        |
|---------------|---------------------------------------------------|
| Frontend      | React 19, Vite, Tailwind CSS v4, React Router DOM |
| Backend       | Node.js, Express 5, CORS                          |
| Database      | MySQL / MariaDB, mysql2                           |
| ML & Pipeline | Python, scikit-learn, TensorFlow, Pandas, yfinance|
| Deployment    | Apache (university server)                        |

