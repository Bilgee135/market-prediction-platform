# Team 45 S&P 500 Weekly Prediction Platform

A machine learning web application that predicts weekly S&P 500 price movements.
Built with Python, MySQL, Node.js, and React.

## Live Demo

[Static UI demo](https://student.csc.liv.ac.uk/~sgbtuvsh/stock/) (reference only, uses mock data)

[Full application deployment](https://student.csc.liv.ac.uk/~sgbtuvsh/team45/)



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
│       └── services/          # api.js — all fetch() calls live here
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

| Branch    | Purpose                                         |
|--|-|
| `main`    | Stable, deployed version                        |
| `develop` | Integration branch — target for all pull requests |
| `web`     | Frontend and backend development                |
| `ml`      | Data pipeline and ML models                     |

**Never push directly to `main` or `develop`.** Always work on `web` (or `ml`) and open a pull request to `develop` when your changes are ready.



## Prerequisites

Before setting up the project, install the following tools in order.



### Step 1: Install Homebrew (macOS only)

Homebrew is a package manager for macOS. Skip this step if you are on Windows.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, follow any instructions printed in the terminal to add Homebrew to your PATH.

Verify it works:
```bash
brew --version
```



### Step 2: Install Git

**macOS:**
```bash
brew install git
```

**Windows:**

Download and install from [https://git-scm.com/download/win](https://git-scm.com/download/win).
During installation, select "Git from the command line and also from 3rd-party software" when prompted.

Verify:
```bash
git --version
```

Configure your identity (required before making any commits):
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```



### Step 3: Install NVM and Node.js

NVM (Node Version Manager) lets you install and switch between Node.js versions cleanly.

**macOS:**
```bash
brew install nvm
```

After installation, add NVM to your shell. Open `~/.zshrc` (or `~/.bash_profile`) and add:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
```

Reload the shell:
```bash
source ~/.zshrc
```

**Windows:**

Download and run the installer from [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases). Download `nvm-setup.exe`.

**Both platforms — install Node.js LTS:**
```bash
nvm install --lts
nvm use --lts
```

Verify:
```bash
node --version
npm --version
```



### Step 4: Install MySQL

**macOS:**
```bash
brew install mysql
```

Start the MySQL service:
```bash
brew services start mysql
```

Secure the installation and set a root password:
```bash
mysql_secure_installation
```

Follow the prompts. When asked to set a root password, choose something you will remember. Accept the defaults for the remaining prompts.

**Windows:**

Download the MySQL Community Installer from [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/).

Run the installer and select "Developer Default". Set a root password when prompted and keep a note of it.

**Verify MySQL is running:**
```bash
mysql -u root -p
```

Enter your root password. You should see the MySQL shell. Type `exit` to leave.



### Step 5: Create the Project Database and User

Log into MySQL:
```bash
mysql -u root -p
```

Run the following commands inside the MySQL shell:
```sql
CREATE DATABASE IF NOT EXISTS team45;
CREATE USER 'team45user'@'localhost' IDENTIFIED BY 'choose_a_password';
GRANT ALL PRIVILEGES ON team45.* TO 'team45user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Keep a note of the password you chose. You will need it for the `.env` file.



## Project Setup

### Step 6: Clone the Repository

```bash
git clone https://github.com/Bilgee135/team45.git
cd team45
```



### Step 7: Switch to the Web Branch

All web development work happens on the `web` branch. Never work directly on `main`.

```bash
git checkout web
```

Verify you are on the right branch:
```bash
git branch
```

The currently active branch is marked with a `*`.



### Step 8: Backend Setup

```bash
cd backend
npm install
```

Create the environment variables file. This file is not in the repository and must be created manually:
```bash
touch .env
```

Open `.env` in any text editor and add the following, replacing the values with your own:
```
DB_HOST=localhost
DB_USER=team45user
DB_PASSWORD=the_password_you_chose_in_step_5
DB_NAME=team45
PORT=5000
```

Start the backend development server:
```bash
npm run dev
```

The backend runs at `http://localhost:5000`.

To confirm it is working, open a browser and visit:
```
http://localhost:5000/api/health
```

You should see: `{ "status": "Server is running", "team": "Team 45" }`



### Step 9: Load the Database Schema

Open a new terminal tab, navigate back to the project root, and run:
```bash
mysql -u team45user -p team45 < database/schema.sql
```

Enter the password you set in Step 5. This creates all required tables.



### Step 10: Frontend Setup

Open a new terminal tab and navigate to the frontend:
```bash
cd frontend
npm install
```

Create the frontend environment variables file:
```bash
touch .env
```

Open `frontend/.env` and add:
```
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

The frontend runs at `http://localhost:5173`. Open that URL in a browser.



## Daily Git Workflow

This is the workflow to follow every time you work on the project.

### Before starting work — pull the latest changes

Always pull before you start to avoid conflicts:
```bash
git checkout web
git pull origin web
```

### Making changes and saving your work

After making changes to any files, check what has changed:
```bash
git status
```

Stage the files you want to include in the commit:
```bash
git add .
```

The `.` stages everything. To stage a specific file only:
```bash
git add frontend/src/components/Navbar.jsx
```

Write a commit message that describes what you did:
```bash
git commit -m "Add Navbar component with responsive links"
```

Push to the remote `web` branch:
```bash
git push origin web
```

### Opening a pull request to `develop`

When a feature is complete and tested locally:

1. Go to [https://github.com/Bilgee135/team45](https://github.com/Bilgee135/team45)
2. Click "Compare and pull request" (GitHub shows this automatically after a push)
3. Set the base branch to `develop` and the compare branch to `web`
4. Write a short description of what the PR contains
5. Submit the pull request for review

### Pulling changes made by someone else

If changes have been pushed to `web` by another team member:
```bash
git pull origin web
```

If there are merge conflicts, Git will mark the conflicting files. Open each file, resolve the conflict manually, then:
```bash
git add .
git commit -m "Resolve merge conflict"
git push origin web
```

### Checking branch history

To see recent commits on the current branch:
```bash
git log --oneline
```



## Running Both Servers

The frontend and backend must both be running at the same time during development. Use two separate terminal tabs:

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



## API Endpoints

| Method | Endpoint                   | Description                               |
|--|-|-|
| GET    | `/api/health`              | Server status check                       |
| GET    | `/api/historical?weeks=26` | OHLCV rows for the chart                  |
| GET    | `/api/predictions/:model`  | Predicted close and trend for a model     |
| GET    | `/api/models`              | All model evaluation metrics              |



## Deployment

Build the frontend:
```bash
cd frontend
npm run build
```

Upload to the university Apache server:
```bash
scp -r dist/* sgbtuvsh@lxfarm01.csc.liv.ac.uk:~/public_html/team45/
```

Set the correct permissions on the server:
```bash
chgrp -R apache ~/public_html/team45/
chmod -R 755 ~/public_html/team45/
```



## Tech Stack

| Layer         | Technology                                         |
|---------------|----------------------------------------------------|
| Frontend      | React 19, Vite, Tailwind CSS v4, React Router DOM  |
| Backend       | Node.js, Express 5, CORS                           |
| Database      | MySQL, mysql2                                      |
| ML & Pipeline | Python, scikit-learn, TensorFlow, Pandas, yfinance |
| Deployment    | Apache (university server)                         |