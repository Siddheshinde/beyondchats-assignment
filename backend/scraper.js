const axios = require("axios");
const cheerio = require("cheerio");

const BLOG_PAGE_URL = "https://beyondchats.com/blogs/page/14/";

async function scrapeOldestArticles() {
  try {
    // 1. Fetch blog list page
    const response = await axios.get(BLOG_PAGE_URL);
    const $ = cheerio.load(response.data);

    const articles = [];

    // 2. Extract titles & links
    $("article.entry-card").each((index, element) => {
      const title = $(element)
        .find("h2.entry-title a")
        .text()
        .trim();

      const link = $(element)
        .find("h2.entry-title a")
        .attr("href");

      if (title && link) {
        articles.push({ title, link });
      }
    });

    // 3. Take only 5 oldest articles
    const oldestFive = articles.slice(0, 5);

    // 4. Scrape each article page
    for (const article of oldestFive) {
      const articleResponse = await axios.get(article.link);
      const $$ = cheerio.load(articleResponse.data);

      // Extract full content (CORRECT CONTAINER)
      const content = $$(".elementor-widget-theme-post-content")
        .text()
        .replace(/\s+/g, " ")
        .trim();

      article.content = content;

      // Extract published date
      const publishedDate = $$("time").first().text().trim();
      article.publishedDate = publishedDate;

      // Debug check
      console.log("Content length:", article.content.length);
    }

    // 5. FINAL OUTPUT (MUST BE OUTSIDE LOOP)
    console.log("\nFINAL SCRAPED ARTICLES:\n");

    oldestFive.forEach((a, i) => {
      console.log(`${i + 1}. ${a.title}`);
      console.log(`Date: ${a.publishedDate}`);
      console.log(`Link: ${a.link}`);
      console.log(`Content Preview: ${a.content.substring(0, 200)}...\n`);
    });

  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
}

// Run scraper
scrapeOldestArticles();
