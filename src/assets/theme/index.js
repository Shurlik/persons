import {createTheme} from '@mui/material/styles';
import inputs from "./inputs";
import labels from "./labels";
import buttons from "./buttons";
import {colors} from "../styles/colors";
import listItemButton from "./listItemButton";
import {tableCell, tableHead, tableRow} from './table';
import {menu, menuItem} from "./menu";

const index = createTheme({
	typography: {
		fontFamily: [
			'Rajdhani',
			'Bebas Neue',
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
		h1: {
			fontWeight: 700,
		},
		h2: {
			fontWeight: 400,
			fontFamily: 'Bebas Neue',
			letterSpacing: 5
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontSize: '1.5rem',
			fontFamily: 'Bebas Neue',
			letterSpacing: 3
		},
		h6: {
			fontWeight: 600,
			color: colors.white,
			padding: 0,
			margin: 0,
			lineHeight: 1
		},
		body1: {
			fontWeight: 500,
			fontSize: '1rem',
			color: colors.gray
		},
		body2: {},
		subtitle1: {
			color: colors.white
		}
	},
	components: {
		MuiOutlinedInput: inputs,
		MuiInputLabel: labels,
		MuiButton: buttons,
		MuiListItemButton: listItemButton,
		MuiTableHead: tableHead,
		MuiTableRow: tableRow,
		MuiTableCell: tableCell,
		MuiMenu: menu,
		MuiMenuItem: menuItem,
	},
});

export default index;
