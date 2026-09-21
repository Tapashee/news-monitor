// const axios = require("axios");
const { fetchPage } = require("../http-client-service");
const cheerio = require("cheerio");
const { formatDate } = require("../../utils/date-formatter.js");


async function scrapeDailySun(
    keywords,
    homepageUrl,
    signal
) {

    const articles = [];

    await crawl(
        keywords,
        homepageUrl,
        signal,
        articles
    );

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

        if (signal?.aborted) {
            throw new Error("AbortError");
        }


        const qLen = queue.length;


        if (level === 4) {
            break;
        }


        for (let i = 0; i < qLen; i++) {

            if (signal?.aborted) {
                throw new Error("AbortError");
            }


            const currentUrl = queue.shift();

            console.log(
                "Crawling:",
                currentUrl
            );


            try {

                const html = await fetchPage(
                    currentUrl,
                    signal
                );

                const $ = cheerio.load(html);


                // -----------------------------------
                // Extract article titles
                // -----------------------------------

                $("h1.detailHeadline").each(
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

                            const publicationInfo =
                                $("span.publishedTime")
                                    .text()
                                    .replace(
                                        "Published:",
                                        ""
                                    )
                                    .trim();


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

                if (
                    err.name === "CanceledError" ||
                    err.name === "AbortError" ||
                    signal?.aborted
                ) {

                    console.log(
                        "Daily Sun crawl aborted."
                    );

                    throw err;
                }


                console.log(
                    "Error scraping Daily Sun:",
                    err.message
                );
            }
        }


        level++;
    }
}


module.exports = {
    scrapeDailySun,
};