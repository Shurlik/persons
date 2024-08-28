// src/contexts/AuthContext.js
import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import authService, { api } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			const currentUser = authService.getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
				try {
					// Попытка обновить токен при инициализации
					const res = await authService.refreshToken();
				} catch (error) {
					console.log(error);
					// Если не удалось обновить токен, выполняем выход
					await logout();
				}
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	const login = async (username, password) => {
		const data = await authService.login(username, password);
		setUser(data.user);
		return data;
	};
	const logout = useCallback(async () => {
		await authService.logout();
		setUser(null);
		// Вместо прямой навигации, мы будем использовать событие
		window.dispatchEvent(new Event('logout'));
	}, []);

	useEffect(() => {
		const initAuth = async () => {
			const currentUser = authService.getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
				try {
					await authService.refreshToken();
				} catch (error) {
					await logout();
				}
			}
			setLoading(false);
		};

		initAuth();
	}, [logout]);

	// Добавляем обработчик ошибок для автоматического выхода при ошибке аутентификации
	useEffect(() => {
		const interceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				console.log({error}, 1);
				if (error.response && error.response.status === 401 && user) {
					await logout();
				}
				return Promise.reject(error);
			}
		);

		return () => api.interceptors.response.eject(interceptor);
	}, [user]);

	const value = {
		user,
		login,
		logout,
		loading
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
