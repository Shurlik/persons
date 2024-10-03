import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import {Controller, useForm} from "react-hook-form";
import {loginInputStyles} from "../services/inputStyles";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SaveIcon from "@mui/icons-material/Save";
import {uploadProfileFile} from "../services/airtable";
import {toast} from "react-toastify";
import authService from "../services/auth";
import {useAuth} from "../contexts/AuthContext";

const ProfileHeader = ({image, title, details, additional, circleColor, filter, isEditing, user}) => {
	const {updateUserData} = useAuth();
	const {control, handleSubmit, setValue} = useForm({
		defaultValues: {
			name: '',
			email: '',
		}
	});
	const fileInputRef = useRef(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(null);


	useEffect(() => {
		if (isEditing) {
			setValue('name', title);
			setValue('email', details);
		}
		if (!isEditing) {
			setFile(null);
			setPreviewUrl(null);
		}

	}, [isEditing]);


	const handleImageClick = () => {
		if (loading) {
			return;
		}
		fileInputRef.current.click();
	};


	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			if (file) {
				const formData = new FormData();
				formData.append('file', file);
				await uploadProfileFile(formData, user?.id);
			}
			await authService.updateProfile(data, user?.id);
			await updateUserData();
			toast.success('Updated');
			setLoading(false);
		} catch (e) {
			console.log('submit: ', e);
			setLoading(false);
		}
		setLoading(false);
	};

	return (
		<Box
			component={isEditing ? "form" : undefined}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '1rem',
				transition: '.5s',

			}}
		>
			<Typography
				variant={'h6'}
				sx={{
					color: colors.gray2,
				}}
			>
				{additional}
			</Typography>
			{!!image && <Box
				sx={{
					border: `4px solid ${circleColor ? circleColor : colors.orange}`,
					width: '120px',
					height: '120px',
					borderRadius: '50%',
					overflow: 'hidden',
					margin: '0 auto',
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<Box
					component={'img'}
					alt={'user image'}
					src={previewUrl || image}
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: filter ? 'grayscale(100%)' : 'none',
					}}
				/>
				{isEditing && <Box
					onClick={handleImageClick}
					sx={{
						position: 'absolute',
						top: '50%',
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: colors.black20,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: '.3s',
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: colors.mainGreen50
						}
					}}
				>
					<ImageSearchIcon
						sx={{
							color: colors.orange,
							fontSize: '2rem'
						}}
					/>
				</Box>}
			</Box>}
			{isEditing ? <Controller
				name='name'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						inputProps={{
							style: {textAlign: "center"}
						}}
						sx={{...loginInputStyles, width: '25rem', textAlign: 'center'}}
						{...field}
						variant='standard'
					/>
				)}
			/> : <Typography
				variant={'h5'}
				sx={{color: colors.white}}
			>
				{title}
			</Typography>}
			{isEditing ? <Controller
				name='email'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						sx={{...loginInputStyles, width: '25rem'}}
						{...field}
						variant='standard'
						inputProps={{
							style: {textAlign: "center"}
						}}
					/>
				)}
			/> : <Typography
				variant={'h6'}
				sx={{color: colors.white}}
			>
				{details}
			</Typography>}
			<Box sx={{borderTop: `1px solid ${colors.darkGrey42}`, width: '100%'}}/>
			<Box
				sx={{
					marginTop: '3rem'
				}}
			>
			</Box>
			<input
				ref={fileInputRef}
				accept='image/*'
				type='file'
				onChange={handleImageChange}
				style={{display: 'none'}}
			/>
			{isEditing && <Button
				type={'submit'}
				sx={{
					cursor: 'pointer',
					color: colors.orange,
					'&:hover': {
						color: colors.black,
						backgroundColor: colors.mainGreen,
					},
					padding: '.2rem .5rem',
					borderRadius: '10px',
					display: 'flex',
					alignItems: 'center',
					position: 'absolute',
					top: '1rem',
					right: '1rem'
				}}
			>
				<Typography
					variant='body1'
					sx={{
						color: 'inherit',
						fontSize: '1.4rem',
						fontWeight: '600',
					}}
				>
					Save
				</Typography>
				<SaveIcon sx={{fontSize: '1.4rem', color: 'inherit', marginLeft: '0.3rem'}}/>
			</Button>}
		</Box>
	);
};

export default ProfileHeader;
