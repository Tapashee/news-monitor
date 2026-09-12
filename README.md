# News Monitor

### Monitor, collect, and analyze news coverage from multiple sources in one place.

News Monitor is a web application that collects news articles from multiple Bangladeshi news sources based on user-defined keywords and analyzes their sentiment.

## Motivation

Monitoring what different media outlets say about a company, organization, or topic can be difficult.

For example, if we want to understand how different news outlets are talking about **Walton**, we may need to visit many websites and manually search for relevant articles.

News Monitor brings this process into one platform.

Instead of checking each news website separately, users can:

* Define keywords they want to monitor
* Select news sources
* Collect relevant articles automatically
* Analyze the sentiment of collected articles
* Store the results in a database
* View the collected information through a dashboard

## What Is Sentiment?

**Sentiment** describes the overall emotional tone or attitude expressed in a piece of text.

For example:

### Positive

> Walton introduced a new innovative product.

This statement has a **positive** tone.

### Negative

> Customers complained about poor service from Walton.

This statement has a **negative** tone.

### Neutral

> Walton opened a new showroom in Dhaka.

This statement is mainly **informational**, so it can be considered neutral.

## What Is Sentiment Analysis?

**Sentiment analysis** is the process of automatically determining whether a piece of text expresses a positive, negative, or neutral sentiment.

In News Monitor, collected news articles are sent to a dedicated **Python sentiment-analysis service**.

The basic process is:

```text
News Article
     ↓
Extract Article Text
     ↓
Send Text to Sentiment Service
     ↓
AI / NLP Model
     ↓
Positive / Negative / Neutral
     ↓
Store Result
     ↓
Display on Dashboard
```

### Important Note

Sentiment analysis estimates the **tone of the text**.

It does **not** determine whether the information in the article is factually true or false.

---

# How News Monitor Works

The application follows a simple workflow:

```text
1. Define Keywords and Sources
              ↓
2. Collect Relevant News
              ↓
3. Analyze Sentiment
              ↓
4. Store Articles and Results
              ↓
5. View Results on Dashboard
```

For example:

```text
Keyword: Walton

        ↓

News Sources

        ↓

Articles mentioning Walton

        ↓

Sentiment Analysis

        ↓

Positive / Negative / Neutral

        ↓

PostgreSQL Database

        ↓

React Dashboard
```

# Behind the Scenes

News Monitor consists of several components working together.

## React Frontend

The frontend provides the user interface.

It allows users to:

* Manage keywords
* Manage news sources
* Start and monitor crawling
* View collected articles
* View sentiment information
* Access the dashboard

The frontend is built using:

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS

## Express Backend

The backend acts as the main application server.

It is responsible for:

* Managing API requests
* Managing keywords
* Managing news sources
* Starting crawlers
* Collecting articles
* Communicating with the database
* Communicating with the sentiment service

The backend is built with:

* Node.js
* Express.js

## Web Scrapers

The scraper collects news articles from supported news websites.

The current system supports:

* The Daily Star
* Prothom Alo
* The Business Standard
* Independent Bangladesh
* Dhaka Tribune
* Daily Sun
* The Financial Express
* New Age
* The Daily Observer
* Bangladesh Post

## PostgreSQL

PostgreSQL is used as the main database.

It stores information such as:

* Keywords
* News sources
* News articles
* Article links
* Sentiment results
* Other application data

## Python Sentiment Service

The sentiment service is a separate Python application.

It provides an API that receives text and returns a sentiment prediction.

The service is built using:

* Python
* FastAPI
* Transformers
* PyTorch

---

📰 Multi-Source News Monitoring

Monitor news coverage from multiple Bangladeshi news sources in one place instead of checking each website individually.

🔎 Keyword-Based Monitoring

Define keywords or topics of interest and collect news articles related to those keywords.

🕷️ Automated News Crawling

Automatically collect relevant articles from supported news websites using web scrapers. Start and monitor the news-collection process and track its progress from the frontend.

