CREATE TABLE search_keywords (
    keyword_id SERIAL PRIMARY KEY,
    keyword TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);