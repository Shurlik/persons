import {colors} from "../styles/colors";

export default {
	styleOverrides: {
		root: {
			alignVertical: "center",
			backgroundColor: colors.white, // Цвет фона инпута
			borderRadius: '8px', // Закругленные углы
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.silver, // Цвет рамки
			},
			'&:hover .MuiOutlinedInput-notchedOutline': {
				boxShadow: `0 0 5px 1px ${colors.white}`,
				borderColor: colors.grey// Цвет рамки при наведении
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: colors.white, // Цвет рамки при фокусе
			},
		},
		input: {
			color: '#000', // Цвет текста инпута
			padding: '12px', // Padding внутри инпута
		},
	},
}
