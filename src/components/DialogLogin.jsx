import React, {useState} from 'react';
import {
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
					backgroundColor: colors.darkGrey,
					color: colors.mainGreen,
					borderRadius: '20px',
					padding: '1rem 5rem',
				},
				component: 'form',
				onSubmit: submitHandler
			}}
		>
			<DialogTitle sx={{fontWeight: 'bold', mb: 0}}>Login</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{color: colors.mainGreen, mb: 5}}>
					Please login to get access
				</DialogContentText>

				<TextField
					sx={loginInputStyles}
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
					sx={loginInputStyles}
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
						onClick={closeHandler}
						sx={{
							borderRadius: '.5rem',
							color: colors.silver,
							transition: '.2s',
							border:`1px solid ${colors.silver}`,
							minWidth: '5rem',
							'&:hover': {
								backgroundColor: colors.silver,
								color: colors.black,
								border:`1px solid ${colors.silver}`,
							}
						}}
					>Cancel</Button>
					<Button
						disabled={loading}
						variant={'outlined'}
						sx={{
							marginLeft: '1.5rem!important',
							borderRadius: '.5rem',
							color: colors.black,
							border:`1px solid ${colors.mainGreen}`,
							minWidth: '5rem',
							backgroundColor: colors.mainGreen,
							'&:hover': {
								backgroundColor: colors.red,
								color: colors.black,
								border:`1px solid ${colors.red}`,
							}
						}}
						type='submit'
					>Login</Button>

			</DialogActions>
		</Dialog>
	);
};

export default DialogLogin;