🧠 Sentiment Analysis

Analyze collected news articles and classify their overall sentiment to help identify positive and negative media coverage.

📊 News Dashboard

View collected news and their sentiment results through a centralized React-based dashboard.


---

# Technology Stack

| Component                  | Technology                |
| -------------------------- | ------------------------- |
| Frontend                   | React + TypeScript        |
| Frontend Build Tool        | Vite                      |
| Styling                    | Tailwind CSS              |
| Backend                    | Node.js + Express         |
| Database                   | PostgreSQL                |
| Database Client            | `pg`                      |
| Web Scraping               | Axios + Cheerio           |
| Sentiment Service          | Python + FastAPI          |
| Transformer Models         | Hugging Face Transformers |
| Deep Learning Framework    | PyTorch                   |
| Scheduling                 | Node Cron                 |

---

# Project Structure

```text
news-monitor/
│
├── news-monitor-be/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── scrapers/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── news-monitor-fe/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── sentiment-service/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
└── README.md
```

---

# How It Works
News Monitor provides a web interface where users can configure what they want to monitor and then collect and analyze relevant news.

The process starts in the React frontend. From the frontend, users can add the keywords they want to monitor and select the news sources they want the system to search.

Once the monitoring setup is ready, the frontend communicates with the Express backend. The backend handles the crawling, article extraction, sentiment analysis, and database storage.

## Step 1 — Add Keywords

The user starts by opening the News Monitor frontend and adding the keywords they want to monitor.

For example:

```text
Walton
Walton Bangladesh
Walton TV
Walton refrigerator
```
These keywords tell the system what topics or organizations the user is interested in.

## Step 2 — Select News Sources

From the frontend, the user selects the news sources they want to monitor.

For example, the user can choose sources such as:

```text
The Daily Star
Prothom Alo
The Business Standard
Dhaka Tribune
```

The selected sources determine where News Monitor will look for relevant articles.

## Step 3 — Start Crawling

After configuring the keywords and sources, the user starts the crawling process from the frontend.

The frontend sends the request to the Express backend, which starts the news crawlers.

## Step 4 — Extract Article Information

The scrapers visit the selected news sources and look for articles related to the user's keywords.

For each relevant article, the system extracts information such as:

* Article title
* Article link
* News source
* Publication information

## Step 5 — Analyze Sentiment

The collected article text is sent from the Express backend to the Python sentiment-analysis service.

The service processes the text using an NLP model and returns a sentiment result.

Article Text
     ↓
Python Sentiment Service
     ↓
NLP Model
     ↓
Sentiment Result

## Step 6 — Store the Result

The article information and sentiment result are stored in PostgreSQL.

This allows the system to keep the collected news and retrieve it later.

## Step 7 — Display the Results

Finally, the React frontend retrieves the stored information through the Express API.

The user can view the collected articles and their sentiment results through the News Monitor interface.

### In short

The user configures the monitoring through the React frontend → the backend collects the news → the sentiment service analyzes it → PostgreSQL stores the results → the frontend displays them.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Python
* Git

---

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd news-monitor
```

---

# 2. Backend Setup

Move into the backend directory:

```bash
cd news-monitor-be
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```text
.env
```

Use `.env.example` as a reference.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=news_monitor
DB_USER=postgres
DB_PASSWORD=your_password_here

PORT=3000
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

---

# 3. Sentiment Service Setup

Open another terminal.

Move into the sentiment service:

```bash
cd sentiment-service
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
uvicorn main:app --reload
```

The sentiment service will then be available locally.

---

# 4. Frontend Setup

Open another terminal.

Move into the frontend directory:

