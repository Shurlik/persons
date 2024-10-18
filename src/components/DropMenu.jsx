import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {colors} from "../assets/styles/colors";

const DropMenu = ({open, onClose, data, anchorEl, disabled, isAdmin}) => {
	return (
		<Menu
			disabled={disabled}
			id='basic-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
		>
			{data.map((d, i) => {
				if(d.admin && !isAdmin ) {
					return
				}
				const Icon = d.icon;
				const fn = d.fn;
				return <MenuItem
					disabled={d?.disabled}
					sx={{
						color: colors.white,
						backgroundColor: colors.backgroundMain,
						'&:hover': {
							backgroundColor: colors.background,
							color: colors.orange
						}
					}}
					key={d?.title}
					onClick={() => {
						fn();
						onClose();
					}}
				>
					<ListItemText
						sx={d.color ? {
								'& .MuiListItemText-primary': {color: d.color},
							}
							: {
								'& .MuiListItemText-primary': {
									color: 'inherit'
								}
							}}
					>{d?.title}</ListItemText>
					<ListItemIcon sx={{justifyContent: 'end', color: d.color ? d.color : 'inherit'}}>
						<Icon
							fontSize='small'
							sx={{color: 'inherit'}}
						/>
					</ListItemIcon>
				</MenuItem>;
			})}
		</Menu>
	);
};

export default DropMenu;
