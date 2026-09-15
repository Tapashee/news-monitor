const express = require('express');
const cors = require('cors');
// const { port, environment } = require('./config/config.js');
const { app: { port, environment } } = require('./config/config.js');
const keywordRoutes = require('./routes/keyword-routes');
const sourceRoutes = require('./routes/source-routes');
const crawlRoutes = require('./routes/crawl-routes');
const newsRoutes = require('./routes/news-routes');
const dashboardRoutes = require('./routes/dashboard-routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/keywords', keywordRoutes);
app.use('/api/sources', sourceRoutes);
app.use('/api/crawl', crawlRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("News Monitor API is running...");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Environment: ${environment}`);
});