//const  pool = require("../db");
//const pool = require("../config/database-config");

const { db : pool } = require("../config/config.js");

async function getSourceById(sourceId) {
    const result = await pool.query(
        `
            SELECT *
            FROM news_source
            WHERE source_id = $1
        `,
        [sourceId]
    );

    return result.rows[0];
    
}

async function getSources(){

    const result = await pool.query(
        `
            SELECT *
            FROM news_source
        `
    );

    return result.rows;
}

async function addSource(source) {
    const result = await pool.query(
        `
            INSERT INTO news_source
                (source_name, website_url, scraper_name)
            VALUES
                ($1, $2, $3)
            RETURNING *
        `,
        [
            source.source_name,
            source.website_url,
            source.scraper_name,
        ]
    );

    return result.rows[0]; 
}

async function deleteSource(sourceId) {
    const result = await pool.query(
        `
            DELETE FROM news_source
            WHERE source_id = $1
            RETURNING *
        `,
        [sourceId]
    );

    return result.rows[0];
}

module.exports = {
    getSourceById,
    getSources,
    addSource,
    deleteSource
}