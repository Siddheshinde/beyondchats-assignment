BeyondChats Internship Assignment

This repository contains my submission for the Full Stack Web Developer Intern assignment at BeyondChats.
The project is divided into phases as mentioned in the assignment.
Currently, Phase 1 is completed.

Project Overview:

The goal of this project is to:

scrape blog articles from the BeyondChats website,
store them in a database,
expose them using REST APIs,
and later enhance and display them using scripts and a frontend.

This repository focuses on building the backend step by step with clear reasoning and testing.

Tech Stack Used
Node.js – backend runtime
Express.js – REST API framework
Axios + Cheerio – web scraping
SQLite – lightweight database
Postman – API testing

Project Structure
backend/
│
├── scraper.js      # Scrapes blog articles
├── db.js           # SQLite database setup
├── articles.db     # Database file (generated at runtime)
├── index.js        # Express server with CRUD APIs
│
├── frontend/       # (Phase 3 – planned)
├── phase2-script/  # (Phase 2 – planned)
└── README.md

Phase 1 – Blog Scraping & CRUD APIs ✅
Objective

To scrape the oldest blog articles from BeyondChats, store them persistently, and provide APIs to manage them.

What I implemented

Identified the pagination structure of BeyondChats blogs.
Selected page 14 for scraping since page 15 contained only one article.

Scraped article data in two steps:
Blog listing page → title & URL
Individual article pages → full content & published date
Stored scraped articles in a SQLite database.
Prevented duplicate inserts using a unique constraint on article URLs.

Built REST APIs using Express.js:

GET /articles
GET /articles/:id
POST /articles
Tested all APIs using Postman.

Challenges faced

Content scraping issues:
Initial selectors returned empty content because the site uses Elementor-based WordPress blocks.

Finding correct HTML structure:
Required careful inspection of the DOM instead of assuming standard <p> tags.

Express routing error (Cannot POST /articles):
Happened due to not restarting the server after adding routes.

Duplicate data insertion:
Fixed by adding a unique constraint on article URLs in the database.

How I approached the problems

Broke the task into small, testable steps.
Used browser DevTools extensively before writing scraper logic.
Added debug logs (like content length checks) to understand failures.
Preferred simple, understandable solutions over complex abstractions.

Design choices

Used SQLite to keep setup simple and reproducible.
Hardcoded the pagination page instead of auto-detecting it to avoid unnecessary complexity.
Focused more on backend correctness than optimization.

Limitations & future improvements

Pagination detection can be automated.
PUT and DELETE APIs can be enhanced with validation.
Article content could be stored in a more structured format.
Backend can be deployed instead of running locally.

API Endpoints
Method	Endpoint	Description
GET	/articles	Fetch all articles
GET	/articles/:id	Fetch article by ID
POST	/articles	Create new article
Local Setup Instructions

Clone the repository:

git clone https://github.com/Siddheshinde/beyondchats-assignment.git
cd beyondchats-assignment/backend


Install dependencies:

npm install


Run the scraper:

node scraper.js


Start the API server:

node index.js


Test APIs using Postman:

http://localhost:3000/articles

Current Status

Phase 1: ✅ Completed

Phase 2: ⏳ Planned

Phase 3: ⏳ Planned