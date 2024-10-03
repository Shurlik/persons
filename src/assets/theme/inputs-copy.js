import {colors} from "../styles/colors";

const inputStyles = {
	styleOverrides: {
		root: {
			backgroundColor: colors.white,
			borderRadius: '8px',
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.darkGrey42,
			},
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.orange50,
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.orange50,
			},
			'& .MuiInputBase-input::placeholder': {
				color: colors.black, // Тёмный плейсхолдер
			},
		},
		input: {
			color: colors.black,
			padding: '16px',
			'&::placeholder': {
				color: colors.black,
			},
		},
	},
};

export default inputStyles;
