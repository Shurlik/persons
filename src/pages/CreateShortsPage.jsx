import React, {useState} from 'react';
import ShortsForm from "../components/Shorts/ShortsForm";
import {Container, FormControl} from "@mui/material";
import ShortsResult from "../components/Shorts/ShortsResult";
import {toast} from "react-toastify";
import {getShortsStream} from "../services/shorts";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/PageHeader";
import UserFormSelect from "../components/UserFormSelect";
import CustomSlide from "../components/CustomSlide";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import CustomSelect from "../components/CustomSelect";

const CreateShortsPage = () => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState('');

	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);

	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);

	const createShorts = async (data) => {
		setLoading(true);
		try {
			for (const key of data.postType) {
				data.selectedTemplate = key;
				await getShortsStream(data, (chunk) => {
					setResult((prev) => prev + chunk);
				});
				setResult((prev) => prev + '\n\n================================\n\n');
			}


			setLoading(false);
		} catch (e) {
			toast.error('Something goes wrong');
			console.log('error: ', e);
			setLoading(false);
		}
		setLoading(false);
	};

	const handleChange = (value) => {
		const selectedPerson = data.find((p) => p.id === value);
		setPerson(selectedPerson);
	};

	const personsOptions = !isLoading
		? [
			{label: 'None', value: ''},
			...data.map((p) => ({
				label: p?.fields?.Name,
				value: p?.id
			}))
		]
		: [{label: 'Loading...', value: ''}];

	return (
		<Container>
			<CustomSlide
				condition={steps === 0}
			>
				<PageHeader
					header={'Select person to continue'}
					sx={{flexGrow: 1}}
				/>
				<FormControl
					sx={{
						marginBottom: '1rem',
						marginTop: '3rem',
						width: '100%'
					}}
					variant='standard'
				>
					<CustomSelect
						fullWidth
						label='Person'
						value={person?.id}
						options={personsOptions}
						onChange={handleChange}
					/>
				</FormControl>
				{!!person && <UserFormSelect
					person={person}
					selectedValues={selectedValues}
					setSelectedValues={setSelectedValues}
					setSteps={setSteps}
					steps={steps}
				/>}
			</CustomSlide>
			<CustomSlide
				condition={steps === 1}
			>
				<ShortsForm {...{loading, setLoading, setFormData, createShorts, steps, setSteps, selectedValues, person}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<ShortsResult {...{result, setResult, loading, setLoading, formData, steps, setSteps}} />
			</CustomSlide>
		</Container>
	);
};

export default CreateShortsPage;
