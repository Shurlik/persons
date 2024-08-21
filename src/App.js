import './App.css';
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import router from './routes/router';
import Airtable from "airtable";

function App() {
	Airtable.configure({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY});
	return (
		<div className={'wrapper'}>
			<RouterProvider router={router}/>
			<ToastContainer position='top-left'/>
		</div>
	);
}

export default App;
