import React, {useState} from 'react';
import {Box} from "@mui/material";
import NavigationLinks from "./NavigationLinks";
import DialogLogout from "./DialogLogout";
import authService from "../services/auth";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/images/kivi-logo.png";
import UserMenuItem from "./UserMenuItem";

const Navigation = () => {

	const [modalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();

	function logoutHandler() {
		authService.logout();
		navigate('/login', {replace: true});
	}

	return (
		<Box
			sx={{
				margin: '0 auto',
				padding: '1rem .5rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				maxWidth: '100rem'
			}}
		>
			<Box>
				<Box
					component={'img'}
					alt={'logo'}
					src={Logo}
					sx={{maxWidth: '6rem'}}
				/>
			</Box>
			<NavigationLinks/>
			<UserMenuItem onLogout={()=>setModalOpen(true)}/>
			<DialogLogout
				onSubmit={logoutHandler}
				onClose={() => setModalOpen(false)}
				isOpen={modalOpen}
			/>
		</Box>
	);
};

export default Navigation;
