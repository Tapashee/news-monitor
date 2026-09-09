// let crawlStatus = {
//     crawling: false,
//     crawlType: null,
//     sourceId: null,
// };


// function startCrawl(type, sourceId = null) {
//     crawlStatus = {
//         crawling: true,
//         crawlType: type,
//         sourceId,
//     };
// }


// function finishCrawl() {
//     crawlStatus = {
//         crawling: false,
//         crawlType: null,
//         sourceId: null,
//     };
// }


// function getCrawlStatus() {
//     return crawlStatus;
// }


// module.exports = {
//     startCrawl,
//     finishCrawl,
//     getCrawlStatus,
// };

let crawlState = {
    crawling: false,
    type: null,
    sourceId: null,
};

let currentAbortController = null;


function startCrawl(type, sourceId = null) {

    crawlState = {
        crawling: true,
        type,
        sourceId,
    };

    currentAbortController = new AbortController();

    return currentAbortController.signal;
}


function finishCrawl() {

    crawlState = {
        crawling: false,
        type: null,
        sourceId: null,
    };

    currentAbortController = null;
}


function getCrawlStatus() {

    return {
        ...crawlState,
    };
}


function getCrawlSignal() {

    if (!currentAbortController) {
        return null;
    }

    return currentAbortController.signal;
}


function abortCurrentCrawl() {

    if (!currentAbortController) {
        return false;
    }

    if (currentAbortController.signal.aborted) {
        return false;
    }

    currentAbortController.abort();

    return true;
}


module.exports = {
    startCrawl,
    finishCrawl,
    getCrawlStatus,
    getCrawlSignal,
    abortCurrentCrawl,
};