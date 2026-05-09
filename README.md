<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# MariaDB AI Architect - Backend API

## Overview
This is the FastAPI backend for the **MariaDB AI Architect** hackathon project. It acts as the bridge between our React frontend, our local MariaDB database, and an Ollama-powered Large Language Model (LLM). 

The primary feature is an intelligent recommendation engine that filters hardware based on user needs, sorts by performance score, and uses AI to generate personalized, beginner-friendly advice.

## Prerequisites
Before running this server, ensure you have the following installed and running on your local machine:
* **Python 3.9+**
* **MariaDB Server:** Running locally on port `3306`.
* **Ollama:** Running locally with the Qwen model pulled (`ollama run qwen2.5-coder:1.5b`).

## Local Setup Instructions

**1. Create and activate a virtual environment**
```bash
python -m venv .venv
# On Windows:
.\.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
```
**2. Install dependencies**
```bash
pip install -r requirements.txt
pip install fastapi mariadb ollama pydantic uvicorn
```
**3. Configure Environment Variables**
Create a .env file in the root directory. You can copy the provided .env.example file and fill in your local database password:

```
APP_SECRET_KEY="your_random_secret_key"
MARIADB_HOST="127.0.0.1"
MARIADB_PORT=3306
MARIADB_USER="root"
MARIADB_PASSWORD="your_actual_password"
MARIADB_DATABASE="mariadb_ai_architect"
```

**4. Running the Server**
Start the FastAPI server by running:
```Bash
python -m backend.main
```
The server will start on http://127.0.0.1:8000.

**5. API Documentation**
The backend is configured with CORS enabled for the Vite frontend (http://localhost:5173 and http://localhost:4173).

Interactive API documentation (Swagger UI) is automatically generated and can be viewed at:
 http://127.0.0.1:8000/docs


### Primary Endpoint
POST /api/recommend

Description: Fetches top 3 laptops matching the requested category and budget, then uses AI to format a frontend-friendly response.

Payload:
```json
{
  "useCase": "rendering",
  "budgetTier": "premium"
}```

* **Response:** Returns a structured JSON object containing `mainPick`, `recommendedSpecs`, `expectedBudget`, `simpleExplanation`, `beginnerTip`, and a `ranking` array.
>>>>>>> af1f51e (Add backend project)
