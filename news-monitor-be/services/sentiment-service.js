const axios = require("axios");

async function analyzeSentiments(articles){
    if (articles.length === 0) {
        console.log("No articles found. Skipping sentiment analysis.");
        return [];
    }
    
    const response = await axios.post(
        "http://127.0.0.1:8000/sentiment",
        articles
    );

    return response.data;
}

module.exports = {
    analyzeSentiments
};