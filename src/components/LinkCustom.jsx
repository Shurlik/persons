import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {colors} from "../assets/styles/colors";
import {Link} from "react-router-dom";

const LinkCustom = ({name, Icon, active, to, onClick}) => {
	return (
		<Link
			to={to}
			key={to}
		>
			<ListItem
				disablePadding
				sx={active ? {backgroundColor: colors.mainGreen, color: colors.black} : {backgroundColor: 'none'}}
			>
		<ListItemButton onClick={onClick}>
			<ListItemIcon
				sx={active ? {color: colors.black, minWidth: '2rem'} : {
					minWidth: '2rem', color: colors.mainGreen80
				}}
			>
				<Icon />
			</ListItemIcon>
			<ListItemText
				primary={name}
				sx={active? {color: colors.black} : {color: colors.mainGreen80, textDecoration: 'none', '&:hover': {
						color: colors.mainGreen
					},
				}}
			/>
		</ListItemButton>
			</ListItem>
		</Link>
	);
};

export default LinkCustom;
