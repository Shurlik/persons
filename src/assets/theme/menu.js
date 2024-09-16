import { colors} from "../styles/colors";

export const menu = {
	styleOverrides: {
		paper: {
			backgroundColor: colors.backgroundMain,
			borderRadius: '8px',
			border: `1px solid ${colors.dark21}`,
			padding: '0 5px'
		},
	},
};

export const menuItem = {
	styleOverrides: {
		root: {
			padding: '8px 20px',
			borderRadius: '6px',
			color: colors.white,
			borderBottom: `1px solid ${colors.dark24}`,
			'&:hover': {
				backgroundColor: colors.dark24,
			},
			'&.Mui-selected': {
				backgroundColor: colors.dark24,
				'&:hover': {
				},
			},
		},
	},
};
