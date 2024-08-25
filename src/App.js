import './App.css';
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import router from './routes/router';
import {AuthProvider} from "./contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<AuthProvider>
			<div className={'wrapper'}>
				<RouterProvider router={router}/>
				<ToastContainer
					position='top-left'
					autoClose={1500}
				/>
			</div>
		</AuthProvider>
	);
}

export default App;
