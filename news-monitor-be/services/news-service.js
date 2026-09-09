const pool = require("../config/database-config");

async function getNewsArticles(){
    const result = await pool.query(
        `
            SELECT
                na.article_id,
                na.source_id,
                na.title,
                na.news_link,
                na.published_at,
                na.sentiment,
                na.created_at,
                ns.source_name
            FROM news_article na
            JOIN news_source ns
                ON na.source_id = ns.source_id
            ORDER BY na.published_at DESC
        `
    );

    return result.rows;
}


async function saveNewsArticle(article){
    await pool.query(
        `
        INSERT INTO news_article (source_id, title, news_link, published_at, sentiment)
        values ($1, $2, $3, $4, $5)
        ON CONFLICT (news_link) DO NOTHING
        `,
        [
            article.source_id,
            article.title,
            article.news_link, 
            article.published_at,
            article.sentiment
        ]
    );
}

module.exports = {
    getNewsArticles,
    saveNewsArticle
};