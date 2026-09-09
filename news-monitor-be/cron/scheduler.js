const cron = require("node-cron");
const { getSources } = require("../services/source-service");
const { scrapeWebsite } = require("../services/scraper-service");

let isCrwling = false;

cron.schedule("* * * * *", async () => {
    if(isCrwling){
        console.log("Crawl is already running. Skipping this schedule.");
        return;
    }

    isCrwling = true;

    console.log("Started scheduled crawl...");

    try {
        const sources = await getSources();

        for (const source of sources) {
            await scrapeWebsite(source);
        }

        console.log("Crawl finished.");

    } catch (err) {
        console.error(err);
    } finally {
        isCrwling = false;
    }
});