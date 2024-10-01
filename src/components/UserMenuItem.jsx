import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import DropMenu from "./DropMenu";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import officeGirl from "../assets/images/cartoon-office-girl.png";
import officeBoy from "../assets/images/cartoon-office-boy.png";

const UserMenuItem = ({onLogout}) => {
	const {user} = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '.9rem',
				cursor: 'pointer'
			}}
		>
			<Box
				onClick={handleClick}
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
					src={user?.image?.length > 0 ? user?.image[0]?.url : user['Gender'] === 'Female' ? officeGirl : officeBoy}
					sx={{width: '100%', height: '100%', objectFit: 'cover',}}
				/>
			</Box>
			<Box
				onClick={handleClick}
				sx={{
					cursor: 'pointer',
					userSelect: 'none'
				}}
			>
				<Typography
					variant={'h6'}
					sx={{fontSize: '.9rem'}}
				>{user.name}</Typography>
				<Typography
					sx={{
						color: colors.lightGray,
						fontSize: '.8rem'
					}}
				>{user?.email}</Typography>
			</Box>

			<DropMenu
				onClose={handleClose}
				open={open}
				data={
					[
						{title: 'Profile', icon: ManageAccountsIcon, fn: () => navigate('/profile')},
						{title: 'Logout', icon: LogoutIcon, fn: onLogout}
					]
				}
				anchorEl={anchorEl}
			/>
		</Box>
	);
};

export default UserMenuItem;
