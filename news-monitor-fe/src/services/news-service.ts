import type { NewsArticle } from '../types/newsArticle';

const API_URL = 'http://localhost:3000/api/news';

export async function getNewsArticles(): Promise<NewsArticle[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch news articles');
    }

    return response.json();
}