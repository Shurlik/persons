import React, {useState} from 'react';
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import {Box, Button, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import PersonCard from "../components/PersonCard";
import {askGpt} from "../services/chatGpt";
import FormattedTextDisplay from "../components/FormattedTextDisplay";
import Loader from "../components/Loader";
import {colors} from "../assets/styles/colors";
import {askClaude} from "../services/claude";
import {toast} from "react-toastify";

const Persons = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [selectedPersons, setSelectedPersons] = useState({});
	const [requestText, setRequestText] = useState('');
	const [resultText, setResultText] = useState('');
	const [loading, setLoading] = useState(false);
	const [assistant, setAssistant] = useState('gpt');

	const handleChange = (event) => {
		setAssistant(event.target.value);
	};

	const handleSelectChange = (personId, isSelected, personData) => {
		setSelectedPersons(prev => ({...prev, [personId]: isSelected}));
	};

	const handleRequestChange = (event) => {
		setRequestText(event.target.value);
	};

	const handleSendRequest = async () => {
		setLoading(true);
		const selectedIds = Object.entries(selectedPersons)
			.filter(([_, isSelected]) => isSelected)
			.map(([id, _]) => id);

		try {
			const res = assistant === 'gpt'
				? await askGpt(requestText, selectedIds)
				: await askClaude(requestText, selectedIds);
			if (typeof res !== 'string') {
				toast.error('Wrong output!');
				console.error('output: ', res);
				return;
			}
			setResultText(res);
			setRequestText('');
			setSelectedPersons({});
		} catch (e) {
			console.log('error: ', e);
			toast.error('Something goes wrong');
		}


		setLoading(false);
	};

	return (
		<Box
			sx={{
				maxWidth: '100rem',
				overflow: 'auto',
				padding: '5rem 1rem 1rem',
				margin: '0 auto'
			}}
		>
			{isLoading ? <Loader/> : <Box
				sx={{
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, 360px)',
					justifyContent: 'center',
					gap: '1.5rem',
				}}
			>
				{data.map(p => (
					<PersonCard
						person={p}
						key={p.id}
						isSelected={!!selectedPersons[p.id]}
						onSelectChange={handleSelectChange}
					/>
				))}
			</Box>}
			<Box sx={{mt: 5, mb: 4, paddingX: '2rem'}}>


				{/*====*/}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'end',
						padding: '1rem 0'
					}}
				>
					<Typography
						variant={'h6'}
						sx={{
							color: colors.white,
							marginBottom: '1rem',
							flexGrow: '1',
							flexShrink: '0'
						}}
					>Enter your request</Typography>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem'
					}}>
						<Typography
							variant={'h6'}
							sx={{
								color: colors.white,
							}}
						>Select model:</Typography>
						<FormControl
							sx={{
								width: '15rem'
							}}
						>
							<Select
								value={assistant}
								label='Assistant'
								onChange={handleChange}
								defaultValue={'gpt'}
							>
								<MenuItem value={'gpt'}>Chat GPT</MenuItem>
								<MenuItem value={'claude'}>Claude</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
				<TextField
					fullWidth
					placeholder='Enter your request'
					value={requestText}
					onChange={handleRequestChange}
					// sx={personsInputStyles}
					disabled={loading}
					variant={'outlined'}
				/>
				<Button
					sx={{marginTop: '1rem'}}
					variant='outlined'
					onClick={handleSendRequest}
					color='secondary'
					disabled={!requestText.trim() || Object.values(selectedPersons).every(v => !v) || loading}
				>
					{loading ? 'Loading....' : 'Send Request using Selected Persons'}
				</Button>
				{loading ? <Loader/> : resultText && <Box
					sx={{
						marginTop: '3rem',
						backgroundColor: colors.white,
						maxHeight: '20rem',
						minHeight: '2rem',
						borderRadius: '12px',
						padding: '24px',
						overflow: 'auto',
						transition: '1s',
						color: colors.white,
						border: `1px solid ${colors.orange50}`
					}}
				>
					<FormattedTextDisplay>{resultText}</FormattedTextDisplay>
				</Box>}
			</Box>
		</Box>
	);
};

export default Persons;
