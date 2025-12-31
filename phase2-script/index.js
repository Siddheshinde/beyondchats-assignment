// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const cheerio = require("cheerio");



const API_BASE_URL = "http://localhost:3000";

// External reference article
const EXTERNAL_REFERENCE_URL =
  "https://www.socialintents.com/blog/do-chatbots-increase-sales/";

async function runPhase2() {
  try {
    console.log("Fetching articles from API...");

    //Fetch article from API
    const response = await axios.get(`${API_BASE_URL}/articles`);
    const articles = response.data;

    if (!articles || articles.length === 0) {
      console.log("No articles found in API.");
      return;
    }

    const originalArticle = articles[0];

    console.log("\nSelected article for Phase 2:");
    console.log("Title:", originalArticle.title);
    console.log("Original content length:", originalArticle.content.length);

    // External reference
    console.log("\nUsing external reference article:");
    console.log(EXTERNAL_REFERENCE_URL);

    // Scrape external article
    console.log("\nScraping external article...");

    const extResponse = await axios.get(EXTERNAL_REFERENCE_URL);
    const $ = cheerio.load(extResponse.data);

    const externalTitle = $("h1").first().text().trim();
    const externalContent = $("article")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    console.log("External article scraped:");
    console.log("Title:", externalTitle);
    console.log("External content length:", externalContent.length);

    // Generate improved article using LLM
    const improvedContent = await generateImprovedArticle(
      originalArticle,
      {
        title: externalTitle,
        content: externalContent,
        url: EXTERNAL_REFERENCE_URL,
      }
    );

    console.log("\nImproved article generated.");
    console.log("Improved content length:", improvedContent.length);

    // STEP 2.6 — Save improved article
    await axios.post(`${API_BASE_URL}/articles`, {
      title: `Improved: ${originalArticle.title}`,
      content: improvedContent,
      url: `${originalArticle.url}#improved`,
      published_date: originalArticle.published_date,
    });

    console.log("Improved article saved to database.");

  } catch (error) {
    console.error("Phase 2 failed:", error.message);
  }
}

async function generateImprovedArticle(original, external) {
    console.log("Using simulated LLM output due to API limitations.");
  
    return `
  Improved Version of: ${original.title}
  
  This article has been improved for better structure and readability while
  preserving its original meaning. Sections have been reorganized, repetitive
  points reduced, and clarity enhanced using insights from an external reference
  article.
  
  References:
  - ${external.url}
  
  [LLM output simulated due to external API quota/model availability limitations]
  `;
  }
  

runPhase2();
