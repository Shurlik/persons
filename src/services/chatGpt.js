import OpenAI from 'openai';


export async function askGpt(prompt, persons) {
	const client = new OpenAI({
		apiKey: process.env.REACT_APP_CHAT_GPT_TOKEN,
		dangerouslyAllowBrowser: true
	});
	const promptSystem = "You are a Marketer. Your task is to prepare a recommendation based on the user's Persona profile and the given Prompt.";
	const preparedPrompt = `Please prepare your recommendation using this data: User's Persona profile/profiles in JSON string format: ${JSON.stringify(persons)}; The Prompt: ${prompt}. Maximum about 100 - 150 words, please styling the output.`;
	const chatCompletion = await client.chat.completions.create({
		messages: [
			{role: 'system', content: promptSystem},
			{role: 'user', content: preparedPrompt}
		],
		model: 'gpt-4o-mini',
	});
	return chatCompletion.choices[0].message.content;
}

export async function generateFullPerson(country, gender) {
	const client = new OpenAI({
		apiKey: process.env.REACT_APP_CHAT_GPT_TOKEN,
		dangerouslyAllowBrowser: true
	});
	const promptSystem = "You are an expert in creating detailed user personas for marketing purposes. ## Purpose ****The assistant is tasked with creating marketing personas for coaching and training services. ****The persona should include both demographic and psychographic information to target the ideal audience effectively.\n" +
		"\n" +
		"## Parameters\n" +
		"\n" +
		"****The assistant must create detailed persona based on diverse demographics and psychographics.\n" +
		"****The persona should be crafted to represent potential clients of coaching and training services.\n" +
		"****The persona should help in developing targeted marketing strategies for reaching the desired audience.\n" +
		"\n" +
		"## Traits\n" +
		"\n" +
		"****The persona should include age, gender, occupation, interests, goals, challenges, motivations, and any other relevant information.\n" +
		"****Persona should be distinct and unique to reflect different segments of the target market.\n" +
		"****The persona should provide insights into the needs and preferences of potential clients to tailor services accordingly.\n" +
		"\n" +
		"## Output\n" +
		"\n" +
		"****The assistant will generate comprehensive marketing persona that can be used to enhance marketing strategies for coaching and training services.\n" +
		"****The persona will aid in understanding the target audience better and refining the messaging and offerings to attract and engage potential clients effectively.\n";
	const preparedPrompt = `Create a detailed user persona for a person from ${country} with Gender: ${gender}. Please create detailed PERSONA for me and classify the PERSONA according to Limbic Types and describe their values, strengths and weaknesses, fears and desires, as well as preferred brands and products.

Output should be in json format with this keys (keys should never change - exactly as in this list): 
"Name",
"Client ID",
"Age",
"Gender",
"Education level",
"Income class",
"Place of residence (city, country, region)",
"Limbic Types",
"Enneagram",
"Myers-Briggs",
"Spiral Dynamics",
"Values and beliefs",
"Lifestyle",
"Job title",
"Industry",
"Career stage",
"Working environment",
"Preferred communication channels (Social Media, Email, traditional media etc.)",
"Device usage (Smartphone, Desktop, Tablet)",
"Online behavior (shopping preferences, sources of information)",
"Buying motives",
"Buying barriers",
"Decision-making process (How does the persona make purchase decisions?)",
"Brand preferences",
"What does the persona need?",
"What problems or challenges does it have?",
"How can your product or service help?",
"Short- and long-term goals",
"Personal or professional aspirations",
"Tone and style of address that resonates best",
"Visual preferences (colors, images, design)",
"Archetypes",
"What are the key messages that would convince the persona?"
"Place of residence" have to contain information of city, country and region in text content
"Online behavior" have to contain shopping preferences and sources of information in text content
"Decision-making process" have to contain how does the persona make purchase desicions in text content`;

	const chatCompletion = await client.chat.completions.create({
		messages: [
			{role: 'system', content: promptSystem},
			{role: 'user', content: preparedPrompt}
		],
		model: 'gpt-4o-mini',
		response_format: {
			"type": "json_object"
		}
	});

	return JSON.parse(chatCompletion.choices[0].message.content);
}

export async function generatePersonSection(country, section) {
	const client = new OpenAI({
		apiKey: process.env.REACT_APP_CHAT_GPT_TOKEN,
		dangerouslyAllowBrowser: true
	});
	const promptSystem = "You are an expert in creating detailed user personas for marketing purposes.";
	const preparedPrompt = `Create a detailed section for a user persona from ${country}. Focus on the "${section}" section only. Provide the information in a structured JSON format.`;

	const chatCompletion = await client.chat.completions.create({
		messages: [
			{role: 'system', content: promptSystem},
			{role: 'user', content: preparedPrompt}
		],
		model: 'gpt-4o-mini',
		response_format: {
			"type": "json_object"
		}
	});

	return JSON.parse(chatCompletion.choices[0].message.content);
}
