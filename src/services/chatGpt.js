import { api } from './auth';
import authService from './auth';
import {LINK} from './variables';
import {smoothOutput} from "../utils/helpers";



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
		const response = await api.post(`/chatgpt/conclusion/${id}`, { test: 123 });
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


export async function askGptStream(prompt, ids, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/chatgpt/stream`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ prompt, ids }),
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/chatgpt/stream`, {
							method: 'POST',
							headers: headers,
							body: JSON.stringify({ prompt, ids }),
						});
						if (!response.ok) {
							throw new Error('Network response was not ok after token refresh');
						}
					} else {
						await authService.logout();
						throw new Error('Unauthorized');
					}
				} catch (refreshError) {
					console.error('Error refreshing token:', refreshError);
					await authService.logout();
					throw new Error('Unauthorized');
				}
			} else {
				throw new Error('Network response was not ok');
			}
		}

		// Чтение потока
		const reader = response.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let done = false;
		let accumulatedText = '';

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;

			if (value) {
				const chunk = decoder.decode(value, { stream: true });
				accumulatedText += chunk;

				// Плавная задержка перед обновлением UI
				if (onData && typeof onData === 'function') {
					await smoothOutput(chunk, onData);
				}
			}
		}
	} catch (error) {
		console.error('Error in askGptStream:', error);
		throw error;
	}
}
