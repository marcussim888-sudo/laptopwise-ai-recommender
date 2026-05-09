# LaptopWise - AI Laptop Recommendation System

LaptopWise is a beginner-friendly laptop recommendation system built for the MariaDB AI Hackathon MY 2026.

The project helps users choose a suitable laptop based on their main usage and budget. Instead of requiring beginners to understand complicated specifications, LaptopWise provides clear recommendations, beginner-friendly explanations, and practical buying tips.

The system uses:

- React frontend
- FastAPI backend
- MariaDB database
- Ollama local AI model

---

## Project Overview

Many beginners overspend on laptops because they do not know which specifications actually matter for their use case.

For example:

- A student may buy an expensive gaming laptop even though they only need it for assignments.
- A gamer may focus only on CPU and ignore GPU.
- A design student may ignore display quality.
- A video editor may buy a laptop with insufficient RAM or storage.

LaptopWise solves this by recommending laptops based on:

- User purpose
- Budget tier
- Laptop specifications
- Database ranking score
- AI-generated explanation

---

## Key Features

- Choose laptop usage category:
  - Study
  - Coding
  - Design
  - Editing
  - Gaming

- Choose budget tier:
  - Budget Saver
  - Best Value
  - Performance
  - Premium

- Generate laptop recommendation

- Display:
  - Recommended laptop type
  - Recommended specifications
  - Expected budget
  - Simple explanation
  - Beginner tip
  - Top laptop picks

- Backend API using FastAPI

- Laptop data stored in MariaDB

- AI explanation generated using Ollama

- Frontend fallback mock data if backend is not available

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Glassmorphism UI

### Backend

- Python
- FastAPI
- Uvicorn
- MariaDB connector
- Ollama

### Database

- MariaDB

### AI

- Ollama local model

Recommended model:

```bash
qwen2.5-coder:1.5b
```

---

## Project Structure

```text
mariadb-ai-architect-frontend/
├─ src/
│  ├─ App.tsx
│  ├─ App.css
│  ├─ GlassIcons.tsx
│  ├─ GlassIcons.css
│  └─ main.tsx
│
├─ public/
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
│
├─ server/
│  ├─ backend/
│  ├─ core/
│  ├─ requirements.txt
│  └─ .env.example
│
├─ database/
│  ├─ schema.sql
│  └─ seed.sql
│
└─ README.md
```

Note: The frontend and backend are kept in the same repository for easier hackathon submission.

---

## Requirements

Before running the project, install:

1. Node.js
2. Python
3. Git
4. MariaDB Server
5. Ollama

---

## Valid Use Cases

The frontend sends one of these values to the backend:

```text
study
coding
design
editing
gaming
```

---

## Valid Budget Tiers

The frontend sends one of these values to the backend:

```text
budget
value
performance
premium
```

Budget meaning:

| Budget Tier | Meaning |
|---|---|
| budget | Budget Saver |
| value | Best Value |
| performance | Performance |
| premium | Premium |

---

## How to Run the Project Locally

The project needs three parts running locally:

1. MariaDB database
2. FastAPI backend
3. React frontend

---

# 1. Clone the Repository

```bash
git clone https://github.com/marcussim888-sudo/mariadb-ai-architect-frontend.git
cd mariadb-ai-architect-frontend
```

---

# 2. Set Up MariaDB Database

## 2.1 Start MariaDB

Make sure MariaDB Server is installed and running.

On Windows PowerShell, you can check:

```powershell
Get-Service *maria*
```

You can also test whether MariaDB is listening on port 3306:

```powershell
Test-NetConnection 127.0.0.1 -Port 3306
```

If successful, it should show:

```text
TcpTestSucceeded : True
```

---

## 2.2 Login to MariaDB

```bash
mariadb -u root -p
```

Enter your MariaDB root password.

---

## 2.3 Create Database and Tables

Run the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS mariadb_ai_architect;
USE mariadb_ai_architect;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS laptops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  laptop_model VARCHAR(100) NOT NULL,
  budget_tier VARCHAR(50) NOT NULL,
  specs TEXT NOT NULL,
  avg_price INT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT IGNORE INTO categories (category_name) VALUES
('study'),
('coding'),
('design'),
('editing'),
('gaming');
```

---

## 2.4 Insert Sample Laptop Data

Run this sample data for testing:

```sql
USE mariadb_ai_architect;

