import { useEffect, useState } from 'react';

import { getDashboard } from '../services/dashboard-service';

import type { DashboardData } from '../types/dashboard';

function Dashboard() {
    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();

                setDashboard(data);
            } catch (error) {
                console.error(
                    'Error fetching dashboard:',
                    error,
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl p-8">
                <p className="text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="mx-auto max-w-6xl p-8">
                <p className="text-red-500">
                    Failed to load dashboard.
                </p>
            </div>
        );
    }

    const { stats, recentArticles } = dashboard;

    return (
        <div className="mx-auto max-w-6xl p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Overview of your news monitoring system.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {/* Sources */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Sources
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stats.total_sources}
                    </p>
                </div>

                {/* Keywords */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Keywords
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stats.total_keywords}
                    </p>
                </div>

                {/* Articles */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Articles
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stats.total_articles}
                    </p>
                </div>

                {/* Negative */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Negative News
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {stats.negative_articles}
                    </p>
                </div>

            </div>

            {/* Today's articles */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                    Articles Collected Today
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stats.today_articles}
                </p>
            </div>

            {/* Recent Articles */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Recent News
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        The latest articles collected by the crawler.
                    </p>
                </div>

                {recentArticles.length === 0 ? (
                    <p className="text-gray-500">
                        No articles found.
                    </p>
                ) : (
                    <div className="divide-y divide-gray-100">

                        {recentArticles.map((article) => (
                            <div
                                key={article.article_id}
                                className="py-5"
                            >
                                <div className="flex items-start justify-between gap-6">

                                    <div className="min-w-0">
                                        <a
                                            href={article.news_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-gray-900 hover:text-blue-600"
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

export default Dashboard;