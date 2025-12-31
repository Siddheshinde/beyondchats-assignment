BeyondChats Internship Assignment 🚀  
**Submission by:** Siddhesh Shinde  

Hi! This repository contains my submission for the **Full Stack Web Developer Intern** assignment at **BeyondChats**.

Instead of rushing to add half-working features, I focused on building a clean, understandable system step by step. My main goal was to show that I can break down a real problem, make reasonable engineering decisions, and clearly document what I built and why.



## Project Overview

### The Goal

The assignment broadly aims to:

- Scrape blog articles from the BeyondChats website  
- Store them in a persistent database  
- Expose them through REST APIs  
- Enhance article content using an LLM-based pipeline  
- Display both original and enhanced articles on a frontend  

To keep the system stable and easy to reason about, I divided the work into **three clear phases**, completing and testing each phase before moving to the next.


## Tech Stack

I intentionally chose a stack that favors **simplicity, clarity, and reproducibility** over complexity.

- **Runtime:** Node.js  
- **Framework:** Express.js (REST APIs)  
- **Web Scraping:** Axios + Cheerio  
- **Database:** SQLite (lightweight, file-based, no setup overhead)  
- **API Testing:** Postman  
- **Frontend:** Plain HTML, CSS, and JavaScript

## Project Structure
beyondchats-assignment/
│
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── scraper.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── index.html
│
├── phase2-script/
│   └── index.js
│
├── .gitignore
├── README.md
├── package.json
└── package-lock.json


## Progress & Phases

### Phase 1 – Blog Scraping & CRUD APIs ✅

**Objective:**  
Scrape the oldest blog articles from BeyondChats, store them persistently, and expose them via APIs.

**My Approach:**

- Manually analyzed the blog pagination instead of scraping blindly  
- Noticed that **page 15 contained only one article**, so I targeted **page 14** to get a meaningful dataset  
- Scraped data in two steps:
  - Blog listing page → title & article URL  
  - Individual article page → full content & published date  
- Stored articles in SQLite with a **UNIQUE constraint on URLs** to prevent duplicate inserts  

**APIs Implemented:**

- `GET /articles` – fetch all articles  
- `GET /articles/:id` – fetch article by ID  
- `POST /articles` – manually add an article  

All APIs were tested using Postman.

**Status:**  
✅ Complete and tested.



### Phase 2 – AI Enhancement Pipeline (Core Implemented)

**Objective:**  
Improve an article’s structure and readability by comparing it with external reference articles using an LLM-based approach.

**My Approach:**

- Built a standalone script that:
  - Fetches articles from my own API (not directly from the DB)
  - Selects an article intentionally to demonstrate the pipeline
  - Scrapes an external reference blog article
  - Constructs a structured prompt for enhancement
  - Saves the enhanced version as a **new database entry**  

Improved articles are stored separately to preserve original content and allow comparison.


### Why Google Scraping Was Not Used

Direct Google scraping was intentionally avoided because:

- Google aggressively blocks automated scraping
- It introduces instability and unnecessary complexity
- The purpose of Phase 2 is **system design**, not SEO ranking

Instead, relevant external reference articles were selected manually to clearly demonstrate the enhancement pipeline.

---

### Why LLM Output Was Simulated

I attempted real LLM integration using both **OpenAI** and **Google Gemini APIs**.

However:
- OpenAI ran into quota and billing limitations
- Gemini caused model availability and API version issues

Instead of faking output or shipping broken logic, I chose to **simulate the LLM output**.

Important clarification:
- The **pipeline is real** (fetching, scraping, prompt construction, saving results)
- Only the final text generation step is mocked due to external API constraints

This decision was made deliberately to keep the system honest, stable, and reviewable.

**Status:**  
⚠️ Core pipeline implemented, LLM output simulated.



### Phase 3 – Frontend UI ✅

**Objective:**  
Visualize original and improved articles through a frontend.

**My Approach:**

- Built a minimal HTML + CSS + JavaScript frontend
- Frontend fetches data from `GET /articles`
- Displays articles as clean cards
- Clearly distinguishes:
  - Original articles  
  - Improved articles (with visual badges)

CORS was enabled in the backend to allow frontend-backend communication during local development.

The focus here is **integration and clarity**, not advanced UI design.

**Status:**  
✅ Functional and integrated.



## Challenges & How I Solved Them

This was not a copy-paste exercise. Some real issues I faced:

### 1. Empty Content While Scraping  
**Problem:** Scraped article bodies were empty.  
**Fix:** Discovered the site uses Elementor (WordPress). Standard `<p>` tags were insufficient, so I inspected the DOM deeply to find the correct content containers.

### 2. Duplicate Data Insertion  
**Problem:** Running the scraper multiple times duplicated entries.  
**Fix:** Added a UNIQUE constraint on the `url` column in SQLite.

### 3. Express Routing Error  
**Problem:** `Cannot POST /articles`  
**Fix:** Forgot to restart the server after adding routes — a simple but important lesson.



## Architecture / Data Flow Diagram

![Architecture Diagram](docs/architecture-diagram.drawio.png)


## Live Demo

The frontend for this project is designed to run locally and consumes data from
the local backend API.

### How to view the live demo locally:

1. Start the backend server:
   ```bash
   cd backend
   node index.js
2.Ensure articles exist in the database:
     ```bash
    node scraper.js
3.Run the Phase 2 enhancement pipeline:
    cd ../phase2-script
    node index.js
This step:
Fetches an article from the backend API
Scrapes an external reference blog
Generates an improved version of the article (LLM output simulated)
Saves the improved article as a new entry in the database

4.Open the frontend:
    Navigate to the frontend/ folder
    Open index.html in any browser
The frontend fetches data from the backend API and displays:
Original scraped articles
Improved articles generated via the Phase 2 enhancement pipeline

Note: The project can be easily deployed using services like Render (backend)
and Netlify or Vercel (frontend). Deployment was intentionally kept out of scope
to focus on core system design and functionality.


## Frontend Preview
Below is a screenshot of the frontend displaying both original and improved
articles fetched from the backend API.
![Frontend Preview](docs/frontend-preview1.png)
![Frontend Preview](docs/frontend-preview2.png)


## API Endpoints

 GET -`/articles` - Fetch all articles 
 GET -`/articles/:id` - Fetch article by ID 
 POST- `/articles` - Add a new article 



## Local Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Siddheshinde/beyondchats-assignment.git
cd beyondchats-assignment/backend

Install dependencies:
npm install


Run the Scraper (Phase 1):
node scraper.js


Start the Server:
node index.js


Test: Open http://localhost:3000/articles in your browser or Postman.

Future Improvements

If extended further, this project could include:
An “Improve Article” button in the frontend to trigger enhancement on demand
A backend endpoint to run the enhancement pipeline asynchronously
Stable LLM integration for real-time generation
Deployment of frontend and backend for a public live link
Pagination and filtering for large datasets
These were intentionally kept out of scope to keep the submission stable and focused.

Final Thoughts

This assignment was a great exercise in system design, not just writing code.
I learned that real-world engineering often involves handling constraints like DOM complexity, API limits, and making trade-offs instead of forcing incomplete features.

Thank you for taking the time to review my submission!