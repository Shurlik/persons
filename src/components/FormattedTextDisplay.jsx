import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Box, Typography} from '@mui/material';
import {colors} from "../assets/styles/colors";

const FormattedTextDisplay = ({children, custom}) => {
	return (
		<Box
			sx={{
				'& p': {marginBottom: '8px'},
				'& h2': {marginTop: '12px', marginBottom: '8px', color: colors.silver},
				'& hr': {margin: '12px 0', border: 'none', borderTop: `1px solid ${colors.silver}`},
			}}
		>
			<ReactMarkdown
				components={{
					h2: ({node, ...props}) => <Typography
						variant='h3' {...props}
						sx={{margin: 0, color: colors.orange}}
					/>,
					h3: ({node, ...props}) => <Typography
						variant='h4' {...props}
						sx={{margin: 0, color: colors.orange}}
					/>,
					p: ({node, ...props}) => <Typography
						variant='body1' {...props}
						sx={{color: custom ? custom : colors.black, margin: 0}}
					/>,
					li: ({node, ...props}) => <Typography
						variant='body1' {...props}
						sx={{color: custom ? custom : colors.black, margin: 0,}}
					/>,
					strong: ({node, ...props}) => <strong style={{color: colors.orange, padding: 0, margin: 0}} {...props} />,
					em: ({node, ...props}) => <em style={{color: colors.orange}} {...props} />,
				}}
			>
				{children}
			</ReactMarkdown>
		</Box>
	);
};

export default FormattedTextDisplay;
