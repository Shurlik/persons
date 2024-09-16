import { api } from './auth';

export async function askGpt(prompt, ids) {
	try {
		const response = await api.post('/chatgpt', { prompt, ids });
		return response.data;
	} catch (error) {
		console.error('Error asking GPT:', error);
		throw error;
	}
}

export async function createDetails(id) {
	try {
		const response = await api.post(`/chatgpt/${id}`, { test: 123 });
		return response.data;
	} catch (error) {
		console.error('Error creating details:', error);
		throw error;
	}
}

export async function generateFullPersonAuto(country, gender) {
	try {
		const response = await api.post('/persons', { country, gender, type: 'auto' });
		return response.data;
	} catch (error) {
		console.error('Error generating full person auto:', error);
		throw error;
	}
}

export async function generatePersonSection(country, section) {
	try {
		const response = await api.post('/persons/section', { country, section });
		return response.data;
	} catch (error) {
		console.error('Error generating person section:', error);
		throw error;
	}
}
