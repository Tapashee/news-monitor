import type { DashboardData } from '../types/dashboard';

const API_URL = 'http://localhost:3000/api/dashboard';

export async function getDashboard(): Promise<DashboardData> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }

    return response.json();
}