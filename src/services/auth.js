import axios from 'axios';
import {LINK} from './variables';
import {toast} from "react-toastify";

const api = axios.create({
	baseURL: LINK,
	withCredentials: true // Important for sending cookies with cross-origin requests
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
	async register({username, password, email, name}) {
		try {
			const response = await api.post('/auth/register', {username, password, email, name});
			return response.data;
		} catch (error) {
			if (error.response && error.response.data.errorCode === 'USERNAME_EXISTS') {
				throw new Error('User exists');
			}
			throw error;
		}
	},

	async login(username, password) {
		try {
			const response = await api.post('/auth/login', {username, password});
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data.user));
				localStorage.setItem('accessToken', response.data.accessToken);
			}
			return response.data;
		} catch (error) {
			if (error === 'Wrong Login/Password') {
				toast.error('Wrong username or password');
			} else {
				toast.error('Something goes wrong!');
			}
		}
	},

	async logout() {
		try {
			await api.post('/auth/logout');
		} catch {
			toast.error('Something goes wrong!');
		} finally {
			localStorage.removeItem('user');
			localStorage.removeItem('accessToken');
		}
	},

	async refreshToken() {
		try {
			const response = await api.post('/auth/token');
			const {accessToken} = response.data;
			localStorage.setItem('accessToken', accessToken);
			return accessToken;
		} catch (error) {
			if (error.response) {
				switch (error.response.data.errorCode) {
					case 'NO_REFRESH_TOKEN':
					case 'INVALID_REFRESH_TOKEN':
						// Perform logout if refresh token is invalid or missing
						await this.logout();
						throw new Error('Please login');
					default:
						throw new Error('Session restore error');
				}
			}
			throw error;
		}
	},

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	},

	getAccessToken() {
		return localStorage.getItem('accessToken');
	},

	async getProfile() {
		try {
			const response = await api.get('/users/profile');
			return response.data;
		} catch (error) {
			console.error('Error fetching all records:', error);
			throw error;
		}
	},

	async updateProfile(data, id) {
		try {
			const response = id
				? await api.put(`/users/profile/${id}`, {data})
				: await api.put('/users/profile', {data});
			return response.data;
		} catch (e) {
			console.log('error: ', e);
		}
	}
};


// Interceptor for handling authentication errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (error.response?.data?.errorCode === "INVALID_CREDENTIALS") {
				return Promise.reject("Wrong Login/Password");
			}

			if (originalRequest._retry === undefined) {
				return Promise.reject('No refresh token');
			}
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				}).then(token => {
					originalRequest.headers['Authorization'] = 'Bearer ' + token;
					return api(originalRequest);
				}).catch(err => {
					return Promise.reject(err);
				});
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
				// Logout user if token refresh fails
				await authService.logout();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	}
);

// Interceptor for adding Authorization header to requests
api.interceptors.request.use(
	async (config) => {
		const token = await authService.getAccessToken();
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default authService;
export {api};
