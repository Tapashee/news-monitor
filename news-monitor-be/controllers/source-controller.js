const sourceService = require('../services/source-service');

async function getSources(req, res, next) {
    try{

        const sources = await sourceService.getSources();
        res.status(200).json(sources);

    } catch (error) {

        // console.error('Error getting sources:', error);
        // res.status(500).json({
        //     error: 'Failed to get sources.',
        // });
        next(error);
    }
}

async function addSource(req, res, next) {
    try {
        const source = await sourceService.addSource(req.body);

        res.status(201).json(source);
    } catch (error) {
        // console.error('Error adding source:', error);
        // res.status(500).json({
        //     error: 'Failed to add source.',
        // });
        next(error);
    }
}


async function deleteSource(req, res, next) {
    try {
        const { id } = req.params;
        const deletedSource = await sourceService.deleteSource(id);

        if (!deletedSource) {
            return res.status(404).json({
                error: 'Source not found',
            });
        }

        res.status(200).json(deletedSource);

    } catch (error) {
        // console.error('Error deleting source:', error);

        // res.status(500).json({
        //     error: 'Failed to delete source',
        // });

        next(error);
    
    }
}

module.exports = {
    getSources,
    addSource,
    deleteSource
}