import {colors} from "../styles/colors";

export default {
	styleOverrides: {
		root: {
			color: colors.red, // Цвет текста лейбла
			fontSize: '1rem',
			'&.Mui-focused': {
				color: colors.red,
				fontWeight: 'bold'// Цвет лейбла при фокусе
			},
		},
	},
}
