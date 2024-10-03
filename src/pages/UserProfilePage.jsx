import React, {useEffect, useState} from 'react';
import {colors} from "../assets/styles/colors";
import {Box, Button, Typography} from "@mui/material";
import useSWR from "swr";
import {getUser} from "../services/airtable";
import Loader from "../components/Loader";
import {useLocation, useNavigate} from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import noLogo from "../assets/images/no-logo.png";
import authService from "../services/auth";

const UserProfilePage = () => {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	const {data = {}, error, isLoading, mutate} = useSWR(`/user/${id}`, () =>
		getUser(id)
	);

	const blockToggleHandler = async () => {
		if (window.confirm(`Are you sure you want to ${user?.active ? 'Disable' : 'Enable'} this user?`)) {
			setLoading(true);
			try {
				await authService.updateProfile({active: !user?.active}, id);
				await mutate();
				setLoading(false);
			} catch (error) {
				console.error("Error Update record:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (!isLoading && !data?.response?.id) {
			navigate('/persons', {replace: true});
		}

		if (data?.response?.id) {
			setUser(data.response);
		}

	}, [data]);

	if (isLoading) {
		return < Loader/>;
	}

	return (
		<Box
			sx={{
				position: 'relative',
				maxWidth: '70rem',
				margin: '3rem auto 0',
				backgroundColor: colors.background,
				borderRadius: '1.5rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '2rem',
				gap: '1rem',
			}}
		>
			{!isEditing && <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					disabled={loading}
					color={'warning'}
					onClick={() => navigate('/users')}
				>Back to list</Button>
				{loading ? <Typography>Waiting...</Typography> : <Typography
					variant={'h6'}
					sx={{color: user?.active ? colors.mainGreen : colors.red}}
				>Status: {user?.active ? 'Active' : "Disabled"}</Typography>}
				<Button
					disabled={loading}
					color={'error'}
					onClick={blockToggleHandler}
				>{user?.active ? 'Disable user' : 'Enable user'}</Button>
			</Box>}
			<ProfileHeader
				title={user?.name}
				image={user?.image ? user.image : noLogo}
				details={user?.email}
				additional={user?.username}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				user={user}
			/>
			<Button
				disabled={loading}
				color={'primary'}
				variant={'contained'}
				onClick={() => setIsEditing(old => !old)}
			>{isEditing ? 'Cancel' : 'Edit'}</Button>
		</Box>
	);
};

export default UserProfilePage;
