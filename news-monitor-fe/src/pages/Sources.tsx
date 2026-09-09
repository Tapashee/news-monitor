import { useEffect, useState } from 'react';

import {
    addSource,
    deleteSource,
    getSources,
} from '../services/source-service';

import type { Source } from '../types/source';

function Sources() {
    const [sources, setSources] = useState<Source[]>([]);

    const [sourceName, setSourceName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [scraperName, setScraperName] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSources() {
            try {
                const data = await getSources();

                setSources(data);
            } catch (error) {
                console.error('Error fetching sources:', error);
            } finally {
                setLoading(false);
            }
        }

        loadSources();
    }, []);

    async function handleAddSource() {
        if (
            !sourceName.trim() ||
            !websiteUrl.trim() ||
            !scraperName.trim()
        ) {
            return;
        }

        try {
            const data = await addSource(
                sourceName,
                websiteUrl,
                scraperName,
            );

            setSources((currentSources) => [
                ...currentSources,
                data,
            ]);

            setSourceName('');
            setWebsiteUrl('');
            setScraperName('');
        } catch (error) {
            console.error('Error adding source:', error);
        }
    }

    async function handleDeleteSource(sourceId: number) {
        try {
            await deleteSource(sourceId);

            setSources((currentSources) =>
                currentSources.filter(
                    (source) => source.source_id !== sourceId,
                ),
            );
        } catch (error) {
            console.error('Error deleting source:', error);
        }
    }

    return (
        <div className="mx-auto max-w-5xl p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Sources
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage the news websites monitored by the system.
                </p>
            </div>

            {/* Add Source */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold text-gray-900">
                    Add Source
                </h2>

                <div className="grid gap-4">

                    <input
                        type="text"
                        placeholder="Source name"
                        value={sourceName}
                        onChange={(event) =>
                            setSourceName(event.target.value)
                        }
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <input
                        type="url"
                        placeholder="Website URL"
                        value={websiteUrl}
                        onChange={(event) =>
                            setWebsiteUrl(event.target.value)
                        }
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <input
                        type="text"
                        placeholder="Scraper name"
                        value={scraperName}
                        onChange={(event) =>
                            setScraperName(event.target.value)
                        }
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                        onClick={handleAddSource}
                        className="w-fit rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        + Add Source
                    </button>

                </div>
            </div>

            {/* Source List */}
            <div className="rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        News Sources
                    </h2>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                        {sources.length}
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-500">
                        Loading sources...
                    </p>
                ) : sources.length === 0 ? (
                    <p className="text-gray-500">
                        No sources found.
                    </p>
                ) : (
                    <div>
                        {sources.map((source) => (
                            <div
                                key={source.source_id}
                                className="flex items-center justify-between border-b border-gray-100 py-5 last:border-b-0"
                            >
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {source.source_name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {source.website_url}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Scraper: {source.scraper_name}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        handleDeleteSource(
                                            source.source_id,
                                        )
                                    }
                                    className="rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sources;