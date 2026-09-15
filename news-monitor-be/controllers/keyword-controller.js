const keywordService = require('../services/keyword-service');

async function getKeywords(req, res,next) {
    try {
        const keywords = await keywordService.getKeywords();

        res.status(200).json(keywords);
    } catch (error) {
        // console.error('Error getting keywords:', error);

        // res.status(500).json({
        //     error: 'Failed to get keywords',
        // });

        next(error);
    }
}

async function addKeyword(req, res, next) {
    try {
        const { keyword } = req.body;

        const newKeyword = await keywordService.addKeyword(keyword);

        res.status(201).json(newKeyword);
    } catch (error) {
        // console.error('Error adding keyword:', error);

        // res.status(500).json({
        //     error: 'Failed to add keyword',
        // });
        next(error);
    }
}

async function deleteKeyword(req, res, next) {
    try {
        const { id } = req.params;

        const deletedKeyword = await keywordService.deleteKeyword(id);

        if (!deletedKeyword) {
            return res.status(404).json({
                error: 'Keyword not found',
            });
        }

        res.status(200).json(deletedKeyword);
    } catch (error) {
        // // console.error('Error deleting keyword:', error);

        // res.status(500).json({
        //     error: 'Failed to delete keyword',
        // });
        next(error);
    }
}

module.exports = {
    getKeywords,
    addKeyword,
    deleteKeyword
};