BeyondChats Internship Assignment 🚀
Submission by: Siddhesh Shinde

Hi! This is my submission for the internship assignment. Instead of rushing to add broken features, I focused on building a clean, understandable backend system. I wanted to demonstrate that I can break down problems and document my actual engineering decisions.

 Project Overview

The Goal:
Scrape blog articles from BeyondChats.
Store them in a persistent database.
Expose them via REST APIs.
Enhance content (LLM integration).
Display them on a frontend.
I broke this down into three distinct phases to ensure stability at every step.

Tech Stack
I chose a stack that favors simplicity and reproducibility over complexity.
Runtime: Node.js
Framework: Express.js (REST API)
Scraping: Axios + Cheerio
Database: SQLite (Lightweight, no setup required)
Testing: Postman

Project Structure
backend/
│
├── scraper.js          # Phase 1: The logic to fetch data
├── db.js               # SQLite configuration
├── articles.db         # Auto-generated database file
├── index.js            # Express server & Routes
│
├── phase2-script/      # Phase 2: enhancement pipeline
├── frontend/           # Phase 3: Minimal UI
└── README.md


Progress & Phases
Phase 1: Scraping & CRUD
Objective: Fetch the oldest articles and store them.
My Approach: I manually analyzed the site pagination. I noticed Page 15 had only one article, so I targeted Page 14 to get a proper list.
Storage: Used SQLite with a unique constraint on URLs to prevent duplicates.
Status: Complete & Tested.
Phase 2: AI Enhancement Pipeline
Objective: Improve article structure using an LLM.
My Approach: I built a script to fetch an article, scrape a reference blog, and construct a prompt.
The Reality Check: I ran into API quota limits with OpenAI and verification issues with Gemini.
Decision: Instead of faking it or shipping broken code, I simulated the LLM output. The pipeline (fetching, prompting, saving) is real; only the text generation is mocked.
Status: Core logic works, generation is simulated.
Phase 3: Frontend
Objective: Visualise the data.
My Approach: A minimal HTML/JS page that hits my API.
Status: Functional (Focus is on integration, not design).

Challenges & How I Solved Them
This wasn't a "smooth sailing" copy-paste job. Here is what actually happened:
The "Empty Content" Bug:
Problem: The scraper was returning null for article bodies.
Fix: I realized the site uses Elementor (WordPress). Standard <p> tags weren't enough, so I had to inspect the DOM deep to find the actual content wrappers.
The Duplicate Data Issue:
Problem: Running the scraper twice duplicated every entry.
Fix: Added a UNIQUE constraint to the url column in SQLite.
Express Routing Errors:
Problem: Cannot POST /articles.
Fix: Classic mistake—I added the route but forgot to restart the server. 

API Endpoints
Method
Endpoint
Description
GET
/articles
Fetch all scraped articles
GET
/articles/:id
Get specific article details
POST
/articles
Manually add a new article

💻 Local Setup
Want to run this locally? Here is how:
Clone the repo:
git clone [https://github.com/Siddheshinde/beyondchats-assignment.git](https://github.com/Siddheshinde/beyondchats-assignment.git)
cd beyondchats-assignment/backend


Install dependencies:
npm install


Run the Scraper (Phase 1):
node scraper.js


Start the Server:
node index.js


Test: Open http://localhost:3000/articles in your browser or Postman.

Thoughts
This assignment was a great exercise in system design rather than just coding. I learned that handling edge cases (like API quotas or DOM structures) is where the real work lies.
Thanks for reviewing my submission!
