import {colors} from "../styles/colors";

export const inputOutlinedStyles = {
	styleOverrides: {
		root: {
			boxShadow: 'none',
			backgroundColor: colors.whiteGrey,
			padding: '16px',
			borderRadius: '8px',
			'&.Mui-focused': {
				// backgroundColor: 'white'
			},
			// '& .MuiOutlinedInput-root': {
			// 	'&.Mui-focused': {
			// 		backgroundColor: 'white'
			// 	}
			// },
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.darkGrey42,
			},
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.orange50,
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.orange50,
				// backgroundColor: colors.whitePermanet,
			},
			'& .MuiInputBase-input::placeholder': {
				color: colors.darkGrayMain, // Принудительно применяем тёмный цвет
			},
		},
		input: {
			color: colors.blackPermanet,
			padding: 0,
			fontSize: '16px',
			'&::placeholder': {
				color: colors.darkGrayMain, // Принудительно применяем тёмный цвет
			},
		},
	},
};


export const inputStyles = {
	styleOverrides: {
		root: {
			boxShadow: 'none',
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
