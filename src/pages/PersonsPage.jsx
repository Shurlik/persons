import React, {useState} from 'react';
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import {Box, Button, Container, TextField} from "@mui/material";
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
				// height: '100%',
				overflow: 'auto',
				padding: '2rem 7rem',
				backgroundColor: colors.darkGrey
			}}
		>
			{isLoading ? <Loader/> : <Box
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
			</Box>}
			<Box sx={{mt: 2, mb: 4}}>
				<TextField
					fullWidth
					placeholder='Enter your request'
					value={requestText}
					onChange={handleRequestChange}
					sx={personsInputStyles}
					disabled={loading}
				/>
				<Button
					variant='contained'
					onClick={handleSendRequest}
					sx={{backgroundColor: colors.mainGreen50, color: colors.black, marginTop: '1rem',
						'&:disabled': {
						backgroundColor: colors.silver,
							color: colors.black
						},
						'&:hover': {
							backgroundColor: colors.mainGreen80
						},
					}}
					disabled={!requestText.trim() || Object.values(selectedPersons).every(v => !v) || loading}
				>
					{loading ? 'Loading....' : 'Send Request using Selected Persons'}
				</Button>
				<Box
					sx={{
						marginTop: '3rem',
						backgroundColor: colors.darkGrey,
						maxHeight: '20rem',
						minHeight: '2rem',
						borderRadius: '12px',
						padding: '10px',
						overflow: 'auto',
						transition: '1s',
						color: colors.white,
						border: `1px solid ${colors.mainGreen50}`
					}}
				>
					{loading ? <Loader/> : <FormattedTextDisplay>{resultText}</FormattedTextDisplay>}
				</Box>
			</Box>
		</Box>
	);
};

export default Persons;
