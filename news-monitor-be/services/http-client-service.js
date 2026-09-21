const axios = require("axios");

const MAX_RETRIES = 3;
const REQUEST_TIMEOUT = 15000;
const BASE_DELAY = 2000;


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


async function fetchPage(url, signal) {

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        if (signal?.aborted) {
            throw new Error("AbortError");
        }

        try {

            console.log(
                `Requesting: ${url} | Attempt ${attempt}/${MAX_RETRIES}`
            );

            const response = await axios.get(url, {
                timeout: REQUEST_TIMEOUT,
                signal,
                headers: {
                    "User-Agent":
                        "WaltonNewsMonitor/1.0"
                }
            });

            return response.data;

        } catch (error) {

            if (
                signal?.aborted ||
                error.name === "CanceledError" ||
                error.name === "AbortError"
            ) {
                throw new Error("AbortError");
            }

            console.error(
                `Request failed: ${url}`
            );

            console.error(
                error.message
            );

            if (attempt === MAX_RETRIES) {
                throw error;
            }

            const delay =
                BASE_DELAY * Math.pow(2, attempt - 1);

            console.log(
                `Retrying in ${delay / 1000} seconds...`
            );

            await sleep(delay);
        }
    }
}


module.exports = {
    fetchPage,
};