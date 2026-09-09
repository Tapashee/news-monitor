import type { Source } from '../types/source';

const API_URL = 'http://localhost:3000/api/sources';

export async function getSources(): Promise<Source[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch sources');
    }

    return response.json();
}

export async function addSource(
    sourceName: string,
    websiteUrl: string,
    scraperName: string,
): Promise<Source> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source_name: sourceName,
            website_url: websiteUrl,
            scraper_name: scraperName,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add source');
    }

    return response.json();
}

export async function deleteSource(
    sourceId: number,
): Promise<Source> {
    const response = await fetch(
        `${API_URL}/${sourceId}`,
        {
            method: 'DELETE',
        },
    );

    if (!response.ok) {
        throw new Error('Failed to delete source');
    }

    return response.json();
}