import React from 'react';
import {Box, Slide} from "@mui/material";
import {colors} from "../assets/styles/colors";
import CosImages from "./CosImages";

const CustomSlide = ({children, condition}) => {
	return (
		<Slide
			direction='down'
			in={condition}
			mountOnEnter
			unmountOnExit
			timeout={300}
			sx={{
				backgroundColor: colors.background,
				padding: '1rem 2rem',
				margin: '3rem auto 0',
				borderRadius: '1rem',
				width: '50rem'
			}}
		>
			<Box sx={{
				flexGrow: 1
			}}>
				{children}
			</Box>
		</Slide>
	);
};

export default CustomSlide;
