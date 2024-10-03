import React, {useState} from 'react';
import {Box, Checkbox, Typography} from "@mui/material";
import officeBoy from '../assets/images/cartoon-office-boy.png';
import officeGirl from '../assets/images/cartoon-office-girl.png';
import {useNavigate} from "react-router-dom";
import {colors} from "../assets/styles/colors";
import CardSubtitle from "./CardSubtitle";
import SectionTitle from "./SectionTitle";
import DetailItem from "./DetailItem";
import PersonCardHead from "./PersonCardHead";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const PersonCard = ({person, isSelected, onSelectChange}) => {
	const {fields, id} = person;
	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	function detailsHandler() {
		// navigate(`/persons/${id}`);
	}

	const handleClick = (event) => {
		if (event.target.type !== 'checkbox') {
			onSelectChange(id, !isSelected);
		}
	};

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<Box
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={detailsHandler}
				sx={{
					width: '360px',
					height: '500px',
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
							boxSizing: 'border-box',
							border: `1px solid ${colors.gray40}`,
							position: 'absolute',
							width: '100%',
							height: '100%',
							backfaceVisibility: 'hidden',
							borderTopRightRadius: '25px',
							borderTopLeftRadius: '25px',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								backgroundColor: colors.black,
								flexGrow: 3,
								padding: '24px',
								color: colors.white,
								textAlign: 'center'
							}}
						>
							<PersonCardHead
								name={fields['Name']}
								image={fields['User Image']?.length > 0 ? fields['User Image'][0]?.url : fields['Gender'] === 'Female' ? officeGirl : officeBoy}
								place={fields['Place of residence']}
							/>
							<Typography
								sx={{
									color: colors.white,
									marginBottom: '1rem',
									fontWeight: '700',
									fontSize: '1.1rem',
									marginTop: '1rem',
								}}
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

					</Box>

					{/* Back side */}
					<Box

						sx={{
							cursor: 'pointer',
							border: `1px solid ${colors.orange}`,
							boxSizing: 'border-box',
							position: 'absolute',
							width: '100%',
							height: '100%',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							backgroundColor: colors.black,
							borderTopRightRadius: '25px',
							borderTopLeftRadius: '25px',
							padding: '20px 10px 20px 20px',
							color: colors.white,

						}}
					>
						<Box sx={{
							width: '100%',
							height: '100%',
							overflow: 'auto',
							'&::-webkit-scrollbar': {
								position: 'absolute',
								left: '100px',
								width: '10px',
								borderRadius: '4px',
							},
							'&::-webkit-scrollbar-track': {
								borderRadius: '4px',
								backgroundColor: colors.orange20,
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: colors.orange,
								borderRadius: '4px',
								width: '20px'
							},
						}}>
						<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.5rem'}}>
							<SectionTitle
								title='Psychographic Characteristics'
								sx={{flex: '1 1'}}
							/>
						</Box>
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
						<Box
							onClick={(e)=>{
								e.stopPropagation();
							}}
							sx={{
								margin: '0 auto',
								width: '7rem',
								borderRadius: '10px',
								display: 'flex',
								gap: '.4rem',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								backgroundColor: colors.orange,
								transition: '.3s',
								padding: '.2rem .5rem',
								color: colors.white,
								'&:hover': {
									color: colors.black,
									backgroundColor: colors.mainGreen
								}
							}}
						>
							<Typography
								variant='body1'
								sx={{
									color: 'inherit',
									fontSize: '1.2rem',
									fontWeight: '600',
								}}
							>Edit</Typography>
							<BorderColorIcon sx={{fontSize: '.9rem', color: 'inherit'}}/>
						</Box>
					</Box>
					</Box>
				</Box>
			</Box>
			<Box
				onClick={handleClick}
				sx={{
					overflow: 'hidden',
					boxSizing: 'border-box',
					borderBottom: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderLeft: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderRight: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderBottomRightRadius: '25px',
					borderBottomLeftRadius: '25px',
					width: '360px',
					display: 'flex',
					textAlign: 'center',
					transition: 'border-color .8s, background-color .3s',
					cursor: 'pointer',
					userSelect: 'none',
					backgroundColor: `${isSelected ? colors.orange : colors.black}`,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						justifyContent: 'center',

						paddingTop: '3px',
						paddingBottom: '3px',
						transition: '.3s',

					}}
					// onClick={handleClick}
				>
					<Checkbox
						sx={{
							color: colors.orange,
							'&.Mui-checked': {
								color: colors.white,
							},
						}}
						checked={isSelected}
						onChange={(event) => onSelectChange(id, event.target.checked)}
						onClick={(event) => event.stopPropagation()}
					/>
					<Typography
						variant='body1'
						color={colors.white}
						sx={{
							fontWeight: '600',
							fontSize: '1rem'
						}}
					>Select Person</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default PersonCard;
