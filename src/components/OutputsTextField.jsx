import React from 'react';
import {Box, TextField} from "@mui/material";
import PageHeader from "./PageHeader";

const OutputsTextField = ({value, title, loading, onChange}) => {
	return (
		<Box sx={{width: '100%'}}>
			<PageHeader
				header={title}
				sx={{flexGrow: 1}}
			/>
			<TextField
				sx={{width: '100%',
					'& .MuiInputBase-input': {
						padding: '8px'
					}
				}}
				variant='outlined'
				multiline
				rows={20}
				required
				// disabled
				disabled={loading}
				value={value}
				onChange={onChange}
			/>
		</Box>
	);
};

export default OutputsTextField;
