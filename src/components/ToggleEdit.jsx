import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const ToggleEdit = ({onClick, isEdit}) => {
	return (
		<Box
			onClick={onClick}
			sx={{
				position: 'absolute',
				top: '-10px',
				right: '10px',

				borderRadius: '10px',
				display: 'flex',
				gap: '.4rem',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				transition: '.3s',
				padding: '.2rem .5rem',
				color: isEdit ? colors.mainGreen : colors.orange,
				'&:hover': {
					color: !isEdit ? colors.mainGreen : colors.orange,
				}
			}}
		>
			<Typography
				variant='body1'
				sx={{
					color: 'inherit',
					fontSize: '1.2rem',
					fontWeight: '600',
				}}
			>Edit</Typography>
			<BorderColorIcon sx={{fontSize: '.9rem', color: 'inherit'}}/>
		</Box>
	);
};

export default ToggleEdit;