import { useEffect, useState } from 'react';

import { getNewsArticles } from '../services/news-service';

import type { NewsArticle } from '../types/newsArticle';

function Articles() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArticles() {
            try {
                const data = await getNewsArticles();

                setArticles(data);
            } catch (error) {
                console.error(
                    'Error fetching news articles:',
                    error,
                );
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, []);

    return (
        <div className="mx-auto max-w-6xl p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    News Articles
                </h1>

                <p className="mt-2 text-gray-500">
                    View news articles collected by the monitoring system.
                </p>
            </div>

            {/* Article list */}
            <div className="rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Articles
                    </h2>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                        {articles.length}
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-500">
                        Loading articles...
                    </p>
                ) : articles.length === 0 ? (
                    <p className="text-gray-500">
                        No articles found.
                    </p>
                ) : (
                    <div className="divide-y divide-gray-100">

                        {articles.map((article) => (
                            <div
                                key={article.article_id}
                                className="py-5"
                            >
                                <div className="flex items-start justify-between gap-6">

                                    {/* Article information */}
                                    <div className="min-w-0">

                                        <a
                                            href={article.news_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-medium text-gray-900 hover:text-blue-600"
                                        >
                                            {article.title}
                                        </a>

                                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">

                                            <span>
                                                {article.source_name}
                                            </span>

                                            <span>
                                                {article.published_at}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Sentiment */}
                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                            article.sentiment?.toLowerCase() ===
                                            'negative'
                                                ? 'bg-red-100 text-red-700'
                                                : article.sentiment?.toLowerCase() ===
                                                    'positive'
                                                  ? 'bg-green-100 text-green-700'
                                                  : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {article.sentiment}
                                    </span>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Articles;