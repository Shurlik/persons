import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {colors} from "../assets/styles/colors";

const DropMenu = ({open, onClose, data, anchorEl}) => {
	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
		>
			{data.map((d, i) => {
				const Icon = d.icon;
				const fn = d.fn;
				return <MenuItem
					sx={{color: colors.white}}
					key={d?.title}
					onClick={fn}
					divider
				>
					<ListItemText
						sx={d.color ? {
								'& .MuiListItemText-primary': {color: d.color},
							}
							: {
								'& .MuiListItemText-primary': {
									color: colors.white
								}
							}}
					>{d?.title}</ListItemText>
					<ListItemIcon sx={{justifyContent: 'end'}}>
						<Icon
							fontSize='small'
							sx={d.color ? {color: d.color} : {color: colors.white}}
						/>
					</ListItemIcon>
				</MenuItem>;
			})}
		</Menu>
	);
};

export default DropMenu;
