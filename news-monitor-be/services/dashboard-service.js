const pool = require("../config/database-config");

async function getDashboardStats() {
    const result = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM news_source) AS total_sources,

            (SELECT COUNT(*) FROM search_keywords) AS total_keywords,

            (SELECT COUNT(*) FROM news_article) AS total_articles,

            (
                SELECT COUNT(*)
                FROM news_article
                WHERE LOWER(sentiment) = 'negative'
            ) AS negative_articles,

            (
                SELECT COUNT(*)
                FROM news_article
                WHERE created_at::date = CURRENT_DATE
            ) AS today_articles
    `);

    return result.rows[0];
}


async function getRecentArticles() {
    const result = await pool.query(`
        SELECT
            na.article_id,
            na.title,
            na.news_link,
            na.published_at,
            na.sentiment,
            ns.source_name
        FROM news_article na
        JOIN news_source ns
            ON na.source_id = ns.source_id
        ORDER BY na.created_at DESC
        LIMIT 10
    `);

    return result.rows;
}


async function getDashboardData() {
    const stats = await getDashboardStats();
    const recentArticles = await getRecentArticles();

    return {
        stats,
        recentArticles,
    };
}


module.exports = {
    getDashboardData,
};