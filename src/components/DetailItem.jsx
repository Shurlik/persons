import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const DetailItem = ({label, value}) => {
	return (
		<Box sx={{mb: 1.5}}>
			<Typography
				fontSize='1.1rem'
				fontWeight='bold'
				component='span'
				color={colors.white}
			>{label}: </Typography>
			<Typography
				fontSize='1.1rem'
				component='span'
				color={colors.white}
			>{value}</Typography>
		</Box>
	);
};

export default DetailItem;
