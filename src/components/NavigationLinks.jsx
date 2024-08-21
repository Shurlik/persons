import React from 'react';
import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Link, useLocation} from "react-router-dom";

const LINKS = [
	{name: 'Persons', href: '/persons', icon: PeopleAltIcon},
	{name: 'Management', href: '/management', icon: ManageAccountsIcon},
	{name: 'Create Person', href: '/create', icon: PersonAddIcon},
]

const NavigationLinks = () => {
	const location = useLocation()

	return (
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
	);
};

export default NavigationLinks;
