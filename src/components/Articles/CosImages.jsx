import React, {useEffect, useRef, useState} from 'react';
import useSWR from "swr";
import {getImages} from "../../services/airtable";
import {Box, Button, Container, Typography} from "@mui/material";
import {colors} from "../../assets/styles/colors";
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {A11y, Navigation, Pagination, Scrollbar} from 'swiper/modules';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Loader from "../Loader";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

const CosImages = ({selectedImageId, setSelectedImageId, setSteps, steps, prompt, setPrompt, thumbnailStream, loading, setLoading}) => {
	const resultBoxRef = useRef(null);

	const [edit, setEdit] = useState(false);

	const {
		data: images = [],
		error: imgError,
		isLoading: imgIsLoading,
		mutate: imgMutate
	} = useSWR('/cos/images', () => getImages());


	const nextStepHandler = async () => {
		setLoading(true);
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
		setLoading(false);
		await thumbnailStream()
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [prompt]);

	return (
		<Container sx={{position: 'relative'}}>
			<Box>
				<OutputsTextField
					ref={resultBoxRef}
					editable={edit}
					title={'Thumbnail Prompt'}
					loading={loading}
					onChange={(event) => setPrompt(event.target.value)}
					value={prompt}
				/>
				<Typography
					variant={'h4'}
					sx={{color: colors.white, margin: '5rem 0 1rem'}}
				>Choose image style</Typography>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={10}
					slidesPerView={3}
					navigation
					pagination={{clickable: true}}
					scrollbar={{draggable: true}}
				>
					{!!images?.result ? images.result.map((image, i) => <SwiperSlide key={image?.url}>
						<Box
							onClick={() => setSelectedImageId(image)}
							sx={{
								position: 'relative',
								transition: '.3s',
								cursor: 'pointer',
								// width: '15rem',
								'&:hover': {
									transform: 'scale(1.1)'
								}
							}}
						>
							<Box
								component={'img'}
								alt={'img'}
								src={image?.url}
								sx={{width: '100%', height: '100%', objectFit: 'cover',}}
							/>
							{selectedImageId?.id === image?.id && <CheckCircleOutlineIcon
								sx={{
									width: ' 30px',
									height: '30px',
									color: colors.mainGreen,
									position: 'absolute',
									top: '15px',
									right: '15px',
								}}
							/>
							}
						</Box>
					</SwiperSlide>) : <Loader/>}
				</Swiper>
			</Box>

			<Button
				onClick={nextStepHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading || !prompt}
			>Next step</Button>
			<Button
				onClick={previousStepHandler}
				variant={'outlined'}
				color={'primary'}
				sx={{width: '100%', marginTop: '1rem'}}
				disabled={loading}
			>Previous step</Button>
			{loading && <Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'static',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: colors.black20,
					flexDirection: 'column'
				}}
			>
				<Loader/></Box>}
			<ToggleEdit
				isEdit={edit}
				onClick={() => setEdit(old => !old)}
			/>
		</Container>
	);
};

export default CosImages;
