import React from 'react';
import male from '../assets/images/male.png';
import female from '../assets/images/female.png';
import nog from '../assets/images/nog.png';
import {Box, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {colors} from "../assets/styles/colors";

const GenderButton = ({onClick, selected, gender, disabled}) => {
	let selectedGender = '';
	let selectedIcon = '';


	if (gender === 'Male') {
		selectedGender = 'Male';
		selectedIcon = male;
	}
	if (gender === 'Female') {
		selectedGender = 'Female';
		selectedIcon = female;
	}

	if (gender === 'Non-Binary') {
		selectedGender = 'Non-Binary';
		selectedIcon = nog;
	}

	function clickHandler() {
		if (disabled) {
			return;
		}
		onClick(gender);
	}


	return (
		<Box
			sx={{
				opacity: disabled ? .5 : 1,
				cursor: 'pointer',
				borderRadius: '1rem',
				padding: '1rem',
				textAlign: 'center',
				backgroundColor: `${selected ? colors.darkGreen08 : colors.blackLighter}`,
				border: `1px solid ${selected ? colors.mainGreen : colors.green2E_20}`,
				position: 'relative',
				flexBasis: '10rem',
				transition: '.3s',
				'&:hover': {
					backgroundColor: colors.darkGreen08,
					border: `1px solid ${colors.mainGreen}`,
				}
			}}
			onClick={clickHandler}
		>
			<Box
				sx={{
					height: '64px'
				}}
			>
				<Box
					component={'img'}
					alt={'gender'}
					src={selectedIcon}
					sx={{width: 'auto', height: '64px'}}
				/>
			</Box>
			<Typography
				sx={{
					color: colors.white,
					fontWeight: '600',
					marginTop: '5px'
				}}
			>{selectedGender}</Typography>
			{selected && <CheckCircleOutlineIcon
				sx={{
					width: ' 18px',
					height: '18px',
					color: colors.mainGreen,
					position: 'absolute',
					top: '5px',
					right: '5px',
				}}
			/>
			}
		</Box>
	);
};

export default GenderButton;
