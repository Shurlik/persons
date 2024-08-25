import React, {useState} from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	TextField
} from "@mui/material";
import {toast} from "react-toastify";
import Loader from "./Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide
		direction='up'
		ref={ref} {...props} />;
});

const DialogLogin = ({onSubmit, onClose, isOpen}) => {
	function closeHandler() {
		onClose();
	}

	const [loading, setLoading] = useState(false);

	const inputStyles = {
		'& .MuiInputBase-input': {color: '#fff'},
		'& .MuiInput-underline:before': {borderBottomColor: '#B3B8CD'},
		'& .MuiInput-underline:after': {borderBottomColor: '#fff'},
		'& .MuiInputLabel-root': {color: '#B3B8CD'},
		'& .MuiInputLabel-root.Mui-focused': {color: '#fff'},
		'& .MuiInputBase-input::placeholder': {color: '#B3B8CD'},
	};

	async function submitHandler(event) {
		setLoading(true);
		try {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const formJson = Object.fromEntries(formData.entries());
			const username = formJson.username;
			const password = formJson.password;

			if (!password || !username) {
				setLoading(false);
				toast.error('Please enter a valid login and password');
				return;
			}
			await onSubmit(username, password);
		} catch (e) {
			console.log('error: ', e);
		}
		setLoading(false);
	}

	return (
		<Dialog
			TransitionComponent={Transition}
			open={isOpen}
			PaperProps={{
				sx: {
					border: '1px solid #B3B8CD',
					backgroundColor: '#231E39',
					color: '#fff',
					borderRadius: '20px',
					padding: '1rem 5rem',
				},
				component: 'form',
				onSubmit: submitHandler
			}}
		>
			<DialogTitle sx={{fontWeight: 'bold', mb: 0}}>Login</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{color: '#B3B8CD', mb: 5}}>
					Please login to get access
				</DialogContentText>

				<TextField
					sx={inputStyles}
					autoFocus
					margin='dense'
					id='username'
					name='username'
					label='Username'
					fullWidth
					variant='standard'
					disabled={loading}
				/>

				<TextField
					sx={inputStyles}
					margin='dense'
					id='password'
					name='password'
					label='Password'
					type='password'
					fullWidth
					variant='standard'
					disabled={loading}
				/>
			</DialogContent>
			<DialogActions>
					<Button
						disabled={loading}
						variant={'outlined'}
						color={'warning'}
						onClick={closeHandler}
					>Cancel</Button>
					<Button
						disabled={loading}
						variant={'outlined'}
						color={'info'}
						sx={{marginLeft: '2rem!important'}}
						type='submit'
					>Login</Button>

			</DialogActions>
		</Dialog>
	);
};

export default DialogLogin;
