import React, {useState} from 'react';
import {Container, FormControl} from "@mui/material";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import PageHeader from "../components/PageHeader";
import CustomSelect from "../components/CustomSelect";
import UserFormSelect from "../components/UserFormSelect";
import CustomSlide from "../components/CustomSlide";
import OfferForm from "../components/Offers/OfferForm";
import OfferResult from "../components/Offers/OfferResult";
import {toast} from "react-toastify";
import {getOfferStream} from "../services/offers";
import {useLocation} from "react-router-dom";

const CreateOffersPage = () => {
	const location = useLocation();
	const offerId = location?.state?.offerId;

	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState('');

	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);

	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);

	const createSteps = async (data) => {
		setLoading(true);
		const starterString = person ? `Name: ${person?.fields?.Name};\nAge: ${person?.fields?.Age};\nGender: ${person?.fields?.Gender};\nPlace of residence: ${person?.fields['Place of residence']};\nJob title: ${person?.fields['Job title']};\n` : "";
		data.personData = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`, starterString);

		try {
			await getOfferStream(data, (chunk) => {
				setResult((prev) => prev + chunk);
			});
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
					full
				/>}
			</CustomSlide>
			<CustomSlide
				condition={steps === 1}
			>
				<OfferForm {...{setFormData, loading, setSteps, steps, formData, selectedValues, createSteps}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<OfferResult {...{result, setResult, loading, formData, setLoading, steps, setSteps, offerId}}/>
			</CustomSlide>
		</Container>
	);
};

export default CreateOffersPage;
