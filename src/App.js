import './App.css';
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import router from './routes/router';
import {AuthProvider} from "./contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/fonts.css';
import {Box, createTheme, ThemeProvider} from "@mui/material";
import {colors} from "./assets/styles/colors";

const theme = createTheme({
	typography: {
		fontFamily: [
			'Rajdhani',
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
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		body1: {
			fontWeight: 500,
		},
		Box: {
			fontWeight: 500,
		}
	},
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: colors.white,
					'&.Mui-checked': {
						color: colors.mainGreen,
					},
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Box className={'wrapper'} sx={{height: '100h'}}>
					<RouterProvider router={router}/>
					<ToastContainer
						position='top-left'
						autoClose={1500}
					/>
				</Box>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
