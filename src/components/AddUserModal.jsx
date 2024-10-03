import React from 'react';
import {Box, Modal} from "@mui/material";
import CreateUser from "./CreateUser";
import {colors} from "../assets/styles/colors";

const AddUserModal = ({onClose, isOpen, callback}) => {
	return (
		<Modal
			open={isOpen}
			// onClose={onClose}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					backgroundColor: colors.background,
					border: `1px solid ${colors.darkGrey42}`,
					width: '500px',
					borderRadius: '10px',
					padding: '2rem'
				}}
			>
				<CreateUser onClose={onClose} callback={callback}/>
			</Box>

		</Modal>
	);
};

export default AddUserModal;
