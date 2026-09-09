import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Keywords from './pages/Keywords';
import Sources from './pages/Sources';
import Crawling from './pages/Crawling';
import Articles from './pages/Articles';

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />

                <main className="flex-1 p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/keywords" element={<Keywords />} />
                        <Route path="/sources" element={<Sources />} />
                        <Route path="/crawling" element={<Crawling />}/>
                        <Route path = "/articles" element={<Articles />}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;