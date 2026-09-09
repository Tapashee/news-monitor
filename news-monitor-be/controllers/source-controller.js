const sourceService = require('../services/source-service');

async function getSources(req, res) {
    try{

        const sources = await sourceService.getSources();
        res.status(200).json(sources);

    } catch (error) {

        console.error('Error getting sources:', error);
        res.status(500).json({
            error: 'Failed to get sources.',
        });
    }
}

async function addSource(req, res) {
    try {
        const source = await sourceService.addSource(req.body);

        res.status(201).json(source);
    } catch (error) {
        console.error('Error adding source:', error);
        res.status(500).json({
            error: 'Failed to add source.',
        });
    }
}


async function deleteSource(req, res) {
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
        console.error('Error deleting source:', error);

        res.status(500).json({
            error: 'Failed to delete source',
        });
    
    }
}

module.exports = {
    getSources,
    addSource,
    deleteSource
}