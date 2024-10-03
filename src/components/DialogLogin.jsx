import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {colors} from "../assets/styles/colors";
import {loginInputStyles} from "../services/inputStyles";

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
			console.log(username, password);
			await onSubmit(username, password);
		} catch (e) {
			console.log('error: ', e);
		}
		setLoading(false);
	}

	return (
		<Dialog
			onClose={closeHandler}
			TransitionComponent={Transition}
			open={isOpen}
			PaperProps={{
				sx: {
					backgroundColor: colors.background,
					color: colors.white,
					borderRadius: '20px',
					padding: '3rem 3rem',
					width: '490px'
				},
				component: 'form',
				onSubmit: submitHandler
			}}
		>
			<DialogTitle
				sx={{
					fontWeight: 'bold',
					mb: 0,
					fontFamily: 'Bebas Neue',
					textAlign: 'center',
					fontSize: '1.8rem',
					letterSpacing: 1.3
				}}
			>Log in</DialogTitle>
			<DialogContent sx={{marginTop: '1rem'}}>
				<Typography sx={{color: colors.white}}>Username*</Typography>
				<TextField
					sx={loginInputStyles}
					autoFocus
					margin='dense'
					id='username'
					name='username'
					fullWidth
					variant='standard'
					disabled={loading}
					required={true}
					placeholder={'Enter your username'}
				/>
				<Typography sx={{marginTop: '2rem', color: colors.white}}>Password*</Typography>
				<TextField
					sx={{...loginInputStyles}}
					margin='dense'
					id='password'
					name='password'
					// label='Password'
					type='password'
					fullWidth
					variant='standard'
					disabled={loading}
					required={true}
					placeholder={'Password'}
				/>
			</DialogContent>
			<DialogActions sx={{marginTop: '3rem'}}>
				<Button
					disabled={loading}
					variant={'contained'}
					color={'primary'}
					type='submit'
					sx={{width: '100%'}}
				>Login</Button>

			</DialogActions>
		</Dialog>
	);
};

export default DialogLogin;
