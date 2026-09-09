import { useEffect, useState } from 'react';

import {
    addKeyword,
    deleteKeyword,
    getKeywords,
} from '../services/keyword-service';

import type { Keyword } from '../types/keyword';

function Keywords() {
    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadKeywords() {
            try {
                const data = await getKeywords();

                setKeywords(data);
            } catch (error) {
                console.error('Error fetching keywords:', error);
            } finally {
                setLoading(false);
            }
        }

        loadKeywords();
    }, []);

    async function handleAddKeyword() {
        if (!newKeyword.trim()) {
            return;
        }

        try {
            const data = await addKeyword(newKeyword);

            setKeywords((currentKeywords) => [
                ...currentKeywords,
                data,
            ]);

            setNewKeyword('');
        } catch (error) {
            console.error('Error adding keyword:', error);
        }
    }

    async function handleDeleteKeyword(keywordId: number) {
        try {
            await deleteKeyword(keywordId);

            setKeywords((currentKeywords) =>
                currentKeywords.filter(
                    (keyword) => keyword.keyword_id !== keywordId,
                ),
            );
        } catch (error) {
            console.error('Error deleting keyword:', error);
        }
    }

    return (
        <div className="mx-auto max-w-5xl p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Keywords
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage the keywords used to monitor news.
                </p>
            </div>

            {/* Add keyword */}
            <div className="mb-8 flex gap-3">
                <input
                    type="text"
                    placeholder="Enter a new keyword"
                    value={newKeyword}
                    onChange={(event) =>
                        setNewKeyword(event.target.value)
                    }
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    onClick={handleAddKeyword}
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                    + Add Keyword
                </button>
            </div>

            {/* Keyword list */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Keywords
                    </h2>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                        {keywords.length}
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-500">
                        Loading keywords...
                    </p>
                ) : keywords.length === 0 ? (
                    <p className="text-gray-500">
                        No keywords found.
                    </p>
                ) : (
                    <div>
                        {keywords.map((keyword) => (
                            <div
                                key={keyword.keyword_id}
                                className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0"
                            >
                                <span className="text-gray-700">
                                    {keyword.keyword}
                                </span>

                                <button
                                    onClick={() =>
                                        handleDeleteKeyword(
                                            keyword.keyword_id,
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

export default Keywords;