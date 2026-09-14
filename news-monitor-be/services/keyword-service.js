//const pool = require("../db");
// const pool = require("../config/database-config");
const { db: pool } = require("../config/config.js");
async function getKeywords(){
    const result = await pool.query(`
        SELECT keyword_id, keyword 
        FROM search_keywords
        ORDER BY keyword_id
    `);
    
    return result.rows;
}

async function addKeyword(keyword) {
    const result = await pool.query(
        `
        INSERT INTO search_keywords (keyword)
        VALUES ($1)
        RETURNING *
        `,
        [keyword]
    );

    return result.rows[0];
}

async function deleteKeyword(keywordId) {
    const result = await pool.query(
        `
        DELETE FROM search_keywords
        WHERE keyword_id = $1
        RETURNING *
        `,
        [keywordId]
    );

    return result.rows[0];
}

module.exports = {
    getKeywords,
    addKeyword,
    deleteKeyword
}