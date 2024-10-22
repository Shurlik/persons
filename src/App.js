import './App.css';
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import router from './routes/router';
import {AuthProvider} from "./contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/fonts.css';
import {Box, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import theme from './assets/theme'
import {colors} from "./assets/styles/colors";
import Version from "./components/services/Version";


function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<ThemeProvider theme={theme}>
				<Version />
				<AuthProvider>
					<Box
						sx={{height: '100vh', backgroundColor: colors.backgroundMain}}
					>
						<RouterProvider router={router}/>
						<ToastContainer
							position='top-left'
							autoClose={1500}
						/>
					</Box>
				</AuthProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
