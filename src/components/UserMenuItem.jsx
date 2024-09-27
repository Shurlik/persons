import React from 'react';
import {Box, Typography} from "@mui/material";
import Logo from "../assets/images/BS-logo.png";
import {colors} from "../assets/styles/colors";
import DropMenu from "./DropMenu";
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenuItem = ({onLogout}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '.9rem'
			}}
		>
			<Box
				sx={{
					overflow: 'hidden',
					borderRadius: '50%',
					backgroundColor: colors.silver,
					width: '2.5rem',
					height: '2.5rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Box
					component={'img'}
					alt={'logo'}
					src={Logo}
					sx={{width: '100%', height: '100%', objectFit: 'cover',}}
				/>
			</Box>
			<Box
				sx={{
					cursor: 'pointer',
					userSelect: 'none'
				}}
				onClick={handleClick}
			>
				<Typography variant={'h6'} sx={{fontSize: '.9rem'}}>Workingsolo.ai</Typography>
				<Typography
					sx={{
						color: colors.lightGray,
						fontSize: '.8rem'
					}}
				>bigshift@workingsolo.ai</Typography>
			</Box>

			<DropMenu
				onClose={handleClose}
				open={open}
				data={[{title: 'Logout', icon: LogoutIcon, fn: onLogout}]}
				anchorEl={anchorEl}
			/>
		</Box>
	);
};

export default UserMenuItem;
