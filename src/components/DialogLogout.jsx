import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Slide} from "@mui/material";
import {styled} from "@mui/material/styles";
import {toast} from "react-toastify";
import {colors} from "../assets/styles/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogLogout = ({onSubmit, onClose, isOpen}) => {
	function closeHandler() {
		onClose();
	}

	async function submitHandler(event) {
		try {
				event.preventDefault();
				await onSubmit()
		} catch (e) {
		    console.log('error: ', e)
		}
	}

	return (
			<Dialog
				TransitionComponent={Transition}
				open={isOpen}
				PaperProps={{
					sx:{
						border: '1px solid #B3B8CD',
						backgroundColor: colors.darkGrey,
						color: colors.mainGreen,
						borderRadius: '20px',
						padding: '1rem 5rem',
					},
					component: 'form',
					onSubmit: submitHandler
				}}
			>
				<DialogTitle sx={{fontWeight: 'bold', mb: 0}}>Logout</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{color: colors.mainGreen}}>
						Are you sure you want to leave us?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
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
						variant={'outlined'}
						sx={{
							marginLeft: '1.5rem!important',
							borderRadius: '.5rem',
							color: colors.mainGreen,
							transition: '.2s',
							border:`1px solid ${colors.mainGreen}`,
							minWidth: '5rem',
							'&:hover': {
								backgroundColor: colors.mainGreen,
								color: colors.black,
								border:`1px solid ${colors.mainGreen}`,
							}
						}}
						type='submit'
					>Continue</Button>
				</DialogActions>
			</Dialog>
	);
};

export default DialogLogout;
