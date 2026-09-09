// import { useEffect, useState } from 'react';

// import {
//     crawlAllSources,
//     crawlSource,
//     getCrawlStatus
// } from '../services/crawl-service';

// import type { CrawlStatus } from '../types/crawl';

// import { getSources } from '../services/source-service';

// import type { Source } from '../types/source';

// function Crawling() {
//     const [sources, setSources] = useState<Source[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [crawlStatus, setCrawlStatus] =
//     useState<CrawlStatus>({
//         crawling: false,
//         crawlType: null,
//         sourceId: null,
//     });

//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         async function loadCrawlStatus() {
//             try {
//                 const status = await getCrawlStatus();

//                 setCrawlStatus(status);

//             } catch (error) {
//                 console.error(
//                     'Error fetching crawl status:',
//                     error
//                 );
//             }
//         }

//         loadCrawlStatus();
//     }, []);

//     useEffect(() => {
//         async function loadSources() {
//             try {
//                 const data = await getSources();

//                 setSources(data);
//             } catch (error) {
//                 console.error(
//                     'Error fetching sources:',
//                     error,
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadSources();
//     }, []);

//     async function handleCrawlSource(sourceId: number) {
//     try {
//         setMessage('');
//         setCrawlStatus({
//             crawling: true,
//             crawlType: 'source',
//             sourceId,
//         });

//         const result = await crawlSource(sourceId);

//         console.log('Crawl result:', result);

//         setMessage(
//             'Source crawling completed successfully.'
//         );

//     } catch (error) {
//         console.error(
//             'Error crawling source:',
//             error
//         );

//         setMessage('Failed to crawl source.');

//     } finally {
//         const status = await getCrawlStatus();

//         setCrawlStatus(status);
//     }
// }

//     async function handleCrawlAll() {
//     try {
//         setMessage('');

//         setCrawlStatus({
//             crawling: true,
//             crawlType: 'all',
//             sourceId: null,
//         });

//         const result = await crawlAllSources();

//         console.log('Crawl result:', result);

//         setMessage(
//             'All sources crawling completed successfully.'
//         );

//     } catch (error) {
//         console.error(
//             'Error crawling sources:',
//             error
//         );

//         setMessage('Failed to crawl sources.');

//     } finally {
//         const status = await getCrawlStatus();

//         setCrawlStatus(status);
//     }
// }

//     return (
//         <div className="mx-auto max-w-5xl p-8">

//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                     Crawling
//                 </h1>

//                 <p className="mt-2 text-gray-500">
//                     Start crawling news sources and monitor the
//                     crawling process.
//                 </p>
//             </div>

//             {/* Crawl all */}
//             <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
//                 <div className="flex items-center justify-between">

//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-900">
//                             Crawl All Sources
//                         </h2>

//                         <p className="mt-1 text-sm text-gray-500">
//                             Crawl all configured news sources.
//                         </p>
//                     </div>

//                     <button onClick={handleCrawlAll}
//                         disabled={crawlStatus.crawling}
//                         className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//                     >
//                         {crawlStatus.crawling &&
//                         crawlStatus.crawlType === 'all'
//                             ? 'Crawling...'
//                             : 'Crawl All'}
//                     </button>

//                 </div>
//             </div>

//             {/* Message */}
//             {message && (
//                 <div className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
//                     {message}
//                 </div>
//             )}

//             {/* Sources */}
//             <div className="rounded-xl bg-white p-6 shadow-sm">

//                 <div className="mb-5 flex items-center justify-between">

//                     <h2 className="text-xl font-semibold text-gray-900">
//                         Sources
//                     </h2>

//                     <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
//                         {sources.length}
//                     </span>

//                 </div>

//                 {loading ? (
//                     <p className="text-gray-500">
//                         Loading sources...
//                     </p>
//                 ) : sources.length === 0 ? (
//                     <p className="text-gray-500">
//                         No sources found.
//                     </p>
//                 ) : (
//                     <div>
//                         {sources.map((source) => (
//                             <div
//                                 key={source.source_id}
//                                 className="flex items-center justify-between border-b border-gray-100 py-5 last:border-b-0"
//                             >

//                                 <div>
//                                     <h3 className="font-medium text-gray-900">
//                                         {source.source_name}
//                                     </h3>

//                                     <p className="mt-1 text-sm text-gray-500">
//                                         {source.website_url}
//                                     </p>

//                                     <p className="mt-1 text-sm text-gray-400">
//                                         Scraper: {source.scraper_name}
//                                     </p>
//                                 </div>

//                                 <button
//                                     onClick={() =>
//                                         handleCrawlSource(source.source_id)
//                                     }
//                                     disabled={crawlStatus.crawling}
//                                     className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
//                                 >
//                                     {crawlStatus.crawling &&
//                                     crawlStatus.crawlType === 'source' &&
//                                     crawlStatus.sourceId === source.source_id
//                                         ? 'Crawling...'
//                                         : 'Crawl'}
//                                 </button>

//                             </div>
//                         ))}
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }

// export default Crawling;

import { useEffect, useState } from 'react';

