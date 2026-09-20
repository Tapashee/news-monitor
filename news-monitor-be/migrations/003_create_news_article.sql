CREATE TABLE news_article (
    article_id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES news_source(source_id),
    title TEXT,
    news_link TEXT NOT NULL UNIQUE,
    published_at DATE,
    sentiment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);