import { api } from './auth';

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
		console.log({response})
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

export async function createRecord(data) {
	try {
		const response = await api.post('/persons', data);
		return response.data;
	} catch (error) {
		console.error('Error creating record:', error);
		throw error;
	}
}
