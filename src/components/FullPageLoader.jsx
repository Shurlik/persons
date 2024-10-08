import React from 'react';
import {colors} from "../assets/styles/colors";
import Loader from "./Loader";
import {Box} from "@mui/material";

const FullPageLoader = ({position}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: position ? position : 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: colors.black20,
				flexDirection: 'column'
			}}
		>
			<Loader/></Box>
	);
};

export default FullPageLoader;
