import {api} from './auth';
import axios from "axios";

export async function getAllRecords() {
	try {
		const response = await api.get('/persons');
		return response.data;
	} catch (error) {
		console.error('Error fetching all records:', error);
		throw error;
	}
}

export async function createUser({country, gender, offer}) {
	try {
		const response = await api.post('/persons', {country, gender, offer});
		return response.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
}

export async function getRecordById(id) {
	try {
		const response = await api.get(`/persons/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching record by ID:', error);
		throw error;
	}
}

export async function updateRecord(id, data, prompt) {
	try {
		const response = await api.put(`/persons/${id}`, {data, prompt});
		return response.data;
	} catch (error) {
		console.error('Error updating record:', error);
		throw error;
	}
}

export async function deleteRecord(id) {
	try {
		const response = await api.delete(`/persons/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting record:', error);
		throw error;
	}
}

export async function deleteUser(id) {
	try {
		const response = await api.delete(`/users/profile/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting record:', error);
		throw error;
	}
}

export async function uploadFile(id, data) {
	try {
		const response = await api.post(`/files/profile/${id}`, data);
		// return response.data;
	} catch (error) {
		console.error('Error creating record:', error);
		throw error;
	}
}

export async function uploadProfileFile(data, id) {
	try {
		const response = id
			? await api.post(`/files/user/${id}`, data)
			: await api.post(`/files/user`, data);
		return response.data;
	} catch (error) {
		console.error('Error creating record:', error);
		throw error;
	}
}

export async function downloadFile(id, filename) {
	try {
		const response = await api.get(`/files/download/${id}`, {
			header: {
				responseType: 'blob',
			}
		});
		const blob = new Blob([response.data]);
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = downloadUrl;
		link.target = '_blank';
		link.download = `${filename}.docx`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(downloadUrl);
	} catch (error) {
		console.error('Error creating record:', error);
		throw error;
	}
}

export async function getLists() {
	try {
		const response = await api.get(`/cos/lists`);
		return response.data;
	} catch (error) {
		console.error('Error updating record:', error);
		throw error;
	}
}

export async function uploadBlogPostData(data) {
	try {
		const response = await api.post(`/cos/blogpost`, data);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function updateBlogPostData(id, data) {
	try {
		const response = await api.put(`/cos/blogpost/${id}`, {data});
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getContent(id) {
	try {
		const response = await api.get(`/cos/content/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getResearch(id) {
	const source = axios.CancelToken.source();
	try {
		return await api.post(`/cos/research/${id}`, {}, {cancelToken: source.token});
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getOutline(id) {
	const source = axios.CancelToken.source();
	try {
		return await api.post(`/cos/outline/${id}`, {}, {cancelToken: source.token});
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getArticle(id) {
	const source = axios.CancelToken.source();
	try {
		return await api.post(`/cos/article/${id}`, {}, {cancelToken: source.token});
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getThumbnail(id) {
	const source = axios.CancelToken.source();
	try {
		return await api.post(`/cos/thumbnail/${id}`, {}, {cancelToken: source.token});
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getArticles() {
	try {
		const response = await api.get(`/cos/articles`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function deleteArticle(id) {
	try {
		const response = await api.delete(`/cos/articles/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getPrompts() {
	try {
		const response = await api.get(`/cos/prompts`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function updatePrompt(id, data) {
	try {
		const response = await api.put(`/cos/prompts/${id}`, data);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getImages() {
	try {
		const response = await api.get(`/cos/images`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getUsers() {
	try {
		const response = await api.get(`/users`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}

export async function getUser(id) {
	try {
		const response = await api.get(`/users/profile/${id}`);
		return response.data;
	} catch (e) {
		console.log('error: ', e);
	}
}
