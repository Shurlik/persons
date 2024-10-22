import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import FormattedTextDisplay from "./services/FormattedTextDisplay";

const AntTabs = styled(Tabs)({
	'& .MuiTabs-indicator': {
		backgroundColor: '#fff',
	},
});

const AntTab = styled((props) => <Tab
	sx={{
		right: `${props.index * 10}px`,
	}}
	disableRipple {...props} />)(({theme}) => ({
	backgroundColor: '#fff',
	textTransform: 'none',
	borderTopRightRadius: '20px',
	borderTopLeftRadius: '20px',
	border: '1px solid #1F1A36',
	minWidth: '10rem',
	[theme.breakpoints.up('sm')]: {
		minWidth: '10rem',
	},
	fontWeight: theme.typography.fontWeightRegular,
	color: '231E39',
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		color: '#1F1A3677',
		opacity: 1,
	},
	'&.Mui-selected': {
		color: '#1F1A36',
		fontWeight: theme.typography.fontWeightMedium,
		zIndex: 9999,
		border: '1px solid #1F1A36',
		borderBottom: 'none',
	},
	'&.Mui-focusVisible': {
		backgroundColor: '#d1eaff',
	},
}));

const CustomTabPanel = (props) => {
	const {children, value, index, ...other} = props;

	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{padding: '5rem 10rem', fontSize: '1.5rem'}}>{children}</Box>}
		</Box>
	);
};

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

// data: [{header, text}]
export default function BasicTabs({data=[]}) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{width: '100%'}}>
			<Box sx={{backgroundColor: '#231E39', padding: '1rem 0 0'}}>
				<AntTabs
					variant={'scrollable'}
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
					scrollButtons
					TabScrollButtonProps={{
						sx: {
							color: '#fff',
							padding: '0 2rem'
						},
					}}
				>
					{data.map((i, index) => <AntTab
						key={i.title}
						index={index}
						label={i.title}
					/>)}
				</AntTabs>
			</Box>
			{data.map((i, index) => <CustomTabPanel
				key={index.toString()}
				value={value}
				index={index}
			><FormattedTextDisplay>{i.text}</FormattedTextDisplay>
			</CustomTabPanel>)}
		</Box>
	);
}
