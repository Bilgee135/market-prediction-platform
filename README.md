# Team 45 S&P 500 Weekly Prediction Platform

A machine learning web application that predicts weekly S&P 500 price movements.
Built with Python, MySQL, Node.js, and React.

## Project Structure
```
team45/
├── data-pipeline/    # Python data collection, preprocessing, ML models
├── backend/          # Node.js/Express & REST API
├── frontend/         # React/Vite/Tailwind for user interface
├── database/         # SQL schema
└── README.md
```

## Branching Strategy

| Branch    | Purpose                        |
|-----------|--------------------------------|
| `main`    | Stable, deployed version       |
| `develop` | Integration branch             |
| `web`     | Frontend & backend development |
| `ml`      | Data pipeline & ML models      |

**Never push directly to `main`.** Always work on your branch and open a
Pull Request to `develop` when your changes are ready.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Node.js v24 via NVM: `nvm install --lts`
- Python 3.9+
- MySQL or MariaDB

## Setup: Web (Frontend & Backend)

### 1. Clone the repository
```bash
git clone https://github.com/Bilgee135/team45.git
cd team45
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
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

Backend runs at `http://localhost:5000`

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### 4. Database setup

Make sure MySQL is running, then:
```bash
mysql -u your_username -p team45 < database/schema.sql
```

This creates all required tables.

## Setup: Data Pipeline (Machine Learning)
```bash
cd data-pipeline
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

> Note: `requirements.txt` will be added once dependencies are finalised.

## Deployment

The frontend is deployed to the university Apache server at:
`https://student.csc.liv.ac.uk/~sgbtuvsh/team45/`

To deploy after making frontend changes:
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

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Frontend      | React, Vite, Tailwind CSS, Chart.js     |
| Backend       | Node.js, Express                        |
| Database      | MySQL / MariaDB                         |
| ML & Pipeline | Python, scikit-learn, TensorFlow, Pandas|
| Deployment    | Apache (university server)              |