import authService, {api} from './auth';
import {LINK} from "./variables";
import {smoothOutput} from "../utils/helpers";

export async function startResearch(data) {
	try {
		const response = await api.post('/cos/research', data);
		return response.data;
	} catch (error) {
		console.error('Error asking Research:', error);
		throw error;
	}
}

export async function getOutlineStream(id, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/claude/outline/stream/${id}`, {
			method: 'GET',
			headers: headers,
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/claude/outline/stream/${id}`, {
							method: 'GET',
							headers: headers,
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

export async function getArticleStream(id, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/claude/article/stream/${id}`, {
			method: 'GET',
			headers: headers,
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/claude/article/stream/${id}`, {
							method: 'GET',
							headers: headers,
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

export async function getThumbnailStream(id, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/claude/thumbnail/stream/${id}`, {
			method: 'GET',
			headers: headers,
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/claude/thumbnail/stream/${id}`, {
							method: 'GET',
							headers: headers,
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

// export async function getResearchStream(id, onData) {
// 	try {
// 		let token = authService.getAccessToken();
// 		let headers = {
// 			'Content-Type': 'application/json',
// 		};
//
// 		if (token) {
// 			headers['Authorization'] = 'Bearer ' + token;
// 		}
//
// 		let response = await fetch(`${LINK}/perp/research/stream/${id}`, {
// 			method: 'GET',
// 			headers: headers,
// 		});
//
// 		if (!response.ok) {
// 			if (response.status === 401) {
// 				try {
// 					token = await authService.refreshToken();
// 					if (token) {
// 						headers['Authorization'] = 'Bearer ' + token;
// 						response = await fetch(`${LINK}/perp/research/stream/${id}`, {
// 							method: 'GET',
// 							headers: headers,
// 						});
// 						if (!response.ok) {
// 							throw new Error('Network response was not ok after token refresh');
// 						}
// 					} else {
// 						await authService.logout();
// 						throw new Error('Unauthorized');
// 					}
// 				} catch (refreshError) {
// 					console.error('Error refreshing token:', refreshError);
// 					await authService.logout();
// 					throw new Error('Unauthorized');
// 				}
// 			} else {
// 				throw new Error('Network response was not ok');
// 			}
// 		}
//
// 		// Чтение потока
// 		const reader = response.body.getReader();
// 		const decoder = new TextDecoder('utf-8');
// 		let done = false;
// 		let accumulatedText = '';
//
// 		while (!done) {
// 			const { value, done: doneReading } = await reader.read();
// 			done = doneReading;
//
// 			if (value) {
// 				const chunk = decoder.decode(value, { stream: true });
// 				accumulatedText += chunk;
//
// 				// Плавная задержка перед обновлением UI
// 				if (onData && typeof onData === 'function') {
// 					await smoothOutput(chunk, onData);
// 				}
// 			}
// 		}
// 	} catch (error) {
// 		console.error('Error in askGptStream:', error);
// 		throw error;
// 	}
// }


export async function getResearchStream(id, onData, signal) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/perp/research/stream/${id}`, {
			method: 'GET',
			headers: headers,
			signal: signal, // Добавляем signal для возможности прерывания
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/perp/research/stream/${id}`, {
							method: 'GET',
							headers: headers,
							signal: signal, // Добавляем signal и для повторного запроса
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

			// Проверяем, не был ли отменен запрос
			if (signal && signal.aborted) {
				reader.cancel();
				throw new DOMException('Aborted', 'AbortError');
			}
		}

		return accumulatedText;
	} catch (error) {
		if (error.name === 'AbortError') {
			console.log('Fetch aborted');
		} else {
			console.error('Error in getResearchStream:', error);
		}
		throw error;
	}
}
