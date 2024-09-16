import {colors} from "../styles/colors";

export default {
	styleOverrides: {
		root: {
			borderRadius: '.5rem',
			transition: '.2s',
			minWidth: '5rem',
			'&.Mui-disabled': {
				backgroundColor: '#ccc', // Цвет для отключенной кнопки
				color: '#666', // Цвет текста для отключенной кнопки
			},
		},
		containedPrimary: {
			letterSpacing:2,
			backgroundColor: colors.orange, // Цвет кнопки по умолчанию
			color: colors.white,
			padding:'.6rem 1.5rem',
			fontSize: '1rem',
			fontWeight: 'bold',
			'&:hover': {
				backgroundColor: colors.mainGreen,
				color: colors.black, // Цвет при наведении
			},
		},
		outlinedPrimary: {
			color: colors.silver,
			border: `1px solid ${colors.mainGreen}`,
			padding:'.6rem 1.5rem',
			fontSize: '1rem',
			fontWeight: 'bold',
			'&:hover': {
				backgroundColor: colors.silver,
				color: colors.black,
				border: `1px solid ${colors.silver}`,
			},
		},
		outlinedSecondary: {
			borderColor: colors.orange, // Цвет границы
			color: colors.orange,
			'&:hover': {
				backgroundColor: colors.orange,
				color: colors.white,
				border: `1px solid ${colors.orange}`,

			},
			'&:disabled': {
				color: colors.orange50,
				border: `1px solid ${colors.orange50}`,
				backgroundColor: colors.background
			}
		},
	},
};