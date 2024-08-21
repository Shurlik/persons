import React, {useState} from 'react';
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import {Box, Button, Container, TextField} from "@mui/material";
import PersonCard from "../components/PersonCard";
import {askGpt} from "../services/chatGpt";
import FormattedTextDisplay from "../components/FormattedTextDisplay";
import Loader from "../components/Loader";

const Persons = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [selectedPersons, setSelectedPersons] = useState({});
	const [requestText, setRequestText] = useState('');
	const [resultText, setResultText] = useState('');
	const [loading, setLoading] = useState(false);

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

		const profiles = [];
		selectedIds.forEach((i) => {
			const f = data.find(d => d.id === i);
			profiles.push(f.fields);
		});

		try {
			const res = await askGpt(requestText, profiles);
			console.log({res});
			setResultText(res);
		} catch (e) {
			console.log('error: ', e);
		}

		setRequestText('');
		setSelectedPersons({});
		setLoading(false);

	};

	return (
		<Container
			sx={{
				height: '100vh',
				overflow: 'auto',
				padding: '2rem'
			}}
		>
			<Box
				sx={{
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					padding: '20px 0',
					justifyContent: 'center',
					gap: '20px',
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
			</Box>
			<Box sx={{mt: 2, mb: 4}}>
				<TextField
					fullWidth
					variant='outlined'
					placeholder='Enter your request'
					value={requestText}
					onChange={handleRequestChange}
					sx={{mb: 2}}
					disabled={loading}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSendRequest}
					disabled={!requestText.trim() || Object.values(selectedPersons).every(v => !v) || loading}
				>
					{loading ? 'Loading....' : 'Send Request using Selected Persons'}
				</Button>
				<Box
					sx={{
						marginTop: '3rem',
						backgroundColor: "silver",
						maxHeight: '20rem',
						minHeight: '2rem',
						borderRadius: '12px',
						padding: '10px',
						overflow: 'auto',
						transition: '1s'
					}}
				>
					{loading ? <Loader/> : <FormattedTextDisplay>{resultText}</FormattedTextDisplay>}
				</Box>
			</Box>
		</Container>
	);
};

export default Persons;
