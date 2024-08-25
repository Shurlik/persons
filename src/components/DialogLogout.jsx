import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Slide} from "@mui/material";
import {styled} from "@mui/material/styles";
import {toast} from "react-toastify";

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
						backgroundColor: '#231E39',
						color: '#fff',
						borderRadius: '20px',
						padding: '1rem 5rem',
					},
					component: 'form',
					onSubmit: submitHandler
				}}
			>
				<DialogTitle sx={{fontWeight: 'bold', mb: 0}}>Logout</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{color: '#B3B8CD'}}>
						Are you sure you want to leave us?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant={'outlined'} color={'primary'} onClick={closeHandler}>Cancel</Button>
					<Button variant={'outlined'} color={'error'} sx={{marginLeft: '2rem!important'}} type='submit'>Continue</Button>
				</DialogActions>
			</Dialog>
	);
};

export default DialogLogout;
