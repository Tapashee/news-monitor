CREATE TABLE news_source (
    source_id SERIAL PRIMARY KEY,
    source_name VARCHAR(50) NOT NULL,
    website_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scraper_name TEXT
);