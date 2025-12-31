const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";

async function fetchArticlesFromAPI() {
  try {
    console.log("Fetching articles from API...");

    const response = await axios.get(`${API_BASE_URL}/articles`);
    const articles = response.data;

    if (!articles || articles.length === 0) {
      console.log("No articles found in API.");
      return;
    }

    // Pick ONE article for Phase 2 (intentional)
    const article = articles[0];

    console.log("\nSelected article for Phase 2:");
    console.log("Title:", article.title);
    console.log("Published Date:", article.published_date);
    console.log("Content length:", article.content.length);

    return article;

  } catch (error) {
    console.error("Failed to fetch articles:", error.message);
  }
}

// Run step 2.1
fetchArticlesFromAPI();
