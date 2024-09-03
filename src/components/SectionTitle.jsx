import React from 'react';
import {Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const SectionTitle = ({title}) => {
	return (
		<Typography
			variant='h6'
			fontWeight='bold'
			fontSize='1.4rem'
			mt={1}
			mb={.5}
			color={colors.white}
		>
			{title}
		</Typography>
	);
};

export default SectionTitle;
