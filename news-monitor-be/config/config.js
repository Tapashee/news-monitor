require("dotenv").config();

const { Pool } = require("pg");

// Validate required variables
const requiredEnvVariables = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

const config = {
    app: {
        port: Number(process.env.PORT) || 3000,
        environment: process.env.NODE_ENV || "development",
    },

    db: new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }),
};

module.exports = config;