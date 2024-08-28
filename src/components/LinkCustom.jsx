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
				sx={active ? {backgroundColor: colors.mainGreen10} : {backgroundColor: 'none'}}
			>
		<ListItemButton onClick={onClick}>
			<ListItemIcon
				sx={{
					minWidth: '2rem', color: colors.mainGreen80
				}}
			>
				<Icon />
			</ListItemIcon>
			<ListItemText
				primary={name}
				sx={{color: colors.mainGreen80, textDecoration: 'none', '&:hover': {
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
