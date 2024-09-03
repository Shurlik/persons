import React, {useState} from 'react';
import {Box} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useLocation, useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import authService from "../services/auth";
import DialogLogout from "./DialogLogout";
import LinkCustom from "./LinkCustom";

const LINKS = [
	{name: 'Persons', href: '/persons', icon: PeopleAltIcon},
	{name: 'Management', href: '/management', icon: ManageAccountsIcon},
	{name: 'Creation', href: '/generate', icon: PersonAddIcon},
];

const NavigationLinks = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);

	function logoutHandler() {
		authService.logout();
		navigate('/login', {replace: true});
	}

	return (
		<Box
			sx={{
				width: '300px',
				display: 'flex',
				height: '100%',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					flexGrow: 1
				}}
			>
				{LINKS.map((link) => {
					const LinkIcon = link.icon;
					return (
						<LinkCustom
							key={link.name}
							Icon={LinkIcon}
							name={link.name}
							active={location.pathname === link.href}
							to={link.href}
						/>
					);
				})}
			</Box>
			<LinkCustom
				Icon={LogoutIcon}
				name={'Logout'}
				to={'#'}
				onClick={() => setModalOpen(true)}
			/>
			<DialogLogout
				onSubmit={logoutHandler}
				onClose={() => setModalOpen(false)}
				isOpen={modalOpen}
			/>
		</Box>
	);
};

export default NavigationLinks;
