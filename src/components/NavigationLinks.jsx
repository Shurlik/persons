import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useLocation} from "react-router-dom";
import LinkCustom from "./LinkCustom";
import {Box} from "@mui/material";
import LINKS from '../services/routesList'

const NavigationLinks = () => {
	const location = useLocation();

	return (
		<Box sx={{
			display: 'flex',
			gap: '5rem'
		}}>
			{LINKS.map((link) => {
				const LinkIcon = link.icon;
				return (
					<LinkCustom
						key={link.name}
						name={link.name}
						active={location.pathname === link.href}
						to={link.href}
					/>
				);
			})}
		</Box>
	);
};

export default NavigationLinks;
