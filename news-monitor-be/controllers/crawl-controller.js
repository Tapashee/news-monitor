const sourceService = require("../services/source-service");

const {
    scrapeWebsite,
} = require("../services/scraper-service");


const {
    startScheduledCrawling,
    stopScheduledCrawling,
    requestStopCurrentCrawl,
    getSchedulerStatus,
} = require("../services/crawl-scheduler-service");


const {
    getCrawlStatus,
    startCrawl,
    finishCrawl,
} = require("../services/crawl-state-service");


async function startSourceCrawl(req, res) {

    try {

        const { sourceId } = req.params;

        const status = getCrawlStatus();

        if (status.crawling) {

            return res.status(409).json({

                error:
                    "Another crawl is already running.",

                status,
            });
        }


        const source =
            await sourceService.getSourceById(
                sourceId
            );


        if (!source) {

            return res.status(404).json({

                error:
                    "Source not found.",
            });
        }


        const signal =
            startCrawl(
                "source",
                source.source_id
            );


        console.log(
            "STATUS AFTER START:",
            getCrawlStatus()
        );


        const articles =
            await scrapeWebsite(
                source,
                signal
            );


        finishCrawl();


        console.log(
            "STATUS AFTER FINISH:",
            getCrawlStatus()
        );


        return res.status(200).json({

            message:
                "Crawling completed.",

            source:
                source.source_name,

            articles,
        });


    } catch (error) {

        finishCrawl();


        if (
            error.name === "CanceledError" ||
            error.name === "AbortError"
        ) {

            console.log(
                "Source crawl aborted."
            );

            return res.status(200).json({

                message:
                    "Crawling aborted.",
            });
        }


        console.error(
            "Error starting source crawl:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to crawl source.",
        });
    }
}



async function startAllCrawl(req, res) {

    try {

        const status =
            getCrawlStatus();


        if (status.crawling) {

            return res.status(409).json({

                error:
                    "Another crawl is already running.",

                status,
            });
        }


        const sources =
            await sourceService.getSources();


        const signal =
            startCrawl("all");


        console.log(
            "STATUS AFTER START:",
            getCrawlStatus()
        );


        for (const source of sources) {

            if (signal.aborted) {
                throw new Error("AbortError");
            }


            await scrapeWebsite(
                source,
                signal
            );
        }


        finishCrawl();


        console.log(
            "STATUS AFTER FINISH:",
            getCrawlStatus()
        );


        return res.status(200).json({

            message:
                "All sources crawled successfully.",
        });


    } catch (error) {

        finishCrawl();


        if (
            error.name === "CanceledError" ||
            error.name === "AbortError"
        ) {

            console.log(
                "All-source crawl aborted."
            );


            return res.status(200).json({

                message:
                    "All-source crawling aborted.",
            });
        }


        console.error(
            "Error starting all crawls:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to crawl all sources.",
        });
    }
}



async function startScheduled(req, res) {

    try {

        const started =
            startScheduledCrawling();


        if (!started) {

            return res.status(409).json({

                error:
                    "Scheduled crawling is already running.",
            });
        }


        return res.status(200).json({

            message:
                "Scheduled crawling started.",
        });


    } catch (error) {

        console.error(
            "Error starting scheduled crawling:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to start scheduled crawling.",
        });
    }
}



async function stopScheduled(req, res) {

    try {

        const stopped =
            stopScheduledCrawling();


        if (!stopped) {

            return res.status(409).json({

                error:
                    "Scheduled crawling is not running.",
            });
        }


        return res.status(200).json({

            message:
                "Scheduled crawling stopped and aborted.",
        });


    } catch (error) {

        console.error(
            "Error stopping scheduled crawling:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to stop scheduled crawling.",
        });
    }
}



async function stopCurrentCrawl(req, res) {

    try {

        const stopped =
            requestStopCurrentCrawl();


        if (!stopped) {

            return res.status(409).json({

                error:
                    "No crawl is currently running.",
            });
        }


        return res.status(200).json({

            message:
                "Current crawl stop requested.",
        });


    } catch (error) {

        console.error(
            "Error stopping current crawl:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to stop current crawl.",
        });
    }
}



async function getScheduledStatus(req, res) {

    try {

        const status =
            getSchedulerStatus();


        return res.status(200).json(
            status
        );


    } catch (error) {

        console.error(
            "Error getting scheduled crawling status:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to get scheduled crawling status.",
        });
    }
}



function getCrawlStatusController(req, res) {

    try {

        const status =
            getCrawlStatus();


        return res.status(200).json(
            status
        );


    } catch (error) {

        console.error(
            "Error getting crawl status:",
            error
        );


        return res.status(500).json({

            error:
                "Failed to get crawl status.",
        });
    }
}



module.exports = {

    startSourceCrawl,
    startAllCrawl,
    startScheduled,
    stopScheduled,
    stopCurrentCrawl,
    getScheduledStatus,
    getCrawlStatusController,
};