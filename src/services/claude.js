import { api } from './auth';

export async function askClaude(prompt, ids) {
	try {
		const response = await api.post('/claude', { prompt, ids });
		return response.data;
	} catch (error) {
		console.error('Error asking Claude:', error);
		throw error;
	}
}
