// const axios = require("axios");
// const cheerio = require("cheerio");
// const { formatDate } = require('../../utils/date-formatter.js');

// const articles = [];

// async function scrapeIndependentBD(keywords, homepageUrl){
//     console.log("Scraping The Independent...");
    
//     await crawl(keywords,homepageUrl);
//     console.log("Scraping finished.");

//     return articles;
// }

// async function crawl(keywords,homepageUrl) {
//     const queue = [homepageUrl];
//     const visited = new Set([homepageUrl]);
//     const baseUrl = new URL(homepageUrl);
//     let level = 0;

//     while (queue.length > 0) {
//         const currentUrl = queue.shift();

//         console.log('Crawling:', currentUrl);

//         try {
//             const response = await axios.get(currentUrl);
//             const html = response.data;
//             const $ = cheerio.load(html);

//             // Extract articletitlesand publication info
//             $('h2').each((index, element)=> {
//                 const articleTitle = $(element).text().trim();

//                 const matched = keywords.some(k =>
//                     articleTitle.toLowerCase().includes(k.keyword.toLowerCase())
//                 );

//                 if(articleTitle && matched) {
//                     const publicationInfo = $('.dtlDate')
//                                             .find('#news_update_time')
//                                             .first()
//                                             .text()
//                                             .trim();
                    
//                     console.log('Article Title:', articleTitle);
//                     console.log('Published at:', formatDate(publicationInfo));

//                     const article = {
//                         title: articleTitle,
//                         news_link: currentUrl,
//                         published_at: formatDate(publicationInfo)
//                     }
//                     articles.push(article);
//                 }
//             });

//             $('a[href]').each((index, element) => {
//                 const href = $(element).attr('href');

//                 if (!href) {
//                     return;
//                 }

//                 const url = new URL(href, homepageUrl);

//                 if (
//                     url.hostname === baseUrl.hostname &&
//                     !visited.has(url.href)
//                 ) {
//                     console.log('Discovered:', url.href);
//                     visited.add(url.href);
//                     queue.push(url.href);
//                 }
//             });
//         } catch (err) {
//             console.log('Error scraping The Independent:', err.message);
//         }
//     }
// }

// module.exports = { 
//     scrapeIndependentBD
// };


const axios = require("axios");
const cheerio = require("cheerio");
const { formatDate } = require("../../utils/date-formatter.js");


async function scrapeIndependentBD(
    keywords,
    homepageUrl,
    signal
) {

    console.log("Scraping The Independent...");

    const articles = [];

    await crawl(
        keywords,
        homepageUrl,
        signal,
        articles
    );

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
                const response = await axios.get(
                    currentUrl,
                    {
                        signal
                    }
                );


                const html = response.data;

                const $ = cheerio.load(html);


                // -----------------------------------
                // Extract article titles
                // -----------------------------------

                $("h2").each(
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
                                $(".dtlDate")
                                    .find("#news_update_time")
                                    .first()
                                    .text()
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
                        "The Independent crawl aborted."
                    );

                    throw err;
                }


                /*
                 * Normal scraping error.
                 */
                console.log(
                    "Error scraping The Independent:",
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
    scrapeIndependentBD
};
