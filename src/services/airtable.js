import Airtable from "airtable";

export async function getAllRecords() {
	return await Airtable.base(process.env.REACT_APP_AIRTABLE_BASE).table('Persons list').select({
		sort: [{ field: 'Created time', direction: 'asc' }]
	}).all()
}

export async function getRecordById(id) {
	return await Airtable.base(process.env.REACT_APP_AIRTABLE_BASE).table('Persons list').find(id)
}

export async function updateRecord(id, data){
	return await Airtable.base(process.env.REACT_APP_AIRTABLE_BASE).table('Persons list').update(id, data)
}

export async function deleteRecord(id){
	await Airtable.base(process.env.REACT_APP_AIRTABLE_BASE).table('Persons list').destroy(id)
}
export async function createRecord(data){
	await Airtable.base(process.env.REACT_APP_AIRTABLE_BASE).table('Persons list').create(data)
}
