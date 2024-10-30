import React from 'react';
import {TextField} from "@mui/material";

const CustomTextField = ({disabled, field, multiline, rows}) => {
	return (
		<TextField
			sx={{
				'& .MuiOutlinedInput-root': {
					'&.Mui-focused': {
						backgroundColor: 'white'
					}
				}
			}}
			disabled={disabled}
			{...field}
			fullWidth
			variant='outlined'
			{...{multiline, rows}}
		/>
	);
};

export default CustomTextField;
