export interface CrawlStatus {
    crawling: boolean;
    crawlType: 'source' | 'all' | 'scheduled' | null;
    sourceId: number | null;
}