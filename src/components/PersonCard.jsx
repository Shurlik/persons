import React from 'react';
import {Box, Checkbox, Typography} from "@mui/material";
import officeBoy from '../assets/images/cartoon-office-boy.png';
import officeGirl from '../assets/images/cartoon-office-girl.png';
import {useNavigate} from "react-router-dom";
import {colors} from "../assets/styles/colors";
import CardSubtitle from "./CardSubtitle";
import SectionTitle from "./SectionTitle";
import DetailItem from "./DetailItem";

const PersonCard = ({person, isSelected, onSelectChange}) => {
	const {fields, id} = person;
	const navigate = useNavigate();

	function detailsHandler() {
		// navigate(`/persons/${id}`);
	}

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4}}>
			<Box
				onClick={detailsHandler}
				sx={{
					cursor: 'pointer',
					width: '350px',
					height: '600px',
					perspective: '1000px',
					'& .card-inner': {
						position: 'relative',
						width: '100%',
						height: '100%',
						transition: 'transform 0.8s',
						transformStyle: 'preserve-3d',
					},
					'&:hover .card-inner': {
						transform: 'rotateY(180deg)',
					},
				}}
			>
				<Box className='card-inner'>
					{/* Front side */}
					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backfaceVisibility: 'hidden',
							borderRadius: '25px',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								backgroundColor: colors.black,
								flexGrow: 3,
								padding: '25px',
								color: colors.white,
								textAlign: 'center'
							}}
						>
							<Box
								sx={{
									margin: '0 auto',
									width: '140px',
									height: '140px',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Box
									sx={{
										border: '1px solid silver',
										width: '125px',
										height: '125px',
										borderRadius: '50%',
										overflow: 'hidden',
									}}
								>
									<Box
										component={'img'}
										alt={'user image'}
										src={fields['Gender'] === 'Female' ? officeGirl : officeBoy}
										sx={{width: '100%'}}
									/>
								</Box>
							</Box>
							<Typography
								variant='h4'
								marginTop={1}
								fontWeight={'bold'}
								sx={{color: colors.white}}
							>
								{fields['Name']}
							</Typography>
							<Typography
								fontSize={'1rem'}
								fontWeight={'bold'}
								mt={.5}
								sx={{color: colors.white}}
							>
								{fields['Place of residence']}
							</Typography>
							<Typography
								fontSize={'1rem'}
								mt={.5}
								sx={{color: colors.white, marginBottom: '1rem'}}
							>
								{"Age: " + fields['Age'] + ", " + fields['Job title']}
							</Typography>
							<CardSubtitle
								header={'Industry'}
								text={fields['Industry']}
							/>
							<CardSubtitle
								header={'Career stage'}
								text={fields['Career stage']}
							/>
							<CardSubtitle
								header={'Working environment'}
								text={fields['Working environment']}
							/>
							<CardSubtitle
								header={'Education level'}
								text={fields['Education level']}
							/>
							<CardSubtitle
								header={'Income class'}
								text={fields['Income class']}
							/>
						</Box>
						<Box
							sx={{
								backgroundColor: colors.black,
								height: '5%',
								padding: '20px',
								color: colors.white,
								textAlign: 'center',
							}}
						>
						</Box>
					</Box>

					{/* Back side */}
					<Box
						sx={{
							position: 'absolute',
							width: '90%',
							height: '95%',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							backgroundColor: colors.black,
							borderRadius: '25px',
							padding: '20px',
							color: colors.white,
							overflow: 'auto',
							'&::-webkit-scrollbar': {
								width: '8px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: colors.silver,
								borderRadius: '4px',
							},
						}}
					>
						<SectionTitle title='Psychographic Characteristics'/>
						<DetailItem
							label='Limbic Types'
							value={fields['Limbic Types']}
						/>
						<DetailItem
							label='Enneagram'
							value={fields['Enneagram']}
						/>
						<DetailItem
							label='Myers-Briggs (MBTI)'
							value={fields['Myers-Briggs (MBTI)']}
						/>
						<DetailItem
							label='DISG'
							value={fields['DISG']}
						/>
						<DetailItem
							label='Sinus-Milieus'
							value={fields['Sinus-Milieus']}
						/>
						<DetailItem
							label='Spiral Dynamics'
							value={fields['Spiral Dynamics']}
						/>
						<DetailItem
							label='Hobbies and Interests'
							value={fields['Hobbies and Interests']}
						/>
						<DetailItem
							label='TV Shows / Books'
							value={fields['TV Shows / Books']}
						/>

						<SectionTitle title='Values and Pain Points'/>
						<DetailItem
							label='Important Values'
							value={fields['Important Values']}
						/>
						<DetailItem
							label='Pain Points'
							value={fields['Pain Points']}
						/>
						<DetailItem
							label='Fears'
							value={fields['Fears']}
						/>

						<SectionTitle title='Goals and Gains'/>
						<DetailItem
							label='Goals and Dreams'
							value={fields['Goals and Dreams']}
						/>
						<DetailItem
							label='Materialistic Gains'
							value={fields['Materialistic Gains']}
						/>
						<DetailItem
							label='Emotional Win'
							value={fields['Emotional Win']}
						/>

						<SectionTitle title='Brand Preferences'/>
						<DetailItem
							label='Brand-Values'
							value={fields['Brand-Values']}
						/>
						<DetailItem
							label='Brand-Examples'
							value={fields['Brand-Examples']}
						/>
						<DetailItem
							label='Brand Archetype'
							value={fields['Brand Archetype']}
						/>
						<DetailItem
							label='Brand-Magnet'
							value={fields['Brand-Magnet']}
						/>

						<SectionTitle title='Buying Behavior'/>
						<DetailItem
							label='Buying Behavior'
							value={fields['Buying Behavior']}
						/>
						<DetailItem
							label='Buying motives'
							value={fields['Buying Motives']}
						/>
						<DetailItem
							label='Buying barriers'
							value={fields['Buying Barriers']}
						/>

						<SectionTitle title='Media Usage'/>
						<DetailItem
							label='Preferred communication channels'
							value={fields['Preferred communication channels']}
						/>
						<DetailItem
							label='Device usage'
							value={fields['Device usage']}
						/>
						<DetailItem
							label='Online behavior'
							value={fields['Online behavior']}
						/>

						<SectionTitle title='Elevator Pitch'/>
						<DetailItem
							label='Elevator Pitch'
							value={fields['Elevator Pitch']}
						/>
					</Box>
				</Box>
			</Box>
			<Box sx={{mt: 2, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
				<Checkbox
					checked={isSelected}
					onChange={(event) => onSelectChange(id, event.target.checked)}
				/>
				<Typography
					variant='body2'
					color={colors.white}
				>Select Person</Typography>
			</Box>
		</Box>
	);
};

export default PersonCard;
