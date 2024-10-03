import {colors} from "../styles/colors";

export const inputOutlinedStyles = {
	styleOverrides: {
		root: {
			backgroundColor: colors.white,
			padding: '16px',
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
				color: colors.darkGrayMain, // Принудительно применяем тёмный цвет
			},
		},
		input: {
			color: colors.black,
			padding: 0,
			'&::placeholder': {
				color: colors.darkGrayMain, // Принудительно применяем тёмный цвет
			},
		},
	},
};


export const inputStyles = {
	styleOverrides: {
		root: {
			backgroundColor: colors.background,
			'& .MuiInput-root': {
				color: colors.white, // Цвет текста
				'&::before': {
					borderBottom: `1px solid ${colors.grey}`, // Цвет линии снизу
				},
				'&:hover:not(.Mui-disabled)::before': {
					borderBottom: `1px solid ${colors.orange}`, // Цвет при наведении
				},
				'&::after': {
					borderBottom: `1px solid ${colors.orange}`, // Цвет при фокусе
				},
			},
			'& .MuiInput-input::placeholder': {
				color: colors.grey, // Цвет плейсхолдера
				opacity: 1, // Непрозрачность плейсхолдера
			},
		},
	},
};
