// scraper.js

const axios = require("axios");
const cheerio = require("cheerio");

const BLOG_PAGE_URL = "https://beyondchats.com/blogs/page/14/";

async function scrapeOldestArticles() {
  try {
    // 1. Fetch the HTML of the page
    const response = await axios.get(BLOG_PAGE_URL);

    // 2. Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // 3. Select all article cards
    const articles = [];

    $("article.entry-card").each((index, element) => {
      // 4. Extract title
      const title = $(element)
        .find("h2.entry-title a")
        .text()
        .trim();

      // 5. Extract article link
      const link = $(element)
        .find("h2.entry-title a")
        .attr("href");

      // Only push valid articles
      if (title && link) {
        articles.push({
          title,
          link,
        });
      }
    });

    // 6. Print result
    console.log("Scraped Articles:");
    articles.forEach((article, i) => {
      console.log(`${i + 1}. ${article.title}`);
      console.log(`   ${article.link}`);
    });

  } catch (error) {
    console.error("Error scraping articles:", error.message);
  }
}

// Run the scraper
scrapeOldestArticles();
