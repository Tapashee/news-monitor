// const API_URL = 'http://localhost:3000/api/crawl';

// export async function crawlSource(
//     sourceId: number,
// ): Promise<unknown> {
//     const response = await fetch(
//         `${API_URL}/source/${sourceId}`,
//         {
//             method: 'POST',
//         },
//     );

//     if (!response.ok) {
//         throw new Error('Failed to crawl source');
//     }

//     return response.json();
// }

// export async function crawlAllSources(): Promise<unknown> {
//     const response = await fetch(`${API_URL}/all`, {
//         method: 'POST',
//     });

//     if (!response.ok) {
//         throw new Error('Failed to crawl sources');
//     }

//     return response.json();
// }

// export async function getCrawlStatus() {
//     const response = await fetch(
//         'http://localhost:3000/api/crawl/status'
//     );

//     if (!response.ok) {
//         throw new Error('Failed to get crawl status');
//     }

//     return response.json();
// }

const API_URL = 'http://localhost:3000/api/crawl';


// Crawl all sources
export async function crawlAllSources() {
    const response = await fetch(`${API_URL}/all`, {
        method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to crawl all sources.'
        );
    }

    return data;
}


// Crawl one source
export async function crawlSource(sourceId: number) {
    const response = await fetch(
        `${API_URL}/source/${sourceId}`,
        {
            method: 'POST',
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to crawl source.'
        );
    }

    return data;
}


// Get current crawl status
export async function getCrawlStatus() {
    const response = await fetch(
        `${API_URL}/status`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to get crawl status.'
        );
    }

    return data;
}


// Stop current crawl
export async function stopCurrentCrawl() {
    const response = await fetch(
        `${API_URL}/stop`,
        {
            method: 'POST',
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to stop crawl.'
        );
    }

    return data;
}


// Start scheduler
export async function startScheduler() {
    const response = await fetch(
        `${API_URL}/schedule/start`,
        {
            method: 'POST',
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to start scheduler.'
        );
    }

    return data;
}


// Stop scheduler
export async function stopScheduler() {
    const response = await fetch(
        `${API_URL}/schedule/stop`,
        {
            method: 'POST',
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to stop scheduler.'
        );
    }

    return data;
}


// Get scheduler status
export async function getSchedulerStatus() {
    const response = await fetch(
        `${API_URL}/schedule/status`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || 'Failed to get scheduler status.'
        );
    }

    return data;
}