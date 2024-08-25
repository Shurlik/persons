import React, {useState} from 'react';
import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Link, useLocation, useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import authService from "../services/auth";
import DialogLogout from "./DialogLogout";

const LINKS = [
	{name: 'Persons', href: '/persons', icon: PeopleAltIcon},
	{name: 'Management', href: '/management', icon: ManageAccountsIcon},
	{name: 'Create Person', href: '/create', icon: PersonAddIcon},
];

const NavigationLinks = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false)

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
						<Link
							to={link.href}
							key={link.href}
						>
							<ListItem
								disablePadding
								sx={location.pathname === link.href ? {backgroundColor: '#ffffff33'} : {backgroundColor: 'none'}}
							>
								<ListItemButton>
									<ListItemIcon sx={{minWidth: '2rem', color: '#B3B8CD'}}>
										<LinkIcon/>
									</ListItemIcon>
									<ListItemText
										primary={link.name}
										sx={{color: '#B3B8CD', textDecoration: 'none'}}
									/>
								</ListItemButton>
							</ListItem>
						</Link>
					);
				})}
			</Box>
			<Link
				to={'#'}
				key={'logout'}
				onClick={()=> setModalOpen(true)}
			>
				<ListItem
					disablePadding
				>
					<ListItemButton>
						<ListItemIcon sx={{minWidth: '2rem', color: '#B3B8CD'}}>
							<LogoutIcon/>
						</ListItemIcon>
						<ListItemText
							primary={'Logout'}
							sx={{color: '#B3B8CD', textDecoration: 'none'}}
						/>
					</ListItemButton>
				</ListItem>
			</Link>
			<DialogLogout onSubmit={logoutHandler} onClose={()=> setModalOpen(false)} isOpen={modalOpen} />
		</Box>
	);
};

export default NavigationLinks;
