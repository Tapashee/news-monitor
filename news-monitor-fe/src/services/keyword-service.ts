import type { Keyword } from '../types/keyword';

const API_URL = 'http://localhost:3000/api/keywords';

export async function getKeywords(): Promise<Keyword[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch keywords');
    }

    return response.json();
}

export async function addKeyword(keyword: string): Promise<Keyword> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            keyword,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add keyword');
    }

    return response.json();
}

export async function deleteKeyword(keywordId: number): Promise<void> {
    const response = await fetch(`${API_URL}/${keywordId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete keyword');
    }
}