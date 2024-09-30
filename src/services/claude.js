import authService, { api } from './auth';
import {LINK} from "./variables";

export async function askClaude(prompt, ids) {
	try {
		const response = await api.post('/claude', { prompt, ids });
		return response.data;
	} catch (error) {
		console.error('Error asking Claude:', error);
		throw error;
	}
}

export async function askClaudeStream(prompt, ids, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/claude/stream`, {
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
						response = await fetch('/api/claude/stream', {
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

function smoothOutput(text, onData) {
	return new Promise((resolve) => {
		const chunkSize = 3; // Количество символов для вывода за один раз
		let index = 0;

		function outputNextChunk() {
			if (index < text.length) {
				const nextChunk = text.slice(index, index + chunkSize);
				onData(nextChunk);
				index += chunkSize;
				setTimeout(outputNextChunk, 10); // Задержка 50 мс между выводами
			} else {
				resolve();
			}
		}

		outputNextChunk();
	});
}
