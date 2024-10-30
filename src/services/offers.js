import authService, {api} from "./auth";
import {LINK} from "./variables";
import {smoothOutput} from "../utils/helpers";


export async function getShortsStream(data, onData) {
	try {
		let token = authService.getAccessToken();
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		let response = await fetch(`${LINK}/shorts/result/stream`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({...data})
		});

		if (!response.ok) {
			if (response.status === 401) {
				try {
					token = await authService.refreshToken();
					if (token) {
						headers['Authorization'] = 'Bearer ' + token;
						response = await fetch(`${LINK}/shorts/result/stream`, {
							method: 'POST',
							headers: headers,
							body: JSON.stringify({...data})
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
			const {value, done: doneReading} = await reader.read();
			done = doneReading;

			if (value) {
				const chunk = decoder.decode(value, {stream: true});
				accumulatedText += chunk;

				// Плавная задержка перед обновлением UI
				if (onData && typeof onData === 'function') {
					await smoothOutput(chunk, onData);
				}
			}
		}
	} catch (error) {
		console.error('Error in Stream:', error);
		throw error;
	}
}

export async function getOffers() {
	try {
		const response = await api.get(`/offers/items`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getSingleOffer(id) {
	try {
		const response = await api.get(`/offers/items/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getOffersSteps(id) {
	try {
		const response = await api.get(`/offers/steps/offer/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getShortsTemplates() {
	try {
		const response = await api.get(`/cos/shorts-templates`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function addShorts(data) {
	try {
		const response = await api.post(`/shorts`, {...data});
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function deleteShorts(id) {
	try {
		const response = await api.delete(`/shorts/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}
