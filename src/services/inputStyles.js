import {colors} from "../assets/styles/colors";

export const loginInputStyles = {
	'& .MuiInputBase-input': {
		color: colors.white,
		'&:hover': {
			// Стили для hover состояния input
		}
	},
	'& .MuiInput-underline:before': {
		borderBottomColor: colors.mainGreen,
		'&:hover': {
			borderBottomColor: colors.mainGreen // или другой цвет для hover
		}
	},
	'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
		borderBottomColor: colors.mainGreen, // или другой подходящий цвет
	},
	'& .MuiInput-underline:after': {borderBottomColor: colors.mainGreen},
	'& .MuiInputLabel-root': {
		color: colors.white,
		'&:hover': {
			// Стили для hover состояния label
		}
	},
	'& .MuiInputLabel-root.Mui-focused': {color: colors.white},
	'& .MuiInputBase-input::placeholder': {color: colors.white},
	// Добавляем общий hover эффект для всего input
	'&:hover .MuiInputBase-root': {
		// Общие стили для hover состояния всего input
	}
};
export const personsInputStyles = {
	border: `1px solid ${colors.mainGreen}`,
	backgroundColor: colors.silver,
	borderRadius: '10px',
	overflow: 'hidden',
	'& .MuiInputBase-input': {
		color: colors.black,
		'&.Mui-focused fieldset': {
			border: `1px solid ${colors.mainGreen}`
		}
	},
	'& .MuiInput-underline:before': {
		borderBottomColor: colors.mainGreen,
		'&:hover': {
			borderBottomColor: colors.mainGreen // или другой цвет для hover
		}
	},
	'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
		borderBottomColor: colors.mainGreen, // или другой подходящий цвет
	},
	'& .MuiInput-underline:after': {borderBottomColor: colors.mainGreen},
	'& .MuiInputLabel-root': {
		color: colors.black,
		'&:hover': {
			// Стили для hover состояния label
		}
	},
	'& .MuiInputLabel-root.Mui-focused': {color: colors.mainGreen},
	'& .MuiInputBase-input::placeholder': {color: colors.black},
	// Добавляем общий hover эффект для всего input
	'&:hover .MuiInputBase-root': {
		// border: '1px solid red'
		// Общие стили для hover состояния всего input
	}
};
