import React, {useState} from 'react';
import {Box} from "@mui/material";
import NavigationLinks from "./NavigationLinks";
import DialogLogout from "./DialogLogout";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import UserMenuItem from "./UserMenuItem";
import { LogoIcon } from './Icons';
import { ThemeSwitcher } from './services/ThemeSwitcher';

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
				padding: '1rem 3rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Box
				onClick={() => navigate('/')}
				sx={{
					cursor: 'pointer'
				}}
			>
				<LogoIcon />
			</Box>
			<NavigationLinks />
			<Box sx={{ display: 'flex' }}>
				<ThemeSwitcher />
				<Box>
					<UserMenuItem onLogout={() => setModalOpen(true)} />
					<DialogLogout
						onSubmit={logoutHandler}
						onClose={() => setModalOpen(false)}
						isOpen={modalOpen}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Navigation;
