// const axios = require('axios');
// const cheerio = require('cheerio');
// const { formatDate } = require('../../utils/date-formatter.js');

// const articles = [];

// async function scrapeDailyStar(keywords, homepageUrl) {
//     await crawl(keywords,homepageUrl);
//     return articles;
// }

// async function crawl(keywords,homepageUrl) {
//     const queue = [homepageUrl];
//     const visited = new Set([homepageUrl]);
//     const baseUrl = new URL(homepageUrl);
//     let level = 0;

//     while (queue.length > 0) {
//         const qLen = queue.length;
//         if(level == 3) break;

//         for(let i=0; i < qLen; i++){

//             const currentUrl = queue.shift();
//             console.log('Crawling:', currentUrl);

//             try {
//                 const response = await axios.get(currentUrl);
//                 const html = response.data;
//                 const $ = cheerio.load(html);

//                 // Extract articletitles and publication info
//                 $('h1').each((index, element)=> {
//                     const articleTitle = $(element).text().trim();

//                     const matched = keywords.some(k =>
//                         articleTitle.toLowerCase().includes(k.keyword.toLowerCase())
//                     );

//                     console.log('Article Title:', articleTitle);
//                     console.log('Matched:', matched);

//                     if(articleTitle && matched) {
//                         const publicationInfo = $('.block-article-meta-block')
//                                                 .find('span')
//                                                 .first()
//                                                 .text()
//                                                 .trim();
                        
//                         console.log('Article Title:', articleTitle);
//                         console.log('Published at:', formatDate(publicationInfo));

//                         const article = {
//                             title: articleTitle,
//                             news_link: currentUrl,
//                             published_at: formatDate(publicationInfo)
//                         }
//                         articles.push(article);
//                     }
//                 });

//                 // Identify all the <a> tags of the current page
//                 $('a[href]').each((index, element) => {
//                     const href = $(element).attr('href');

//                     if (!href) {
//                         return;
//                     }

//                     const url = new URL(href, homepageUrl);

//                     // Skip the links with other hostname like www.facebook.com etc.
//                     if (
//                         url.hostname === baseUrl.hostname &&
//                         !visited.has(url.href)
//                     ) {
//                         console.log('Discovered:', url.href);
//                         visited.add(url.href);
//                         queue.push(url.href);
//                     }
//                 });
//             } catch (err) {
//                 console.log('Error scraping Daily Star:', err.message);
//             }
//         }

//         level += 1;
        
//     }
// }

// //scrapeDailyStar([{keyword: "Bangladesh"}], "https://www.thedailystar.net");

// module.exports = {
//     scrapeDailyStar,
// };

const axios = require("axios");
const cheerio = require("cheerio");
const { formatDate } = require("../../utils/date-formatter.js");


async function scrapeDailyStar(
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

        /*
         * Check whether the crawl has been aborted
         * before processing the next level.
         */
        if (signal?.aborted) {

            throw new Error("AbortError");
        }


        const qLen = queue.length;


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
                 * AbortController signal is passed
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

                $("h1").each(
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
                                $(".block-article-meta-block")
                                    .find("span")
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
                        "Daily Star crawl aborted."
                    );

                    throw err;
                }


                /*
                 * Normal scraping error.
                 */
                console.log(
                    "Error scraping Daily Star:",
                    err.message
                );
            }
        }


        level++;
    }
}


module.exports = {
    scrapeDailyStar,
};