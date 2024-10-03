import React, {useRef, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, Button, TextField, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import noLogo from "../assets/images/no-logo.png";
import authService from "../services/auth";
import {toast} from "react-toastify";
import {uploadProfileFile} from "../services/airtable";
import Loader from "./Loader";

const schema = yup.object({
	username: yup.string().required('Username is required').min(3, 'Minimum 3 characters'),
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
}).required();

const CreateUser = ({onClose, callback}) => {
	const fileInputRef = useRef(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(null);

	const {control, handleSubmit, reset, formState: {errors}} = useForm({
		defaultValues: {
			name: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: ''
		},
		resolver: yupResolver(schema),
		mode: 'onChange'
	});

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
		setLoading(true);
		try {

			const {username, password, email, name} = data;
			const user = await authService.register({username, password, email, name});
			console.log({user});
			if (file) {
				const formData = new FormData();
				formData.append('file', file);
				await uploadProfileFile(formData, user?.id);
			}
			await callback()
			reset();
			onClose();
			setLoading(false);
			toast.success('User created');
		} catch (e) {
			console.log('User create error: ', e);
			setLoading(false);
			toast.error('User create error');
		}
		setLoading(false);
	};

	const cancelHandler = () => {
		reset();
		onClose();
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Box
				sx={{
					border: `4px solid ${colors.orange}`,
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
					src={previewUrl || noLogo}
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
				<Box
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
				</Box>
			</Box>
			<Typography
				variant={'h6'}
				sx={{marginBottom: '.5rem', marginTop: '2rem'}}
			>Login</Typography>
			<Controller
				name='username'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						sx={{width: '100%', marginBottom: 2}}
						{...field}
						variant='outlined'
						error={!!errors.username}
						helperText={errors.username?.message}
					/>
				)}
			/>
			<Typography
				variant={'h6'}
				sx={{marginBottom: '.5rem', marginTop: '1rem'}}
			>Name</Typography>

			<Controller
				name='name'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						sx={{width: '100%', marginBottom: 2}}
						{...field}
						variant='outlined'
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				)}
			/>
			<Typography
				variant={'h6'}
				sx={{marginBottom: '.5rem', marginTop: '1rem'}}
			>Email</Typography>

			<Controller
				name='email'
				control={control}
				render={({field}) => (
					<TextField
						sx={{width: '100%', marginBottom: 2}}
						{...field}
						variant='outlined'
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
				)}
			/>
			<Typography
				variant={'h6'}
				sx={{marginBottom: '.5rem', marginTop: '1rem'}}
			>Password</Typography>

			<Controller
				name='password'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						sx={{width: '100%', marginBottom: 2}}
						{...field}
						variant='outlined'
						type='password'
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
				)}
			/>
			<Typography
				variant={'h6'}
				sx={{marginBottom: '.5rem', marginTop: '1rem'}}
			>Confirm password</Typography>

			<Controller
				name='confirmPassword'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						sx={{width: '100%', marginBottom: 2}}
						{...field}
						variant='outlined'
						type='password'
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
					/>
				)}
			/>
			<Box
				sx={{
					borderTop: `1px solid ${colors.gray2}`,
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					padding: '1rem 0'
				}}
			>
				<Button
					disabled={loading}
					type={'submit'}
					sx={{width: '100%'}}
					variant={'contained'}
					color={'primary'}
				>
					Create
				</Button>
				<Button
					disabled={loading}
					onClick={cancelHandler}
					sx={{width: '100%'}}
					variant={'outlined'}
					color={'primary'}
				>
					Cancel
				</Button>
			</Box>
			{loading && <Loader/>}
			<input
				ref={fileInputRef}
				accept='image/*'
				type='file'
				onChange={handleImageChange}
				style={{display: 'none'}}
			/>
		</Box>
	);
};

export default CreateUser;