import {
    crawlAllSources,
    crawlSource,
    getCrawlStatus,
    stopCurrentCrawl,
    startScheduler,
    stopScheduler,
    getSchedulerStatus,
} from '../services/crawl-service';

import type { CrawlStatus } from '../types/crawl';

import { getSources } from '../services/source-service';

import type { Source } from '../types/source';


interface SchedulerStatus {
    scheduled: boolean;
    crawling: boolean;
    crawlType: string | null;
    sourceId: number | null;
}


function Crawling() {

    const [sources, setSources] =
        useState<Source[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [crawlStatus, setCrawlStatus] =
        useState<CrawlStatus>({
            crawling: false,
            crawlType: null,
            sourceId: null,
        });

    const [schedulerStatus, setSchedulerStatus] =
        useState<SchedulerStatus>({
            scheduled: false,
            crawling: false,
            crawlType: null,
            sourceId: null,
        });

    const [message, setMessage] =
        useState('');

    const [stopping, setStopping] =
        useState(false);


    // -----------------------------------
    // Load crawl status
    // -----------------------------------

    async function loadCrawlStatus() {

        try {

            const status =
                await getCrawlStatus();

            setCrawlStatus(status);

        } catch (error) {

            console.error(
                'Error fetching crawl status:',
                error
            );
        }
    }


    // -----------------------------------
    // Load scheduler status
    // -----------------------------------

    async function loadSchedulerStatus() {

        try {

            const status =
                await getSchedulerStatus();

            setSchedulerStatus(status);

        } catch (error) {

            console.error(
                'Error fetching scheduler status:',
                error
            );
        }
    }


    // -----------------------------------
    // Load sources
    // -----------------------------------

    async function loadSources() {

        try {

            const data =
                await getSources();

            setSources(data);

        } catch (error) {

            console.error(
                'Error fetching sources:',
                error
            );

        } finally {

            setLoading(false);
        }
    }


    // -----------------------------------
    // Initial loading
    // -----------------------------------

    useEffect(() => {
    async function loadInitialData() {
        try {
            const [sourcesData, crawlStatusData, schedulerStatusData] =
                await Promise.all([
                    getSources(),
                    getCrawlStatus(),
                    getSchedulerStatus(),
                ]);

            setSources(sourcesData);
            setCrawlStatus(crawlStatusData);
            setSchedulerStatus(schedulerStatusData);

            } catch (error) {
                console.error(
                    'Error loading crawling data:',
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadInitialData();
    }, []);


    // -----------------------------------
    // Poll crawl status
    // -----------------------------------

    useEffect(() => {

        const interval =
            setInterval(() => {

                loadCrawlStatus();
                loadSchedulerStatus();

            }, 2000);


        return () => {

            clearInterval(interval);

        };

    }, []);


    // -----------------------------------
    // Crawl one source
    // -----------------------------------

    async function handleCrawlSource(
        sourceId: number
    ) {

        try {

            setMessage('');

            setCrawlStatus({

                crawling: true,

                crawlType: 'source',

                sourceId,
            });


            const result =
                await crawlSource(sourceId);


            console.log(
                'Crawl result:',
                result
            );


            setMessage(
                'Source crawling completed successfully.'
            );


        } catch (error) {

            console.error(
                'Error crawling source:',
                error
            );


            if (
                error instanceof Error
            ) {

                setMessage(
                    error.message
                );

            } else {

                setMessage(
                    'Failed to crawl source.'
                );
            }


        } finally {

            await loadCrawlStatus();

        }
    }


    // -----------------------------------
    // Crawl all sources
    // -----------------------------------

    async function handleCrawlAll() {

        try {

            setMessage('');


            setCrawlStatus({

                crawling: true,

                crawlType: 'all',

                sourceId: null,
            });


            const result =
                await crawlAllSources();


            console.log(
                'Crawl result:',
                result
            );


            setMessage(
                'All sources crawling completed successfully.'
            );


        } catch (error) {

            console.error(
                'Error crawling sources:',
                error
            );


            if (
                error instanceof Error
            ) {

                setMessage(
                    error.message
                );

            } else {

                setMessage(
                    'Failed to crawl sources.'
                );
            }


        } finally {

            await loadCrawlStatus();

        }
    }


    // -----------------------------------
    // Stop current crawl
    // -----------------------------------

    async function handleStopCrawl() {

        try {

            setStopping(true);

            setMessage('');


            const result =
                await stopCurrentCrawl();


            console.log(
                'Stop result:',
                result
            );


            setMessage(
                result.message ||
                'Current crawl stopped.'
            );


            await loadCrawlStatus();


        } catch (error) {

            console.error(
                'Error stopping crawl:',
                error
            );


            if (
                error instanceof Error
            ) {

                setMessage(
                    error.message
                );

            } else {

                setMessage(
                    'Failed to stop crawl.'
                );
            }


        } finally {

            setStopping(false);
        }
    }


    // -----------------------------------
    // Start scheduler
    // -----------------------------------

    async function handleStartScheduler() {

        try {

            setMessage('');


            const result =
                await startScheduler();


            setMessage(
                result.message ||
                'Scheduled crawling started.'
            );


            await loadSchedulerStatus();


        } catch (error) {

            console.error(
                'Error starting scheduler:',
                error
            );


            if (
                error instanceof Error
            ) {

                setMessage(
                    error.message
                );

            } else {

                setMessage(
                    'Failed to start scheduler.'
                );
            }
        }
    }


    // -----------------------------------
    // Stop scheduler
    // -----------------------------------

    async function handleStopScheduler() {

        try {

            setMessage('');


            const result =
                await stopScheduler();


            setMessage(
                result.message ||
                'Scheduled crawling stopped.'
            );


            await loadSchedulerStatus();
            await loadCrawlStatus();


        } catch (error) {

            console.error(
                'Error stopping scheduler:',
                error
            );


            if (
                error instanceof Error
            ) {

                setMessage(
                    error.message
                );

            } else {

                setMessage(
                    'Failed to stop scheduler.'
                );
            }
        }
    }


    return (

        <div className="mx-auto max-w-5xl p-8">


            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-900">
                    Crawling
                </h1>


                <p className="mt-2 text-gray-500">
                    Start crawling news sources and monitor the
                    crawling process.
                </p>

            </div>



            {/* Current crawl status */}

            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Current Crawl
                        </h2>


                        <p className="mt-1 text-sm text-gray-500">

                            {crawlStatus.crawling
                                ? 'A crawl is currently running.'
                                : 'No crawl is currently running.'
                            }

                        </p>

                    </div>


                    <div className="flex items-center gap-2">

                        <span
                            className={`h-3 w-3 rounded-full ${
                                crawlStatus.crawling
                                    ? 'bg-green-500'
                                    : 'bg-gray-400'
                            }`}
                        />


                        <span className="text-sm font-medium text-gray-700">

                            {crawlStatus.crawling
                                ? 'Running'
                                : 'Idle'
                            }

                        </span>

                    </div>

                </div>


                {/* Crawl details */}

                {crawlStatus.crawling && (

                    <div className="mt-4 rounded-lg bg-gray-50 p-4">

                        <p className="text-sm text-gray-600">

                            <span className="font-medium">
                                Type:
                            </span>{' '}

                            {crawlStatus.crawlType}

                        </p>


                        {crawlStatus.sourceId !== null && (

                            <p className="mt-1 text-sm text-gray-600">

                                <span className="font-medium">
                                    Source ID:
                                </span>{' '}

                                {crawlStatus.sourceId}

                            </p>

                        )}

                    </div>

                )}


                {/* Stop button */}

                <div className="mt-5">

                    <button
                        onClick={handleStopCrawl}
                        disabled={
                            !crawlStatus.crawling ||
                            stopping
                        }
                        className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >

                        {stopping
                            ? 'Stopping...'
                            : 'Stop Current Crawl'
                        }

                    </button>

                </div>

            </div>



            {/* Crawl all */}

            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Crawl All Sources
                        </h2>


                        <p className="mt-1 text-sm text-gray-500">
                            Crawl all configured news sources.
                        </p>

                    </div>


                    <button
                        onClick={handleCrawlAll}
                        disabled={crawlStatus.crawling}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >

                        {crawlStatus.crawling &&
                        crawlStatus.crawlType === 'all'

                            ? 'Crawling...'

                            : 'Crawl All'

                        }

                    </button>

                </div>

            </div>



            {/* Message */}

            {message && (

                <div className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">

                    {message}

                </div>

            )}



            {/* Scheduler */}

            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Scheduled Crawling
                        </h2>


                        <p className="mt-1 text-sm text-gray-500">
                            Automatically crawl all configured sources.
                        </p>

                    </div>


                    <div className="flex items-center gap-2">

                        <span
                            className={`h-3 w-3 rounded-full ${
                                schedulerStatus.scheduled
                                    ? 'bg-green-500'
                                    : 'bg-gray-400'
                            }`}
                        />


                        <span className="text-sm font-medium text-gray-700">

                            {schedulerStatus.scheduled
                                ? 'Active'
                                : 'Inactive'
                            }

                        </span>

                    </div>

                </div>


                <div className="mt-5 flex gap-3">

                    <button
                        onClick={handleStartScheduler}
                        disabled={
                            schedulerStatus.scheduled
                        }
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        Start Scheduler
                    </button>


                    <button
                        onClick={handleStopScheduler}
                        disabled={
                            !schedulerStatus.scheduled
                        }
                        className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        Stop Scheduler
                    </button>

                </div>

            </div>



            {/* Sources */}

            <div className="rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Sources
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
                                        handleCrawlSource(
                                            source.source_id
                                        )
                                    }
                                    disabled={
                                        crawlStatus.crawling
                                    }
                                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >

                                    {crawlStatus.crawling &&
                                    crawlStatus.crawlType === 'source' &&
                                    crawlStatus.sourceId === source.source_id

                                        ? 'Crawling...'

                                        : 'Crawl'

                                    }

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}


export default Crawling;