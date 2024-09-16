// src/services/authService.js
import axios from 'axios';

import {LINK} from './variables';

const api = axios.create({
	baseURL: LINK,
	withCredentials: true // Важно для работы с httpOnly cookies
});

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const authService = {
	async register(username, password) {
		const response = await axios.post(`${LINK}/auth/register`, { username, password });
		return response.data;
	},

	async login(username, password) {
		const response = await axios.post(`${LINK}/auth/login`, { username, password });
		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data.user));
			localStorage.setItem('accessToken', response.data.accessToken);
		}
		return response.data;
	},

	async logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');
		return await api.post(`/auth/logout`);
	},

	async refreshToken() {
		const response = await api.post('/auth/token');
		const { accessToken } = response.data;
		localStorage.setItem('accessToken', accessToken);
		return accessToken;
	},

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	},

	getAccessToken() {
		return localStorage.getItem('accessToken');
	},
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then(token => {
					originalRequest.headers['Authorization'] = 'Bearer ' + token;
					return api(originalRequest);
				}).catch(err => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;
			try {
				const accessToken = await authService.refreshToken();
				api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
				processQueue(null, accessToken);
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				await authService.logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

api.interceptors.request.use(
	(config) => {
		const token = authService.getAccessToken();
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default authService;
export { api };
