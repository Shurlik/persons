import React from 'react';
import {Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const CardSubtitle = ({header, text}) => {
	return (
		<Typography
			fontSize={'1rem'}
			variant={'body1'}
			marginTop={.5}
			textAlign={'left'}
		>
			<Typography fontWeight={'bold'} color={colors.white} variant={'span'}>{header}:&nbsp;</Typography><Typography variant={'span'}>{text}</Typography>
		</Typography>
	);
};

export default CardSubtitle;
