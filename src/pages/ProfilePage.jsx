import React, {useEffect, useState} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {colors} from "../assets/styles/colors";
import {Box, Button} from "@mui/material";
import ProfileHeader from "../components/ProfileHeader";

const ProfilePage = () => {
	const {user, updateUserData} = useAuth();
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	useEffect(() => {
		return () => {
			updateUserData();
		};
	}, []);

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
			<ProfileHeader
				title={user?.name}
				image={user?.image ? user.image[0]?.url : undefined}
				details={user?.email}
				additional={user?.username}
				circleColor={colors.mainGreen}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
			/>
			<Button
				color={'primary'}
				variant={'contained'}
				onClick={() => setIsEditing(old => !old)}
			>{isEditing ? 'Cancel' : 'Edit'}</Button>
		</Box>
	);
};

export default ProfilePage;
