// import { Link } from 'react-router-dom';

// function Sidebar(){
//     return (
//         <aside>
//             <h2>
//                 News Monitor
//             </h2>
//             <nav>
//                 <Link to="/">Dashboard</Link>
//                 <Link to="/articles">Articles</Link>
//                 <Link to="/sources">Sources</Link>
//                 <Link to="/keywords">Keywords</Link>
//                 <Link to="/crawling">Crawling</Link>
//             </nav>
//         </aside>
//     );
// }

// export default Sidebar;

import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">
                News Monitor
            </h2>

            <nav className="flex flex-col gap-2">
                <Link
                    to="/"
                    className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/articles"
                    className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Articles
                </Link>

                <Link
                    to="/sources"
                    className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Sources
                </Link>

                <Link
                    to="/keywords"
                    className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Keywords
                </Link>

                <Link
                    to="/crawling"
                    className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Crawling
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;