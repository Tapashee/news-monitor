const express = require("express");

const router = express.Router();

const {
    startSourceCrawl,
    startAllCrawl,
    startScheduled,
    stopScheduled,
    stopCurrentCrawl,
    getScheduledStatus,
    getCrawlStatusController,
} = require("../controllers/crawl-controller");


// Manual crawling

router.post(
    "/source/:sourceId",
    startSourceCrawl
);


router.post(
    "/all",
    startAllCrawl
);


// Scheduled crawling

router.post(
    "/schedule/start",
    startScheduled
);


router.post(
    "/schedule/stop",
    stopScheduled
);


// Abort currently running crawl

router.post(
    "/stop",
    stopCurrentCrawl
);


// Status

router.get(
    "/schedule/status",
    getScheduledStatus
);


router.get(
    "/status",
    getCrawlStatusController
);


module.exports = router;