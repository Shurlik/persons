import React, {useState} from 'react';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import UserFormSelect from "../components/UserFormSelect";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import Loader from "../components/Loader";
import BlogPostForm from "../components/forms/BlogPostForm";
import ResearchResult from "../components/ResearchResult";
import CosOutputs from "../components/CosOutputs";
import CosImages from "../components/CosImages";
import CustomSlide from "../components/CustomSlide";
import CosSelectedImage from "../components/CosSelectedImage";
import CosFinal from "../components/CosFinal";
import PageHeader from "../components/PageHeader";
import CosOutline from "../components/CosOutline";

const FormsPage = () => {
	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);
	const [research, setResearch] = useState('');
	const [outline, setOutline] = useState('');
	const [prompt, setPrompt] = useState('');
	const [final, setFinal] = useState('');

	const [provider, setProvider] = useState('gpt');

	// const [airId, setAirId] = useState('recfTCxri6Vfih3Z6');
	const [airId, setAirId] = useState(null);
	const [selectedImageId, setSelectedImageId] = useState(null);



	const handleChange = async (event) => {
		setPerson(event.target.value);
	};

	const persons = !isLoading ? data.map((p) => <MenuItem
		key={p?.id}
		value={p}
	>{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	return (
		<Box
			sx={{
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
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
				<BlogPostForm
					person={person}
					selectedValues={selectedValues}
					setResearch={setResearch}
					setSteps={setSteps}
					setAirId={setAirId}
					steps={steps}
					{...{provider, setProvider}}
				/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<ResearchResult {...{research, setResearch, airId, setSteps, steps, outline, setOutline}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 3}
			>
				<CosOutline {...{airId, setSteps, steps, outline, setOutline, setFinal, provider}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 4}
			>
				<CosOutputs {...{airId, setSteps, steps, final, setFinal, provider}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 5}
			>
				<CosImages {...{airId, setSteps, selectedImageId, setSelectedImageId, steps, prompt, setPrompt, provider}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 6}
			>
				<CosSelectedImage {...{airId, setSteps, selectedImageId, steps, prompt, setPrompt}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 7}
			>
				<CosFinal {...{airId, selectedImageId, steps, setSteps}} />
			</CustomSlide>
		</Box>
	);
};

export default FormsPage;
