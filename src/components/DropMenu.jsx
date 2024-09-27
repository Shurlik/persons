import React from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {colors} from "../assets/styles/colors";

const DropMenu = ({open, onClose, data, anchorEl, disabled}) => {
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
				const Icon = d.icon;
				const fn = d.fn;
				return <MenuItem
					sx={{
						color: colors.white,
						backgroundColor: colors.backgroundMain,
						'&:hover': {
							backgroundColor: colors.background,
							color: colors.orange
						}
					}}
					key={d?.title}
					onClick={fn}
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
