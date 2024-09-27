import React, {useEffect, useState} from 'react';
import useSWR from 'swr';
import {getRecordById, updateRecord} from '../services/airtable';
import {Box, Typography} from '@mui/material';
import Loader from '../components/Loader';
import {useLocation} from 'react-router-dom';
import {colors} from '../assets/styles/colors';
import personData from '../utils/personData';
import PersonDetailTextSection from '../components/PersonDetailTextSection';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const KEYS = Object.keys(personData);

const PersonDetail = () => {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const {data = {}, error, isLoading, mutate} = useSWR(`/persons/${id}`, () =>
		getRecordById(id)
	);

	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({});

	// Обновляем formData, когда приходят новые данные
	useEffect(() => {
		if (data.fields) {
			setFormData(data.fields);
		}
	}, [data.fields]);

	const handleChange = (key, value) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	const saveData = async (updatedData) => {
		setLoading(true);
		try {
			// Преобразование числовых полей
			const dataToSave = {...updatedData};
			dataToSave['Age'] = Number(dataToSave['Age']);
			dataToSave['Number of Kids'] = Number(dataToSave['Number of Kids']);
			// Сохранение данных на сервере
			await updateRecord(id, dataToSave);
			// Обновляем данные после успешного сохранения
			console.log({dataToSave});
			await mutate();
			// Выключаем режим редактирования
			setIsEditing(false);
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error);
			// Обработка ошибок (можно добавить уведомление для пользователя)
		} finally {
			setLoading(false);
		}
	};

	const cancelEditing = () => {
		// Отменяем изменения, восстанавливая исходные данные
		setFormData(data.fields);
		setIsEditing(false);
	};

	const content1 = KEYS.map((key, index) => (
		<PersonDetailTextSection
			key={key}
			title={key}
			subtitles={personData[key].keys}
			content={formData}
			isEditing={isEditing}
			onChange={handleChange}
		/>
	)).filter((_, index) => index % 2 === 0);

	const content2 = KEYS.map((key, index) => (
		<PersonDetailTextSection
			key={key}
			title={key}
			subtitles={personData[key].keys}
			content={formData}
			isEditing={isEditing}
			onChange={handleChange}
		/>
	)).filter((_, index) => index % 2 !== 0);

	if (isLoading || loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					flex: '1 1',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Loader/>
			</Box>
		);
	}

	return (
		<Box sx={{padding: '5rem'}}>
			<Box
				sx={{
					position: 'relative',
					maxWidth: '70rem',
					margin: '0 auto',
					backgroundColor: colors.background,
					borderRadius: '1.5rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '2rem',
					gap: '1rem',
				}}
			>
				{/* Отображение изображения пользователя */}
				<Box
					sx={{
						border: `4px solid ${colors.orange}`,
						width: '120px',
						height: '120px',
						borderRadius: '50%',
						overflow: 'hidden',
						margin: '0 auto',
						textAlign: 'center',
					}}
				>
					<Box
						component={'img'}
						alt={'user image'}
						src={data.fields['User Image'][0]?.url}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							filter: 'grayscale(100%)',
						}}
					/>
				</Box>
				{/* Отображение имени и должности */}
				<Typography
					variant={'h5'}
					sx={{color: colors.white}}
				>
					{formData?.Name}
				</Typography>
				<Typography
					variant={'h6'}
					sx={{color: colors.white}}
				>
					{formData['Job title']}
				</Typography>
				<Box sx={{borderTop: `1px solid ${colors.darkGrey42}`, width: '100%'}}/>
				{/* Контейнер для контента */}
				<Box
					sx={{
						backgroundColor: colors.backgroundMain,
						borderRadius: '1rem',
						padding: '1rem 8px 1rem 0',
						width: '100%',
						boxSizing: 'border-box',
						marginTop: '3rem',
					}}
				>
					<Box
						sx={{
							padding: '0 1rem 1rem 1rem',
							overflow: 'auto',
							maxHeight: '35rem',
							'&::-webkit-scrollbar': {
								width: '8px',
								borderRadius: '4px',
							},
							'&::-webkit-scrollbar-track': {
								borderRadius: '4px',
								backgroundColor: colors.orange20,
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: colors.orange,
								borderRadius: '4px',
							},
						}}
					>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								gap: '1rem',
							}}
						>
							<Box
								sx={{
									flexGrow: 1,
									width: '100%',
								}}
							>
								{content1}
							</Box>
							<Box
								sx={{
									flexGrow: 1,
									width: '100%',
								}}
							>
								{content2}
							</Box>
						</Box>
					</Box>
				</Box>
				{/* Кнопки редактирования/сохранения/отмены */}
				<Box
					sx={{
						position: 'absolute',
						right: '25px',
						top: '25px',
						display: 'flex',
						gap: '0.5rem',
					}}
				>
					{isEditing ? (
						<>
							<Box
								onClick={(e) => {
									e.stopPropagation();
									cancelEditing();
								}}
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
									Cancel
								</Typography>
								<CancelIcon sx={{fontSize: '1.4rem', color: 'inherit', marginLeft: '0.3rem'}}/>
							</Box>
							<Box
								onClick={(e) => {
									e.stopPropagation();
									saveData(formData);
								}}
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
							</Box>
						</>
					) : (
						<Box
							onClick={(e) => {
								e.stopPropagation();
								setIsEditing(true);
							}}
							sx={{
								cursor: 'pointer',
								color: colors.orange,
								'&:hover': {
									color: colors.black,
									backgroundColor: colors.orange,
								},
								padding: '.2rem .5rem',
								borderRadius: '10px',
								display: 'flex',
								alignItems: 'center',
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
								Edit
							</Typography>
							<BorderColorIcon sx={{fontSize: '1.4rem', color: 'inherit', marginLeft: '0.3rem'}}/>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default PersonDetail;
