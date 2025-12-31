const axios = require("axios");
const cheerio = require("cheerio");

const API_BASE_URL = "http://localhost:3000";

// External reference article 
const EXTERNAL_REFERENCE_URL =
  "https://www.socialintents.com/blog/do-chatbots-increase-sales/";

async function runPhase2Step2_3_4() {
  try {
    console.log("Fetching articles from API...");

    //  Fetch article from API
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

    //  External reference
    console.log("\nUsing external reference article:");
    console.log(EXTERNAL_REFERENCE_URL);

    //Scrape external article
    console.log("\nScraping external article...");

    const extResponse = await axios.get(EXTERNAL_REFERENCE_URL);
    const $ = cheerio.load(extResponse.data);

    // Extract title
    const externalTitle = $("h1").first().text().trim();

    // Extract readable content (loose selector)
    const externalContent = $("article")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    console.log("\nExternal article scraped:");
    console.log("Title:", externalTitle);
    console.log("External content length:", externalContent.length);

    // Return both for next step (LLM)
    return {
      originalArticle,
      externalArticle: {
        title: externalTitle,
        content: externalContent,
        url: EXTERNAL_REFERENCE_URL,
      },
    };

  } catch (error) {
    console.error("Phase 2 scraping failed:", error.message);
  }
}


runPhase2Step2_3_4();
