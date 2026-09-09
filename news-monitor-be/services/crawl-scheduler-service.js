const cron = require("node-cron");

const { getSources } = require("../services/source-service");
const { scrapeWebsite } = require("../services/scraper-service");

const {
    startCrawl,
    finishCrawl,
    getCrawlStatus,
    abortCurrentCrawl,
} = require("./crawl-state-service");


let scheduledTask = null;


async function runScheduledCrawl() {

    const status = getCrawlStatus();

    if (status.crawling) {

        console.log(
            "Crawl is already running. Skipping this schedule."
        );

        return;
    }

    const signal = startCrawl("scheduled");

    console.log(
        "Started scheduled crawl..."
    );

    try {

        const sources = await getSources();

        for (const source of sources) {

            if (signal.aborted) {
                throw new Error("AbortError");
            }

            await scrapeWebsite(
                source,
                signal
            );
        }

        console.log(
            "Scheduled crawl finished."
        );

    } catch (error) {

        if (
            error.name === "CanceledError" ||
            error.name === "AbortError" ||
            signal.aborted
        ) {

            console.log(
                "Scheduled crawl aborted."
            );

        } else {

            console.error(
                "Scheduled crawl error:",
                error
            );
        }

    } finally {

        finishCrawl();
    }
}


function startScheduledCrawling() {

    if (scheduledTask) {
        return false;
    }

    scheduledTask = cron.schedule(
        "* * * * *",
        runScheduledCrawl
    );

    console.log(
        "Scheduled crawling started."
    );

    return true;
}


function stopScheduledCrawling() {

    if (!scheduledTask) {
        return false;
    }

    scheduledTask.stop();
    scheduledTask = null;

    // If a scheduled crawl is currently running,
    // abort it.
    const status = getCrawlStatus();

    if (
        status.crawling &&
        status.type === "scheduled"
    ) {
        abortCurrentCrawl();
    }

    console.log(
        "Scheduled crawling stopped and aborted."
    );

    return true;
}


function requestStopCurrentCrawl() {

    const status = getCrawlStatus();

    if (!status.crawling) {
        return false;
    }

    const stopped = abortCurrentCrawl();

    if (stopped) {
        console.log(
            "Current crawl stop requested."
        );
    }

    return stopped;
}


function getSchedulerStatus() {

    const status = getCrawlStatus();

    return {
        scheduled: scheduledTask !== null,
        crawling: status.crawling,
        crawlType: status.type,
        sourceId: status.sourceId,
    };
}


module.exports = {
    startScheduledCrawling,
    stopScheduledCrawling,
    requestStopCurrentCrawl,
    getSchedulerStatus,
};