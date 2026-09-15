const dashboardService = require('../services/dashboard-service');

async function getDashboard(req, res, next) {
    try {
        const dashboard =
            await dashboardService.getDashboardData();

        res.status(200).json(dashboard);

    } catch (error) {
        // console.error(
        //     'Error getting dashboard data:',
        //     error
        // );

        // res.status(500).json({
        //     error: 'Failed to get dashboard data.',
        // });
        next(error);
    }
}

module.exports = {
    getDashboard,
};