```bash
cd news-monitor-fe
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local Vite development URL shown in the terminal.

---

# Running the Complete System

To run the complete application, start the three services separately:

### Backend

```bash
cd news-monitor-be
npm start
```

### Sentiment Service

```bash
cd sentiment-service
uvicorn main:app --reload
```

### Frontend

```bash
cd news-monitor-fe
npm run dev
```

The frontend communicates with the Express backend, and the backend communicates with the Python sentiment service.

---

# Backend API

The backend provides API endpoints for different parts of the application.

## Keywords

```text
/api/keywords
```

Used for managing monitoring keywords.

## Sources

```text
/api/sources
```

Used for managing news sources.

## Crawling

```text
/api/crawl
```

Used to start and monitor news crawling.

## News

```text
/api/news
```

Used to access collected news articles.

## Dashboard

```text
/api/dashboard
```

Used to provide dashboard-related information.

---

# Sentiment Service

The sentiment service provides a separate API for sentiment analysis.

### Endpoint

```text
POST /sentiment
```

The backend sends article text to this endpoint.

The service processes the text and returns the sentiment prediction.

Conceptually:

```text
Express Backend
      ↓
Article Text
      ↓
Python FastAPI
      ↓
Transformers Model
      ↓
Sentiment Result
      ↓
Express Backend
```

---

# Configuration

Environment variables are stored in:

```text
news-monitor-be/.env
```

Example configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=news_monitor
DB_USER=postgres
DB_PASSWORD=your_password_here

PORT=3000
NODE_ENV=development
```

> **Never commit your `.env` file to GitHub.**

The project uses `.gitignore` to prevent environment files and other sensitive or generated files from being committed.

---

# Development Roadmap

The project is being developed in several stages.

## Phase 1 — GitHub Ready

* Clean project structure
* Proper README
* Environment configuration
* `.gitignore`
* Dependency cleanup
* Basic documentation

## Phase 2 — Reliable Local System

* Configuration validation
* Centralized error handling
* Database migrations
* Database indexes and constraints
* Better scraper error handling
* Scraper timeouts
* Retry handling
* Rate limiting
* Source failure isolation

## Phase 3 — Operational Monitoring

* Persistent crawl history
* Configurable crawl schedules
* Better crawling management
* Logging
* Metrics
* Improved monitoring

## Phase 4 — Sentiment and Intelligence

* Bengali sentiment analysis
* Multilingual sentiment analysis
* Sentiment model evaluation
* Better NLP processing
* Entity extraction
* Topic extraction
* Trend analysis

## Phase 5 — Alerts and User Experience

* Negative-news alerts
* Email notifications
* Article filtering
* Pagination
* Improved dashboard
* Better frontend state management
* Improved UX

## Phase 6 — Deployment

* Docker support
* CI/CD
* Production configuration
* Worker-based architecture
* Durable queues
* Deployment automation

---

# Future Vision

The long-term goal is to turn News Monitor into a more complete **media monitoring and intelligence platform**.

Future versions could provide:

* Real-time news monitoring
* Bengali and multilingual sentiment analysis
* Negative-news alerts
* Email notifications
* Advanced article search
* Full-text search
* Sentiment trends over time
* Company and person detection
* Topic detection
* Media coverage comparison
* Source-level sentiment comparison
* Historical news analysis
* Automated reports
* Production deployment
* Scalable background workers

For example, users could eventually see:

```text
Walton Media Coverage
────────────────────────────

Positive    ████████████  52%

Neutral     ███████       30%

Negative    █████         18%
```

This could help organizations understand how they are being represented across different media sources.

---

# Current Status

News Monitor currently has:

* React frontend
* Express backend
* PostgreSQL integration
* Multiple news scrapers
* Keyword management
* Source management
* Crawling functionality
* News article storage
* Separate Python sentiment service
* Dashboard
* Article viewing
* GitHub-ready project structure

The project is still under active development.

The next focus areas are improving **reliability, data quality, sentiment accuracy, alerts, testing, and production readiness**.

---

# Contributing

Contributions and suggestions are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test your changes.
5. Commit your changes.

```bash
git commit -m "Add your feature"
```

6. Push your branch.

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

# License

This project is currently under development.

A license can be added when the project is ready for public distribution.
