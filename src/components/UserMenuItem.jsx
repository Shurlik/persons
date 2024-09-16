import React from 'react';
import {Box, Typography} from "@mui/material";
import Logo from "../assets/images/cartoon-office-girl.png";
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
					width: '3rem',
					height: '3rem',
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
				<Typography variant={'h6'}>Girl Name</Typography>
				<Typography
					sx={{
						color: colors.lightGray,
					}}
				>girl@email.com</Typography>
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