INSERT INTO laptops (category_id, laptop_model, budget_tier, specs, avg_price, score)
VALUES
((SELECT id FROM categories WHERE category_name='gaming'), 'Lenovo LOQ 15 RTX 4060', 'performance', 'Ryzen 7 / Intel i7, 16GB RAM, 512GB SSD, RTX 4060', 4500, 95),
((SELECT id FROM categories WHERE category_name='gaming'), 'ASUS TUF A15', 'performance', 'Ryzen 7, 16GB RAM, 1TB SSD, RTX 4060', 4700, 92),
((SELECT id FROM categories WHERE category_name='gaming'), 'Acer Nitro V RTX 4060', 'performance', 'Intel i7, 16GB RAM, 512GB SSD, RTX 4060', 4300, 89),

((SELECT id FROM categories WHERE category_name='study'), 'Acer Aspire 5', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 2900, 90),
((SELECT id FROM categories WHERE category_name='study'), 'Lenovo IdeaPad Slim 5', 'value', 'Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 3200, 88),
((SELECT id FROM categories WHERE category_name='study'), 'ASUS Vivobook 15', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 3000, 86),

((SELECT id FROM categories WHERE category_name='coding'), 'Lenovo IdeaPad Slim 5', 'value', 'Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 3200, 91),
((SELECT id FROM categories WHERE category_name='coding'), 'Acer Aspire 5', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 2900, 88),
((SELECT id FROM categories WHERE category_name='coding'), 'ASUS Vivobook 16', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 3300, 87),

((SELECT id FROM categories WHERE category_name='design'), 'ASUS Vivobook 16', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Good Display, Integrated Graphics', 3300, 89),
((SELECT id FROM categories WHERE category_name='design'), 'Lenovo IdeaPad Slim 5', 'value', 'Ryzen 5, 16GB RAM, 512GB SSD, Integrated Graphics', 3200, 87),
((SELECT id FROM categories WHERE category_name='design'), 'HP Pavilion Plus', 'value', 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, Better Display, Integrated Graphics', 3500, 86),

((SELECT id FROM categories WHERE category_name='editing'), 'Lenovo LOQ 15', 'performance', 'Ryzen 7 / Intel i7, 16GB RAM, 512GB SSD, RTX 4050 / RTX 4060', 4500, 93),
((SELECT id FROM categories WHERE category_name='editing'), 'ASUS TUF Gaming A15', 'performance', 'Ryzen 7, 16GB RAM, 1TB SSD, RTX 4060', 4700, 91),
((SELECT id FROM categories WHERE category_name='editing'), 'Acer Nitro V 15', 'performance', 'Intel i5 / Intel i7, 16GB RAM, 512GB SSD, RTX 4050', 4000, 88);
```

This seed data is enough to test the project locally.

---

# 3. Set Up Ollama

Install Ollama, then pull the recommended model:

```bash
ollama pull qwen2.5-coder:1.5b
```

Check installed models:

```bash
ollama list
```

Make sure Ollama is running before starting the backend.

---

# 4. Set Up Backend

Go into the backend folder:

```bash
cd server
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate virtual environment on Windows:

```bash
.\.venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

If needed, install packages manually:

```bash
pip install fastapi uvicorn mariadb pydantic python-dotenv ollama
```

---

## 4.1 Create `.env` File

Inside the `server/` folder, create a `.env` file.

Example:

```env
APP_SECRET_KEY="laptopwise_secret_key"

MARIADB_HOST="127.0.0.1"
MARIADB_PORT=3306
MARIADB_USER="root"
MARIADB_PASSWORD="your_mariadb_password"
MARIADB_DATABASE="mariadb_ai_architect"

OLLAMA_BASE_URL="http://127.0.0.1:11434"
OLLAMA_MODEL="qwen2.5-coder:1.5b"
```

Important:

Replace:

```text
your_mariadb_password
```

with your own MariaDB root password.

---

## 4.2 Run Backend

From inside the `server/` folder:

```bash
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Backend will run at:

```text
http://127.0.0.1:8000
```

API documentation is available after backend is running:

```text
http://localhost:8000/docs#/
```

Note: If the API documentation page is protected by authentication middleware, the API endpoint can still be tested directly using PowerShell.

---

# 5. Test Backend API

Open another PowerShell window and run:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/recommend" -Method POST -ContentType "application/json" -Body '{"useCase":"gaming","budgetTier":"performance"}'
```

Expected request body:

```json
{
  "useCase": "gaming",
  "budgetTier": "performance"
}
```

Expected endpoint:

```text
POST http://127.0.0.1:8000/api/recommend
```

---

## Example Backend Response

The backend may return `laptops` or `ranking`.

Recommended response format:

```json
{
  "mainPick": "3A Gaming Laptop",
  "recommendedSpecs": "Intel i7 / Ryzen 7, 16GB RAM, RTX 4060",
  "expectedBudget": "RM 3500 - RM 5000",
  "simpleExplanation": "This tier is recommended for 3A games because the GPU is important for stable performance.",
  "beginnerTip": "Do not only look at Intel i7. For gaming, GPU matters more.",
  "laptops": [
    {
      "name": "Lenovo LOQ 15 RTX 4060",
      "priceRange": "RM 4200 - RM 5000",
      "cpu": "Ryzen 7 / Intel i7",
      "ram": "16GB",
      "storage": "512GB SSD",
      "gpu": "RTX 4060",
      "reason": "Strong value for 3A gaming."
    }
  ]
}
```

Alternative response format:

```json
{
  "mainPick": "3A Gaming Laptop",
  "recommendedSpecs": "Intel i7 / Ryzen 7, 16GB RAM, RTX 4060",
  "expectedBudget": "RM 3500 - RM 5000",
  "simpleExplanation": "This tier is recommended for 3A games because the GPU is important for stable performance.",
  "beginnerTip": "Do not only look at Intel i7. For gaming, GPU matters more.",
  "ranking": [
    {
      "laptop_model": "Lenovo LOQ 15 RTX 4060",
      "budget_tier": "performance",
      "specs": "Ryzen 7 / Intel i7, 16GB RAM, 512GB SSD, RTX 4060",
      "avg_price": 4500,
      "score": 95
    }
  ]
}
```

The frontend includes a normalizer, so it can display either response format.

---

# 6. Set Up Frontend

Open a new terminal from the project root folder:

```bash
cd mariadb-ai-architect-frontend
```

Install frontend dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# 7. Run Full Project Locally

You should have two terminals running:

## Terminal 1: Backend

```bash
cd server
.\.venv\Scripts\activate
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Backend:

```text
http://127.0.0.1:8000
```

## Terminal 2: Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open the frontend in browser and click:

```text
Generate Recommendation
```

The frontend will call:

```text
POST http://127.0.0.1:8000/api/recommend
```

---

## Demo Flow

1. User opens LaptopWise.
2. User chooses a laptop purpose.
3. User chooses a budget tier.
4. User clicks Generate Recommendation.
5. Frontend sends request to backend.
6. Backend queries MariaDB laptop data.
7. Backend returns top laptop recommendations.
8. Frontend displays recommendation, explanation, beginner tip, and ranking.

---

## Frontend Fallback

If the backend is unavailable, the frontend can still display mock recommendation data.

This makes the demo safer because the UI will not break if backend, database, or Ollama setup fails during testing.

---

## Troubleshooting

### 1. Backend cannot connect to MariaDB

Check MariaDB service:

```powershell
Get-Service *maria*
```

Check MariaDB port:

```powershell
Test-NetConnection 127.0.0.1 -Port 3306
```

If the port test fails, MariaDB is not running.

---

### 2. Wrong MariaDB password

Open `server/.env` and check:

```env
MARIADB_PASSWORD="your_mariadb_password"
```

Make sure it matches your local MariaDB root password.

---

### 3. API returns no laptop result

Make sure the request uses valid values:

```json
{
  "useCase": "gaming",
  "budgetTier": "performance"
}
```

Also make sure the database contains matching laptop records.

---

### 4. Ollama model missing

Run:

```bash
ollama pull qwen2.5-coder:1.5b
```

Then check:

```bash
ollama list
```

---

### 5. Frontend cannot connect to backend

Make sure backend is running at:

```text
http://127.0.0.1:8000
```

Make sure frontend is running at:

```text
http://localhost:5173
```

The frontend API URL should point to:

```text
http://127.0.0.1:8000/api/recommend
```

---

## Future Improvements

- Add more laptop models
- Add real-time price comparison
- Add laptop images
- Add user preference questionnaire
- Add AI chat assistant for laptop buying advice
- Deploy frontend and backend online
- Store user recommendation history in MariaDB
- Improve recommendation scoring algorithm

---

## Team Members

Replace this section with your team details.

```text
Frontend Developer: Sin Zi Kang
Backend Developer: Sum Yun Xi
```

---

## Submission Notes

This project is designed as a full-stack local prototype.

The system uses:

```text
React Frontend
FastAPI Backend
MariaDB Database
Ollama AI Model
```

For judging, the project can be run locally by following this README, or demonstrated through a demo video.