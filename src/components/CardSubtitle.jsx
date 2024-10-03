import React from 'react';
import {Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const CardSubtitle = ({header, text}) => {
	return (
		<Typography
			sx={{
				fontWeight: '700',
				fontSize: '.9rem',
				marginTop: '.8rem',
				textAlign: 'left',
				color: colors.white
			}}
		>
			<Typography variant={'span'}>{header}:&nbsp;&nbsp;&nbsp;</Typography><Typography
			sx={{
				color: colors.gray2,
				fontWeight: 'normal'
			}}
			variant={'span'}
		>{text}</Typography>
		</Typography>
	);
};

export default CardSubtitle;
