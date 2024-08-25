import {LINK} from './variables';

export async function getAllRecords() {
	const res = await fetch(`${LINK}/persons`, {
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await res.json();
	return data;

}

export async function getRecordById(id) {
	const res = await fetch(`${LINK}/persons/${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await res.json();
	return data;
}

export async function updateRecord(id, data) {
	const res = await fetch(`${LINK}/persons/${id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({data})
	});
	const fData = await res.json();
	return fData;
}

export async function deleteRecord(id) {
	const res = await fetch(`${LINK}/persons/${id}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await res.json();
	return data;
}

export async function createRecord(data) {
}
