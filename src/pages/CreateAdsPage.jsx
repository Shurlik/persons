import React, {useState} from 'react';
import {Container, FormControl, MenuItem, Select} from "@mui/material";
import AdsForm from "../components/Ads/AdsForm";
import {getBenefitsStream, getResultStream} from "../services/ads";
import {toast} from "react-toastify";
import AdsBenefits from "../components/Ads/AdsBenefits";
import FullPageLoader from "../components/FullPageLoader";
import AdsResult from "../components/Ads/AdsResult";
import PageHeader from "../components/PageHeader";
import UserFormSelect from "../components/UserFormSelect";
import CustomSlide from "../components/CustomSlide";
import Loader from "../components/Loader";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import CustomSelect from "../components/CustomSelect";

const CreateAdsPage = () => {
	const [benefits, setBenefits] = useState('');
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(null);
	const [formData, setFormData] = useState();

	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);

	const createBenefits = async (data) => {
		setLoading(true);
		try {
			await getBenefitsStream(data, (chunk) => {
				setBenefits((prev) => prev + chunk);
			});
			setLoading(false);
		} catch (e) {
			toast.error('Something goes wrong');
			console.log('error: ', e);
			setLoading(false);
		}
		setLoading(false);
	};

	const createResult = async (data) => {
		setLoading(true);
		try {
			await getResultStream(data, (chunk) => {
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

	// const handleChange = async (event) => {
	// 	setPerson(event?.target?.value);
	// };

	const handleChange = (value) => {
		const selectedPerson = data.find((p) => p.id === value);
		setPerson(selectedPerson);
	};

	const persons = !isLoading ? data.map((p) => <MenuItem
		key={p?.id}
		value={p}
	>{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	const personsOptions = !isLoading
		? [
			{ label: 'None', value: '' },
			...data.map((p) => ({
				label: p?.fields?.Name,
				value: p?.id
			}))
		]
		: [{ label: 'Loading...', value: '' }];

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
						label="Person"
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
					formData={formData}
				/>}
			</CustomSlide>
			<CustomSlide
				condition={steps === 1}
			>
				<AdsForm {...{createBenefits, setFormData, setSteps, steps}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<AdsBenefits{...{
					benefits,
					setBenefits,
					loading,
					createResult,
					formData,
					setSteps,
					steps,
					person,
					selectedValues
				}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 3}
			>
				<AdsResult{...{result, setResult, loading, formData, setLoading, setSteps, steps}} />
			</CustomSlide>
			{loading && <FullPageLoader position={'absolute'}/>}
		</Container>
	);
};

export default CreateAdsPage;
