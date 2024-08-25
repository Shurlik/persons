import OpenAI from 'openai';
import {LINK} from './variables';

export async function askGpt(prompt, ids) {
	const res = await fetch(`${LINK}/chatgpt`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({prompt, ids})
	});
	return await res.json();
}

export async function createDetails(id){
	const res = await fetch(`${LINK}/chatgpt/${id}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({test: 123})
	});
	return await res.json();
}

export async function generateFullPersonAuto(country, gender) {
		const res = await fetch(`${LINK}/persons`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({country, gender, type: 'auto'})
		});
	return await res.json();
}

export async function generatePersonSection(country, section) {

}
