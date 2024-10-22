import React, {useState} from 'react';
import ShortsForm from "../components/Shorts/ShortsForm";
import {Container, FormControl, MenuItem, Select} from "@mui/material";
import ShortsResult from "../components/Shorts/ShortsResult";
import {getBenefitsStream} from "../services/ads";
import {toast} from "react-toastify";
import {getShortsStream} from "../services/shorts";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/PageHeader";
import UserFormSelect from "../components/UserFormSelect";
import CustomSlide from "../components/CustomSlide";
import Loader from "../components/Loader";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";

const CreateShortsPage = () => {
	const [result, setResult] = useState('')
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState('')

	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);

	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);

	const createShorts = async (data) => {
		setLoading(true)
		try {
			await getShortsStream(data, (chunk) => {
				setResult((prev) => prev + chunk);
			});
			setLoading(false)
		} catch (e) {
			toast.error('Something goes wrong')
			console.log('error: ', e);
			setLoading(false)
		}
		setLoading(false)
	}

	const handleChange = async (event) => {
		setPerson(event.target.value);
	};

	const persons = !isLoading ? data.map((p) => <MenuItem
		key={p?.id}
		value={p}
	>{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

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
					<Select
						fullWidth
						variant={'outlined'}
						labelId='demo-simple-select-standard-label'
						value={person}
						onChange={handleChange}
						label='Person'
					>
						<MenuItem value={''}>
							<em>None</em>
						</MenuItem>
						{persons}
					</Select>
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
			{loading && <FullPageLoader position={'absolute'}/>}
		</Container>
	);
};

export default CreateShortsPage;
