const { getKeywords } = require("./keyword-service");

const {
    scrapeDailyStar,
} = require("./scrapers/daily-star-scraper-service");

const {
    scrapeProthomAlo,
} = require("./scrapers/prothom-alo-scraper-service");

const {
    scrapeBusinessStandard,
} = require("./scrapers/business-standard-scraper-service");

const {
    scrapeIndependentBD,
} = require("./scrapers/independentbd-scraper-service");

const {
    scrapeDhakaTribune,
} = require("./scrapers/dhakatribune-scraper-service");

const {
    scrapeDailySun,
} = require("./scrapers/daily-sun-scraper-service");

const {
    scrapeTheFinancialExpress,
} = require("./scrapers/thefinancialexpress-scraper-service");

const {
    scrapeNewAgeBd,
} = require("./scrapers/newagebd-scraper-service");

const {
    scrapeObserverBd,
} = require("./scrapers/observerbd-scraper-service");

const {
    scrapeBangladeshPost,
} = require("./scrapers/bangladeshpost-scraper-service");

const {
    analyzeSentiments,
} = require("./sentiment-service");

const {
    saveNewsArticle,
} = require("./news-service");


const scrapers = {
    "daily-star": scrapeDailyStar,
    "prothom-alo": scrapeProthomAlo,
    "business-standard": scrapeBusinessStandard,
    "independentbd": scrapeIndependentBD,
    "dhakatribune": scrapeDhakaTribune,  
    "daily-sun": scrapeDailySun,  
    "thefinancialexpress": scrapeTheFinancialExpress,
    "newagebd": scrapeNewAgeBd,
    "observerbd": scrapeObserverBd,
    "bangladeshpost": scrapeBangladeshPost,
};


async function scrapeWebsite(source, signal) {

    // Check before starting
    if (signal?.aborted) {
        throw new Error("AbortError");
    }

    const keywords = await getKeywords();

    console.log(
        "Keywords:",
        keywords
    );

    const scraper = scrapers[source.scraper_name];

    if (!scraper) {

        throw new Error(
            `No scraper found for: ${source.scraper_name}`
        );
    }

    console.log(
        `Scraping ${source.source_name}`
    );

    const articles = await scraper(
        keywords,
        source.website_url,
        signal
    );

    // Check after scraping
    if (signal?.aborted) {
        throw new Error("AbortError");
    }

    articles.forEach(article => {

        article.source_id = source.source_id;

    });

    // Check before sentiment analysis
    if (signal?.aborted) {
        throw new Error("AbortError");
    }

    const result = await analyzeSentiments(
        articles
    );

    // Check before saving
    if (signal?.aborted) {
        throw new Error("AbortError");
    }

    for (const article of result) {

        if (signal?.aborted) {
            throw new Error("AbortError");
        }

        await saveNewsArticle(article);

        console.log(
            "===================================="
        );

        console.log(
            "Saved article:"
        );

        console.log(
            "Source ID:",
            article.source_id
        );

        console.log(
            "Title:",
            article.title
        );

        console.log(
            "Link:",
            article.news_link
        );

        console.log(
            "Published:",
            article.published_at
        );

        console.log(
            "Sentiment:",
            article.sentiment
        );

        console.log(
            "===================================="
        );
    }

    return result;
}


module.exports = {
    scrapeWebsite,
};