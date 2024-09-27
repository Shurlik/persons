import React from 'react';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import {colors} from "../assets/styles/colors";

const LinkCustom = ({name, active, to, onClick}) => {
	return (
		<Link
			to={to}
			key={to}
		>
			<ListItem
				disablePadding
				// sx={active ? {backgroundColor: colors.mainGreen, color: colors.black} : {backgroundColor: 'none'}}
			>
				<ListItemButton
					onClick={onClick}
					selected={active}
				>
					<ListItemText
						sx={{
							margin: 0,
						}}
						primary={name}
						primaryTypographyProps={{ fontSize: '1.2rem', lineHeight: 1, color: active ? colors.black :colors.white }}
					/>
				</ListItemButton>
			</ListItem>
		</Link>
	);
};

export default LinkCustom;
