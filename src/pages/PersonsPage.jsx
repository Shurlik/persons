import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import {Box, Button, TextField, Typography} from "@mui/material";
import PersonCard from "../components/PersonCard";
import {askGpt} from "../services/chatGpt";
import FormattedTextDisplay from "../components/FormattedTextDisplay";
import Loader from "../components/Loader";
import {colors} from "../assets/styles/colors";
import {personsInputStyles} from "../services/inputStyles";

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

		try {
			const res = await askGpt(requestText, selectedIds);
			setResultText(res);
		} catch (e) {
			console.log('error: ', e);
		}

		setRequestText('');
		setSelectedPersons({});
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
				<Typography variant={'h6'} sx={{
					color: colors.white,
					marginBottom: '1rem'
				}}>Enter your request</Typography>
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
