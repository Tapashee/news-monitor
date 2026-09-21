const { fetchPage }  = require("../http-client-service");
const cheerio = require("cheerio");
const { formatDate } = require("../../utils/date-formatter.js");


async function scrapeBangladeshPost(
    keywords,
    homepageUrl,
    signal
) {

    console.log("Scraping Bangladesh Post...");

    const articles = [];

    await crawl(
        keywords,
        homepageUrl,
        signal,
        articles
    );

    console.log("Scraped articles:", articles);

    console.log("Scraping finished.");

    return articles;
}


async function crawl(
    keywords,
    homepageUrl,
    signal,
    articles
) {

    const queue = [homepageUrl];

    const visited = new Set([
        homepageUrl
    ]);

    const baseUrl = new URL(homepageUrl);

    let level = 0;


    while (queue.length > 0) {

        /*
         * Check whether the crawl has been aborted
         * before processing the next level.
         */
        if (signal?.aborted) {

            throw new Error("AbortError");
        }


        const qLen = queue.length;


        /*
         * Stop crawling after level 3.
         */
        if (level === 4) {
            break;
        }


        for (let i = 0; i < qLen; i++) {

            /*
             * Check before processing each URL.
             */
            if (signal?.aborted) {

                throw new Error("AbortError");
            }


            const currentUrl = queue.shift();


            console.log(
                "Crawling:",
                currentUrl
            );


            try {

                /*
                 * Pass AbortController signal
                 * to Axios.
                 */
                // const response = await axios.get(
                //     currentUrl,
                //     {
                //         signal
                //     }
                // );


                const html = await fetchPage(currentUrl, signal);
                const $ = cheerio.load(html);


                // -----------------------------------
                // Extract article titles
                // -----------------------------------

                $("h1.detail-post-title").each(
                    (index, element) => {

                        const articleTitle =
                            $(element)
                                .text()
                                .trim();


                        const matched =
                            keywords.some(
                                k =>
                                    articleTitle
                                        .toLowerCase()
                                        .includes(
                                            k.keyword
                                                .toLowerCase()
                                        )
                            );


                        console.log(
                            "Article Title:",
                            articleTitle
                        );

                        console.log(
                            "Matched:",
                            matched
                        );


                        if (
                            articleTitle &&
                            matched
                        ) {

                            const publicationInfo = $('strong')
                                                    .filter((_, el) => $(el).text().trim() === 'Published')
                                                    .parent()
                                                    .text()
                                                    .trim()
                                                    .split('::')[1]
                                                    ?.trim();


                            const publishedAt =
                                formatDate(
                                    publicationInfo
                                );


                            console.log(
                                "Article Title:",
                                articleTitle
                            );

                            console.log(
                                "Published at:",
                                publishedAt
                            );


                            const article = {

                                title:
                                    articleTitle,

                                news_link:
                                    currentUrl,

                                published_at:
                                    publishedAt
                            };


                            articles.push(
                                article
                            );
                        }
                    }
                );


                // -----------------------------------
                // Discover links
                // -----------------------------------

                $("a[href]").each(
                    (index, element) => {

                        /*
                         * Check whether the crawl
                         * was aborted while processing
                         * the page.
                         */
                        if (signal?.aborted) {
                            return;
                        }


                        const href =
                            $(element).attr("href");


                        if (!href) {
                            return;
                        }


                        const url =
                            new URL(
                                href,
                                homepageUrl
                            );


                        /*
                         * Only follow links belonging
                         * to the same hostname.
                         */
                        if (
                            url.hostname ===
                                baseUrl.hostname &&
                            !visited.has(url.href)
                        ) {

                            console.log(
                                "Discovered:",
                                url.href
                            );


                            visited.add(
                                url.href
                            );


                            queue.push(
                                url.href
                            );
                        }
                    }
                );


            } catch (err) {

                /*
                 * Axios throws CanceledError when
                 * the request is aborted.
                 */
                if (
                    err.name === "CanceledError" ||
                    err.name === "AbortError" ||
                    signal?.aborted
                ) {

                    console.log(
                        "Bangladesh Post crawl aborted."
                    );

                    throw err;
                }


                /*
                 * Normal scraping error.
                 */
                console.log(
                    "Error scraping The Bangladesh Post:",
                    err.message
                );
            }
        }


        /*
         * Move to the next crawling level.
         */
        level++;
    }
}


module.exports = {
    scrapeBangladeshPost
};
