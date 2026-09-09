export interface DashboardStats {
    total_sources: string;
    total_keywords: string;
    total_articles: string;
    negative_articles: string;
    today_articles: string;
}

export interface RecentArticle {
    article_id: number;
    title: string;
    news_link: string;
    published_at: string;
    sentiment: string;
    source_name: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentArticles: RecentArticle[];
}