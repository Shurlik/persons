import {api} from './auth';

export async function startResearch(data) {
	try {
		const response = await api.post('/cos/research', data);
		console.log({response});
		return response.data;
	} catch (error) {
		console.error('Error asking Research:', error);
		throw error;
	}
}
