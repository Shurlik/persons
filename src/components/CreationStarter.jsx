import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import imageAdd from "../assets/images/imageAdd.png";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import {loginInputStyles} from "../services/inputStyles";
import GenderButton from "./GenderButton";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {toast} from "react-toastify";
import {createUser, updateRecord, uploadFile} from "../services/airtable";
import Loader from "./Loader";
import {fullPersData, personaKeys} from "../utils/fullPersData";
import {useNavigate} from "react-router-dom";

const CreationStarter = ({onFinish, setShowStart}) => {
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef(null);
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('');
	const [offer, setOffer] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();


	function handleFileChange(e) {
		if (e.target.files) {
			setFile(e.target.files[0]);
			const objectUrl = URL.createObjectURL(e.target.files[0]);
			setPreviewUrl(objectUrl);
		}
	}

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleOfferChange = (event) => {
		setOffer(event.target.value);
	};

	function clear() {
		if (loading) {
			return;
		}
		setPreviewUrl(null);
		setFile(null);
		if (fileInputRef.current?.value) {
			fileInputRef.current.value = '';
		}
	}

	const handleFileUpload = async (id) => {
		setLoading(true);
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			try {
				const res = await uploadFile(id, formData);
				clear();
			} catch (e) {
				console.log('error: ', e);
				toast.error('Uploaded error');
			}
		}
		setLoading(false);
	};

	const startHandler = async ({isFull}) => {
		if (!country || !gender) {
			toast.error(" Please set the Country and Gender");
			return;
		}
		setLoading(true);
		try {
			const data = await createUser({country, gender, offer});
			if (file) {
				await handleFileUpload(data.id);
			}
			await fullPersonCreate(data.id);
			if (isFull) {
				navigate('/persons', {replace: true});
				return;
			}
			onFinish(data.id);
		} catch (e) {
			console.log('User creation error: ', e);
			toast.error('User creation error');
		}
		setLoading(false);
	};

	async function fullPersonCreate(userId) {
		setLoading(true);
		try {
			await updateRecord(userId, personaKeys, fullPersData);
			// navigate('/persons', {replace: true});
			setLoading(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		}
	}


	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);


	return (
		<Box
			sx={{
				margin: '0 auto',
				paddingY: '5rem',
				maxWidth: '100rem',
			}}
		>
			<Box
				sx={{
					backgroundColor: colors.background,
					display: 'flex',
					justifyContent: 'center',
					// alignItems: 'center',
					padding: '5rem',
					gap: '5rem',
					borderRadius: '1.5rem',

				}}
			>
				<Box>
					<Box
						sx={{
							backgroundColor: colors.darkGreen,
							padding: '1.5rem',
							border: `1px solid ${colors.green227}`,
							borderRadius: '1rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '1rem',
							position: 'relative',
						}}
					>
						<Box
							sx={{
								border: `1px dashed ${colors.green227}`,
								borderRadius: '1rem',
								width: '300px',
								height: '250px',
								overflow: 'hidden',

							}}
						>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								{previewUrl ? <Box
									component={'img'}
									alt={'user image'}
									src={previewUrl}
									sx={{width: '100%', height: '100%', objectFit: 'cover'}}
								/> : <Box
									component={'img'}
									alt={'user image'}
									src={imageAdd}
									sx={{width: '64px', height: '64px', objectFit: 'cover', opacity: 0.5}}
								/>}
							</Box>
							{!!file && <Box
								onClick={clear}
								sx={{
									cursor: 'pointer',
									zIndex: 77777,
									position: 'absolute',
									top: '.8rem',
									right: '.9rem',
									fontSize: '1.5rem'
								}}
							>❌</Box>}
						</Box>
						<Box sx={{textAlign: 'center'}}>
							<Typography
								sx={{
									color: colors.mainGreen
								}}
							>Choose a file or drag & drop it here</Typography>
							<Typography
								sx={{
									color: colors.grayC4,
									fontSize: '.7rem',
									marginTop: '.5rem'
								}}
							>JPEG, PNG formats, up to 5MB</Typography>
						</Box>
						<Button
							onChange={handleFileChange}
							sx={{width: '100%', paddingY: '.7rem', fontWeight: 'bold'}}
							component='label'
							role={undefined}
							variant='outlined'
							color={'secondary'}
							accept='image/*'
							disabled={loading}

						>
							Browse File
							<VisuallyHiddenInput
								type='file'
								accept='image/*'
								ref={fileInputRef}
							/>
						</Button>
					</Box>
				</Box>
				{/*=====*/}
				<Box
					sx={{
						flexGrow: 1
					}}
				>
					<Box>
						<Typography
							sx={{
								color: colors.white,
								fontWeight: '500'
							}}
						>Enter the Country for your persona</Typography>
						<TextField
							sx={loginInputStyles}
							margin='dense'
							id='country'
							name='country'
							fullWidth
							autoFocus
							variant='standard'
							disabled={loading}
							required={true}
							value={country}
							onChange={handleCountryChange}
						/>
					</Box>
					<Box sx={{marginTop: '2rem'}}>
						<Typography
							sx={{
								color: colors.white,
								fontWeight: '500',
							}}
						>Select the gender of your persona</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '1rem',
								marginTop: '10px',
							}}
						>
							<GenderButton
								disabled={loading}
								gender={'Male'}
								selected={gender === 'Male'}
								onClick={setGender}
							/>
							<GenderButton
								disabled={loading}
								gender={'Female'}
								selected={gender === 'Female'}
								onClick={setGender}
							/>
							<GenderButton
								disabled={loading}
								gender={'Non-Binary'}
								selected={gender === 'Non-Binary'}
								onClick={setGender}
							/>
						</Box>
					</Box>
					{/*---*/}
					<Box sx={{marginTop: '3rem'}}>
						<Typography
							sx={{
								color: colors.white,
								fontWeight: '500',
							}}
						>Enter Your Offer</Typography>
						<TextField
							sx={loginInputStyles}
							margin='dense'
							id='offer'
							name='offer'
							fullWidth
							variant='standard'
							disabled={loading}
							multiline
							rows={4}
							value={offer}
							onChange={handleOfferChange}
						/>
					</Box>
					{/*---*/}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'start',
							gap: '1rem',
							marginTop: '2rem',
						}}
					>
						<Button
							sx={{
								width: '100%',
								paddingY: '.7rem',
								fontWeight: 'bold',
								maxWidth: '15rem',
								border: `1px solid ${colors.background}`
							}}
							disabled={loading}
							component='label'
							role={undefined}
							variant='outlined'
							color={'secondary'}
							startIcon={<AutoFixHighIcon/>}
							onClick={() => startHandler({isFull: true})}
						>
							Create Full Persona
						</Button>
						<Button
							sx={{
								width: '100%',
								paddingY: '.7rem',
								fontWeight: 'bold',
								maxWidth: '15rem',
								border: `1px solid ${colors.background}`
							}}
							component='label'
							role={undefined}
							variant='outlined'
							color={'secondary'}
							startIcon={<AccountTreeIcon/>}
							onClick={startHandler}
							disabled={loading}
						>
							Create by Step
						</Button>
					</Box>
				</Box>
			</Box>
			{loading && <Loader/>}
		</Box>
	);
};

export default CreationStarter;
