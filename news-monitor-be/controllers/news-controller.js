const newsService = require('../services/news-service');

async function getNewsArticles(req, res, next) {
    try {

        const articles = await newsService.getNewsArticles();

        res.status(200).json(articles);

    } catch (error) {

        // console.error(
        //     'Error fetching news articles:',
        //     error
        // );

        // res.status(500).json({
        //     error: 'Failed to fetch news articles'
        // });

        next(error);

    }
}


module.exports = {
    getNewsArticles
};