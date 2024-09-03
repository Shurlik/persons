import React, {useState} from 'react';
import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {colors} from "../assets/styles/colors";
import {createUser} from "../services/airtable";
import {toast} from "react-toastify";

const StyledTextField = styled(TextField)(({theme}) => ({
	backgroundColor: colors.white,
	color: colors.black,
	'& .MuiInputBase-root': {
		color: colors.black,
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			// borderColor: colors.mainGreen50,
		},
		'&:hover fieldset': {
			// borderColor: colors.mainGreen,
		},
		'&.Mui-focused fieldset': {
			borderColor: colors.white,
		},
	},
}));

const StyledSelect = styled(Select)(({theme}) => ({
	backgroundColor: colors.white,
	color: colors.black,
	'& .MuiSelect-icon': {
		color: colors.black,
	},
	'&:hover': {
		backgroundColor: colors.silver,
	},
	'&.Mui-focused': {
		backgroundColor: colors.white,
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: colors.mainGreen,
		},
	},
}));

const StyledMenuItem = styled(MenuItem)({
	backgroundColor: colors.silver,
	color: colors.black,
	'&:hover': {
		backgroundColor: colors.grey,
	},
	'&.Mui-selected': {
		backgroundColor: colors.white,
		'&:hover': {
			backgroundColor: colors.silver,
		},
	},
});

const UserCreateSimple = ({onFinish, setShowStart}) => {
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('');
	const [offer, setOffer] = useState('');
	const [loading, setLoading] = useState(false);

	const startHandler = async () => {
		if (!country || !gender) {
			toast.error(" Please set the Country and Gender");
			return;
		}
		setLoading(true);
		try {
			const data = await createUser({country, gender, offer});
			onFinish(data.id);
			setShowStart(true)
		} catch (e) {
			console.log('User creation error: ', e);
			toast.error('User creation error');
		}
		setLoading(false);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	const handleOfferChange = (event) => {
		setOffer(event.target.value);
	};

	return (
		<Box sx={{maxWidth: '30rem'}}>
			<Typography
				sx={{color: colors.white, fontWeight: '800'}}
				variant={'h2'}
			>Let's create!</Typography>

			<Typography
				sx={{
					color: colors.white,
					marginTop: '3rem',
					fontSize: '1.3rem',
					fontWeight: '700'
				}}
			>Enter the target country for your persona:</Typography>
			<StyledTextField
				disabled={loading}
				variant={'outlined'}
				value={country}
				onChange={handleCountryChange}
				fullWidth
				sx={{borderRadius: '10px', marginBottom: '1rem', fontSize: '1.3rem'}}
				placeholder='Enter country'
			/>

			<Typography
				sx={{
					color: colors.white,
					fontSize: '1.3rem',
					fontWeight: '700'
				}}
			>Select the Gender of your persona:</Typography>
			<StyledSelect
				disabled={loading}
				value={gender}
				onChange={handleGenderChange}
				fullWidth
				sx={{borderRadius: '10px', marginBottom: '1rem'}}
			>
				<StyledMenuItem value='Male'>Male</StyledMenuItem>
				<StyledMenuItem value='Female'>Female</StyledMenuItem>
			</StyledSelect>

			<Typography
				sx={{
					color: colors.white,
					fontSize: '1.3rem',
					fontWeight: '700'
				}}
			>Enter your offer:</Typography>
			<StyledTextField
				disabled={loading}
				variant={'outlined'}
				value={offer}
				onChange={handleOfferChange}
				fullWidth
				sx={{borderRadius: '10px', marginBottom: '1rem'}}
				multiline
				rows={4}
			/>

			<Box
				mt={10}
				sx={{margin: '5rem auto', textAlign: 'center'}}
			>
				<Button
					disabled={loading}
					variant='contained'
					onClick={startHandler}
					sx={{
						borderRadius: '.5rem',
						color: colors.black,
						border: `1px solid ${colors.mainGreen}`,
						minWidth: '10rem',
						minHeight: '3rem',
						fontWeight: 'bold',
						backgroundColor: colors.mainGreen,
						'&:hover': {
							color: colors.black,
							boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
							backgroundColor: colors.mainGreen
						}
					}}
				>
					Generate
				</Button>
			</Box>
		</Box>
	);
};

export default UserCreateSimple;
