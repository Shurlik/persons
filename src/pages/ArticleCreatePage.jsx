import React, {useState} from 'react';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import UserFormSelect from "../components/UserFormSelect";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import Loader from "../components/Loader";
import BlogPostForm from "../components/forms/BlogPostForm";
import ResearchResult from "../components/Articles/ResearchResult";
import CosOutputs from "../components/Articles/CosOutputs";
import CosImages from "../components/Articles/CosImages";
import CustomSlide from "../components/CustomSlide";
import CosSelectedImage from "../components/Articles/CosSelectedImage";
import CosFinal from "../components/Articles/CosFinal";
import PageHeader from "../components/PageHeader";
import CosOutline from "../components/Articles/CosOutline";
import {getArticleStream, getOutlineStream, getResearchStream, getThumbnailStream} from "../services/cos";
import authService from "../services/auth";
import {toast} from "react-toastify";
import FullPageLoader from "../components/FullPageLoader";

const ArticleCreatePage = () => {
	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);
	const [research, setResearch] = useState('');
	const [outline, setOutline] = useState('');
	const [prompt, setPrompt] = useState('');
	const [final, setFinal] = useState('');
	const [loading, setLoading] = useState(false);

	const [provider, setProvider] = useState('gpt');

	// const [airId, setAirId] = useState('recfTCxri6Vfih3Z6');
	const [airId, setAirId] = useState(null);
	const [selectedImageId, setSelectedImageId] = useState(null);

	// === Functions

	const resultStream = async (airId, setter, streamSource) => {
		if (!streamSource) {
			toast.error('Need to set Source');
			return;
		}
		let getter = () => {
			toast.error('Wrong Source');
		};

		if (streamSource === 'research') {
			getter = getResearchStream;
		}

		if (streamSource === 'outline') {
			getter = getOutlineStream;
		}

		if (streamSource === 'article') {
			getter = getArticleStream;
		}

		if (streamSource === 'thumbnail') {
			getter = getThumbnailStream;
		}


		setLoading(true);
		setter('');
		try {
			await getter(airId, (chunk) => {
				setter((prev) => prev + chunk);
			}, provider);

			setLoading(false);

		} catch (e) {
			console.error('Error fetching streams:', e);
			if (e.message === 'Unauthorized') {
				// Перенаправляем на страницу входа или показываем сообщение
				await authService.logout();
				// Например, используйте React Router для перенаправления
				// history.push('/login');
			} else {
				console.log('getOutlineStream: ', e);
				// Обработка других ошибок
			}
			setLoading(false);
		}
	};


	const researchStream = async (airId) => {
		await resultStream(airId, setResearch, 'research');
	};

	const outlineStream = async () => {
		await resultStream(airId, setOutline, 'outline');
	};

	const articleStream = async () => {
		await resultStream(airId, setFinal, 'article');
	};

	const thumbnailStream = async () => {
		await resultStream(airId, setPrompt, 'thumbnail');
	};


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
				overflow: 'hidden'
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
					{...{provider, setProvider, researchStream}}
				/>
			</CustomSlide>
			{/*---*/}
			<CustomSlide
				condition={steps === 2}
			>
				{/*===>*/}
				<ResearchResult {...{
					research,
					setResearch,
					airId,
					setSteps,
					steps,
					outline,
					loading,
					setLoading,
					outlineStream
				}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 3}
			>
				<CosOutline {...{
					airId,
					setSteps,
					steps,
					outline,
					setOutline,
					setFinal,
					provider,
					loading,
					articleStream,
					setLoading
				}} />
			</CustomSlide>

			{/*===>*/}
			<CustomSlide
				condition={steps === 4}
			>
				<CosOutputs {...{
					airId,
					setSteps,
					steps,
					final,
					setFinal,
					provider,
					loading,
					setLoading,
					thumbnailStream

				}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 5}
			>
				<CosImages {...{
					airId,
					setSteps,
					selectedImageId,
					setSelectedImageId,
					steps,
					prompt,
					setPrompt,
					provider,
					loading,
					setLoading
				}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 6}
			>
				<CosSelectedImage {...{airId, setSteps, selectedImageId, steps, prompt, setPrompt, loading}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 7}
			>
				<CosFinal {...{airId, selectedImageId, steps, setSteps, loading}} />
			</CustomSlide>
			{loading && <FullPageLoader position={'absolute'}/>}
		</Box>
	);
};

export default ArticleCreatePage;
