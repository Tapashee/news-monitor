const { Pool } = require("pg");

const pool = new Pool({

    user: "postgres",
    host: "localhost",
    database: "walton_news_monitor",
    password: "postgres",
    port: 5432
});

module.exports = pool;