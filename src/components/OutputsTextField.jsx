import React, {forwardRef} from 'react';
import {Box, TextField} from "@mui/material";
import PageHeader from "./PageHeader";
import FormattedTextDisplayOutline from "./services/FormattedTextDisplayOutline";
import {colors} from "../assets/styles/colors";
import FullPageLoader from "./FullPageLoader";

const OutputsTextField = forwardRef(({value, title, loading, onChange, editable}, ref) => {
	return (
		<Box
			sx={{width: '100%'}}
		>
			<PageHeader
				header={title}
				sx={{flexGrow: 1}}
			/>
			{editable ? <TextField
					sx={{
						width: '100%',
						'& .MuiInputBase-input': {
							padding: '8px'
						}
					}}
					variant='outlined'
					multiline
					rows={25}
					required
					disabled={loading}
					value={value}
					onChange={onChange}
				/> :
				<Box
					ref={ref}
					sx={{
						backgroundColor: colors.black,
						padding: '24px',
						borderRadius: '1rem',
						maxHeight: '50vh',
						minHeight: '300px',
						border: `1px solid ${colors.orange50}`,
						overflow: 'auto',
						position: 'relative'
					}}
				>
					<FormattedTextDisplayOutline>
						{value}
					</FormattedTextDisplayOutline>
					{/*{loading && <FullPageLoader position={'absolute'}/>}*/}
				</Box>
			}
		</Box>
	)
		;
});

export default OutputsTextField;
